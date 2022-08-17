import { apikey } from "../google/apikey";
import _ from "lodash"

const convertMeters = (meter) => {
    var METER = meter * 1000
    var KmM = "";
    if(METER > 10000)
    {
    var km = METER / 1000
    KmM = km.toString() + " km";
    return KmM;
    } else {
      km = parseFloat(METER / 1000).toFixed(1)
      KmM = km + " km"
      return KmM;
    }
}

const convertMinuts = (minuts) => {
    var MINUTS = parseInt(minuts)
    var m = MINUTS % 60;
    var h = (MINUTS-m)/60;
    var HHMM = h.toString() + " h " + "\n" + m.toString() + " m";
    return HHMM;
  }

const calculateDurationBasedOnTractorSpeed = (tractorSpeed, distance) => {
    const duration = distance / tractorSpeed
    return duration;
}

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

export const distanceMeasurement = async (location, vehicle, kmh) => {

    const tractorSpeed_mH = kmh * 1000

    const tractorSpeed_perMinut = tractorSpeed_mH / 60

    const ApiUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${location.lat},${location.lng}&mode=bicycling&destination=${vehicle.lat},${vehicle.lng}&key=${apikey}`
    try{
        const result = await fetch(ApiUrl)
        const json = await result.json()
        const durationInMinuts = calculateDurationBasedOnTractorSpeed(tractorSpeed_perMinut, json.routes[0].legs[0].distance.value)
        const distanceMeter = json.routes[0].legs[0].distance.value
        const distanceString = json.routes[0].legs[0].distance.text
        const durationString = convertMinuts(durationInMinuts)
        const distanceInfo = {
            value: distanceMeter,
            text: distanceString,
            time: durationString
        }

        return distanceInfo;
        } catch (e) {
            console.log(e)
            return e;
        }
}

export const findPlaceDebounced = _.debounce(findPlace, 1000)