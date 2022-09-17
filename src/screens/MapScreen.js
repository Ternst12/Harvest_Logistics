import React, { useState, useEffect, useRef, useLayoutEffect, useCallback } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image, Alert, TouchableWithoutFeedback} from "react-native";
import MapView, {PROVIDER_GOOGLE, Marker, Circle, Polyline} from 'react-native-maps';
import { useSelector, useDispatch } from "react-redux";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {  selectTravlingToCombine, selectOrigin, selectDriverInformation, selectDriverID, selectGeofenceActive, selectIsStopWatchStart, selectGeofenceName, selectGeofenceRadius, selectResetStopWatch, selectGeofenceCord, setGeofenceCord, selectDriverName, selectParticipants, selectDistanceArray, selectTractorSpeed, selectCombineId, setTravellingToCombine, setCombineLocation, selectCombineLocation, selectCurrentTaskName, selectEntryGeofence, selectExitGeofence} from "../redux/Slices";
import Messagebox from "../components/Messagebox";
import { screenHeight, screenWidth } from "../constants/Dimensions";
import { openMaps } from "../helperFunc/openMaps";
import Colors from "../constants/Colors";
import FillLevelSlider from "../components/FillLevelSlider";
import { API, graphqlOperation} from "aws-amplify";
import {  getVehicle } from "../graphql/queries";
import InformationWhitebox from "../components/InformationWhiteBox";
import StopButton from "../components/StopButton";
import { geofenceCheck, startGeofencing, stopGeofencing } from "../helperFunc/GeoFencing";
import LottieView from 'lottie-react-native';
import { distanceMeasurement } from "../helperFunc/findPlace";
import { Feather } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { updateVehicle } from "../graphql/mutations";
import LocationButton from "../components/AddLocationButton";

