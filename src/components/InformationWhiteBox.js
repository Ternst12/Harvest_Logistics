import { View, Text, StyleSheet } from "react-native";
import { screenWidth, screenHeight } from "../constants/Dimensions";


const InformationWhitebox = props => {

    const newDurationText = props.duration.split("\n")
    const newDistanceText = props.distance.split("\n")

    return(
        <View style={styles.container}>
            <View style={{width: "90%", height: "90%", alignItems: "center"}}>
            {props.driverInformation != "combine" ?
                    <View style={styles.infoBox}>
                        <View style={styles.infoLeftAndMiddle}>
                            <Text style={styles.text}>{props.duration}</Text>
                        </View>
                        <View style={styles.infoLeftAndMiddle}>
                            <Text style={styles.text}>{props.distance}</Text>
                        </View>
                        <View style={styles.infoRight}>
                            <Text style={styles.text}>{props.fillLevel} %</Text>
                        </View> 
                    </View>
                    :
                    <View style={styles.infoBox}>
                        <View style={[styles.infoLeftAndMiddle, {width: "50%"}]}>
                            <Text style={styles.text}>{newDurationText}</Text>
                        </View>
                        <View style={[styles.infoRight, {width: "50%"}]}>
                            <Text style={styles.text}>{newDistanceText}</Text>
                        </View>
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
        height: screenHeight * 0.10, 
        backgroundColor: "white", 
        borderTopLeftRadius: 15, 
        borderTopRightRadius: 15, 
        justifyContent: "center", 
        alignItems: "center"
    },
    infoBox: {
        width: "100%", 
        height: "100%", 
        flexDirection: "row", 
        alignItems: "center",
    },
    infoLeftAndMiddle: {
        borderColor: "grey", 
        borderRightWidth: 1, 
        width: "33%", 
        justifyContent: "center", 
        alignItems: "center",
        height: "50%"
    },
    infoRight: {
        width: "33%", 
        alignItems: "center", 
        justifyContent: "center", 
        height: "50%"
    },
    text: {
        fontSize: screenWidth > 400 ? screenWidth * 0.03 : screenWidth * 0.04, 
        fontWeight: "bold", 
        color: "black"
    }
})

export default InformationWhitebox;