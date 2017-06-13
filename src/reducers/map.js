import T from "../constants/ActionTypes";
import mapConst from "../constants/Map";

const initialState = {
  zoom: mapConst.DEFAULT_ZOOM,
  center: mapConst.DEFAULT_CENTER,
  marker: null,
  bbox: null,
  ownPosition: null,
  ownPositionCancelled: false
};

module.exports = (state = initialState, action = {}) => {

  // console.log("map: ", state);

  var newState, point;
  switch (action.type) {
    case T.CLOSE_NEW_ENTRY:
    case T.SHOW_NEW_ENTRY:
      return {
        ...state,
        marker: null
      };
    case T.SET_MARKER:
      if (action.manual) {
        return {
          ...state,
          marker: action.payload
        };
      } else {
        return {
          ...state,
          marker: action.payload,
          center: action.payload
        };
      }
      break;
    case T.EDIT_CURRENT_ENTRY:
      point = {
        lat: action.payload.lat,
        lng: action.payload.lng
      };
      return {
        ...state,
        marker: point,
        center: point
      };
    case T.SET_MAP_CENTER:
      return {
        ...state,
        center: action.payload
      };

    case T.SET_ZOOM:
      return {
        ...state,
        zoom: action.payload
      };
    case T.SET_BBOX:
      return {
        ...state,
        bbox: action.payload
      };
    case T.NEW_ENTRY_RESULT:
      if (!action.error) {
        return {
          ...state,
          marker: null
        };
      } else {
        return state;
      }
      break;
    case T.SHOW_OWN_POSITION:
      return {
        ...state,
        ownPositionCancelled: false
      };
    case T.CANCEL_OWN_POSITION:
      return {
        ...state,
        ownPositionCancelled: true
      };
    case T.OWN_POSITION_RESULT:
      if (action.payload) {
        const newState = {
          ...state,
          ownPosition: {
            lat: action.payload.coords.latitude,
            lng: action.payload.coords.longitude
          }
        };
        if (!state.ownPositionCancelled) {
          return {
            ...newState,
            center: newState.ownPosition
          };
        } else {
          return newState;
        }
      } else {
        return state;
      }
      break;
    default:
      return state;
  }
};