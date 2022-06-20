import { useRef } from "react";
import { apikey } from "../google/apikey";
import MapViewDirections from 'react-native-maps-directions';

const convertMinuts = (minuts) => {
  var MINUTES = parseInt(minuts); //some integer
  var m = MINUTES % 60;
  var h = (MINUTES-m)/60;
  var HHMM = h.toString() + " h " + "\n" + m.toString() + " m";
  return HHMM;
}

const convertMeters = (meter) => {
  var METER = parseInt(meter * 1000)
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
              
            }}
            onReady={result => {
             
              props.setDistance(convertMeters(result.distance))
             
              props.setDuration(convertMinuts(result.duration))
              }}        
            onError={(errorMessage) => {
              console.log(errorMessage)
            }}
            resetOnChange={false}
          />
    )
}