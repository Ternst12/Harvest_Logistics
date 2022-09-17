
import { View, Text, Platform} from "react-native"
import * as TaskManager from "expo-task-manager"
import * as Location from "expo-location"

import { setOrgin, setRecord } from "../redux/Slices"
import { updateVehicle } from "../graphql/mutations";
import {API, graphqlOperation } from 'aws-amplify'


const LOCATION_TASK_NAME = "LOCATION_TASK_NAME"
let foregroundSubscription = null
var RecordsArray = []

const updateLocationDB = async(location, driverID) =>
        {
        
        try {
            const result = await API.graphql(graphqlOperation(updateVehicle, {
                input: {
                    userID: driverID, 
                    latitude: location.coords.latitude, 
                    longitude: location.coords.longitude
                }
                }))
            if(result.data.updateVehicle) {
                
            }
            } catch (error) {
                console.log("Location Update lykkes ikke ", error)
            }
        }

export  const requestPermissions = async (dispatch, driverID) => {
    const foreground = await Location.requestForegroundPermissionsAsync()
    if (foreground.granted) {
        console.log("foreground permission granted")
        startForegroundUpdate(dispatch, driverID)
    } else {
        console.log("Permission not granted = ", foreground)
    }
  }
   
export const startForegroundUpdate = async (dispatch, driverID) => {

        const driverID1 = driverID
        console.log("driverID = ", driverID)

        try {
            if(Platform.OS == "ios") {
                const test = await Location.getBackgroundPermissionsAsync()
            }
            
            const background = await Location.requestBackgroundPermissionsAsync()
            console.log("background = ", background)
                if(background.granted) {
                    console.log("background permission granted")
                    startBackgroundUpdate() 
                } else {
                    console.log("background permission not granted")
                    return;
                }
            } catch (e) {
                console.log("Problem with background function = ", e)
            }
        

        // Make sure that foreground location tracking is not running
        foregroundSubscription?.remove()

        // Start watching position in real-time
        foregroundSubscription = await Location.watchPositionAsync(
        {
            // For better logs, we set the accuracy to the most sensitive option
            accuracy: Location.Accuracy.BestForNavigation,
            distanceInterval: 5,
        },
        location => {

            var locationData = new Object()
            locationData.time = new Date().toLocaleTimeString(),
            locationData.timeInSec = parseInt(Date.now()/1000)
            locationData.latitude = location.coords.latitude,
            locationData.longitude = location.coords.longitude
            locationData.speed = location.coords.speed
            RecordsArray.push(locationData)
            const recordsJSON = JSON.stringify(RecordsArray)
            
            dispatch(setRecord(recordsJSON))

            dispatch(setOrgin({
                lat: location.coords.latitude,
                lng: location.coords.longitude,
            }))
            

            updateLocationDB(location, driverID1)
           
            }          
        )     
    }

export const stopForegroundUpdate = async(dispatch) => {
    foregroundSubscription.remove()
}

export const startBackgroundUpdate = async () => {

    TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error}) => {
        if (error) {
            console.error("Taskmanager Location_TASK_NAME = ", error)
            return
        }
        if (data) {
            // Extract location coordinates from data
            const { locations } = data
            const location = locations[0]
            if (location) {
            
            }
        }
        })


    // Don't track position if permission is not granted
    const { granted } = await Location.getBackgroundPermissionsAsync()
    if (!granted) {
    console.log("location tracking denied")
    return
    }

    // Make sure the task is defined otherwise do not start tracking
    const isTaskDefined = await TaskManager.isTaskDefined(LOCATION_TASK_NAME)
    if (!isTaskDefined) {
    console.log("Task is not defined")
    return
    }

    // Don't track if it is already running in background
    const hasStarted = await Location.hasStartedLocationUpdatesAsync(
    LOCATION_TASK_NAME
    )
    if (hasStarted) {
    console.log("Already started")
    return
    }
    
    try {

        await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        // For better logs, we set the accuracy to the most sensitive option
        accuracy: Location.Accuracy.BestForNavigation,
        // Make sure to enable this notification if you want to consistently track in the background
        showsBackgroundLocationIndicator: true,
        foregroundService: {
            notificationTitle: "Location",
            notificationBody: "Location tracking in background",
            notificationColor: "#fff",
        },
        })
    } catch (e) {
        console.warn("Problems with startLocationUpdatesAsync", e)
    }
}

export const stopBackgroundUpdate = async () => {
    const hasStarted = await Location.hasStartedLocationUpdatesAsync(
    LOCATION_TASK_NAME
    )
    if (hasStarted) {
    await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME)
    console.log("Location tracking stopped")
    }
}

