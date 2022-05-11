export const requestDriver = async(socket, setMarkerCord, setShowMessagebox, showMessageBox) => {
    socket.on("connect", () => {
        console.log("Din Tractor er forbundet, tillykke")
    })
    socket.emit("combineRequest")
    socket.on("combineRequest", combineLocation => {
        console.log("modtager noget retur")
        console.log("combineLocation = ", combineLocation)
        setMarkerCord(combineLocation)
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
    console.log("sender tractor locations data = ", origin)
}