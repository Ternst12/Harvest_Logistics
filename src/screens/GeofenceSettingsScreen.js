import React, {useState, useRef, useEffect} from "react"
import { useSelector, useDispatch } from "react-redux"
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Keyboard, ActivityIndicator} from "react-native"
import {selectOrigin, setGeofenceCord, setGeofenceName, setGeofenceRadius} from "../redux/Slices"
import { directionsFinder, findPlaceDebounced } from "../helperFunc/findPlace"
import MapView, {PROVIDER_GOOGLE, Marker, Circle} from "react-native-maps"
import { screenWidth } from "../constants/Dimensions"
import {Slider} from "@miblanchard/react-native-slider"

const GeofenceSettingsScreen = props => {

    const origin = useSelector(selectOrigin)
    
    const [predictions, setPredictions] = useState([])
    const [destination, setDestination] = useState(null)
    const [markerCord, setMarkerCord] = useState(null)
    const [markerName, setMarkerName] = useState("Home")
    const [radius, setRadius] = useState(100)
    const [activityIndicator, setActivityIndicator] = useState(false)

    const dispatch = useDispatch()
    const mapRef = useRef(null)
    const circleRef = useRef(null)

    useEffect(() => {
        console.log("MarkerCord = ", markerCord)
    }, [markerCord])

    const predictionsField = predictions.map(predictions => { 
        return(
        <TouchableOpacity 
        key={predictions.id} 
        style={{backgroundColor: "white", height: 35, justifyContent: "center", paddingHorizontal: 10, width: 300}}
        onPress={() => {directionsFinder(predictions.place_id, origin, setMarkerCord, setPredictions); Keyboard.dismiss()}}
        >
            <Text key={predictions.id} style={{fontSize: 18, color: "grey"}}>{predictions.description}</Text>
        </TouchableOpacity>
        )
    }); 

    return(
        <View style={styles.container}>
             <View style={styles.mapAndInputContainer}>
                <TextInput placeholder="Destination" value={destination} 
                onChangeText={(text) => {
                setDestination(text)
                findPlaceDebounced(text, origin, setPredictions)
                }} style={styles.inputBox} />
                {predictionsField}
                <View style={styles.mapContainer}>
                    <MapView 
                        ref={mapRef}
                        style={{width: '100%', height: '100%'}}
                        provider={PROVIDER_GOOGLE}
                        mapType="hybrid"
                        initialRegion={{
                            latitude: origin ? origin.lat : 67.026427,
                            longitude: origin ? origin.lng :  19.985735,
                            latitudeDelta: 0.0222,
                            longitudeDelta: 0.0121,
                        }}
                        region={{
                            latitude: markerCord ? markerCord.lat : origin.lat,
                            longitude: markerCord ? markerCord.lng :  origin.lat,
                            latitudeDelta: 0.0222,
                            longitudeDelta: 0.0121,
                        }}
                    >
                        {markerCord ?
                            <Marker 
                            draggable={true}
                            title={markerName}
                            description={markerName}
                            coordinate={{
                                latitude: markerCord.lat,
                                longitude: markerCord.lng
                            }}
                            onDragEnd={(e) => setMarkerCord({
                                lat: e.nativeEvent.coordinate.latitude,
                                lng: e.nativeEvent.coordinate.longitude
                                })
                            }
                            />
                            : null
                        }
                           {markerCord ?
                            <Circle 
                                ref={circleRef}
                                onLayout={() => (circleRef.current.setNativeProps({
                                strokeColor: 'rgba(40,246,67,0.6',
                                fillColor: 'rgba(246,205,40,0.8)',
                                }))}
                                center={{latitude: markerCord.lat, longitude: markerCord.lng}} 
                                radius={radius[0]}
                                fillColor={'rgba(40,246,67,0.6)'}
                                strokeColor={'rgba(246,205,40,0.8)'}
                            />
                            : null
                        }
                    </MapView>
                </View>
            </View>
            <View style={styles.informationContainer}>
                <View style={styles.namingContainer}>
                        <View style={{height: screenWidth > 400 ? "20%" : "25%", justifyContent: "center"}}>
                            <Text style={{fontSize: screenWidth * 0.05}}>Naming</Text>
                        </View>
                        <TextInput 
                        style={[styles.inputBox, {width: "50%", height: screenWidth > 400 ? "20%" : "25%", textAlign: "right", fontSize: screenWidth * 0.04, fontWeight: "bold", paddingRight: 20}]} 
                        onChangeText={(text) => setMarkerName(text)}
                        value={markerName}
                        />
                </View>
                <View style={styles.radiusContainer}>
                        <View style={{flexDirection: "row", justifyContent: "space-around", height: "100%"}}>
                            <View style={{height: screenWidth > 400 ? "20%" : "25%", justifyContent: "center"}}>
                                <Text style={{fontSize: screenWidth * 0.05}}>Radius</Text>
                            </View>
                            <View style={[styles.radiusTextBox, {width: "50%", height: screenWidth > 400 ? "20%" : "25%"}]}>  
                                <Text 
                                style={{textAlign: "right", fontSize: screenWidth * 0.04, fontWeight: "bold", marginRight: 20}}
                                >
                                    {radius} Meter
                                </Text>
                            </View>
                        </View>
                        <View style={{width: "100%", alignItems: "center", position: "relative", top: "-40%"}}>
                            <View style={{width: "80%"}}>
                                <Slider  
                                value={radius}
                                minimumValue={50}
                                maximumValue={1000}
                                step={50}
                                minimumTrackTintColor={"#FF865E"}
                                onValueChange={(number) =>{             
                                setRadius(number)
                                }}
                                thumbTintColor={"#FEE440"}
                                />
                            </View>
                    </View>
                </View>

            </View>
            <TouchableOpacity style={styles.saveButton} onPress={() => {
                dispatch(setGeofenceCord(markerCord))
                dispatch(setGeofenceName(markerName))
                dispatch(setGeofenceRadius(radius[0]))
                console.log("radius = ", radius[0])
                setActivityIndicator(true)
                setTimeout(() => {
                    props.navigation.navigate("HomeMap");
                    setActivityIndicator(false)
                }, 2000)
            }}>
               {activityIndicator ?
               <ActivityIndicator size={"small"} color={"#FF865E"}/>
               : <Text style={{fontSize: screenWidth * 0.05, color: "#FEF9EF"}}>SAVE</Text>
                } 
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: "center"
    },
    mapAndInputContainer: {
        position: "absolute", 
        width: "100%", 
        alignItems: "center", 
        height: "50%", 
        top: "5%", 
    },
    inputBox: {
        width: "90%", 
        height: screenWidth > 400 ? "10%" : "15%", 
        paddingLeft: 20,  
        backgroundColor: "white", 
        borderRadius: 30,
        marginBottom: 20
    },
    mapContainer : {
        width: '90%', 
        height: '70%',
        borderRadius: 15,
        overflow: "hidden"
    },
    informationContainer: {
        position: "absolute",
        top: "55%",
        height: "30%",
        width: "100%",
    },
    namingContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
        height: "50%"
    },
    radiusContainer: {
        justifyContent: "space-around",
        width: "100%",
        height: "50%"
    }, 
    radiusTextBox: {
        paddingLeft: 20,  
        backgroundColor: "white", 
        borderRadius: 30,
        marginBottom: 20,
        justifyContent: "center"
    },
    saveButton: {
       position: "absolute", 
       top: "85%",
       width: "80%",
       height: "8%",
       backgroundColor: "#A2D2FF",
       borderRadius: screenWidth * 0.07,
       justifyContent: "center",
       alignItems: "center"
    }
})

export default GeofenceSettingsScreen;