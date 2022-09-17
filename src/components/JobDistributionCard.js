import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import Colors from "../constants/Colors";
import { screenHeight, screenWidth } from "../constants/Dimensions";

const JobDistributionCard = props => {

     const [combineSelected, setCombineSelected] = useState()
     const [tractorSelected, setTractorSelected] = useState()

     useEffect(() => {
        setCombineSelected(props.combineSelected)
        setTractorSelected(props.tractorSelected)
        if(props.index != 0) {
            setTimeout(() => {
                setTractorSelected(true)
            }, 1000)
        } else {
            setTimeout(() => {
                setCombineSelected(true)
            }, 300)
        }
     }, [])

     useEffect(() => {
        props.setRefresh(true)
        var testArray = [...props.operationArray]
        testArray.splice(props.index, 1, {
            id: props.id,
            vehicle: tractorSelected ? "tractor" : "combine",
            name: props.userName
        })
        props.setOperationArray(testArray)
        props.setRefresh(false)
     }, [combineSelected, tractorSelected])

    return (
        <View style={styles.cardContainer}>
           <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                <View style={{position: "absolute", left: 50}}>
                    <Text style={styles.userNameText}>{props.userName}</Text>
                </View>
                <View style={{flexDirection: "row", width: "35%", justifyContent: "space-between", position: "absolute", right: 20}}>
                    <TouchableOpacity a onPress={() => {
                        setTractorSelected(!tractorSelected)
                        if(combineSelected) {
                            setCombineSelected(false)
                        }
                    }}>
                        <View style={styles.userImage}>
                            <Image style={{height: "100%", width: "100%"}} source={require("../images/logistics_tractor.png")}/>
                            <View style={{position: "absolute", top: 0, backgroundColor: Colors.reactNativeBlue, height: "100%", width: "100%", borderRadius: screenHeight * 0.04, opacity: tractorSelected ? 0.5 : 0}}></View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                            setCombineSelected(!combineSelected)
                            if(tractorSelected) {
                                setTractorSelected(false)
                            }
                        }}>
                        <Image style={styles.userImage} source={require("../images/logistics_combine_transparent.png")} />
                        <View style={{position: "absolute", top: 0, backgroundColor: Colors.reactNativeBlue, height: "100%", width: "100%", borderRadius: screenHeight * 0.04, opacity: combineSelected ? 0.5 : 0}}></View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        width: "100%",
        height: "80%",
        justifyContent: "center",
        borderRadius: screenHeight * 0.05,
        backgroundColor: Colors.reactNativeGrey        
    },
    userNameText: {
        fontSize: screenWidth > 400 ? 30 : 18,
        fontWeight: "900",
        color: Colors.summerWhite
    },
    userImage: {

        height: screenWidth > 400 ? screenHeight * 0.08 : screenHeight * 0.06,
        width: screenWidth > 400 ? screenHeight * 0.08 : screenHeight * 0.06,
    }
    
})

export default JobDistributionCard;