export const ADD_LOCATION = "ADD_LOCATION"

export const addCart = (location) => {
    return async dispatch => {
      console.log("location = ", location)

      try {
        console.log("Hej ehj")
        dispatch({
          type: ADD_LOCATION,
          cord: location
        });
      } catch (err) {
        console.log(err);
        throw err;
      }
    };
  };

  