const MapScreen = (props) => {

    const driverID = useSelector(selectDriverID)
    const geofenceActive = useSelector(selectGeofenceActive)
    const origin = useSelector(selectOrigin)
    const driverInformation = useSelector(selectDriverInformation)
    const geofenceCord = useSelector(selectGeofenceCord)
    const geofenceName = useSelector(selectGeofenceName)
    const geofenceRadius = useSelector(selectGeofenceRadius)
    const tractorSpeed = useSelector(selectTractorSpeed)
    const participants = useSelector(selectParticipants)
    const distanceArray = useSelector(selectDistanceArray)
    const combineId = useSelector(selectCombineId)
    const travellingToCombine = useSelector(selectTravlingToCombine)
    const combineLocation = useSelector(selectCombineLocation)
    const currentTaskName = useSelector(selectCurrentTaskName)
    const entryArray = useSelector(selectEntryGeofence)
    const exitArray = useSelector(selectExitGeofence)

    const tractorIcon = require("../images/logistics_tractor.png")
    const combineIcon = require("../images/logistics_combine_transparent.png")

    const [markerCord, setMarkerCord] = useState(null)
    const [selectedVehicleID, setSelectedVehicleID] = useState(null)
    const [distance, setDistance] = useState("")
    const [duration, setDuration] = useState(0)
    const [meter, setMeter] = useState(0)
    const [directionInfoArray, setDirectionInfoArray] = useState([])
    const [showMessagebox, setShowMessagebox] = useState(false)
    const [fillLevel, setFillLevel] = useState(0)
    const [choosenMarkerTitle, setChoosenMarkerTitle] = useState(null)
    const [operationStarted, setOperationStarted] = useState(false)
    const [geofenceCheckColor, setGeofenceCheckColor] = useState(false)
    const [radar, setRadar] = useState(false)
    const [loadedVehicles, setLoadedVehicles] = useState(false)
    const [fetchInterval, setFetchInterval] = useState(null)
    const [mapHeight, setMapHeight] = useState("100%")
    const [iconOpacity, setIconOpacity] = useState(0.4)
    const [directionPoly, setDirectionPoly] = useState([{longitude: 10.145153, latitude: 56.501941}, {longitude: 10.145163, latitude: 56.501951}, {longitude: 10.145173, latitude: 56.501961}, {longitude: 10.145183, latitude: 56.501971}])

    const [vehicle, setVehicle] = useState([])

    const mapRef = useRef(null)
    const circleRef = useRef(null)
    const circleRefCombine = useRef(null)
    const dispatch = useDispatch()

    useEffect(() => {
        console.log("entry = ", entryArray)
        console.log("exit = ", exitArray)
    }, [entryArray, exitArray])

    const ChangeDirection = async() => {
        dispatch(setTravellingToCombine(!travellingToCombine))
        try {
            const result = await API.graphql(graphqlOperation(updateVehicle, {
                    input: {
                        userID: driverID, 
                        HeadingToCombine: !travellingToCombine, 
                    }
                    }))   
                if(result.data.updateVehicle && geofenceActive) {
                    await stopGeofencing(currentTaskName)
                    var task = !travellingToCombine ? "GEOFENCE_TASK_HeadingToCombine" : "GEOFENCE_TASK_HeadingToFarm";
                    startGeofencing(
                        task ==  "GEOFENCE_TASK_HeadingToFarm" ? geofenceCord : combineLocation, 
                        task ==  "GEOFENCE_TASK_HeadingToFarm" ? geofenceName : "Home", 
                        task ==  "GEOFENCE_TASK_HeadingToFarm" ? geofenceRadius : 50, 
                        task)
                }     
                } catch (error) {
                    console.log("Direction Update lykkes ikke ", error)
                    Alert.alert("Something went wrong when updating direction",
                    " ! " + error + " ! ",
                    [
                        {
                            text: "Ok",
                            style: "cancel"
                        }, 
                    ]
                    )
                }
    }

    const TractorCall = async() => {
        try{
            const combineInfoPlaceHolder = await API.graphql(graphqlOperation(getVehicle, {userID: combineId}))
            const coordinates = {
                lng: combineInfoPlaceHolder.data.getVehicle.longitude,
                lat: combineInfoPlaceHolder.data.getVehicle.latitude
            }
            dispatch(setCombineLocation(coordinates))
            const result = await distanceMeasurement(origin, coordinates, tractorSpeed, setDirectionPoly)
            setDistance(result.text)
            setDuration(result.time)
            setMeter(result.value)
            setFillLevel(combineInfoPlaceHolder.data.getVehicle.fillLevel)
        } catch (e) {
            console.log("problemer med combineInfoPlaceHolder = ", e)
        }
    }

    const CombineCall = async (testArray) => {
        var newArray = testArray
        const result2 = await Promise.all(vehicle.map(async(v) => { 
               const coordinates = {
                   lng: v.longitude,
                   lat: v.latitude
               }
               const HeadingToCombine = v.HeadingToCombine
               const result = await distanceMeasurement(origin, coordinates, tractorSpeed, setDirectionPoly)
              
               const index_of = newArray.findIndex(object => {
                return object.id == v.userID;
                });
                const userName = newArray[index_of].name
                const userVehicle = newArray[index_of].vehicle
                const userId = newArray[index_of].id
                newArray.splice(index_of, 1, {
                    distance: result.text,
                    duration: result.time,
                    meters: result.value,
                    vehicle: userVehicle,
                    id: userId,
                    name: userName,
                    HeadingToCombine: HeadingToCombine
                })
                
            }))
            setDirectionInfoArray(newArray)
            return;
         }


    const fetchVehicles = async(origin) => {
        var vehicileArray = []
        const resultVehicle = await Promise.all(participants.map(async(p) => {
            try {
                const participant = await API.graphql(
                    graphqlOperation(getVehicle, {userID: p.id})
                    )
                vehicileArray.push(participant.data.getVehicle)
            } catch(error) {
                console.error("problemer med at fetche participants = ", error)
            } 
            return vehicileArray;
        }))
        if(resultVehicle[0].length > 0) {
            setLoadedVehicles(true)
            var today = new Date()
            var time = today.toLocaleTimeString()
            setVehicle(resultVehicle[0])
        }
    }


    useEffect(() => {
        if(!origin || choosenMarkerTitle == null){
            return;
        } else {
            mapRef.current.fitToSuppliedMarkers(["origin", choosenMarkerTitle], {
                edgePadding: {top: screenWidth > 400 ? 300 : 100, right: screenWidth > 400 ? 300 : 100, bottom: screenWidth > 400 ? 300 : 100, left: screenWidth > 400 ? 300 : 100}
            })
           
        }
    }, [origin, choosenMarkerTitle])

    const zoomOut = () => {
        console.log("vehicle = ", vehicle)
        if(driverInformation == "combine"){
            const highestNumber = Math.max(...directionInfoArray.map(o => o.meters))
            const resultLongestDistance = directionInfoArray.find(o => o.meters == highestNumber)
            if(resultLongestDistance != undefined) {
                setChoosenMarkerTitle(resultLongestDistance.id)
            }
        } else {
      
               setChoosenMarkerTitle(combineId)           
        }

    }


    useLayoutEffect(() => {
        props.navigation.setOptions({
            headerRight: () => 
           
                <View style={{flexDirection: "row"}}>
                {!radar ?
                    <TouchableOpacity onPress={() =>{const interval = setInterval(() => {fetchVehicles(origin);}, 2000); setFetchInterval(interval); setRadar(true); setOperationStarted(true)}}>
                        <Text style={{fontSize: screenWidth > 400 ? 22 : 20, marginRight: 20, color: geofenceCheckColor ? "blue" : "white"}}>Find</Text>
                    </TouchableOpacity> 
                    :
                    <View style={{flexDirection: "row", width: screenWidth > 400 ? "50%" : "70%", alignItems: "center", justifyContent: "space-between"}}>
                        <TouchableOpacity onPress={() => {zoomOut(); console.log(entryArray), console.log(exitArray) }}>
                            <Feather name="zoom-in" size={screenWidth > 400 ? 40 : 30} color={geofenceCheckColor ? Colors.androidGreen : Colors.summerWhite} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {clearInterval(fetchInterval)}}>
                            <LottieView style={{width: screenWidth > 400 ? 40 : 30, height: screenWidth > 400 ? 40 : 30, marginRight: 20}} autoPlay={true} loop={true} source={require("../lottie/radar.json")}/>
                        </TouchableOpacity>
                    </View>
                }
                </View>
              
             
        })
    })
    
    useEffect(() => {
        setDirectionInfoArray(distanceArray)
    }, [])

    useEffect(() => {
        if(operationStarted && driverInformation == "combine") 
        {
            var testArray = [...directionInfoArray]
            geofenceCheck(setGeofenceCheckColor, "GEOFENCE_TASK_HeadingToCombine")
            CombineCall(testArray)
        } 
        else if(operationStarted && driverInformation == "tractor") 
        {
            geofenceCheck(setGeofenceCheckColor, "GEOFENCE_TASK_HeadingToCombine")
            TractorCall()
        }
    }, [vehicle])
    
  return (
    <View style={{height: "100%", width: "100%"}}>
      <MapView
        onPress={() => {console.log("pressed"), setChoosenMarkerTitle(null)}}
        onPanDrag={() => {setChoosenMarkerTitle(null)}}
        ref={mapRef}
        style={{width: '100%', height: mapHeight}}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        mapType="hybrid"
        initialRegion={{
          latitude: origin ? origin.lat : 67.026427,
          longitude: origin ? origin.lng :  19.985735,
          latitudeDelta: 0.0222,
          longitudeDelta: 0.0121,
        }}
        >

        <Polyline 
                coordinates={directionPoly}
                strokeColor={Colors.reactNativeBlue}
                strokeWidth={3}
        />

        <Marker
            title="origin"
            identifier="origin"
            coordinate={{latitude: origin ? origin.lat : 67.026427, longitude: origin ? origin.lng :  19.985735}}
            opacity={0}
        >

        </Marker>

        {geofenceActive && combineLocation && driverInformation == "tractor" ?
        <Circle 
         ref={circleRefCombine}
         onLayout={() => (circleRefCombine.current.setNativeProps({
           strokeColor: 'rgba(6, 147, 243, 0.8)',
           fillColor: 'rgba(6, 147, 243, 0.8)',
         }))}
        center={{latitude: combineLocation.lat, longitude: combineLocation.lng}} 
        radius={50}
        fillColor={'rgba(6, 147, 243, 0.8)'}
        strokeColor={'rgba(6, 147, 243, 0.8)'}
        />
        : null
        }

        {geofenceActive ?
        <Circle 
         ref={circleRef}
         onLayout={() => (circleRef.current.setNativeProps({
           strokeColor: 'rgba(40,246,67,0.6',
           fillColor: 'rgba(246,205,40,0.8)',
         }))}
        center={{latitude: geofenceCord.lat, longitude: geofenceCord.lng}} 
        radius={geofenceRadius}
        fillColor={'rgba(40,246,67,0.6)'}
        strokeColor={'rgba(246,205,40,0.8)'}
        />
        : null
        }
        {geofenceActive ?
        <Marker 
        draggable={true}
        onDragStart={() => {
            stopGeofencing(currentTaskName)
            geofenceCheck(setGeofenceCheckColor)
        }}
        onDragEnd={(e) => {
            console.log("DragEnd = ", e.nativeEvent.coordinate.latitude)
            dispatch(setGeofenceCord({
                lat: e.nativeEvent.coordinate.latitude,
                lng: e.nativeEvent.coordinate.longitude
            })
            )
            var PlaceHolder = {
                lat: e.nativeEvent.coordinate.latitude,
                lng: e.nativeEvent.coordinate.longitude
            }
            var task = travellingToCombine ? "GEOFENCE_TASK_HeadingToCombine" : "GEOFENCE_TASK_HeadingToFarm";
            startGeofencing(
                task ==  "GEOFENCE_TASK_HeadingToFarm" ? PlaceHolder : combineLocation, 
                task ==  "GEOFENCE_TASK_HeadingToFarm" ? geofenceName : "Home", 
                task ==  "GEOFENCE_TASK_HeadingToFarm" ? geofenceRadius : 50, 
                task)
            geofenceCheck(setGeofenceCheckColor, task)
        }}
        coordinate={{
            latitude: geofenceCord.lat, 
            longitude: geofenceCord.lng
        }}
        title={geofenceName}
        >
            <Image source={require("../images/barn.png")} style={{width: screenWidth * 0.10, height: screenWidth * 0.125}}/>
        </Marker>
        : null
        }

            {loadedVehicles ? vehicle.map((vehicle) => { 
               
                return(
                        <Marker
                            key={vehicle.id}
                            coordinate={{latitude: vehicle.latitude, longitude: vehicle.longitude}}
                            title={vehicle.userID}
                            identifier={vehicle.userID}
                            anchor={{ x: 0.5, y: 0.5 }}
                        >
                            <Image style={styles.vehicleIcon} source={driverInformation == "combine" ? tractorIcon : vehicle.userID == combineId ? combineIcon : tractorIcon}/>          
                        </Marker>
                )
            })
            : null}
            
      
        </MapView>
        <TouchableWithoutFeedback 
            onPress={() => ChangeDirection()} onPressOut={() => {setIconOpacity(0.4)}} onPressIn={() => {setIconOpacity(1)}}>
                <View style={[styles.mapIcon, {opacity: iconOpacity, top: mapHeight, marginTop: - screenHeight * 0.10}]} >
                    <Octicons name="arrow-switch" size={screenWidth > 400 ? 60 : 40} color={travellingToCombine ? Colors.androidGreen : Colors.reactNativeBlue} />
                </View>
        </TouchableWithoutFeedback>
        <View style={{position: "absolute", right: 200, top: mapHeight, marginTop: - screenHeight * 0.10}}>
            <LocationButton />
        </View>
    
        {showMessagebox ? 
            <View style={{position: "absolute", top: "40%", left: screenWidth > 400 ? "25%" : "15%"}}>
                <Messagebox 
                setShowMessagebox={setShowMessagebox}
                duration={duration} 
                distance={distance}
                setMarkerCord={setMarkerCord}
                showMessagebox={showMessagebox}
                markerCord={markerCord}
                origin={origin}
                driverID={driverID}
                selectedVehicleID={selectedVehicleID}
                setShownFillLevel={setShownFillLevel}
                setVehicle={setVehicle}
               />
            </View>:
            null
        }

        {markerCord && markerCord != "No input yet"  ?
        <View style={styles.mapIcon}>
            <MaterialCommunityIcons name="google-maps" size={screenWidth > 400 ? 74 : 44} color={Colors.summerYellow} onLongPress={() => openMaps(markerCord)}/>
        </View> :
        null
        }
        {driverInformation == "combine" ?
        <View style={styles.fillLevelSlider}>
            <FillLevelSlider fillLevel={fillLevel} setFillLevel={setFillLevel} driverID={driverID}/>
        </View>:
        null
        }
        {operationStarted ?
        <InformationWhitebox travellingToCombine={travellingToCombine} driverInformation={driverInformation} directionInfoArray={directionInfoArray} setMapHeight={setMapHeight} distance={distance} duration={duration} meters={meter} fillLevel={fillLevel}/>
        :
        null
        }
        
        <StopButton setOperationStarted={setOperationStarted} driverID={driverID} interval={fetchInterval} navigation={props.navigation}/>
        
    </View>
  );
};



