import { useRef } from "react";
import { apikey } from "../google/apikey";
import MapViewDirections from 'react-native-maps-directions';

const convertMinuts = (minuts) => {
  var MINUTES = parseInt(minuts); //some integer
  var m = MINUTES % 60;
  var h = (MINUTES-m)/60;
  var HHMM = h.toString() + "h: " + (m<10?"0":"") + m.toString() + "m";
  return HHMM;
}

const convertMeters = (meter) => {
  var METER = parseInt(meter * 1000); //some integer
  var m = METER % 1000;
  var km = (METER-m)/1000;
  var KmM = km.toString() + "km: " + m.toString() + "m";
  return KmM;
}

export const Directions = props => {


return (
<MapViewDirections
            origin={{
                latitude: props.location.lat,
                longitude: props.location.lng
            }}
            destination={{
                latitude: props.markerCord.lat,
                longitude: props.markerCord.lng
            }}
            mode="DRIVING"
            apikey={apikey}
            strokeWidth={3}
            strokeColor="hotpink"
            onStart={(params) => {
              console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
            }}
            onReady={result => {
              console.log(`Distance: ${result.distance} km`)
              props.setDistance(convertMeters(result.distance))
              console.log(`Duration: ${result.duration} min.`)
              props.setDuration(convertMinuts(result.duration))
              }}        
            onError={(errorMessage) => {
              console.log(errorMessage)
            }}
          />
    )
}