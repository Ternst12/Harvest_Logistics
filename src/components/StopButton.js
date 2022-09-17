import {View, Text, Image, StyleSheet, TouchableWithoutFeedback, Alert} from "react-native"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { screenWidth } from "../constants/Dimensions";
import { stopForegroundUpdate, stopBackgroundUpdate } from "../helperFunc/locationTracker";
import { selectDriverID, selectOperationId, selectRecord, selectEntryGeofence, selectExitGeofence } from "../redux/Slices";
import { createRecords } from "../graphql/mutations";
import {API, graphqlOperation } from 'aws-amplify'

const StopButton = props => {

    const [signOpacity, setSignOpacity] = useState(0.4)

    const dispatch = useDispatch()
    const records = useSelector(selectRecord)
    const driverID = useSelector(selectDriverID)
    const operationId = useSelector(selectOperationId)
    const entryArray = useSelector(selectEntryGeofence)
    const exitArray = useSelector(selectExitGeofence)

    const SaveRecords = async() => {
        console.log("exitArray = ", exitArray)
        console.log("entryArray = ", entryArray)
        var newExitArray = JSON.stringify(exitArray)
        if(entryArray > exitArray) {
            var sec = parseInt(Date.now()/1000)
            var time = new Date().toLocaleTimeString()
            var obj = {
              sec: sec,
              time: time
            }
            newExitArray.push(obj)
        }
        const newOperation = {
            userId: driverID,
            operationId: operationId,
            recordData: records, 
            entryArray: JSON.stringify(entryArray),
            exitArray: newExitArray
        }

        try 
        {
            const result = await API.graphql(graphqlOperation(createRecords, {
                input: newOperation
                }))
            console.log("result = ", result)
            if(result.data.createRecords) {
                Alert.alert("Yor travel record is saved",
                "Would you like to see your trip?",
                [
                    {
                        text: "No",
                        style: "cancel"
                    }, 
                    {
                        text: "Yes",
                        style: "default",
                        onPress: () => {props.navigation.navigate("Records")}
                    }, 
                ]
                )
            }
        }
            catch (error)
        {
            console.warn("Something went wrong when saving records = ", error)
            Alert.alert("Something went wrong when saving your travel data",
                error,
                [
                    {
                        text: "Ok",
                        style: "cancel"
                    }, 
                ]
                )
        }
    }

    return (
        <View style={[styles.container,{opacity: signOpacity}]}>
            <TouchableWithoutFeedback
                onPressIn={() => {
                    setSignOpacity(1)
                }} 
                onPressOut={() => {
                    setSignOpacity(0.4)
                }}
                onLongPress={async() => {
                    try {
                    await stopForegroundUpdate(dispatch)
                    await stopBackgroundUpdate()
                    } catch(e) {
                        console.log(e)
                    }
                    clearInterval(props.interval)
                    props.setOperationStarted(false)
                    props.navigation.navigate("Auth")
                    SaveRecords()
                }}
                >
                <Image source   ={require("../images/forbidden-2.png")} style={{width: "100%", height: "100%"}} />
            </TouchableWithoutFeedback>
        </View>
    )

}

const styles = StyleSheet.create ({

    container: {
        position: "absolute", 
        top: "5%", 
        left: "7%", 
        width: screenWidth > 400 ? screenWidth * 0.10 : screenWidth * 0.15, 
        height: screenWidth > 400 ? screenWidth * 0.10 : screenWidth * 0.15, 
        backgroundColor: "white", 
        borderRadius: screenWidth > 400 ? screenWidth * 0.05 : screenWidth * 0.075
    }


})

export default StopButton;