import { apikey } from "../google/apikey";
import _ from "lodash"

const findPlace = async (destination, location, setPredictions) => {
    const ApiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${apikey}&input=${destination}&location=${location.lat},${location.lng}&aradius=2000`
    try{
    const result = await fetch(ApiUrl)
    const json = await result.json()
    setPredictions(json.predictions)
    } catch (e) {
        console.log(e)
    }
}

export const directionsFinder = async (prediction, location, setMarkerCord, setPredictions) => {
    const ApiUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${location.lat},${location.lng}&mode=bicycling&destination=place_id:${prediction}&key=${apikey}`
    console.log("ApiUrl = ", ApiUrl)
    try{
        const result = await fetch(ApiUrl)
        const json = await result.json()
        const endLocation = json.routes[0].legs[0].end_location
        console.log("endLocation = ", endLocation)
        setMarkerCord(endLocation)
        } catch (e) {
            console.log(e)
        }
    setPredictions([])
}

export const findPlaceDebounced = _.debounce(findPlace, 1000)