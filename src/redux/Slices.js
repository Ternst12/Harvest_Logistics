import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    origin: null,
    destination: null,
    travelTimeInformation: null, 
    driverInformation: "",
    driverName: "",
    driverEmail: "",
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
      
    }
})

export const {
    setOrgin, setDestination, setTravelTimeInformation, setDriverInformation, setDriverName, setDriverEmail
} = navSlice.actions

export const selectOrigin = (state) => state.nav.origin;
export const selectDestination = (state) => state.nav.destination;
export const selectTravelTimeInformation = (state) => state.nav.travelTimeInformation;
export const selectDriverInformation = (state) => state.nav.driverInformation;
export const selectDriverName = (state) => state.nav.driverName;
export const selectDriverEmail = (state) => state.nav.driverEmail;


export default navSlice.reducer;