import React, { useState, useEffect, useRef, useLayoutEffect, useCallback } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image, Alert} from "react-native";
import MapView, {PROVIDER_GOOGLE, Marker, Circle} from 'react-native-maps';
import { useSelector, useDispatch } from "react-redux";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Directions } from "../components/Directions";
import { selectOrigin, selectDriverInformation, selectDriverID, selectGeofenceActive, selectIsStopWatchStart, selectGeofenceName, selectGeofenceRadius, selectResetStopWatch, selectGeofenceCord, setGeofenceCord, selectDriverName, selectParticipants, selectDistanceArray} from "../redux/Slices";
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

const MapScreen = (props) => {

    const driverID = useSelector(selectDriverID)
    const geofenceActive = useSelector(selectGeofenceActive)
    const origin = useSelector(selectOrigin)
    const driverInformation = useSelector(selectDriverInformation)
    const geofenceCord = useSelector(selectGeofenceCord)
    const geofenceName = useSelector(selectGeofenceName)
    const geofenceRadius = useSelector(selectGeofenceRadius)
    const driverName = useSelector(selectDriverName)
    const participants = useSelector(selectParticipants)
    const distanceArray = useSelector(selectDistanceArray)

    const tractorIcon = require("../images/logistics_tractor.png")
    const combineIcon = require("../images/logistics_combine_transparent.png")

    const [markerCord, setMarkerCord] = useState(null)
    const [selectedVehicleID, setSelectedVehicleID] = useState(null)
    const [distance, setDistance] = useState("")
    const [duration, setDuration] = useState(0)
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
    const [combineInfo, setCombineInfo] = useState(null)

    const [vehicle, setVehicle] = useState([])

    const mapRef = useRef(null)
    const circleRef = useRef(null)
    const dispatch = useDispatch()

    const testAsync = async (testArray) => {
      
        var newArray = testArray

        const result2 = await Promise.all(vehicle.map(async(v) => { 
               const coordinates = {
                   lng: v.longitude,
                   lat: v.latitude
               }
               const result = await distanceMeasurement(origin, coordinates, 30)
              
               const index_of = newArray.findIndex(object => {
                return object.id == v.userID;
                });
                const userName = newArray[index_of].name
                const userVehicle = newArray[index_of].vehicle
                const userId = newArray[index_of].id
                newArray.splice(index_of, 1, {
                    distance: result.value,
                    duration: result.time,
                    meters: result.value,
                    vehicle: userVehicle,
                    id: userId,
                    name: userName
                })
                
            }))
            
            setDirectionInfoArray(newArray)
            return;
         }


    const fetchVehicles = async() => {
        geofenceCheck(setGeofenceCheckColor)
        if(driverInformation == "tractor") {
            const combineId = await participants.find((item) => {return item.vehicle == "combine"})
            const combineInfoPlaceHolder = await API.graphql(graphqlOperation(getVehicle, {userID: combineId.id}))
            setCombineInfo(combineInfoPlaceHolder.data.getVehicle)
            const coordinates = {
                lng: combineInfoPlaceHolder.data.getVehicle.longitude,
                lat: combineInfoPlaceHolder.data.getVehicle.latitude
            }
            const result = await distanceMeasurement(origin, coordinates, 30)
            console.log("distance to combine = ", result.value)
            setDistance(result.value)
            setDuration(result.time)
            setFillLevel(combineInfoPlaceHolder.data.getVehicle.fillLevel)
        }
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
      
               setChoosenMarkerTitle(combineInfo.userID)           
        }

    }


    useLayoutEffect(() => {
        props.navigation.setOptions({
            headerRight: () => 
           
                <View style={{flexDirection: "row"}}>
                {!radar ?
                    <TouchableOpacity onPress={() =>{const interval = setInterval(() => {fetchVehicles();}, 1500); setFetchInterval(interval); setRadar(true); setOperationStarted(true)}}>
                        <Text style={{fontSize: screenWidth > 400 ? 22 : 20, marginRight: 20, color: geofenceCheckColor ? "blue" : "white"}}>Find</Text>
                    </TouchableOpacity> 
                    :
                    <View style={{flexDirection: "row", width: "50%", alignItems: "center", justifyContent: "space-between"}}>
                        <TouchableOpacity onPress={() => zoomOut()}>
                            <Feather name="zoom-in" size={40} color={geofenceCheckColor ? Colors.androidGreen : Colors.summerWhite} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {clearInterval(fetchInterval)}}>
                            <LottieView style={{width: 40, height: 40, marginRight: 20}} autoPlay={true} loop={true} source={require("../lottie/radar.json")}/>
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
        if(operationStarted) {
        var testArray = [...directionInfoArray]
        testAsync(testArray)
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

        <Marker
        title="origin"
        identifier="origin"
        coordinate={{latitude: origin ? origin.lat : 67.026427, longitude: origin ? origin.lng :  19.985735}}
        opacity={0}
        >

        </Marker>

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
            stopGeofencing()
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
            startGeofencing(PlaceHolder, geofenceName, geofenceRadius)
            geofenceCheck(setGeofenceCheckColor)
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
                        >
                            <Image style={styles.vehicleIcon} source={driverInformation == "combine" ? tractorIcon : vehicle.userID == combineInfo.userID ? combineIcon : tractorIcon}/>          
                        </Marker>
                )
            })
            : null}
        </MapView>
    
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
        <InformationWhitebox driverInformation={driverInformation} directionInfoArray={directionInfoArray} setMapHeight={setMapHeight} distance={distance} duration={duration} fillLevel={fillLevel}/>
        :
        null
        }
        {operationStarted ?
        <StopButton setOperationStarted={setOperationStarted} driverID={driverID} interval={fetchInterval} navigation={props.navigation}/>
        : 
        null
        }
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
        bottom: 30,
        right: 30
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