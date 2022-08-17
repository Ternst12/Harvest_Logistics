import React, {useEffect, useState} from "react";
import { useDispatch, useSelector} from "react-redux";
import {View, StyleSheet, Text, FlatList} from "react-native"
import { selectDriverID, setDriverInformation} from "../redux/Slices";
import LocationTracker from "../helperFunc/locationTracker";
import { screenHeight, screenWidth } from "../constants/Dimensions";
import { updateVehicle } from "../graphql/mutations";
import {listUsers} from "../graphql/queries"
import {API, graphqlOperation } from 'aws-amplify'
import UserProfileCard from "../components/UserProfileCard";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "../constants/Colors";

const LoginScreen = props => {

    const dispatch = useDispatch();
    const driverID = useSelector(selectDriverID)

    const [listOfUsers, setListOfUsers] = useState()
    const [selectedUsers, setSelectedUsers] = useState([])
    const [numberOfUsers, setNumberOfUsers] = useState(8)
    const [randomUserArray, setRandomUserArray] = useState([])

    const url = "https://randomuser.me/api/"

    const AddOrRemoveUser = (userId) => {
        if(selectedUsers.includes(userId)){
            var filteredUsers = selectedUsers.filter((item) => item != userId)
            setSelectedUsers(filteredUsers)
        } else {
            setSelectedUsers([...selectedUsers, userId])
        }
    }

    const FetchImages = (url, numberOfUsers) => {
        fetch(url + `?results=${numberOfUsers}`)
        .then((rep) => {return rep.json();})
        .then((data => {setRandomUserArray(data.results)}))
    }

    const fetchUsers = async () => {
        try {
            console.log("mit id = ", driverID)
            const response = await API.graphql(
                graphqlOperation(listUsers)
                )
            var allUsers = response.data.listUsers.items
            const filteredUsers = allUsers.filter((item) => item.id != driverID)
            console.log("List of users = ", filteredUsers)
            setListOfUsers(filteredUsers)
            FetchImages(url, filteredUsers.length) 
        } catch(error) {
            console.log("problemer med at fetche = ", error)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.userListContainer}>
                <View style={styles.userListHeader}>
                    <Text style={styles.userListHeaderText}>Choose your operation participants from the list below</Text>
                </View>
                <View style={styles.userList}>
                    <FlatList 
                    keyExtractor={((item => item.id))}
                    data={listOfUsers}
                    renderItem={({item, index}) => (
                        <View style={{height: screenHeight * 0.125, width: "100%", justifyContent: "center"}}>
                            <UserProfileCard 
                            AddOrRemoveUser={AddOrRemoveUser}
                            index={index}
                            randomUserArray={randomUserArray}
                            userId={item.id}
                            userName={item.userName} />
                        </View>
                    )}
                    />
                </View>
                <TouchableOpacity style={{width: screenWidth * 0.85, marginTop: 20}}>
                    <View style={{flexDirection:"row", justifyContent: "space-between"}}>
                        <Text style={styles.infoText}>Number of listed users: {randomUserArray.length}</Text>
                        <Text style={styles.infoText}>Number of selected participants: {selectedUsers.length}</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <TouchableOpacity 
            style={styles.continueButton} 
            onPress={() => props.navigation.navigate('CreateOperation2', {
                selectedUsers: selectedUsers
                })}>
                <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex: 1, 
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.summerWhite
    },
    userListContainer: {
        width: "95%",
        height: "80%",
        borderColor: "grey",
        borderWidth: 1,
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 30
    },
    userListHeader: {
        height: "12.5%",
        width: "90%",
        justifyContent: "center",
        alignItems: "center"
    },
    userListHeaderText: {
        fontSize: screenWidth > 400 ? 30 : 22,
        fontWeight: "600",
        marginLeft: 10,
        color: Colors.reactNativeGrey
    },
    userList: {
        height: "80%",
        width: "90%"
    },
    infoText: {
        fontSize: screenWidth > 400 ? 30 : 22,
        color: Colors.reactNativeGrey
    },
    continueButton: {
        width: screenWidth > 400 ? screenWidth * 0.4 : screenWidth * 0.5,
        height: screenHeight * 0.1,
        backgroundColor: Colors.summerDarkOrange,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: screenHeight * 0.05,
        marginTop: 20
    },
    continueButtonText: {
        fontSize: screenWidth > 400 ? 30 : 22,
        color: Colors.summerWhite,
        fontWeight: "600"
    },
})

export default LoginScreen;