import React from "react";
import {View, Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from "@react-navigation/drawer";
import MapScreen from "../screens/MapScreen";
import CustomDrawer from "./CostumDrawer";
import CreateOperation1 from "../screens/CreateOperation1";
import CreateOperation2 from "../screens/CreateOperation2";
import RecordsScreen from "../screens/RecordsScreen";
import AuthScreen from "../screens/AuthScreen";
import GeofenceSettingsScreen from "../screens/GeofenceSettingsScreen";
import { screenHeight, screenWidth } from "../constants/Dimensions";


const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();


const DrawerNavigator = (props) => {
  return (
      <Drawer.Navigator drawerContent={
        (props) => (
          <CustomDrawer {...props} />)
      }>
        <Drawer.Screen 
        name="HomeMap" 
        component={MapScreen} 
        options={{
          title: "MAP",
          headerStyle: {
            backgroundColor: "black",
            opacity: 0.8
          },
          headerTintColor: "white", 
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: screenWidth > 400 ? 22 : 20
          }

        }}
        />

        <Drawer.Screen 
        name="GeofenceSettings" 
        component={GeofenceSettingsScreen}
        options={{
          title: "Geofence Settings",
          headerStyle: {
            backgroundColor: "black",
            opacity: 0.8
          },
          headerTintColor: "white", 
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: screenWidth > 400 ? 22 : 20
          }
        }}
        />
           
      </Drawer.Navigator>
  );
};

const RootNavigator = (props) => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Auth" component={AuthScreen} options={{headerShown: false}}/>
        <Stack.Screen name="CreateOperation1" 
        component={CreateOperation1} 
        options={{
          headerShown: true,
          title: "New Operation",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: screenWidth > 400 ? 30 : 22
          },
          headerBackTitle: "Back",
          headerBackTitleStyle: {
            fontSize: screenWidth > 400 ? 26 : 18
          }
          }} />
           <Stack.Screen name="CreateOperation2" 
            component={CreateOperation2} 
            options={{
              headerShown: true,
              title: "New Operation",
              headerTitleStyle: {
                fontWeight: "bold",
                fontSize: screenWidth > 400 ? 30 : 22
              },
              headerBackTitle: "Back",
              headerBackTitleStyle: {
                fontSize: screenWidth > 400 ? 26 : 18
              },
              headerStyle: {
                height: screenWidth > 400 ? screenHeight * 0.08 : screenHeight * 0.11
              }
              }} />
          <Stack.Screen name="Records" 
            component={RecordsScreen} 
            options={{
              headerShown: true,
              title: "Your travel records",
              headerTitleStyle: {
                fontWeight: "bold",
                fontSize: screenWidth > 400 ? 30 : 22
              },
              headerBackTitle: "Back",
              headerBackTitleStyle: {
                fontSize: screenWidth > 400 ? 26 : 18
              },
              headerStyle: {
                height: screenWidth > 400 ? screenHeight * 0.08 : screenHeight * 0.11
              }
              }} />
     
        <Stack.Screen 
        name="Home" 
        component={DrawerNavigator} 
        options={{
          headerShown: false
        }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}


export default RootNavigator;