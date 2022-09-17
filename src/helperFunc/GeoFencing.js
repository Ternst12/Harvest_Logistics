
import * as Location from "expo-location"


export const startGeofencing = async(geofenceCord, geofenceName, geofenceRadius, TaskName) => {
    console.log("Start Geofence = ", geofenceCord.lat)
    console.log("Geofence Name = ", geofenceName)
    console.log("TaskName = ", TaskName)
    let region = [{
        identifier: geofenceName,
        latitude: geofenceCord.lat,
        longitude: geofenceCord.lng, 
        radius: geofenceRadius, 
        notifyOnEnter: true,
        notifyOnExit: true
    }]

    try {
        await Location.startGeofencingAsync(TaskName, region)
        
    } catch (e) {
        console.log("Something went wrong when trying to start geofence = ", e)
    }
}

export const geofenceCheck = async(setGeofenceCheckColor, TaskName) => {
    try{
        const result = await Location.hasStartedGeofencingAsync(TaskName)
        
        setGeofenceCheckColor(result)
    } catch(e) {
        console.log("problemer med geofence check = ", e)
    }
}

export const stopGeofencing = async(TaskName) => {
    try{
        console.log("Stopping geofence")
        const result = await Location.stopGeofencingAsync(TaskName)
        return result
    } catch (e) {
        console.log("Something went wrong when trying to stop geofence = ", e)
    }
}