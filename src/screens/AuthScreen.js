import { useDispatch, useSelector } from "react-redux";
import React, {useState, useEffect, useRef} from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, AppState, Alert} from "react-native";
import Colors from "../constants/Colors";
import { screenWidth, screenHeight } from "../constants/Dimensions";
import { setDriverName, setDriverID, setNetInfo, setTravellingToCombine, selectDriverID, setEntryGeofence, setExitGeofence, selectByFarm, selectByCombine } from "../redux/Slices";
import {Auth, API, graphqlOperation } from 'aws-amplify'
import {getOperation, getUser} from "../graphql/queries"
import {createUser, createVehicle, updateVehicle} from "../graphql/mutations"
import { setDriverEmail } from '../redux/Slices';
import * as TaskManager from "expo-task-manager"
import { LocationGeofencingEventType } from "expo-location";
import {setTimerInterval} from "../redux/Slices"
import OperationCard from "../components/OperationCard";
import { useIsFocused } from "@react-navigation/native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { signOut} from "../Navigation/CostumDrawer";
import NetInfo from '@react-native-community/netinfo';
import { selectGeofenceCord, selectGeofenceName, selectGeofenceRadius, selectCombineLocation, setByCombine, setByFarm } from "../redux/Slices";
import { stopGeofencing, startGeofencing } from "../helperFunc/GeoFencing";


