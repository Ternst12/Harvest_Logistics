import React from "react";
import { View, Text, StyleSheet, Linking, Platform } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { screenWidth, screenHeight } from "../constants/Dimensions";
import { SettingOpenToConnection } from "../helperFunc/SettingOpenToConnections";

const Messagebox = props => {

    const newDurationText = props.duration.split("\n")


    return(
        <View style={styles.boxContainer}>
            <View style={styles.backgroundStyling}></View>
            <View style={{position: "absolute", top: "25%", width: "80%", alignItems: "center"}}>
                <View style={{width: "70%", justifyContent: "space-around", marginBottom: 10, marginTop: screenWidth > 400 ?  "-10%" : "-15%"}}>
                    <Text>Duration: {newDurationText}</Text>
                    <Text>Distance: {props.distance}</Text>
                </View>
                <Text style={{textAlign: "center", fontSize: 16, fontWeight: "500"}}>Do you want to share your location with the combine and start the operation?</Text>
                <View style={{flexDirection: "row", width: "80%", marginBottom: 10, height: "100%", justifyContent: "space-between", marginTop: "10%"}}>
                    <View style={[styles.buttons, {backgroundColor: "red"}]}>
                        <TouchableOpacity onPress={() => {
                            props.setMarkerCord(null)
                            props.setShowMessagebox(false)
                        }}>
                            <Text style={styles.buttonText}>No</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.buttons, {backgroundColor: "green"}]}>
                        <TouchableOpacity onPress={() => {
                            props.subscribeToVehicle(props.selectedVehicleID)
                            props.createConnectionToVehicle(props.driverID, props.selectedVehicleID) 
                            props.setShowMessagebox(false)   
                            SettingOpenToConnection(props.driverID, true)   
                             
                        }}>
                            <Text style={styles.buttonText}>Yes</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default Messagebox;

const styles = StyleSheet.create({
    boxContainer: {
        width: screenWidth > 400 ? screenWidth * 0.50 : screenWidth * 0.70,
        height: screenWidth > 400 ? screenHeight * 0.20 : screenHeight * 0.25,
        justifyContent: "center",
        alignItems: "center",
        borderColor: "grey",
        borderWidth: 0.5,
        borderRadius: screenWidth > 400 ? screenHeight * 0.10 : screenHeight * 0.13,
    },

    backgroundStyling: {
        height: "100%",
        width: "100%",
        backgroundColor: "white",
        opacity: 0.9,
        borderRadius: screenWidth > 400 ? screenHeight * 0.10 : screenHeight * 0.13
    },
    buttonText : {
        color: "white",
        opacity: 0.9,
        fontSize: 16,
        fontWeight: "900"
    },
    buttons: {
        width: "20%", 
        height: "30%", 
        justifyContent: "center", 
        alignItems: "center", 
        borderRadius: 25
    }

})