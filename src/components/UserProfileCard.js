import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import Colors from "../constants/Colors";
import { screenHeight } from "../constants/Dimensions";

const UserProfileCard = props => {

     const [selected, setSelected] = useState(false)
     const [array, setArray] = useState(props.randomUserArray)

     useEffect(() => {
        setArray(props.randomUserArray)
     }, [props.randomUserArray])

    return (
        <TouchableOpacity onPress={() => {setSelected(!selected); props.AddOrRemoveUser(props.userId) }} style={[styles.cardContainer, {backgroundColor: selected ? Colors.androidGreen : Colors.reactNativeGrey}]}>
           <View style={{flexDirection: "row", justifyContent: "space-around", alignItems: "center"}}>
                <TouchableOpacity onPress={() => console.log(array)}>
                    <Image style={styles.userImage} source={{uri : array.length > 0 ? array[props.index].picture.large : ""}} />
                </TouchableOpacity>
                <View>
                    <Text style={styles.userNameText}>{props.userName}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        width: "100%",
        height: "80%",
        justifyContent: "center",
        borderRadius: screenHeight * 0.05
        
    },
    userNameText: {
        fontSize: 18,
        fontWeight: "900",
        color: Colors.summerWhite
    },
    userImage: {
        height: 100,
        width: 100,
        borderRadius: 50
    }
    
})

export default UserProfileCard;