import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {View, Text, StyleSheet} from "react-native"
import ActionButton from 'react-native-action-button';
import Colors from "../constants/Colors";
import { FontAwesome5 } from '@expo/vector-icons';

const LocationButton = props => {

    return (
        <SafeAreaView style={styles.container}>
            <ActionButton useNativeFeedback={true} style={{width: "100%", height: "100%"}} buttonColor={Colors.androidGreen}>
                <ActionButton.Item   useNativeFeedback={true} buttonColor='#9b59b6' title="New Task" onPress={() => console.log("notes tapped!")}>
                    <FontAwesome5 name="map-marker-alt" size={24} color="black" />
                </ActionButton.Item>
                <ActionButton.Item buttonColor='#1b71b7' title="blabla" onPress={() => console.log("bla bla")}>
                    <FontAwesome5 name="map-marker-alt" size={24} color="black" />
                </ActionButton.Item>
            </ActionButton>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
      width: 150,
      height: 75
    },
    titleStyle: {
      fontSize: 28,
      fontWeight: 'bold',
      textAlign: 'center',
      padding: 10,
    },
    textStyle: {
      fontSize: 16,
      textAlign: 'center',
      padding: 10,
    },
    actionButtonIcon: {
      fontSize: 20,
      height: 22,
      color: 'white',
    },
  });

  export default LocationButton;