const styles = StyleSheet.create({
    markerIcons : {
        height: screenWidth > 400 ? screenHeight * 0.04 : screenHeight * 0.05,
        width: screenWidth > 400 ? screenWidth * 0.06 : screenWidth * 0.07,
        alignItems: "flex-end",
        justifyContent: "flex-end"
    },

    inputBox: {
        width: 300, 
        height: 70, 
        paddingLeft: 20,  
        backgroundColor: "white", 
        borderRadius: 30,
    },
    inputBoxShadow: {
        shadowColor: "blue",
        shadowOffset: {
            width: 1 -1,
            height: 12 -12,
        },
        shadowOpacity: 0.39,
        shadowRadius: 10.30,
        
        elevation: 13,
    },
    leafletView: {
        height: 500,
        width: 400,
        backgroundColor: "white", 
        position: "absolute",
        top: 300,
        right: 50
    },
    markerTextBox :{
        width: screenWidth > 400 ? screenWidth * 0.11 : screenWidth * 0.25,
        height: screenWidth > 400 ? screenWidth * 0.11 : screenWidth * 0.23,
        backgroundColor: "white",
        opacity: 0.5
    },
    mapIcon: {
        position: "absolute",
        bottom: screenHeight * 0.06,
        right: 30,
        width: screenWidth > 400 ? screenWidth * 0.095 : screenWidth * 0.15,
        height: screenWidth > 400 ? screenWidth * 0.095 : screenWidth * 0.15,
        borderRadius: screenWidth > 400 ? screenWidth * 0.045 : screenWidth * 0.085, 
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.summerWhite
    },
    fillLevelSlider: {
        position: "absolute",
        top: screenHeight * 0.03,
        alignItems: "center",
        width: "100%"
    }, 
    combineInfoText : {
        fontSize: 24,
        fontWeight: "700"
    },
    buttonText: {
        fontSize: 20,
        marginTop: 10,
      },
    stopwatch: {
        position: "absolute",
        bottom: "20%",
        left: "5%"
    },
    vehicleIcon: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
    }
})

const options = {
    container: {
      backgroundColor: '#FF0000',
      padding: 5,
      borderRadius: 5,
      width: 200,
      alignItems: 'center',
      opacity: 0.7
    },
    text: {
      fontSize: 25,
      color: '#FFF',
      marginLeft: 7,
    },
}

export default MapScreen;