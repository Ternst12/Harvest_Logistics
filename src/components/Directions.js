import { useRef, useState } from "react";
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

  const [array, setArray] = useState([])

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
            mode="BICYCLING"
            apikey={apikey}
            onStart={(params) => {
            }}
            onReady={result => {
              
                var testArray = [...props.directionInfoArray]
                if(testArray[props.index].id == props.id)
                  {
                    testArray[props.index].duration = convertMinuts(result.duration)
                    testArray[props.index].distance = convertMeters(result.distance)
                    testArray[props.index].meters = result.distance
                  }
            
                props.setDirectionInfoArray(testArray)             
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