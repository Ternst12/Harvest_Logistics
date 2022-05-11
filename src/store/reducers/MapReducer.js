import {SET_LOCATION} from '../actions/MapActions';


const initialState = {
  Location: [],
  Destination: null 
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOCATION:
      console.log("action.location = ", action.cord)
      return {
        Location: action.location
      }; 
    default:
      return state;
  }
};
