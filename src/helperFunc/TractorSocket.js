import Combine from "../Model/CombineModel"

export const requestDriver = async(socket, setMarkerCord, setShowMessagebox, showMessageBox, setCombineArray) => {
    
    socket.on("connect", () => {
        console.log("Din Tractor er forbundet, tillykke")
    })
    socket.emit("combineRequest")
    socket.on("combineRequest", (combineLocation,combineName) => {
        console.log("combineLocation = " + combineLocation + " combinename = " + combineName)
        setMarkerCord(combineLocation)
        setCombineArray(oldArray => [...oldArray, new Combine(combineName, "79%")])
        if(showMessageBox == false) {
        setShowMessagebox(true)
        } else {
            setShowMessagebox(false)
        }
    })
}

export const sendTractorLocation = async(socket, origin) =>
{
    socket.emit("tractorLocation", origin)
}

export const fetchingFilllevel = async(socket, setFilllevel) => 
{
    socket.on("sendingFillLevel", fillData => {
        console.log("getting fillLevel = ", fillData)
        setFilllevel(fillData)
    })
}