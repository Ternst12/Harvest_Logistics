import { API, graphqlOperation} from "aws-amplify";
import { result } from "lodash";
import { createCords, createPlace } from "../graphql/mutations";




const CordsArray = 
[
{ 
    latitude: "bla",
    longitude: "bla"
    
}, 
 {
    latitude: "bla bla",
    longitude: "bla bla"
    }
]


export const savePlace = async(userID, array, name) => {

    const json = JSON.stringify(array)

    console.log("json = ", json)

    try {
        const result = await API.graphql(graphqlOperation(createPlace, 
            {input: {
                name: name,
                created_By_User_With_ID: userID,
                placeCords: json 
            }}
        ))
        console.log(result)
    } catch (error) {
        console.log("Problem ved gemning af sted = ", error)
    }
}