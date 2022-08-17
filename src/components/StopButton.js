import {View, Text, Image, StyleSheet, TouchableWithoutFeedback} from "react-native"
import { useState } from "react";
import { screenWidth } from "../constants/Dimensions";
import { deleteConnection } from "../graphql/mutations";
import { getConnection, listConnections } from "../graphql/queries";
import {API, graphqlOperation } from 'aws-amplify'
import { SettingOpenToConnection } from "../helperFunc/SettingOpenToConnections";


const StopButton = props => {

    const [signOpacity, setSignOpacity] = useState(0.4)

    return (
        <View style={[styles.container,{opacity: signOpacity}]}>
            <TouchableWithoutFeedback
                onPressIn={() => {
                    setSignOpacity(1)
                }} 
                onPressOut={() => {
                    setSignOpacity(0.4)
                }}
                onLongPress={() => {
                    clearInterval(props.interval)
                    props.setOperationStarted(false)
                    props.navigation.navigate("Auth")
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