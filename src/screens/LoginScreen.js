import React, {useState} from "react";
import { useDispatch, useSelector} from "react-redux";
import {View, StyleSheet, TouchableOpacity, Image, Text, Platform} from "react-native"
import { selectDriverID, setDriverInformation} from "../redux/Slices";
import LocationTracker from "../helperFunc/locationTracker";
import { screenHeight, screenWidth } from "../constants/Dimensions";
import { updateVehicle } from "../graphql/mutations";
import {API, graphqlOperation } from 'aws-amplify'

const LoginScreen = props => {

    const dispatch = useDispatch();
    const driverID = useSelector(selectDriverID)

    const updateVehicleType = async(typeName) => {
        try {
        const response = await API.graphql(graphqlOperation(updateVehicle, {
            input: {type: typeName, userID: driverID},
            
        }
        ))
        console.log("Type Update lykkes = ", response)
        } catch (error) {
            console.log("Type Update lykkes ikke ", error)
        }
    }

    return (
        <View style={styles.container}>
            <View style={{position: "absolute", top: 20, right: 20}}>
                <LocationTracker/>
            </View>
            <TouchableOpacity style={{borderColor:"grey", borderBottomWidth: 1, width: "90%", justifyContent: "center", alignItems: "center", paddingBottom: screenHeight * 0.05 }} onPress={() => {props.navigation.navigate("Home");
                                              dispatch(setDriverInformation("tractor")); updateVehicleType("tractor"); console.log(Platform.OS + " " + screenWidth) }}>
                <Image resizeMode="stretch" source={require("../images/tractor.png")} style={styles.icon}/> 
            </TouchableOpacity>
            <TouchableOpacity style={{paddingTop: screenHeight * 0.05}} onPress={() => {props.navigation.navigate("Home");
                                              dispatch(setDriverInformation("combine")); updateVehicleType("combine"); console.log(Platform.OS + " " + screenWidth) }}>
                <Image source={require("../images/harvester.png")} style={styles.icon}/> 
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex: 1, 
        justifyContent: "center",
        alignItems: "center"
    },
    text : {
        fontSize: 40,
        marginVertical: 20
    },

    icon : {
        height: screenWidth > 400 ? screenHeight * 0.35 : screenHeight * 0.3,
        width: screenWidth > 400 ? screenWidth * 0.6 : screenWidth * 0.7
    }
})

export default LoginScreen;