import { useDispatch } from "react-redux";
import React, {useState, useEffect, useCallback} from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList} from "react-native";
import Colors from "../constants/Colors";
import { screenWidth } from "../constants/Dimensions";
import { setDriverName, setDriverID } from "../redux/Slices";
import {Auth, API, graphqlOperation } from 'aws-amplify'
import {getUser, listUsers} from "../graphql/queries"
import {createUser, createVehicle} from "../graphql/mutations"
import { setDriverEmail } from '../redux/Slices';

const AuthScreen = props => {

    const dispatch = useDispatch()

    const [userName, setUserName] = useState("Testperson" + " nr. " + Math.floor(Math.random() * 101))


    const auth = () => {
        dispatch(setDriverName(userName))
        props.navigation.navigate("Login")
    }



  useEffect(() => {
    const fetchUserInfo = async() => {
      const userInfo = await Auth.currentAuthenticatedUser()
      const userSub = userInfo.attributes.sub
      dispatch(setDriverID(userSub))
      if(userInfo) {
        const userData = await API.graphql(
            graphqlOperation(getUser,  {id: userSub}
          ))
        if(userData.data.getUser) {
          const userEmail = userData.data.getUser.email
          dispatch(setDriverEmail(userEmail))
          console.log("Denne bruger eksisterer allerede i databasen")
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
  
        dispatch(setDriverEmail(newUser.email))
        await API.graphql(graphqlOperation(createUser, {input: newUser}))
        await API.graphql(graphqlOperation(createVehicle, {input: newVehicle}))
        
      }
      
    }
  
    fetchUserInfo()
  }, [])

    return (
        <View style={Styles.container}>
            <View style={Styles.inputBoxContainer}>
                <TextInput
                style={Styles.textInput} 
                value={userName} 
                onChangeText={text => setUserName(text)} 
                clearTextOnFocus={true}
                />
                <View style={{width: screenWidth > 400 ? "25%" : "35%", height: "20%", borderRadius: screenWidth * 0.20, marginTop: screenWidth * 0.1}}>
                    <TouchableOpacity style={Styles.buttonContainer} onPress={auth}>
                        <Text style={Styles.buttonText}>Next</Text>
                    </TouchableOpacity>
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
        width: "70%",
        height: "40%",
        backgroundColor: Colors.summerDarkOrange,
        justifyContent: "center",
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
    textInput: {
        width: "90%",
        height: "25%",
        backgroundColor: Colors.summerWhite,
        paddingLeft: 20,
        fontSize: screenWidth > 400 ? 22 : 18,
        fontWeight: "700",
        color: "grey",
        borderRadius: screenWidth * 0.05
    },
    buttonContainer: {
        backgroundColor: Colors.summerYellow,
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: screenWidth * 0.20,
        borderColor:"grey",
        borderWidth: 0.3
    },
    buttonText: {
        fontSize: screenWidth > 400 ? 34 : 28, 
        fontWeight: "700",
        color: Colors.summerWhite
    }
})

export default AuthScreen;