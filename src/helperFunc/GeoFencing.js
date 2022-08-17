
import * as Location from "expo-location"


export const startGeofencing = async(geofenceCord, geofenceName, geofenceRadius) => {
    console.log("Start Geofence = ", geofenceCord.lat)
    let region = [{
        identifier: geofenceName,
        latitude: geofenceCord.lat,
        longitude: geofenceCord.lng, 
        radius: geofenceRadius, 
        notifyOnEnter: true,
        notifyOnExit: true
    }]

    try {
    await Location.startGeofencingAsync("GEOFENCE_TASK", region)
    } catch (e) {
        console.log("Something went wrong when trying to start geofence = ", e)
    }
}

export const geofenceCheck = async(setGeofenceCheckColor) => {
    try{
        const result = await Location.hasStartedGeofencingAsync("GEOFENCE_TASK")
        
        setGeofenceCheckColor(result)
    } catch(e) {
        console.log("problemer med geofence check = ", e)
    }
}

export const stopGeofencing = async() => {
    try{
    console.log("Stopping geofence")
    await Location.stopGeofencingAsync("GEOFENCE_TASK")
    } catch (e) {
        console.log("Something went wrong when trying to stop geofence = ", e)
    }
}