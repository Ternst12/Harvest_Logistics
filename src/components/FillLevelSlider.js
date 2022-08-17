import {Slider} from "@miblanchard/react-native-slider"
import { View, Text, StyleSheet} from "react-native";
import Colors from "../constants/Colors";
import { screenHeight, screenWidth } from "../constants/Dimensions";
import { updateVehicle } from "../graphql/mutations";
import {API, graphqlOperation } from 'aws-amplify'

const FillLevelSlider = props => {
    
    
    const markPercentage = (index) => {
        if(index == 0) {
            return 25;
        } else if (index == 1){
            return 50;
        }  else if (index == 2){
            return 75;
        } else if (index == 3){
            return 100;
        }
    }


    return(
        <View style={styles.container}>
            <View style={{width: "100%"}}>
                <Slider  
                value={props.fillLevel}
                minimumValue={0}
                maximumValue={100}
                step={25}
                minimumTrackTintColor={props.fillLevel < 90 ? Colors.summerYellow : "red"}
                onValueChange={async(number) =>{             
                    props.setFillLevel(number[0])          
                    try {
                     const result = API.graphql(graphqlOperation(updateVehicle, {
                            input: {
                                userID: props.driverID, 
                                fillLevel: number[0], 
                            }
                            }))
                           
                        } catch (error) {
                            console.log("Location Update lykkes ikke ", error)
                        }
                }}
                thumbTintColor={"yellow"}
                renderTrackMarkComponent={index => {return(<View><Text style={styles.percentageText}>{markPercentage(index)}%</Text></View>)}}
                renderAboveThumbComponent={index => {return(<View><Text style={styles.percentageText}>{props.fillLevel}%</Text></View>)}}
                trackClickable={true}
                trackMarks={[25, 50, 75, 100]}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        width: screenWidth * 0.95,
        height: screenHeight * 0.1,
    },
    percentageText: {
        fontSize: screenWidth > 400 ? 22 : 20,
        color: Colors.summerWhite,
        fontWeight: "700"
    }
})

export default FillLevelSlider;