import { Platform, Linking } from "react-native"


export const openMaps = (markerCord) => {
    console.log("Åbner mappen på OS = ", Platform.OS)
    if(Platform.OS == "ios") {
        Linking.openURL(`http://maps.apple.com/?daddr=${markerCord.lat},${markerCord.lng}`)
        console.log("apple url = ", `http://maps.apple.com/?daddr=${markerCord.lat},${markerCord.lng}`)
    } else {
        const url=  `google.navigation:q=${markerCord.lat},${markerCord.lng}`
        Linking.openURL(url)
        console.log("google url = ", `htttps://wwww.google.com/dir/?api=1&destination=${markerCord.lat},${markerCord.lng}`)
    }
}