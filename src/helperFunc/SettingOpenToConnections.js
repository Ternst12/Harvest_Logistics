import { updateVehicle } from "../graphql/mutations";
import {API, graphqlOperation } from 'aws-amplify'

export const SettingOpenToConnection = async(userID, boolean) => {
    try {
        const result = await API.graphql(graphqlOperation(updateVehicle, {
            input: {
                userID: userID, 
                openToConnection: boolean
            }
            }))
        console.log("OpenToconnection = ", result)
        } catch (error) {
            console.log("Location Update lykkes ikke ", error)
        }   
}