const AuthScreen = props => {

    const dispatch = useDispatch()
    const [user, setUser] = useState(null)
    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(appState.current);
    const [createdOperationsArray, setCreatedOperationsArray] = useState([])
    const [invitedOperationsArray, setInvitedOperationsArray] = useState([])
    const [locationTrackerOn, setLocationTrackerOn] = useState(false)
    const [readyToChangeDirection, setReadyToChangeDirection] = useState(false)
    const [entryArray, setEntryArray] = useState([])
    const [firstEntry, setFirstEntry] = useState(null)
    const [exitArray, setExitArray] = useState([])
    const [firstExit, setFirstExit] = useState(null)
    const [combine, setCombine] = useState(false)
    const [farm, setFarm] = useState(false)
   

    const geofenceCord = useSelector(selectGeofenceCord)
    const geofenceName = useSelector(selectGeofenceName)
    const geofenceRadius = useSelector(selectGeofenceRadius)
    const combineLocation = useSelector(selectCombineLocation)
    const driverID = useSelector(selectDriverID)
    const byFarm = useSelector(selectByFarm)
    const byCombine = useSelector(selectByCombine)
   

    const isFocused = useIsFocused()

    useEffect(() => {   
          dispatch(setEntryGeofence(entryArray))
    }, [entryArray] )

    useEffect(() => {
          dispatch(setExitGeofence(exitArray))
    }, [exitArray] )

    TaskManager.defineTask(
      "GEOFENCE_TASK_HeadingToFarm", 
      async({ data: { eventType, region }, error }) => {
        if (error) {
          console.log(error.message)
          return;
        } else if (eventType === LocationGeofencingEventType.Enter) {
            setReadyToChangeDirection(true)
            var sec = parseInt(Date.now()/1000)
            var time = new Date().toLocaleTimeString()
            var obj = {
              sec: sec,
              time: time,
              byFarm: true,
              byCombine: false
            }
            setEntryArray(oldArray => [...oldArray, obj])
            console.log("du er i regionen")
        }  else if (eventType === LocationGeofencingEventType.Exit) {
            if(readyToChangeDirection)
            {
              var sec = parseInt(Date.now()/1000)
              var time = new Date().toLocaleTimeString()
              var obj = {
                sec: sec,
                time: time
              }
              setExitArray(oldArray => [...oldArray, obj])
              dispatch(setTravellingToCombine(true))
              await stopGeofencing( "GEOFENCE_TASK_HeadingToFarm")
              await  startGeofencing(combineLocation, "Combine", 50, "GEOFENCE_TASK_HeadingToCombine")
              try {
                    await API.graphql(graphqlOperation(updateVehicle, {
                        input: {
                            userID: driverID, 
                            HeadingToCombine: true, 
                        }
                        }))     
                    } catch (error) {
                        console.log("Direction Update lykkes ikke ", error)
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
              setReadyToChangeDirection(false)
              dispatch(setByFarm(false))
              console.log("Du er igen udenfor regionen og har ændret retning mod combine")
            }
            console.log("Du er udenfor regionen")
        }
        else {
            console.log("det virker måske ? ", region)
        }
      }
    );

    TaskManager.defineTask(
      "GEOFENCE_TASK_HeadingToCombine",
      async ({ data: { eventType, region }, error }) => {
        console.log("hej")
        if (error) {
          console.log(error.message)
          return;
        } else if (eventType === LocationGeofencingEventType.Enter) {
            setReadyToChangeDirection(true)
            var sec = parseInt(Date.now()/1000)
            var time = new Date().toLocaleTimeString()
            var obj = {
              sec: sec,
              time: time,
              byFarm: false,
              byCombine: true
            }
            setEntryArray(oldArray => [...oldArray, obj])
            console.log("du er i regionen")
        }  else if (eventType === LocationGeofencingEventType.Exit) {
          if(readyToChangeDirection)
          {
            var sec = parseInt(Date.now()/1000)
            var time = new Date().toLocaleTimeString()
            var obj = {
              sec: sec,
              time: time
            }
            setExitArray(oldArray => [...oldArray, obj])
            await stopGeofencing("GEOFENCE_TASK_HeadingToCombine")
            await startGeofencing(geofenceCord, geofenceName, geofenceRadius, "GEOFENCE_TASK_HeadingToFarm")
            dispatch(setTravellingToCombine(false))
            try {
              await API.graphql(graphqlOperation(updateVehicle, {
                  input: {
                      userID: driverID, 
                      HeadingToCombine: false, 
                  }
                  }))     
              } catch (error) {
                  console.log("Direction Update lykkes ikke ", error)
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
            setReadyToChangeDirection(false)
            dispatch(setByCombine(false))
            console.log("Du er igen udenfor regionen og har ændret retning mod farmen")
          }
            console.log("Du er udenfor regionen")
        }
        else {
          console.log("det virker måske ? ", region)
        }
      }
    );
    /*
    useEffect(() => {
      const subscription = AppState.addEventListener("change", nextAppState => {
        if (
          appState.current.match(/inactive|background/) &&
          nextAppState === "active"
        ) {
          console.log("App has come to the foreground!");
        }

        if (
          nextAppState == "background"
        ) {
          console.log("Appen er muligvis lukket");
        }

        appState.current = nextAppState;
        setAppStateVisible(appState.current);
        console.log("AppState", appState.current);
      });

      return () => {
        console.log("sub remove")
        subscription.remove();
      };
    }, []);
    */
    const fetchUserInfo = async() => {

      const userInfo = await Auth.currentAuthenticatedUser()
      const userSub = userInfo.attributes.sub
      dispatch(setDriverID(userSub))
      if(userInfo) {
        var userData
        try {
        userData = await API.graphql(
            graphqlOperation(getUser,  {id: userSub}
          ))
        } catch (e){
          console.log("problemer med getuser funktionen", e)
        }
        if(userData.data.getUser) {
          const userEmail = userData.data.getUser.email
          const userName = userData.data.getUser.userName
          dispatch(setDriverName(userName))
          dispatch(setDriverEmail(userEmail))
          console.log("Denne bruger eksisterer allerede i databasen")
          if(userData.data.getUser.operation_created != null) {
          var newObject_created = JSON.parse(userData.data.getUser.operation_created)
          var newArray_created = Object.values(newObject_created) 
          var PlaceholderArray_created = []
          newArray_created.map(async(op) => {
            try {
              const created_op = await API.graphql(graphqlOperation(getOperation,  {id: op}))
              if(created_op.data.getOperation != null){
                PlaceholderArray_created.push(created_op.data.getOperation)
              }
              setCreatedOperationsArray(PlaceholderArray_created)
            } catch(e) {
              console.log(e)
              Alert.alert("something went wrong when getting created operationslist",
                    " ! " + e + " ! ",
                    [
                        {
                            text: "Ok",
                            style: "cancel"
                        }, 
                    ]
                    )
            }
          })
          }
          if(userData.data.getUser.operation_invited != null) {
            var newObject_invited = JSON.parse(userData.data.getUser.operation_invited)
            var newArray_invited = Object.values(newObject_invited) 
            var PlaceholderArray_invited = []
            newArray_invited.map(async(op) => {
              try {
                const invited_op = await API.graphql(graphqlOperation(getOperation,  {id: op}))
                if(invited_op.data.getOperation != null){
                  PlaceholderArray_invited.push(invited_op.data.getOperation)
                }
                setInvitedOperationsArray(PlaceholderArray_invited)
              } catch(e) {
                console.log(e)
                Alert.alert("something went wrong when getting created operationslist",
                      " ! " + e + " ! ",
                      [
                          {
                              text: "Ok",
                              style: "cancel"
                          }, 
                      ]
                      )
              }
            })
            }
          
          const newUser = {
            id: userSub,
            userName: userInfo.username,
            email: userInfo.attributes.email,
            phone: userInfo.attributes.phone_number
          }

          setUser(newUser)    
          
          return;
        }
        const newUser = {
          id: userSub,
          userName: userInfo.username,
          email: userInfo.attributes.email,
          phone: userInfo.attributes.phone_number
        }
        const newVehicle = {
          userID: userSub,
          type: "", 
          latitude: 56.75217,
          longitude: 10.327043,
          userMail: userInfo.attributes.email
        }
  
        setUser(newUser)  
        dispatch(setDriverEmail(newUser.email))
        await API.graphql(graphqlOperation(createUser, {input: newUser}))
        await API.graphql(graphqlOperation(createVehicle, {input: newVehicle}))
        
      }
      
    }

    useEffect(() => {
      NetInfo.addEventListener((state) => {
          const NetInfo = {
            type: state.type,
            isInternetReachable: state.isInternetReachable,
            expensive: state.details.isConnectionExpensive ? "Yes": "No",
            strength: state.details.strength ? state.details.strength : "Not available",
            frequency: state.details.frequency ? state.details.frequency : "Not available",
          }
          dispatch(setNetInfo(NetInfo))
      });
    }, [])

    useEffect(() => {
       
        if(isFocused){
        fetchUserInfo()
        }
      }, [isFocused])

    return (
        <View style={Styles.container}>
            <View style={{flexDirection: screenWidth > 400 ? "column" : "row", position: "absolute", top: screenWidth > 400 ? 100 : 50, left: 50, width: screenWidth > 400 ? "15%" : "35%", justifyContent: "space-between", height: screenWidth > 400 ? "15%" : "10%"}}>
              <AntDesign onPress={() => signOut()} name="logout" size={screenWidth > 400 ? 52 : 42} color={Colors.summerWhite} style={{}}/>
              <FontAwesome5 onPress={() => props.navigation.navigate("Records")} name="map-marked-alt" size={screenWidth > 400 ? 52 : 42} color={Colors.summerWhite} style={{}}/>
            </View>
            <View style={Styles.inputBoxContainer}>
                <View style={Styles.headerTextBox}>
                  <TouchableOpacity onPress={() => {}}>
                  <Text style={Styles.headerText}>{user ? "Hello " + user.userName : "Something went wrong"}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={Styles.iconContainer} onPress={() => {props.navigation.navigate("CreateOperation1")}}>
                    <MaterialCommunityIcons name="truck-plus" size={48} color={Colors.summerDarkOrange} />
                  </TouchableOpacity>
                </View>
                <View style={Styles.operationContainer}>
                  <View style={Styles.operationHeader}>
                    <Text style={Styles.operationHeaderText}>Operations you have created :</Text>
                  </View>
                  
                    <FlatList 
                      data={createdOperationsArray}
                      keyExtractor={(item) => item.id}
                      renderItem={({item, index}) => (
                        <TouchableOpacity onPress={() => console.log(item.id)}>
                        <OperationCard 
                          navigation={props.navigation}
                          OperationName={item.OperationName}
                          Participants={item.Participants}
                          operationId={item.id}
                          setLocationTrackerOn={setLocationTrackerOn}
                        />
                        </TouchableOpacity>
                    )}
                    /> 
                  
                </View>
                <View style={Styles.operationContainer}>
                  <View style={Styles.operationHeader}>
                    <Text style={Styles.operationHeaderText}>Operations you have been invited to :</Text>
                  </View>
                  
                    <FlatList 
                      data={invitedOperationsArray}
                      keyExtractor={(item) => item.id}
                      renderItem={({item, index}) => (
                        <TouchableOpacity onPress={() => console.log(item)}>
                        <OperationCard 
                          setLocationTrackerOn={setLocationTrackerOn}
                          navigation={props.navigation}
                          operationId={item.id}
                          OperationName={item.OperationName}
                          Participants={item.Participants}
                        />
                        </TouchableOpacity>
                    )}
                    /> 
                  
                </View>
            </View>
        </View>
    )
}

const Styles = StyleSheet.create ({
    container : {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.summerYellow
    },
    inputBoxContainer: {
        marginTop: screenWidth > 400 ? 0 : 45,
        width: screenWidth > 400 ? "70%" : "80%",
        height: screenWidth > 400 ? "90%" : "80%",
        backgroundColor: Colors.summerDarkOrange,
        alignItems: "center",
        borderRadius: screenWidth * 0.10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.50,
        shadowRadius: 12.35,
        elevation: 19,
    },
    headerTextBox: {
      width: "90%",
      height: "10%",
      marginTop: "5%",
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between"
    },
    headerText: {
      fontSize: screenWidth > 400 ? 38 : 22,
      color: Colors.summerWhite,
      fontWeight: "600"
    },
    operationContainer: {
      height: "40%",
      width: "90%",
      backgroundColor: Colors.summerYellow,
      borderRadius: 20,
      marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.50,
        shadowRadius: 12.35,
        elevation: 19,
    },
    operationHeader: {
      height: "12.5%",
      width: "100%",
      justifyContent: "center"
    },
    operationHeaderText: {
      fontSize: screenWidth > 400 ? 30 : 14,
      fontWeight: "600",
      marginLeft: 10
    },
    buttonContainer: {
        backgroundColor: Colors.summerYellow,
        width: "60%",
        marginTop: "15%",
        height: "10%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: screenWidth * 0.20,
        borderColor:"grey",
        borderWidth: 0.3
    },
    buttonText: {
        fontSize: screenWidth > 400 ? 30 : 22, 
        fontWeight: "500",
        color: Colors.summerWhite
    },
    iconContainer: {
      height: screenWidth > 400 ? screenWidth * 0.08 : screenWidth * 0.135, 
      width: screenWidth > 400 ? screenWidth * 0.08 : screenWidth * 0.135, 
      backgroundColor: Colors.summerWhite, 
      borderRadius: screenHeight * 0.035, 
      justifyContent: "center", 
      alignItems: "center"
    }
})

export default AuthScreen;