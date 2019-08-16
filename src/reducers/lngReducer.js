let initialState = {
  lng: "by"
};

const lngReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LNG':
      return {...state, lng:action.lng};
    default:
      return state;
  }
}

export const setLng = (lng) => ({type:"SET_LNG", lng})

export default lngReducer