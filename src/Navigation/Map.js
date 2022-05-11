import React from "react";
import HomeScreen from "../screens/MapScreen";
import { createStackNavigator } from '@react-navigation/stack'
import MapScreen from "../screens/MapScreen";

const Stack = createStackNavigator();

const MapNavigator = (props) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen name={"Map"} component={MapScreen} />
    </Stack.Navigator>
  );
};

export default MapNavigator;