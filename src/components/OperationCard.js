import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {selectDriverID, setCombineId, setOperationId, setTravellingToCombine} from "../redux/Slices";
import { setDriverInformation, setParticipants, setDistanceArray } from "../redux/Slices";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert} from "react-native";
import Colors from "../constants/Colors";
import { screenHeight, screenWidth } from "../constants/Dimensions";
import Modal from "react-native-modal";
import LottieView from 'lottie-react-native';
import { API, graphqlOperation} from "aws-amplify";
import { updateVehicle } from "../graphql/mutations";
import { requestPermissions } from "../helperFunc/locationTracker";

const OperationCard = props => {

    const dispatch = useDispatch()

    const [participants, setParticipantsPlaceholder] = useState([])
    const [modalVisible, setModalVisible] = useState(false)
    const [lottiePlay, setLottiePlay] = useState(0)
    const [filteredParticipants, setFilteredParticipants] = useState([])
    const [distanceArrayPlaceholder, setDistanceArrayPlaceholder] = useState([])

    const driverID = useSelector(selectDriverID)

    useEffect(() => {
        var newObject = JSON.parse(props.Participants)
        var newArray = Object.values(newObject) 
        setParticipantsPlaceholder(newArray)
        var filteredArray = newArray.filter((item) => item.id != driverID)
        setFilteredParticipants(filteredArray)
        var placeholderArray = []
        filteredArray.map((item) => { 
            
        placeholderArray.push(
            object = {
                id: item.id,
                vehicle: item.vehicle, 
                name: item.name,
                duration: 0,
                distance: 0,
                meters: null,
                HeadingToCombine: true
            })
        }) 

        setDistanceArrayPlaceholder(placeholderArray)

    }, [])

    const NavigateToMap = async() => {
        await requestPermissions(dispatch, driverID)
        const userVehicleType = participants.filter((item) => item.id == driverID) 
        const combineId = await participants.find((item) => {return item.vehicle == "combine"})
        dispatch(setCombineId(combineId.id))
        if(userVehicleType[0].vehicle == "combine") {
            try {
                await API.graphql(graphqlOperation(updateVehicle, {
                       input: {
                           userID: driverID, 
                           fillLevel: 0, 
                       }
                       }))            
                   } catch (error) {
                       console.log("Filllevel Update lykkes ikke ", error)
                       Alert.alert("Something went wrong when updating fillLevel",
                       " ! " + error + " ! ",
                       [
                           {
                               text: "Ok",
                               style: "cancel"
                           }, 
                       ]
                       )
                   }
        }
        dispatch(setDriverInformation(userVehicleType[0].vehicle)) 
        dispatch(setParticipants(filteredParticipants)) 
        dispatch(setDistanceArray(distanceArrayPlaceholder))
        dispatch(setTravellingToCombine(true))
        dispatch(setOperationId(props.operationId))  
        try {
           const result = await API.graphql(graphqlOperation(updateVehicle, {
                   input: {
                       userID: driverID, 
                       HeadingToCombine: true, 
                   }
                   }))   
                // console.log("result = ", result)         
               } catch (error) {
                   console.log("Location Update lykkes ikke ", error)
                   Alert.alert("Something went wrong when updating direction",
                   " ! " + error + " ! ",
                   [
                       {
                           text: "Ok",
                           style: "cancel"
                       }, 
                   ]
                   )
               }
        setLottiePlay(1); 
        props.setLocationTrackerOn(true)
        setTimeout(() => {
            console.log("participants = ", filteredParticipants)
            console.log("placeholderArray = ", distanceArrayPlaceholder)
            props.navigation.navigate("Home", {
            screen: "HomeMap"
        })}, 3000)
    }


 return(
        <View key={props.id} style={{width: "100%", alignItems: "center"}}>
            <View style={styles.container}>
                <Text style={styles.OperationName}>{props.OperationName != "" ? props.OperationName : "Not named"}</Text>
                <TouchableOpacity onPress={() => setModalVisible(true)} style={{flexDirection: "row", marginLeft: 40, position: "absolute", bottom: 0, marginBottom: 10}}>
                    <Text style={{color: Colors.summerWhite, fontSize: screenWidth > 400 ? 18 : 10}}>Number of participants: </Text>
                    {
                        participants.length == 0 ? 
                        <ActivityIndicator style={{marginLeft: 20}} size={"small"} color={Colors.reactNativeBlue} />
                        :
                      
                        <Text style={{color: Colors.summerWhite, fontSize: screenWidth > 400 ? 18 : 10, marginHorizontal: 10}}>{participants.length}</Text>
                                        
                    }
                </TouchableOpacity>
                <TouchableOpacity style={styles.lottieContainer} onPress={() => NavigateToMap()}>
                    <LottieView style={{width: screenWidth > 400 ? 120 : 80, height: screenWidth > 400 ? 120 : 80, marginRight: 20}} speed={lottiePlay} autoPlay={false} onAnimationLoop={() => {console.log("test")}} onAnimationFinish={() => {console.log("animation finish")}} loop={true} source={require("../lottie/tractor.json")}/>
                </TouchableOpacity>
            </View>
            <Modal isVisible={modalVisible} style={{alignItems: "center"}}>
                <View style={[styles.modal, {height: participants.length > 4 ? participants.length > 6 ? screenHeight * 0.65 : screenHeight * 0.55 : screenHeight * 0.5}]}>
                    <Text style={styles.modalHeader}>Participants detail</Text>
                    <View style={{marginTop: 20, width: "100%", alignItems: "center"}}>
                        {
                            participants.map((p) => {
                                return(
                                    <View key={p.name} style={styles.participantContainer}>
                                        <Text style={{marginRight: 20, fontSize: screenWidth > 400 ? 20 : 15, color: Colors.summerWhite}}>{p.name}</Text>
                                        <Text style={{fontSize: screenWidth > 400 ? 20 : 15, color: Colors.summerWhite}}>drives a {p.vehicle}</Text>
                                    </View>
                                )
                            })
                        }
                    </View>
                    <TouchableOpacity style={[styles.ModalButton, {height: participants.length > 4 ? "10%" : "15%"}]} onPress={() => setModalVisible(false)}>
                        <Text style={styles.ModalButtonText}>CLOSE</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
 )   
}

