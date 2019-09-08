import T            from "../constants/ActionTypes";

const initialState = {
    code: ''
  };
  
  module.exports = (state = initialState, action = {}) => {  
    switch (action.type) {
      case T.SET_IFRAME:
        return {
          ...state,
          code: action.payload
        }
      default:
        return state;
    }
  };
  