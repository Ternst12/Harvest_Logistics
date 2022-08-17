import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectDriverEmail, selectDriverInformation, selectDriverName, selectGeofenceCord, selectGeofenceName, selectGeofenceRadius, selectNetInfo } from "../redux/Slices";
import { View, Text, Pressable, Switch, StyleSheet } from "react-native";
import {DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer';
import { Auth } from "aws-amplify";
import { setGeofenceActive, setIsStopWatchStart, setResetStopWatch } from "../redux/Slices";
import { startGeofencing, stopGeofencing} from "../helperFunc/GeoFencing";
import { screenHeight, screenWidth } from "../constants/Dimensions";
import Carousel from 'react-native-snap-carousel';
import Colors from "../constants/Colors";
import CarouselCardItem from "../components/CarouselCardItem";

export const signOut = async() => {
  try {
    await Auth.signOut()
  } catch (e) {
    console.log("Fejl ved logout = ", e)
  }
}


const CustomDrawer = (props) => {
  const isCarousel = React.useRef(null)

  const [enable, setEnable] = useState(false)
  const driverInformation = useSelector(selectDriverInformation)
  const driverName = useSelector(selectDriverName)
  const driverEmail = useSelector(selectDriverEmail)
  const geofenceCord = useSelector(selectGeofenceCord)
  const geofenceName = useSelector(selectGeofenceName)
  const geofenceRadius = useSelector(selectGeofenceRadius)
  const NetInfo = useSelector(selectNetInfo)
  const dispatch = useDispatch()

  const SpeedSigns = [
    {
      source: require("../images/SpeedSigns/15.png"),
      speed: 15
    }, 
    {
      source: require("../images/SpeedSigns/20.png"),
      speed: 20
    }, 
    {
      source: require("../images/SpeedSigns/25.png"),
      speed: 25
    }, 
    {
      source: require("../images/SpeedSigns/30.png"),
      speed: 30
    }, 
    {
      source: require("../images/SpeedSigns/35.png"),
      speed: 35
    }, 
    {
      source: require("../images/SpeedSigns/40.png"),
      speed: 40
    }, 
    {
      source: require("../images/SpeedSigns/45.png"),
      speed: 45
    }
  ]

  const toggleSwitch = () => {
    setEnable(previousState => !previousState);
    if(enable == false){
      dispatch(setIsStopWatchStart(true))
      dispatch(setResetStopWatch(false))
      dispatch(setGeofenceActive(true))
      startGeofencing(geofenceCord, geofenceName, geofenceRadius)
    } else {
    dispatch(setGeofenceActive(false))
    dispatch(setIsStopWatchStart(false))
    dispatch(setResetStopWatch(true))
    stopGeofencing()
    }
  }


  return (
    <DrawerContentScrollView {...props}>
      <View style={{backgroundColor: '#212121', padding: 15}}>

        {/* User Row */}
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
          <View style={{
            backgroundColor: '#cacaca',
            width: 50,
            height: 50,
            borderRadius: 25,
            marginRight: 10,
          }}/>

          <View>
            <Text style={{color: 'white', fontSize: 24}}>{driverName}</Text>
            <Text style={{color: 'lightgrey'}}>Operating a {driverInformation}</Text>
            <Text style={{color: 'lightgrey'}}>{driverEmail}</Text>
          </View>
        </View>

        {/* Messages Row */}
        <View style={{
          borderBottomWidth: 1,
          borderBottomColor: '#919191',
          borderTopWidth: 1,
          borderTopColor: '#919191',
          paddingVertical: 5,
          marginVertical: 10,
        }}>
          <Pressable
            onPress={() => {console.warn('Messages')}}>
            <Text style={{color: '#dddddd', paddingVertical: 5,}}>Operations Overview</Text>
          </Pressable>
        </View>

        { /* Do more */}
        <Pressable
          onPress={() => {console.warn('Make Money Driving')}}>
          <Text style={{color: '#dddddd', paddingVertical: 5,}}>Garage</Text>
        </Pressable>

        {/* Make money */}
        <Pressable onPress={() => {props.navigation.navigate("Login")}}>
          <Text style={{color: 'white', paddingVertical: 5}}>Switch vehicle</Text>
        </Pressable>


      </View>

      <DrawerItemList {...props}/>

      {/* Make money */}
      <Pressable onPress={() => {signOut()}}>
        <Text style={{padding: 5, paddingLeft: 20}}>Logout</Text>
      </Pressable>
      <View style={{marginTop: 20, flexDirection: "row", justifyContent: "space-evenly"}}>
        <Text style={{fontSize: 16, color: "black"}}>GeoFencing</Text>
        <Switch value={enable} onValueChange={toggleSwitch}/>
      </View>
      <View style={{marginTop: screenHeight * 0.05,width: "100%", alignItems: "center", borderColor: "blue", borderWidth: 1}}>
        <Carousel
              inactiveSlideOpacity={0.5}
              inactiveSlideScale={0.5}
              layout="default"
              layoutCardOffset={10}
              ref={isCarousel}
              data={SpeedSigns}
              renderItem={CarouselCardItem}
              sliderWidth={300}
              itemWidth={150}
              inactiveSlideShift={0}
              useScrollView={true}
             
            />
      </View>
      {NetInfo ?
      <View style={{alignItems: "center", marginTop: screenHeight * 0.2}}>
        <View style={styles.NetInfo_Container}>   
            <View style={styles.NetInfo_textBox}>
              <Text style={styles.NetInfo_text}>Is Internet Reachable</Text>
              <Text style={styles.NetInfo_text}>{NetInfo.isInternetReachable ? "Yes" : "No"}</Text>
            </View>
            <View style={styles.NetInfo_textBox}>
              <Text style={styles.NetInfo_text}>Type</Text>
              <Text style={styles.NetInfo_text}>{NetInfo.type}</Text>
            </View>
            <View style={styles.NetInfo_textBox}>
              <Text style={styles.NetInfo_text}>Strength</Text>
              <Text style={styles.NetInfo_text}>{NetInfo.strength}</Text>
            </View>
            <View style={styles.NetInfo_textBox}>
              <Text style={styles.NetInfo_text}>Frequency</Text>
              <Text style={styles.NetInfo_text}>{NetInfo.frequency}</Text>
            </View>
            <View style={styles.NetInfo_textBox}>
              <Text style={styles.NetInfo_text}>isConnectionExpensive</Text>
              <Text style={styles.NetInfo_text}>{NetInfo.expensive}</Text>
            </View>
        </View>
      </View>
      :
      null
      }
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create ({
  NetInfo_Container: {
    width: "90%", 
    height: screenWidth * 0.4,
    justifyContent: "space-around"
  },

  NetInfo_textBox: {
    flexDirection: "row", 
    justifyContent: "space-between"
  },

  NetInfo_text: {
    fontSize : screenWidth > 400 ? 20 : 16,
    fontWeight: "500",
    color: Colors.reactNativeGrey
  }

})

export default CustomDrawer;