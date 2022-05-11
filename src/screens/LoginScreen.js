import React, {useEffect, useCallback} from "react";
import { useDispatch, useSelector } from "react-redux";
import {View, Text, StyleSheet, TouchableOpacity, Image} from "react-native"
import { setOrgin, setDriverInformation} from "../redux/Slices";
import * as Location from "expo-location"
import { screenHeight, screenWidth } from "../constants/Dimensions";


const LoginScreen = props => {

    const dispatch = useDispatch();

    useEffect(useCallback(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
            console.log("not granted")
            setErrorMsg('Permission to access location was denied');
            return;
            }
    
            let location = await Location.getCurrentPositionAsync({});
            dispatch(setOrgin({
                lat: location.coords.latitude,
                lng: location.coords.longitude
            }))
        })();
    }), []);

    return (
        <View style={styles.container}>
            <TouchableOpacity style={{borderColor:"grey", borderBottomWidth: 1, width: "90%", justifyContent: "center", alignItems: "center", paddingBottom: screenHeight * 0.05 }} onPress={() => {props.navigation.navigate("Home");
                                              dispatch(setDriverInformation("tractor"))  }}>
                <Image resizeMode="stretch" source={require("../images/icons/tractor.png")} style={styles.icon}/> 
            </TouchableOpacity>
            <TouchableOpacity style={{paddingTop: screenHeight * 0.05}} onPress={() => {props.navigation.navigate("Home");
                                              dispatch(setDriverInformation("combine"))  }}>
                <Image source={require("../images/icons/harvester.png")} style={styles.icon}/> 
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