

export const presenceMessage = async(socket, origin, setConnectedToTractor, setMarkerCord) => {
    socket.on("connect", () => {
        console.log("Din Combine er forbundet, tillykke")
    })
    socket.emit("presence", origin) 
    socket.on("tractorConnection", () => {
        console.log("Din combine har forbindelse til en traktor")
        setConnectedToTractor(true)
    })

    socket.on("tractorLocation", cord => {
        setMarkerCord(cord)
    })
}