const styles = StyleSheet.create({

    container: {
        height: screenHeight * 0.07,
        width: "95%",
        backgroundColor: Colors.reactNativeGrey,
        marginBottom: 10,
        borderRadius: screenHeight * 0.035
    },
    OperationName: {
        color: Colors.summerDarkOrange,
        fontSize: screenWidth > 400 ? 26 : 16,
        marginTop: 10,
        marginLeft: 40
    },
    modal: {
        width: screenWidth > 400 ? screenWidth * 0.5 : screenWidth * 0.8,
        backgroundColor: Colors.summerWhite,
        alignItems: "center",
        borderRadius: 20,
    },
    modalHeader: {
        color: Colors.reactNativeGrey,
        fontSize: screenWidth > 400 ? 30 : 22,
        marginTop: 15,
        
    },
    participantContainer: {
        flexDirection: "row", 
        marginVertical: 10, 
        width: "85%", 
        backgroundColor: Colors.summerDarkOrange, 
        height:  screenWidth > 400 ? 40 : 32, 
        justifyContent: "center", 
        alignItems: "center",
        borderRadius: screenWidth > 400 ? 20 : 16,
    },
    ModalButton: {
        marginTop: 20,
        width: "80%",
        height: "10%",
        backgroundColor: Colors.summerYellow,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center"
    },
    ModalButtonText: {
        fontSize:  screenWidth > 400 ? 38 : 30,
        color: Colors.summerDarkOrange,
        fontWeight: "bold"
    },
    lottieContainer: {
        position: "absolute",
        right: 0,
        width: screenWidth > 400 ? "40%" : "25%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    }

})

export default OperationCard;