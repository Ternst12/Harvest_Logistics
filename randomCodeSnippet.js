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

        // listen for connections 
        useEffect(() => {
            if(driverInformation == "combine") {
            const subscription = API.graphql(graphqlOperation(onCreateConnection, {driverTwo_UserID: driverID}))
                .subscribe({
                    next: ({ value }) => {
                        setConnectedToTractor(true)
                        console.log("There has been created a connection = ", value.data.onCreateConnection.driverTwo_UserID, " my userID is = ", driverID)
                        SettingOpenToConnection(driverID, true)
                        if(driverID == value.data.onCreateConnection.driverTwo_UserID) {
                            console.log("The other drivers lat and lng = " + value.data.onCreateConnection.driverOne_UserProfile.vehicle.latitude + " : " + value.data.onCreateConnection.driverOne_UserProfile.vehicle.longitude + " /n "
                            + "My own lat and lng = " + value.data.onCreateConnection.driverTwo_UserProfile.vehicle.latitude + " : " + value.data.onCreateConnection.driverTwo_UserProfile.vehicle.longitude)
                            setMarkerCord({
                                lat: value.data.onCreateConnection.driverOne_UserProfile.vehicle.latitude,
                                lng: value.data.onCreateConnection.driverOne_UserProfile.vehicle.longitude
                            })
                            subscribeToVehicle(value.data.onCreateConnection.driverOne_UserID)
                            fetchVehicles()
                            setChoosenMarkerTitle(value.data.onCreateConnection.driverOne_UserProfile.email)
                            setChoosenVehicleType(value.data.onCreateConnection.driverOne_UserProfile.type)
                        }
                    },
                    error: error => console.warn("There has been an subscription error regarding connections with user = ", driverID, " the error = ", error),
                    complete: () => {console.log("Subscription has been cancelled"); setMarkerCord(null); setSubscription(null) }
                })
                setSubscription(subscription)
            }
        }, [])

       // subscribe To other vehicle position

       const subscribeToVehicle = (userID) => {
        console.log("My own userId = ", driverID,  " the others userID = ", userID)
        setOperationStarted(true)
        const subscription = API.graphql(
            graphqlOperation(onUpdateVehicle, {userID: userID})
          ).subscribe({
            next: ({ value }) => {
                if(userID == value.data.onUpdateVehicle.userID)            
                {
                    setMarkerCord({
                        lat: value.data.onUpdateVehicle.latitude,
                        lng: value.data.onUpdateVehicle.longitude
                    })
                    if(value.data.onUpdateVehicle.type != "tractor"){
                    setFillLevel(value.data.onUpdateVehicle.fillLevel)
                    }
                    if(value.data.onUpdateVehicle.openToConnection == false){
                        console.log("cancel sub")
                        SettingOpenToConnection(driverID, false)
                        subscription.unsubscribe()
                        setMarkerCord(null)
                        setOperationStarted(false)
                        setChoosenVehicleType(null)
                    }
                }
            },
            error: error => console.warn("There has been an subscription error with user = ", driverID, " userId = ", userID, " the error = ", error),
            complete: () => {console.log("Subscription has been cancelled"); setMarkerCord(null); setSubscription(null) }
          })    
          setSubscription(subscription)
    }

    const createConnectionToVehicle = async(driverID, selectedVehicleID) => {
        const response = await API.graphql(graphqlOperation(createConnection, {
            input: {driverOne_UserID: driverID, driverTwo_UserID: selectedVehicleID}
         }))
     }

     // Stop button - deleting connection

     const deleteCon = async(myConnection) => {
        const conArray = myConnection.data.listConnections.items
        const result = await conArray.map(async(con) => {
            try{
               const response = await  API.graphql(graphqlOperation(deleteConnection, 
                        {input: 
                            {
                                id: con.id
                            }
                        }
                    ))
                console.log("Respons from deleting a con = ", response)    
            } catch (error) {
                console.warn("problem with deleting connection = ", error)
            } 
        })
    
        console.log("result = ", result)
    }

    const deleteConnectionWithOtherUser = async(userID) =>{

        let filter = {
            or: [
            {    
                driverOne_UserID: {eq: userID}
            },
            {
                driverTwo_UserID: {eq: userID}
            }
            ]
        }
                    
        try {
            const myConnection = await API.graphql(graphqlOperation(listConnections, {filter: filter}));
                if(myConnection) {
                    deleteCon(myConnection)
                } else {
                    console.log("No connections")
                }
        } 
        catch (error) {
            console.warn("Something went wrong when fetching connections = ", error)
        }
    }
