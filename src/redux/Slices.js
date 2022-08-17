import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    origin: null,
    destination: null,
    travelTimeInformation: null, 
    driverInformation: "",
    driverName: "",
    driverEmail: "",
    driverID: "",
    geofenceActive: false,
    isStopwatchStart: false,
    resetStopWatch: false,
    geofenceCord: {
        lat: 56.47776533064656,
        lng: 10.075310435251021
    },
    geofenceName: "Home",
    geofenceRadius: 100,
    participants: [],
    distanceArray: [],
    netInfo: {},
    tractorSpeed: 30

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
        setIsStopWatchStart: (state, action) => {
            state.isStopwatchStart = action.payload
        },
        setResetStopWatch: (state, action) => {
            state.resetStopWatch = action.payload
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
            state.tractorSpeed
        }
    }
})

export const {
    setOrgin, setDestination, setTravelTimeInformation, 
    setDriverInformation, setDriverName, setDriverEmail, 
    setDriverID, setGeofenceActive, setIsStopWatchStart,
    setResetStopWatch, setGeofenceCord, setGeofenceName,
    setGeofenceRadius, setParticipants, setDistanceArray,
    setNetInfo, setTractorSpeed
} = navSlice.actions

export const selectOrigin = (state) => state.nav.origin;
export const selectDestination = (state) => state.nav.destination;
export const selectTravelTimeInformation = (state) => state.nav.travelTimeInformation;
export const selectDriverInformation = (state) => state.nav.driverInformation;
export const selectDriverName = (state) => state.nav.driverName;
export const selectDriverEmail = (state) => state.nav.driverEmail;
export const selectDriverID = (state) => state.nav.driverID;
export const selectGeofenceActive = (state) => state.nav.geofenceActive
export const selectIsStopWatchStart = (state) => state.nav.isStopwatchStart
export const selectResetStopWatch = (state) => state.nav.resetStopWatch
export const selectGeofenceCord = (state) => state.nav.geofenceCord
export const selectGeofenceName = (state) => state.nav.geofenceName
export const selectGeofenceRadius = (state) => state.nav.geofenceRadius
export const selectParticipants = (state) => state.nav.participants
export const selectDistanceArray = (state) => state.nav.distanceArray
export const selectNetInfo = (state) => state.nav.netInfo
export const selectTractorSpeed = (state) => state.nav.tractorSpeed

export default navSlice.reducer;