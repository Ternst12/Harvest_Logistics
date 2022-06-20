import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Keyboard, Image} from "react-native";
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import { useSelector } from "react-redux";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Directions } from "../components/Directions";
import { selectOrigin, selectDriverInformation, selectDriverName, selectDriverID} from "../redux/Slices";
import { io } from "socket.io-client"
import Messagebox from "../components/Messagebox";
import { screenHeight, screenWidth } from "../constants/Dimensions";
import { socketAdress } from "../constants/SocketAdress";
import { openMaps } from "../helperFunc/openMaps";
import Colors from "../constants/Colors";
import FillLevelSlider from "../components/FillLevelSlider";
import { API, graphqlOperation} from "aws-amplify";
import { listVehicles } from "../graphql/queries";
import { createConnection } from "../graphql/mutations";
import { onUpdateVehicle, onCreateConnection } from "../graphql/subscriptions";
import InformationWhitebox from "../components/InformationWhiteBox";

const MapScreen = (props) => {

    const driverID = useSelector(selectDriverID)

    const origin = useSelector(selectOrigin)
    const driverInformation = useSelector(selectDriverInformation)

    const tractorIcon = require("../images/tractor.png")
    const combineIcon = require("../images/harvester.png")

    const [markerCord, setMarkerCord] = useState(null)
    const [selectedVehicleID, setSelectedVehicleID] = useState(null)
    const [connectedToTractor, setConnectedToTractor] = useState(false)
    const [distance, setDistance] = useState("")
    const [duration, setDuration] = useState("")
    const [showMessagebox, setShowMessagebox] = useState(false)
    const [fillLevel, setFillLevel] = useState(0)
    const [shownFillLevel, setShownFillLevel] = useState(0)
    const [choosenMarkerTitle, setChoosenMarkerTitle] = useState("")
    const [operationStarted, setOperationStarted] = useState(false)

    const [vehicle, setVehicle] = useState([])

    const mapRef = useRef(null)

    useEffect(() => {
        const subscription = API.graphql(graphqlOperation(onCreateConnection, {driverTwo_UserID: driverID}))
            .subscribe({
                next: ({ value }) => {
                    setConnectedToTractor(true)
                    console.log("There has been created a connection = ", value.data.onCreateConnection.driverTwo_UserID, " my userID is = ", driverID)
                    if(driverID == value.data.onCreateConnection.driverTwo_UserID) {
                        setMarkerCord({
                            lat: value.data.onCreateConnection.driverOne_UserProfile.vehicle.latitude,
                            lng: value.data.onCreateConnection.driverOne_UserProfile.vehicle.longitude
                        })
                        subscribeToVehicle(value.data.onCreateConnection.driverOne_UserID)
                        fetchVehicles()
                        setChoosenMarkerTitle(value.data.onCreateConnection.driverOne_UserProfile.email)
                    }
                },
                error: error => console.warn(error)
            })
    }, [])

    const createConnectionToVehicle = async(driverID, selectedVehicleID) => {
       const response = await API.graphql(graphqlOperation(createConnection, {
           input: {driverOne_UserID: driverID, driverTwo_UserID: selectedVehicleID}
        }))
    }

    const fetchVehicles = async () => {
        try {
            const response = await API.graphql(
                graphqlOperation(listVehicles)
                )
            var allVehicles = response.data.listVehicles.items
            var filteredVehicles = allVehicles.filter((item) => item.userID != driverID)
            console.log("filter = ", filteredVehicles)
            setVehicle(filteredVehicles) //sortere brugeren fra listen, så det kun er en liste over andre brugere
        } catch(error) {
            console.log("problemer med at fetche = ", error)
        }
    }

    const subscribeToVehicle = (userID) => {
        setOperationStarted(true)
        const subscription = API.graphql(
            graphqlOperation(onUpdateVehicle, {userID: userID})
          ).subscribe({
            next: ({ value }) => {
                if(userID == value.data.onUpdateVehicle.userID)
                {
                    setMarkerCord({
                        lat: value.data.onUpdateVehicle.latitude,
                        lng: value.data.onUpdateVehicle.longitude
                    })
                    if(value.data.onUpdateVehicle.type != "tractor"){
                    setFillLevel(value.data.onUpdateVehicle.fillLevel)
                    }
                }
            },
            error: error => console.warn(error)
          })    
    }


    useEffect(() => {
        if(!origin || !markerCord){
            return;
        } else {
            mapRef.current.fitToSuppliedMarkers(["origin", choosenMarkerTitle], {
                edgePadding: {top: screenWidth > 400 ? 200 : 100, right: screenWidth > 400 ? 200 : 100, bottom: screenWidth > 400 ? 200 : 100, left: screenWidth > 400 ? 200 : 100}
            })
        }
    }, [origin, markerCord])

    useLayoutEffect(() => {
        props.navigation.setOptions({
            headerRight: () => 
            (driverInformation == "tractor" ? 
                <TouchableOpacity onPress={() =>{fetchVehicles() /* requestDriver(socket, setMarkerCord, setShowMessagebox, showMessagebox, setCombineArray)} */}}>
                    <Text style={{fontSize: screenWidth > 400 ? 22 : 20, marginRight: 20, color: "white"}}>Find</Text>
                </TouchableOpacity> : 
                <View>
                    <Text style={{fontSize: screenWidth > 400 ? 22 : 20, marginRight: 20, color: "white"}}>{connectedToTractor ? "Connected" : "No connection"}</Text>
                </View>
            )
             
        })
    })

    
  return (
    <View style={{height: "100%", width: "100%"}}>
      <MapView
        
        ref={mapRef}
        style={{width: '100%', height: '100%'}}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        mapType="hybrid"
        initialRegion={{
          latitude: origin ? origin.lat : 67.026427,
          longitude: origin ? origin.lng :  19.985735,
          latitudeDelta: 0.0222,
          longitudeDelta: 0.0121,
        }}>

        <Marker
        title="origin"
        identifier="origin"
        coordinate={{latitude: origin ? origin.lat : 67.026427, longitude: origin ? origin.lng :  19.985735}}
        opacity={0}
        >

        </Marker>

        {vehicle.map((vehicle) => { 
                return(
                        <Marker
                        key={vehicle.id}
                        coordinate={{latitude: markerCord ? markerCord.lat : vehicle.latitude, longitude: markerCord ? markerCord.lng : vehicle.longitude}}
                        onPress={() => {
                            setMarkerCord({
                                lat: vehicle.latitude,
                                lng: vehicle.longitude
                            })
                            setChoosenMarkerTitle(vehicle.userMail)
                            setSelectedVehicleID(vehicle.userID)
                            setShowMessagebox(true)
                        }}
                        title={vehicle.userMail}
                        identifier={vehicle.userMail}
                        >
                        
                                <Image
                                    style={{
                                    width: 70,
                                    height: 70,
                                    resizeMode: 'contain',
                                    }}
                                    source={vehicle.type == "tractor" ? tractorIcon : combineIcon}
                                />
                
                        </Marker>
                )
      })}
         {markerCord && markerCord != "No input yet"  ? 
         <Directions location={origin} markerCord={markerCord} setDistance={setDistance} setDuration={setDuration}/>
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
                subscribeToVehicle={subscribeToVehicle}
                createConnectionToVehicle={createConnectionToVehicle}
                selectedVehicleID={selectedVehicleID}
                setShownFillLevel={setShownFillLevel}
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
       <InformationWhitebox driverInformation={driverInformation} distance={distance} duration={duration} fillLevel={fillLevel}/>
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
    }


})

export default MapScreen;