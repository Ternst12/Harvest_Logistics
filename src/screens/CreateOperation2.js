import { useState, useEffect, useLayoutEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import {View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, ActivityIndicator, Alert} from "react-native"
import Colors from "../constants/Colors";
import { screenHeight, screenWidth } from "../constants/Dimensions";
import {API, graphqlOperation } from 'aws-amplify'
import {getUser} from "../graphql/queries"
import { selectDriverID } from "../redux/Slices";
import JobDistributionCard from "../components/JobDistributionCard";
import { Ionicons } from '@expo/vector-icons';
import { createOperation, updateUser } from "../graphql/mutations";


const CreateOperation2 = props => {

    const { selectedUsers } = props.route.params;

    const driverID = useSelector(selectDriverID)    

    const [operationName, setOperationName] = useState("")
    const [userProfile, setUserProfile] = useState()
    const [selectedUserArray, setSelectedUserArray] = useState([])
    const [operationArray, setOperationArray] = useState([])
    const [setAllListedUsersToTractor, setSetAllListedUsersToTractor] = useState(false)
    const [setUserToCombine, setSetUserToCombine] = useState(false)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [refresh, setRefresh] = useState(false)


    const getDriverProfil = async (driverID) => {
        try {
            const userData = await API.graphql(
                graphqlOperation(getUser,  {id: driverID}
              ))
            setUserProfile(userData.data.getUser)
            } catch (e){
              console.log("problemer med getuser funktionen", e)
            }
    }

    const SaveOperation = async(operationArray, operationName, driverID) => {
        setSaving(true)
        const jsonString = JSON.stringify(Object.assign({}, operationArray))

        const newOperation = {
            CreatorId: driverID,
            OperationName: operationName,
            Participants: jsonString,
        }
        try {
       const result = await API.graphql(graphqlOperation(createOperation, {input: newOperation}))
       console.log(result)
            if(result.data.createOperation){
                try {
                    const userData = await API.graphql(
                        graphqlOperation(getUser,  {id: driverID}
                      ))
                    
                    const json = userData.data.getUser.operation_created
                    if(json != null) {
                        var newObject = JSON.parse(json)
                        var newArray = Object.values(newObject)   
                        newArray.push(result.data.createOperation.id)
                        const newJsonString = JSON.stringify(Object.assign({}, newArray))
                        const resultUserUpdate = await API.graphql(graphqlOperation(updateUser, {
                            input: {
                                id: driverID, 
                                operation_created: newJsonString     
                            }
                            }))
                        if(resultUserUpdate.data.updateUser) {
                            setSaving(false)
                            props.navigation.navigate("Auth")
                        }
                    } else {
                        const newOperationArray = [result.data.createOperation.id]
                        const jsonString = JSON.stringify(Object.assign({}, newOperationArray))
                        const resultUserUpdate = await API.graphql(graphqlOperation(updateUser, {
                            input: {
                                id: driverID, 
                                operation_created: jsonString     
                            }
                            }))
                        if(resultUserUpdate.data.updateUser) {
                            setSaving(false)
                            props.navigation.navigate("Auth")
                        }
                    }
                    
                    operationArray.map(async(user) => {
                        console.log("user.id = ", user.id)
                        try {
                        const selectedUser = await API.graphql(
                            graphqlOperation(getUser,  {id: user.id}
                          ))
                        
                        const selectedUserJson = selectedUser.data.getUser.operation_invited

                        if(selectedUserJson != null) {
                            console.log("selectedUser.data.getUser.operation_invited = ", selectedUserJson)
                            var newObjectSelectedUser = JSON.parse(selectedUserJson)
                            var newArraySelectedUser = Object.values(newObjectSelectedUser)   
                            newArraySelectedUser.push(result.data.createOperation.id)
                            const newJsonStringSelectedUser = JSON.stringify(Object.assign({}, newArraySelectedUser))
                            const resultSelectedUserUpdate = await API.graphql(graphqlOperation(updateUser, {
                                input: {
                                    id: user.id, 
                                    operation_invited: newJsonStringSelectedUser    
                                }
                            }))
                            console.log("Result from saving another operation_invite update = ", resultSelectedUserUpdate)
                        } else {
                            const newOperationInviteArray = [result.data.createOperation.id]
                            const jsonInviteString = JSON.stringify(Object.assign({}, newOperationInviteArray ))
                            const resultSelectedUserUpdate = await API.graphql(graphqlOperation(updateUser, {
                                input: {
                                    id: user.id, 
                                    operation_invited: jsonInviteString     
                                }
                                }))
                            console.log("Result from saving first operation_invite update = ", resultSelectedUserUpdate)
                        }

                        } catch (e) {
                            console.log(e)
                            Alert.alert("something went wrong when getting user info",
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

                } catch (e){
                    console.log(e)
                    Alert.alert("something went wrong when getting user info",
                    " ! " + e + " ! ",
                    [
                        {
                            text: "Ok",
                            style: "cancel"
                        }, 
                    ]
                    )
                }
            }

        } 
        catch (e) {
            console.log(e)
            Alert.alert("something went wrong when saving operation",
            " ! " + e + " ! ",
            [
                {
                    text: "Ok",
                    style: "cancel"
                  }, 
            ]
        )
        }
    }

    const [placeholder, setPlaceholder] = useState("Operation title")

    const getSelectedUsers = async(selectedUsers) => {
    
    var testArray = []
    console.log("selectedUsers = ", selectedUsers)

    const result = await selectedUsers.map(async(userID) => {
        try {
            const userData = await API.graphql(
                graphqlOperation(getUser,  {id: userID}
              ))
             testArray.push(userData.data.getUser)
             setSelectedUserArray(testArray)
            } catch (e){
              console.log("problemer med at hente valgte brugere", e)
            }
    })
    }

    useEffect(() => {
        getDriverProfil(driverID)
        var object = {
            id: 1234,
            vehicle: "køretøj", 
            name: "test person"
        }
        var newLength = selectedUsers.length + 1
        var arr = Array(newLength).fill(object)
        setOperationArray(arr)
        if(selectedUsers.length > 0){
        console.log("henter ny bruger liste")
        getSelectedUsers(selectedUsers)
        }
        console.log("new Length = ", newLength)
        setTimeout(() => {
            setLoading(false)
        }, 500)
    }, [selectedUsers])

    useLayoutEffect(() => {
        props.navigation.setOptions({
            headerRight: () => 
            saving ?
                <ActivityIndicator style={{marginRight: 20}} size={"small"} color={Colors.summerDarkOrange}/> :
                <TouchableOpacity onPress={() => {SaveOperation(operationArray, operationName, driverID)}}>
                    <Ionicons style={{marginRight: 20}} name="ios-save" size={screenWidth > 400 ? 48 : 42} color={Colors.summerDarkOrange} />
                </TouchableOpacity>  
                    
        })
    })

    return (
        <View style={styles.container}>
            <View style={styles.textInput}>
                <TextInput 
                style={{width: "100%", height: "100%", fontSize: screenWidth > 400 ? 40 : 32, paddingLeft: screenWidth > 400 ? 50 : 30}}
                placeholder={placeholder}
                value={operationName}
                onPressIn={() => setPlaceholder("")}
                onBlur={() => setPlaceholder("Operation title")}
                onChangeText={(text) => setOperationName(text)}
                />
            </View>
            <TouchableOpacity style={styles.headerContainer} onPress={() =>{console.log("operationArray = ", operationArray) }}>
                <Text style={styles.headerText}>Distribute tasks</Text>
            </TouchableOpacity>
            <View style={styles.driverProfile}>
               {loading ? <ActivityIndicator size={"small"} color={"blue"} /> : <JobDistributionCard 
                    userName={userProfile ? userProfile.userName : ""}
                    combineSelected={setUserToCombine}
                    tractorSelected={false}
                    operationArray={operationArray}
                    setRefresh={setRefresh}
                    id={driverID}
                    index={0}
                    setOperationArray={setOperationArray}
                />}
            </View>
            <View style={styles.userList}>
                {loading ? <ActivityIndicator size={"small"} color={"blue"} /> : <FlatList 
                    refreshing={refresh}
                    keyExtractor={((item => item.id))}
                    data={selectedUserArray}
                    renderItem={({item, index}) => (
                        <View style={{height: screenHeight * 0.125, width: "100%", justifyContent: "center"}}>
                            <JobDistributionCard
                            combineSelected={false}
                            tractorSelected={setAllListedUsersToTractor}
                            operationArray={operationArray}
                            id={item.id}
                            index={index + 1}
                            setOperationArray={setOperationArray}
                            userName={item.userName} 
                            setRefresh={setRefresh}
                            />
                        </View>
                    )}
                    /> }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: Colors.summerWhite
    },
    textInput: {
        marginTop: screenHeight * 0.05,
        width: screenWidth * 0.75,
        height: screenHeight * 0.1,
        backgroundColor: "white",
        borderRadius: screenHeight * 0.05
    },
    headerContainer: {
        marginTop: screenHeight * 0.025,
        borderBottomColor: Colors.reactNativeGrey,
        borderBottomWidth: 1,
        width: "90%",
        height: screenHeight * 0.05,
        justifyContent: "center",
        alignItems: "center"
    },
    headerText: {
        fontSize: screenWidth > 400 ? 40 : 32,
        fontWeight: "bold",
        color: Colors.reactNativeGrey
    },
    driverProfile: {
        width: "90%",
        height: screenHeight * 0.15,
        borderColor: Colors.reactNativeGrey,
        borderBottomWidth: 1,
        justifyContent: "center"
    },
    userList: {
        height: screenHeight * 0.5,
        width: "90%",
    },
    saveButtonContainer: {
        width: screenWidth * 0.4,
        height: screenHeight * 0.1,
        backgroundColor: Colors.summerDarkOrange,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: screenHeight * 0.05,
        marginTop: -400
    },
    saveButtonText: {
        color: Colors.summerWhite,
        fontSize: screenWidth > 400 ? 40 : 32,
        fontWeight: "bold"
    }
})

export default CreateOperation2;