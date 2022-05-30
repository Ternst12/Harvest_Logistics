import React from "react";
import { useSelector } from "react-redux";
import { selectDriverEmail, selectDriverInformation, selectDriverName } from "../redux/Slices";
import { View, Text, Pressable } from "react-native";
import {DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer';
import { Auth } from "aws-amplify";

const CustomDrawer = (props) => {

  const driverInformation = useSelector(selectDriverInformation)
  const driverName = useSelector(selectDriverName)
  const driverEmail = useSelector(selectDriverEmail)

  const signOut = async() => {
    try {
      await Auth.signOut()
    } catch (e) {
      console.log("Fejl ved logout = ", e)
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
            <Text style={{color: '#dddddd', paddingVertical: 5,}}>Messages</Text>
          </Pressable>
        </View>

        { /* Do more */}
        <Pressable
          onPress={() => {console.warn('Make Money Driving')}}>
          <Text style={{color: '#dddddd', paddingVertical: 5,}}>Garage</Text>
        </Pressable>

        {/* Make money */}
        <Pressable onPress={() => {console.warn('Make Money Driving')}}>
          <Text style={{color: 'white', paddingVertical: 5}}>{driverEmail}</Text>
        </Pressable>


      </View>

      <DrawerItemList {...props}/>

      {/* Make money */}
      <Pressable onPress={() => {signOut()}}>
        <Text style={{padding: 5, paddingLeft: 20}}>Logout</Text>
      </Pressable>
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;