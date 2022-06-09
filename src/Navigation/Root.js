import React from "react";
import {View, Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from "@react-navigation/drawer";
import MapScreen from "../screens/MapScreen";
import CustomDrawer from "./CostumDrawer";
import LoginScreen from "../screens/LoginScreen";
import AuthScreen from "../screens/AuthScreen";
import { screenWidth } from "../constants/Dimensions";


const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const DummyScreen = (props) => (
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text>{props.name}</Text>
  </View>
)

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
          title: "Logistics",
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

        <Drawer.Screen name="Your Trips">
           {() => <DummyScreen name={"Your Trips"} />}
        </Drawer.Screen>

        <Drawer.Screen name="Help">
          {() => <DummyScreen name={"Help"} />}
        </Drawer.Screen>

        <Drawer.Screen name="Wallet">
          {() => <DummyScreen name={"Wallet"} />}
        </Drawer.Screen>

        <Drawer.Screen name="Settings">
          {() => <DummyScreen name={"Settings"} />}
        </Drawer.Screen>

      </Drawer.Navigator>
  );
};

const RootNavigator = (props) => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Auth" component={AuthScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
     
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