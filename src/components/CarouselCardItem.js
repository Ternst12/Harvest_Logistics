import {View, Image, TouchableOpacity } from "react-native"
import { useDispatch } from "react-redux";
import { setTractorSpeed } from "../redux/Slices";

const CarouselCardItem = ({item, index}) => {

    const dispatch = useDispatch();


    return(
        <View>
            <TouchableOpacity onLongPress={() => {console.log(item.speed); dispatch(setTractorSpeed(item.speed))}} >
                <Image source={item.source} style={{width: 150, height: 150}} />
            </TouchableOpacity>
        </View>

    )
}

export default CarouselCardItem;