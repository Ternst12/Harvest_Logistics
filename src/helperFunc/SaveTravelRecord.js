import { createRecords } from "../graphql/mutations";
import * as Location from "expo-location"


export const SaveTravelRecord = async(record, driverID, operationId) => {
    const jsonString = JSON.stringify(Object.assign({}, record))
    console.log("Record Stringify = ", jsonString)
}



