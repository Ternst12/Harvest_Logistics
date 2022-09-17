import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import Colors from "../constants/Colors";
import { screenWidth, screenHeight } from "../constants/Dimensions";
import { Organizations } from "aws-sdk";



const InformationWhitebox = props => {

    const [boxHeight, setBoxHeight] = useState("30%")
    const [distanceText, setDistanceText] = useState(true)

    var newDurationText = ""

    if(props.duration != 0 && props.duration != undefined) {
        newDurationText = props.duration.split("\n")
       }

    useEffect(() => {
        const participantsNumber = props.directionInfoArray.length

        if(props.driverInformation == "tractor") {
            setBoxHeight("20%")
            props.setMapHeight("80%")
        } else {

        switch (participantsNumber) {
            case 1:
                console.log("hejsa", participantsNumber)
                setBoxHeight("20%")
                props.setMapHeight("80%")
            
            case 2:
                console.log("hejsa", participantsNumber)
                setBoxHeight("20%")
                props.setMapHeight("80%")
            case 3:
                console.log("hejsa", participantsNumber)
                setBoxHeight("20%")
                props.setMapHeight("80%")
            
            case 4:
                console.log("hejsa", participantsNumber)
                setBoxHeight("20%")
                props.setMapHeight("80%")
            case 5:
              setBoxHeight("25%")
              props.setMapHeight("75%")
              break;
            case 6:
              setBoxHeight("32%")
              props.setMapHeight("68%")
          }
        }
    }, [])

    return(
        <View style={[styles.container, {height: boxHeight}]}>
            <View style={{width: "90%", height: "95%", alignItems: "center"}}>
            {props.driverInformation != "combine" ?
                    <View style={styles.infoBox}>                   
                        <View style={styles.infoLeftAndMiddle}>
                            <Text style={[styles.text_CombineInfo, {color: props.travellingToCombine ? Colors.androidGreen : Colors.reactNativeBlue}]}>{newDurationText}</Text>
                        </View>  
                        <View style={styles.infoLeftAndMiddle}>        
                            {props.distance == "" ?
                            <ActivityIndicator size={"small"} color={Colors.reactNativeBlue}/> :
                            <TouchableOpacity onPress={() => setDistanceText(!distanceText)}>
                                    <Text style={[styles.text, {color: props.travellingToCombine ? Colors.androidGreen : Colors.reactNativeBlue}]}>{distanceText ? props.distance : props.meters}</Text> 
                            </TouchableOpacity>
                            }
                        </View>
                        <View style={styles.infoRight}>
                            <Text style={[styles.text, {color: props.travellingToCombine ? Colors.androidGreen : Colors.reactNativeBlue}]}>{props.fillLevel}%</Text>
                        </View> 
                    </View>
                    :
                    <View style={styles.infoBox_Combine}>
                        {props.directionInfoArray.map((item) => 
                        {
                            if(item.duration != 0) {
                             newDurationText = item.duration.split("\n")
                            }

                            return (
                                <View style={{flexDirection: "row", height: screenWidth > 400 ? screenHeight * 0.048 : screenHeight * 0.04}}>
                                    <View style={styles.infoLeftAndMiddle}>
                                        <Text style={[styles.text, {color: item.HeadingToCombine ? Colors.androidGreen : Colors.reactNativeBlue}]}>{item.name}</Text>
                                    </View>
                                    
                                    <View style={styles.infoLeftAndMiddle}>
                                         {item.distance == "" ?
                                        <ActivityIndicator size={"small"} color={Colors.reactNativeBlue}/> 
                                        :
                                        <TouchableOpacity onPress={() =>{ setDistanceText(!distanceText); console.log(item)} }>
                                            <Text style={[styles.text, {color: item.HeadingToCombine ? Colors.androidGreen : Colors.reactNativeBlue}]}>{distanceText ? item.distance : item.meters}</Text> 
                                        </TouchableOpacity>
                                        }
                                    </View>
                                    
                                    <View style={styles.infoRight}>
                                         {newDurationText == "" ?
                                        <ActivityIndicator size={"small"} color={Colors.reactNativeBlue}/> 
                                        :
                                        <Text style={[styles.text, {color: item.HeadingToCombine ? Colors.androidGreen : Colors.reactNativeBlue}]}>{newDurationText}</Text> 
                                        }
                                    </View>
                                </View>
                                )
                            })
                        }
                    </View>
            }
            </View>
        </View>
    )

}

const styles = StyleSheet.create ({
    container: {
        position: "absolute", 
        bottom: 0, 
        width: "100%", 
        height: screenHeight * 0.30,
        backgroundColor: "white", 
        borderTopLeftRadius: 15, 
        borderTopRightRadius: 15, 
        justifyContent: "center", 
        alignItems: "center"
    },
    infoBox: {
        width: "100%", 
        height: "100%", 
        alignItems: "center",
        flexDirection: "row"
    },
    infoBox_Combine: {
        width: "100%", 
        height: "100%", 
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center"    
    },
    infoLeftAndMiddle: {
        borderColor: "grey", 
        borderRightWidth: 1, 
        width: "33%", 
        justifyContent: "center", 
        alignItems: "center",
        height: screenWidth > 400 ? "90%" : "60%"
    },
    infoRight: {
        width: "33%", 
        alignItems: "center", 
        justifyContent: "center", 
        height: screenWidth > 400 ? "90%" : "60%"
    },
    text: {
        fontSize: screenWidth > 400 ? screenWidth * 0.04 : screenWidth * 0.035,  
        color: Colors.reactNativeGrey,
        fontWeight: "900"
    },
    text_CombineInfo: {
        fontSize: screenWidth > 400 ? screenWidth * 0.04 : screenWidth * 0.05,  
        color: Colors.reactNativeGrey, 
        fontWeight: "bold"
    }
})

export default InformationWhitebox;