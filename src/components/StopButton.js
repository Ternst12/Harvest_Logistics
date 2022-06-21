import {View, Text, Image, StyleSheet, TouchableWithoutFeedback} from "react-native"
import { useState } from "react";
import { screenWidth } from "../constants/Dimensions";
import { deleteConnection } from "../graphql/mutations";
import { getConnection, listConnections } from "../graphql/queries";
import {API, graphqlOperation } from 'aws-amplify'


const StopButton = props => {

    const [signOpacity, setSignOpacity] = useState(0.4)

    const deleteCon = async(myConnection) => {
        console.log("part 2 = ", myConnection.data.listConnections.items.length)
        const conArray = myConnection.data.listConnections.items
        const result = await conArray.map(async(con) => {
            try{
               const response = await  API.graphql(graphqlOperation(deleteConnection, 
                        {input: 
                            {
                                id: con.id
                            }
                        }
                    ))
                console.log("Respons from deleting a con = ", response)    
            } catch (error) {
                console.warn("problem with deleting connection = ", error)
            } 
        })
    
        console.log("result = ", result)
    }

    const deleteConnectionWithOtherUser = async(userID) =>{

        let filter = {
            or: [
            {    
                driverOne_UserID: {eq: userID}
            },
            {
                driverTwo_UserID: {eq: userID}
            }
            ]
        }
                    
        try {
            const myConnection = await API.graphql(graphqlOperation(listConnections, {filter: filter}));
            console.log("My Connections = ", myConnection)
                if(myConnection) {
                    deleteCon(myConnection)
                } else {
                    console.log("No connections")
                }
        } 
        catch (error) {
            console.warn("Something went wrong when fetching connections = ", error)
        }
    }

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
                    deleteConnectionWithOtherUser(props.driverID);
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