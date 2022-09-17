import {View, StyleSheet, FlatList, TouchableOpacity, Text} from "react-native"
import { useState, useRef, useEffect } from "react"
import { useSelector } from "react-redux"
import MapView, {PROVIDER_GOOGLE, Marker, Polyline} from 'react-native-maps';
import Colors from "../constants/Colors";
import { API, graphqlOperation} from "aws-amplify";
import { getUser } from "../graphql/queries";
import { screenHeight, screenWidth } from "../constants/Dimensions";
import { selectDriverID } from "../redux/Slices";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {Slider} from "@miblanchard/react-native-slider"
import { convertMeters } from "../helperFunc/findPlace";
import Checkbox from 'expo-checkbox';

const RecordsScreen = props => {

    const mapRef = useRef(null)

    const driverID = useSelector(selectDriverID)
    const [user, setUser] = useState(null)
    const [recordsArray, setRecordsArray] = useState([])
    const [selectedRecordsArray, setSelectedRecordsArray] = useState([])
    const [recordSelected, setRecordSelected] = useState(false)
    const [region, setRegion] = useState(null)
    const [timeIndex, setTimeIndex] = useState(0)
    const [timeArray, setTimeArray] = useState([])
    const [geofenceArray, setGeofenceArray] = useState([])
    const [toggleCheckBox, setToggleCheckBox] = useState(false)

    useEffect(async() => {
        try 
        {
            const user = await API.graphql(graphqlOperation(getUser,  {id: driverID}))
            setUser(user)
            setRecordsArray(user.data.getUser.travelingRecords.items)
        }
        catch (error)
        {
            console.warn("Something went wrong when fetching user")
        }
    }, [])

    const selectRecord = async(record, entryArray, exitArray) => {
        var newArray = []
        var placeholderTime = []
        const recordsArray = JSON.parse(record)
        const entryArrayNew = JSON.parse(entryArray)
        const exitArrayNew = JSON.parse(exitArray)
        console.log("Entry = ", entryArray, " & Exit = ", exitArray)
        await recordsArray.map((rec) => {
            newArray.push({
                latitude: rec.latitude,
                longitude: rec.longitude
            })
        })
        await recordsArray.map((rec) => {
            placeholderTime.push({
                time: rec.time,
                kmh: convertMeters(rec.speed * 3600)
            })
        })
        var placeholderGeofences = []
        if(entryArrayNew != null) {
            await entryArrayNew.map((entry, index) => {
                var index_of_entry = recordsArray.findIndex( object => {return object.timeInSec == entry.sec})
                var index_of_exit = recordsArray.findIndex( object => {return object.timeInSec == exitArrayNew[index].sec})
                var timeInArea = exitArrayNew[index].sec - entry.sec
                var placeholder = recordsArray.slice(index_of_entry, index_of_exit)
                var object = {
                    byCombine: entry.byCombine,
                    byFarm: entry.byFarm,
                    array: placeholder,
                    timeInArea: timeInArea
                }
                placeholderGeofences.push(object)
            })
        }
        console.log(placeholderGeofences)
        setGeofenceArray(placeholderGeofences)
        setSelectedRecordsArray(newArray)
        setTimeArray(placeholderTime)
        setRegion({
            latitude: newArray[0].latitude,
            longitude: newArray[0].longitude
        })
        setRecordSelected(true)
    }


    return (
        <View style={{width: "100%", height: "100%", backgroundColor: Colors.reactNativeGrey}}>
            <View style={styles.mapContainer}>
                <MapView
                    ref={mapRef}
                    style={styles.map}
                    provider={PROVIDER_GOOGLE}
                    showsUserLocation={true}
                    mapType="hybrid"
                    initialRegion={{
                    latitude: region ? region.latitude : 56.477223,
                    longitude: region ? region.longitude : 10.075736,
                    latitudeDelta: 0.0222,
                    longitudeDelta: 0.0121,
                    }}
                    region={{
                        latitude: region ? region.latitude : 56.477223,
                        longitude: region ? region.longitude : 10.075736,
                        latitudeDelta: 0.0222,
                        longitudeDelta: 0.0121,
                    }}
                    >
                {
                    recordSelected ? 
                    <Polyline 
                        coordinates={selectedRecordsArray}
                        strokeColor="red"
                        strokeWidth={3}
                    />
                    :
                    null
                }
                {
                    recordSelected ? 
                    <Marker
                    coordinate={{
                        latitude: selectedRecordsArray[timeIndex].latitude, 
                        longitude: selectedRecordsArray[timeIndex].longitude
                    }}
                    title={driverID}
                    pinColor={"red"}
                    />
                    :
                    null
                }
                {
                    recordSelected && toggleCheckBox ?
                    geofenceArray.map((geo) => {
                        return(
                            <TouchableOpacity onPress={() => console.log("geo = ", geo)}>
                                <Polyline 
                                coordinates={geo.array.map(c => ({latitude: c.latitude, longitude: c.longitude}))}
                                strokeColor={geo.byCombine ? Colors.androidGreen : Colors.summerYellow}
                                strokeWidth={5}
                                
                                />
                            </TouchableOpacity>
                        )
                    })
                    :
                    null
                }
                </MapView>
            </View>
            <View style={{marginTop: "5%", height: "5%", width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "center", opacity: recordSelected ? 1: 0.5}}>
                <View style={{width: screenWidth * 0.5}}>
                    <Slider 
                        disabled={!recordSelected}
                        value={timeIndex}
                        minimumValue={0}
                        maximumValue={timeArray.length == 0 ? 10 : timeArray.length - 1}
                        step={1}
                        onValueChange={async(number) =>{             
                            console.log(number[0])
                            setTimeIndex(number[0])
                        }}
                        thumbTintColor={Colors.reactNativeBlue}
                        minimumTrackTintColor={Colors.summerYellow}
                        maximumTrackTintColor={Colors.summerWhite}
                    />
                </View>
                <Text style={{marginLeft: 20, color: Colors.summerWhite, fontSize: 20}} >{timeArray.length == 0 ? "???" : timeArray[timeIndex].time}</Text>
                <Text style={{marginLeft: 20, color: Colors.summerWhite, fontSize: 20}} >{timeArray.length == 0 ? "???" : timeArray[timeIndex].kmh + "h"}</Text>
                <Text style={{marginLeft: 20, color: Colors.summerWhite, fontSize: 20}}>Show geofence areas</Text>
                <Checkbox
                    style={{marginLeft: 20, height: screenWidth > 400 ? 35 : 25, width: screenWidth > 400 ? 35 : 25}}
                    disabled={!recordSelected}
                    value={toggleCheckBox}
                    onValueChange={(newValue) => setToggleCheckBox(newValue)}
                    color={Colors.reactNativeBlue}                
                    />
            </View>
            <View style={{justifyContent: "center", alignItems: "center",  width: screenWidth * 0.5, height: screenHeight * 0.05, position: "absolute", top: "51.5%", left: "25%"}}>
                <View style={{flexDirection: "row"}}>
                        {
                            toggleCheckBox ?
                            geofenceArray.map((geo) => {
                                return (
                                    <Text style={{color: Colors.summerWhite, fontSize: screenWidth > 400 ? 20 : 16, marginHorizontal: 10}}>{geo.timeInArea} sek</Text>
                                )
                            })
                            : 
                            null
                        }
                </View>
            </View>
            <View style={styles.recordsContainer}>
                <FlatList 
                      data={recordsArray}
                      keyExtractor={(item) => item.id}
                      renderItem={({item, index}) => (
                        <TouchableOpacity style={styles.recordsItem} onPress={() => console.log(item)}>
                            <View style={{flexDirection: "row", justifyContent: "space-around"}}>
                                <View style={{height: "100%", width: "60%", flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingLeft: 10}}>
                                    <Text style={styles.recordText}>{item.operationId}</Text>
                                    <Text style={styles.recordText}>{item.createdAt}</Text>
                                </View>
                                <View style={{height: "100%", width: "10%"}}>
                                    <TouchableOpacity onPress={() => selectRecord(item.recordData, item.entryArray, item.exitArray)}>
                                        <MaterialCommunityIcons name="map-marker-path" size={screenWidth > 400 ? 44 : 32} color="black" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                    /> 
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    mapContainer: {
        width: "100%",
        height: "40%",
        borderColor: "green",
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: "5%",
        backgroundColor: "#FFFFFF"
    },
    map: {
        width: "75%",
        height: "95%",
        borderRadius: screenWidth > 400 ? 30 : 15
    },
    recordsContainer: {
        marginTop: "5%",
        width: "100%",
        height: "40%",
        borderColor: Colors.reactNativeBlue,
        borderWidth: 2,
        alignItems: "center"
    },
    recordsItem: {
        width: screenWidth * 0.9,
        height: screenHeight * 0.05,
        backgroundColor: "#FFFFFF",
        marginBottom: 5,
        justifyContent: "center"
    },
    recordText : {
        fontSize : screenWidth > 400 ? 16 : 6
    }
    
})

export default RecordsScreen;