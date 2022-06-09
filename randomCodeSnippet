 {markerCord && markerCord != "No input yet" ? 
        <Marker 
            coordinate={{
                latitude: markerCord.lat,
                longitude: markerCord.lng
            }}
            pinColor={"green"}
            title="Destination"
            identifier="destination"
            style={{width: 400}}
            >
            
            <View style={{justifyContent: "center", alignItems: "center"}}>
            {driverInformation == "tractor" ?
                <View style={styles.markerTextBox}>
                    <Text>{combineArray.length > 0 ? combineArray[0].Name : ""}</Text>
                    <Text style={{fontSize: 20, fontWeight: "700"}}>Fill level: {shownFillLevel}%</Text>
                </View>  : null}
                <View style={styles.markerIcons}>
                    <Image source={driverInformation == "tractor" ? combineIcon : tractorIcon} resizeMode="stretch" style={{height: "100%", width: "90%"}}/>
                </View>
            </View>
        </Marker> 
        : null}
   

           {showSearchBar ? <View style={{position: "absolute", width: "100%", alignItems: "center", height: "50%", top: "5%"}}>
            <TextInput placeholder="Destination" value={destination} onFocus={() => {
                setWriting(true)
            }} 
            onChangeText={(text) => {
            setWriting(true)
            setDestination(text)
            findPlaceDebounced(text, origin, setPredictions)
            }} style={[styles.inputBox, writing ? styles.inputBoxShadow : null]} />
            {predictionsField}
        </View> : <View></View>
        }

        const predictionsField = predictions.map(predictions => { return(
            <TouchableOpacity 
            key={predictions.id} 
            style={{backgroundColor: "white", height: 35, justifyContent: "center", paddingHorizontal: 10, width: 300}}
            onPress={() => {directionsFinder(predictions.place_id, origin, setMarkerCord, setPredictions); Keyboard.dismiss()}}
            >
                <Text key={predictions.id} style={{fontSize: 18, color: "grey"}}>{predictions.description}</Text>
            </TouchableOpacity>
        )});  