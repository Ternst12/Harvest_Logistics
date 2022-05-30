

export const presenceMessage = async(socket, origin, setConnectedToTractor, setMarkerCord, driverName) => {
    socket.on("connect", () => {
        console.log("Din Combine er forbundet, tillykke")
    })
    socket.emit("presence", origin, driverName) 
    socket.on("tractorConnection", () => {
        console.log("Din combine har forbindelse til en traktor")
        setConnectedToTractor(true)
    })

    socket.on("tractorLocation", cord => {
        setMarkerCord(cord)
    })
}

export const sendFillLevel = async(socket, fillLevel) => {
    socket.emit("sendingFillLevel", fillLevel[0])
}
