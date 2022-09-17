import { apikey } from "../google/apikey";
import _ from "lodash"
import { Graphhopper_APIKEY } from "../constants/Graphhopper";
import { API } from "aws-amplify";

export const convertMeters = (meter) => {
    var METER = parseInt(meter)
    var KmM = "";
    if(METER > 10000)
    {
    var km = parseInt(METER / 1000)
    KmM = km.toString() + " km";
    return KmM;
    } else {
      km = parseFloat(METER / 1000).toFixed(1)
      KmM = km + " km"
      return KmM;
    }
}

const convertMilliseconds = (minuts) => {
   
    var MINUTS = parseInt(minuts);
    var m = MINUTS % 60;
    var h = (MINUTS-m)/60;
    var HHMM = h.toString() + " h " + "\n" + m.toString() + " m";
    return HHMM;
  }

const calculateDurationBasedOnTractorSpeed = (tractorSpeed, distance) => {
    const duration = parseInt(distance) / tractorSpeed
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

export const distanceMeasurement = async (location, vehicle, kmh, setDirectionPoly) => {

    const tractorSpeed_mH = kmh * 1000

    

    const tractorSpeed_perMinut = tractorSpeed_mH / 60
    const ApiUrl = `https://graphhopper.com/api/1/route?point=${location.lat},${location.lng}&point=${vehicle.lat},${vehicle.lng}&debug=true&profile=foot&locale=de&calc_points=true&points_encoded=false&key=${Graphhopper_APIKEY}`
    try{
        const result = await fetch(ApiUrl)
        .then((rep) => {return rep.json();})
        .then((data => {return data.paths[0]}))
        .catch((e) => {console.warn("problemer med at fetche distance data, check findPlace.js", e)})
        const durationInMinuts = calculateDurationBasedOnTractorSpeed(tractorSpeed_perMinut, result.distance)
        const distanceMeter = parseInt(result.distance)
        const distanceString = convertMeters(result.distance)
        const durationString = convertMilliseconds(durationInMinuts)
        const distanceInfo = {
            value: distanceMeter,
            text: distanceString,
            time: durationString
        }

        var pointsArray = result.points.coordinates
        var newArray = []

        await pointsArray.map((point) => {
            var obj = {
                longitude: point[0],
                latitude: point[1]
            }
            newArray.push(obj)
        })

        setDirectionPoly(newArray)

        return distanceInfo;
    
        } catch (e) {
            console.log(e)
            return e;
        }
}

export const findPlaceDebounced = _.debounce(findPlace, 1000)