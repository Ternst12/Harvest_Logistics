import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { TextInput, View, StyleSheet, Text, TouchableOpacity, Keyboard, Image, Linking, Platform } from "react-native";
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import { useSelector } from "react-redux";
import { presenceMessage } from "../helperFunc/CombineSocket";
import { findPlaceDebounced, directionsFinder } from "../helperFunc/findPlace";
import { Directions } from "../components/Directions";
import { selectOrigin, selectDriverInformation, setTravelTimeInformation} from "../redux/Slices";
import { io } from "socket.io-client"
import Messagebox from "../components/Messagebox";
import { screenHeight, screenWidth } from "../constants/Dimensions";
import { requestDriver } from "../helperFunc/TractorSocket";
import { LatLng, LeafletView} from 'react-native-leaflet-view';


const MapScreen = (props) => {

    const origin = useSelector(selectOrigin)
    const driverInformation = useSelector(selectDriverInformation)
    const [socket, setSocket] = useState(io("http://192.168.87.132:3000"))

    const tractorIcon = require("../images/icons/tractor.png")
    const combineIcon = require("../images/icons/harvester.png")

    const [destination, setDestination] = useState(null);
    const [writing, setWriting] = useState(false)
    const [predictions, setPredictions] = useState([])
    const [markerCord, setMarkerCord] = useState(null)
    const [showSearchBar, setShowSearchBar] = useState(false)
    const [connectedToTractor, setConnectedToTractor] = useState(false)
    const [distance, setDistance] = useState(null)
    const [duration, setDuration] = useState(null)
    const [showMessagebox, setShowMessagebox] = useState(false)

    const mapRef = useRef(null)

    useEffect(() => {
        if(!origin || !markerCord){
            console.log("Cord = ", origin)
            console.log("fejl")
            return;
        } else {
            console.log("succes")
            mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
                edgePadding: {top: 200, right: 200, bottom: 200, left: 200}
            })
            setShowSearchBar(false)
        }
    }, [origin, markerCord])

    useEffect(() => {
        if(driverInformation == "combine") {
            presenceMessage(socket, origin, setConnectedToTractor, setMarkerCord)
        }
    }, [origin])

    const predictionsField = predictions.map(predictions => { return(
            <TouchableOpacity 
            key={predictions.id} 
            style={{backgroundColor: "white", height: 35, justifyContent: "center", paddingHorizontal: 10, width: 300}}
            onPress={() => {directionsFinder(predictions.place_id, origin, setMarkerCord, setPredictions); Keyboard.dismiss()}}
            >
                <Text key={predictions.id} style={{fontSize: 18, color: "grey"}}>{predictions.description}</Text>
            </TouchableOpacity>
        )});  

    useLayoutEffect(() => {
        props.navigation.setOptions({
            headerRight: () => 
            (driverInformation == "tractor" ? 
                <TouchableOpacity onPress={() => requestDriver(socket, setMarkerCord, setShowMessagebox, showMessagebox)}>
                    <Text style={{fontSize: 20, marginRight: 20}}>Find</Text>
                </TouchableOpacity> : 
                <View>
                    <Text style={{fontSize: 20, marginRight: 20}}>{connectedToTractor ? "Connected" : "No connection"}</Text>
                </View>
            )
             
        })
    })

    const marker = () => {
        return (
            <View>
                <Text>hej</Text>
            </View>
        )
    }
  return (
    <View style={{height: "100%", width: "100%"}}>
      <MapView
        ref={mapRef}
        onPress={() => {setWriting(false); console.log("pressed")}}
        style={{width: '100%', height: '100%'}}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={false}
        mapType="satellite"
        initialRegion={{
          latitude: origin ? origin.lat : 67.026427,
          longitude: origin ? origin.lng :  19.985735,
          latitudeDelta: 0.0222,
          longitudeDelta: 0.0121,
        }}>
        {origin ? 
        <Marker 
            coordinate={{
                latitude: origin.lat,
                longitude: origin.lng       
            }}
            pinColor={"red"}
            title="Origin"
            identifier="origin"
        > 
            <View style={styles.markerIcons}>
                <Image source={driverInformation == "tractor" ? tractorIcon : combineIcon} resizeMode="stretch" style={{height: "80%", width: "100%"}}/>
            </View>
        </Marker>:
        null}
        {markerCord && markerCord != "No input yet" ? 
        <Marker 
            coordinate={{
                latitude: markerCord.lat,
                longitude: markerCord.lng
            }}
            pinColor={"green"}
            title="Destination"
            identifier="destination"
            >
            <View style={styles.markerIcons}>
                <Image source={driverInformation == "tractor" ? combineIcon : tractorIcon} resizeMode="stretch" style={{height: "100%", width: "90%"}}/>
            </View>
        </Marker> 
        : null}
         {markerCord && markerCord != "No input yet"  ? 
         <Directions location={origin} markerCord={markerCord} setDistance={setDistance} setDuration={setDuration}/>
        : null}
        </MapView>
    
        {showSearchBar ? <View style={{position: "absolute", width: "100%", alignItems: "center", height: "50%", top: "5%"}}>
            <TextInput placeholder="Destination" value={destination} onFocus={() => {
                setWriting(true)
            }} 
            onChangeText={(text) => {
            setWriting(true)
            setDestination(text)
            findPlaceDebounced(text, origin, setPredictions)
            }} style={[styles.inputBox, writing ? styles.inputBoxShadow : null]} />
            {predictionsField}
        </View> : <View></View>
        }
        {showMessagebox && driverInformation == "tractor" ? 
            <View style={{position: "absolute", top: "40%", left: screenWidth > 400 ? "25%" : "15%"}}>
                <Messagebox 
                setShowMessagebox={setShowMessagebox}
                duration={duration} 
                distance={distance}
                requestDriver={requestDriver}
                socket={socket}
                setMarkerCord={setMarkerCord}
                showMessagebox={showMessagebox}
                markerCord={markerCord}
                origin={origin}
               />
            </View>:
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
    }


})

export default MapScreen;