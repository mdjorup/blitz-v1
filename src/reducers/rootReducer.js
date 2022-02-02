let initialState = {
   picks: {},
}

const rootReducer = (state=initialState, action) => {
  switch (action.type){
    case "UPDATE_PICKS":
      return {...state, picks: action.payload};
    default:
      return state;
  }
  console.log(JSON.stringify(state));
}

export default rootReducer;