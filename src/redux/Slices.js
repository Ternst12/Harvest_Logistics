import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    operationId: null,
    origin: null,
    destination: null,
    travelTimeInformation: null, 
    driverInformation: "",
    driverName: "",
    driverEmail: "",
    driverID: "",
    geofenceActive: false,
    entryGeofence: [],
    fillingTime: [],
    geofenceCord: {
        lat: 56.47776533064656,
        lng: 10.075310435251021
    },
    geofenceName: "Home",
    geofenceRadius: 100,
    participants: [],
    distanceArray: [],
    combineId: null,
    netInfo: {},
    tractorSpeed: 30,
    travellingToCombine: true, 
    combineLocation: null,
    currentTaskName: "",
    byFarm: false,
    byCombine: false, 
    record: [],
    foregroundSub: null,
    exitGeofence: []

}



export const navSlice = createSlice({
    name: "nav",
    initialState, 
    reducers: {
        setOrgin: (state, action) => {
            state.origin = action.payload;
        },
        setDestination: (state, action) => {
            state.destination = action.payload
        },
        setTravelTimeInformation: (state, action) => {
            state.travelTimeInformation = action.payload
        },
        setDriverInformation: (state, action) => {
            state.driverInformation = action.payload
        },
        setDriverName: (state, action) => {
            state.driverName = action.payload
        },
        setDriverEmail: (state, action) => {
            state.driverEmail = action.payload
        },
        setDriverID: (state, action) => {
            state.driverID = action.payload
        },
        setGeofenceActive: (state, action) => {
            state.geofenceActive = action.payload
        },
        setGeofenceCord: (state, action) => {
            state.geofenceCord = action.payload
        },
        setGeofenceName: (state, action) => {
            state.geofenceName = action.payload
        },
        setGeofenceRadius: (state, action) => {
            state.geofenceRadius = action.payload
        },
        setParticipants: (state, action) => {
            state.participants = action.payload
        },
        setDistanceArray: (state, action) => {
            state.distanceArray = action.payload
        }, 
        setNetInfo: (state, action) => {
            state.netInfo = action.payload
        },
        setTractorSpeed: (state, action) => {
            state.tractorSpeed = action.payload
        }, 
        setCombineId: (state, action) => {
            state.combineId = action.payload
        },
        setEntryGeofence: (state, action) => {
            state.entryGeofence = action.payload
        },
        setFillingTime: (state, action) => {
            state.fillingTime = action.payload
        },
        setTravellingToCombine: (state, action) => {
            state.travellingToCombine = action.payload
        }, 
        setCombineLocation: (state, action) => {
            state.combineLocation = action.payload
        },
        setCurrentTaskName: (state, action) => {
            console.log("CurrentTaskName changed to = ", action.payload)
            state.currentTaskName = action.payload
        },
        setByCombine: (state, action) => {
            state.byCombine = action.payload
        },
        setByFarm: (state, action) => {
            state.byFarm = action.payload
        }, 
        setRecord: (state, action) => {
            state.record = action.payload
        },
        setForegroundSub: (state, action) => {
            state.foregroundSub = action.payload
        },
        setOperationId: (state, action) => {
            state.operationId = action.payload
        },
        setExitGeofence: (state, action) => {
            state.exitGeofence = action.payload
        }
    }
})

export const {
    setOrgin, setDestination, setTravelTimeInformation, 
    setDriverInformation, setDriverName, setDriverEmail, 
    setDriverID, setGeofenceActive, setEntryGeofence,
    setFillingTime, setGeofenceCord, setGeofenceName,
    setGeofenceRadius, setParticipants, setDistanceArray,
    setNetInfo, setTractorSpeed, setCombineId,
    setTravellingToCombine, setCombineLocation, setByCombine,
    setCurrentTaskName, setByFarm, setRecord,
    setForegroundSub, setOperationId, setExitGeofence
} = navSlice.actions

export const selectOrigin = (state) => state.nav.origin;
export const selectDestination = (state) => state.nav.destination;
export const selectTravelTimeInformation = (state) => state.nav.travelTimeInformation;
export const selectDriverInformation = (state) => state.nav.driverInformation;
export const selectDriverName = (state) => state.nav.driverName;
export const selectDriverEmail = (state) => state.nav.driverEmail;
export const selectDriverID = (state) => state.nav.driverID;
export const selectGeofenceActive = (state) => state.nav.geofenceActive
export const selectGeofenceCord = (state) => state.nav.geofenceCord
export const selectGeofenceName = (state) => state.nav.geofenceName
export const selectGeofenceRadius = (state) => state.nav.geofenceRadius
export const selectParticipants = (state) => state.nav.participants
export const selectDistanceArray = (state) => state.nav.distanceArray
export const selectNetInfo = (state) => state.nav.netInfo
export const selectTractorSpeed = (state) => state.nav.tractorSpeed
export const selectCombineId = (state) => state.nav.combineId
export const selectEntryGeofence = (state) => state.nav.entryGeofence
export const selectFilingTime = (state) => state.nav.fillingTime
export const selectTravlingToCombine = (state) => state.nav.travellingToCombine
export const selectCombineLocation = (state) => state.nav.combineLocation
export const selectCurrentTaskName = (state) => state.nav.currentTaskName
export const selectByCombine = (state) => state.nav.byCombine
export const selectByFarm = (state) => state.nav.byFarm
export const selectRecord = (state) => state.nav.record
export const selectForegroundSub = (state) => state.nav.foregroundSub
export const selectOperationId = (state) => state.nav.operationId
export const selectExitGeofence = (state) => state.nav.exitGeofence

export default navSlice.reducer;