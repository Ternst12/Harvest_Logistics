import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    origin: null,
    destination: null,
    travelTimeInformation: null, 
    driverInformation: "",
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
      
    }
})

export const {
    setOrgin, setDestination, setTravelTimeInformation, setDriverInformation,
} = navSlice.actions

export const selectOrigin = (state) => state.nav.origin;
export const selectDestination = (state) => state.nav.destination;
export const selectTravelTimeInformation = (state) => state.nav.travelTimeInformation;
export const selectDriverInformation = (state) => state.nav.driverInformation;


export default navSlice.reducer;