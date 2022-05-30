import { useDispatch } from "react-redux";
import React, {useState, useEffect, useCallback} from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList} from "react-native";
import Colors from "../constants/Colors";
import { screenWidth } from "../constants/Dimensions";
import { setDriverName } from "../redux/Slices";
import { Amplify, Auth, API, graphqlOperation, input } from 'aws-amplify'
// import {getUser, listUsers} from "../graphql/queries"
// import {createUser} from "../graphql/mutations"
import { setDriverEmail } from '../redux/Slices';

const AuthScreen = props => {

    const dispatch = useDispatch()

    const [userName, setUserName] = useState("Testperson" + " nr. " + Math.floor(Math.random() * 101))
    const [users, setUsers] = useState([])


    const auth = () => {
        dispatch(setDriverName(userName))
        props.navigation.navigate("Login")
    }
    /*

  const fetchUserInfo = async() => {
    const userInfo = await Auth.currentAuthenticatedUser()
    const userSub = userInfo.attributes.sub
    if(userInfo) {
      const userData = await API.graphql(
          graphqlOperation(getUser,  {id: userSub}
        ))
      if(userData.data.getUser) {
        dispatch(setDriverEmail(userData.data.getUser.email))
        return;
      }
      const newUser = {
        id: userSub,
        name: userInfo.username,
        email: userInfo.attributes.email,
      }
      console.log(newUser)
      const result = await API.graphql(graphqlOperation(createUser, {input: newUser}
      ))
    }
    
  }
  const fetchUsers = async () => {
      try {
        const usersData = await API.graphql(
            graphqlOperation(
                 listUsers
                ))
        console.log("usersData = ", usersData)
        setUsers(usersData.data.listUsers.items)
      } catch (e) {
        console.log("Problemer med at hente liste over brugere = ", e)
      }
  }

  useEffect(() => {
    fetchUserInfo()
    fetchUsers()
  }, [])
  */
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