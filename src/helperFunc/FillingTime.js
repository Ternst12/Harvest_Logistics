import { useSelector, useDispatch } from "react-redux"
import { selectFilingTime, setFillingTime } from "../redux/Slices"

export const AddFillTime = (newTime) => {

    const dispatch = useDispatch()
    const oldFillingTimes = useSelector(selectFilingTime)

    if(oldFillingTimes.length == 0){
        console.log("No rekords of filling times")
        dispatch(setFillingTime(newTime))
    } else {
        var placeholder = new Array
        placeholder = oldFillingTimes
        placeholder.push(newTime)
        console.log("Adding new rekord to fillingTime = ", placeholder)        
    }

}