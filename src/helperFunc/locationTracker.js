import { useEffect, useState, useCallback } from "react"
import { View, Text, } from "react-native"
import * as TaskManager from "expo-task-manager"
import * as Location from "expo-location"
import { useDispatch } from "react-redux"
import { setOrgin } from "../redux/Slices"

const LocationTracker = props =>{

    const {locationTracking, setLocationTraking} = useState("Location tracking of")

    const dispatch = useDispatch()

    const LOCATION_TASK_NAME = "LOCATION_TASK_NAME"
    let foregroundSubscription = null

    // Define the background task for location tracking
TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error}) => {
    if (error) {
        console.error(error)
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


    // Define position state: {latitude: number, longitude: number}
    

    // Request permissions right after starting the app
    

    // Start location tracking in foreground
    const startForegroundUpdate = async () => {
        // Check if foreground permission is granted
        const { granted } = await Location.getForegroundPermissionsAsync()
        if (!granted) {
        console.log("location tracking denied")
        return
        }

        // Make sure that foreground location tracking is not running
        foregroundSubscription?.remove()

        // Start watching position in real-time
        foregroundSubscription = await Location.watchPositionAsync(
        {
            // For better logs, we set the accuracy to the most sensitive option
            accuracy: Location.Accuracy.BestForNavigation,
        },
        location => {
            dispatch(setOrgin({
                lat: location.coords.latitude,
                lng: location.coords.longitude
            }))
        }
        )
    }

    // Stop location tracking in foreground
    const stopForegroundUpdate = () => {
        foregroundSubscription?.remove()
        dispatch(setOrgin({
            lat: null,
            lng: null
        }))
    }

    // Start location tracking in background
    const startBackgroundUpdate = async () => {
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
    }

    const stopBackgroundUpdate = async () => {
        const hasStarted = await Location.hasStartedLocationUpdatesAsync(
        LOCATION_TASK_NAME
        )
        if (hasStarted) {
        await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME)
        console.log("Location tacking stopped")
        }
    }

    useEffect(useCallback(() => {
        const requestPermissions = async () => {
            const foreground = await Location.requestForegroundPermissionsAsync()
            if (foreground.granted) await Location.requestBackgroundPermissionsAsync()
          }
          requestPermissions()
          startForegroundUpdate()
          startBackgroundUpdate()
    }), []);


    return (
        <View>
            <Text>{locationTracking}</Text>
        </View>
    )

}

export default LocationTracker