const globalReducer = (state: any, action: any) => {
  switch (action.type) {
    case "CHANGE_CRITERIA":
      return {
        ...state,
        criteria: action.payload,
      };
    case "CHANGE_ALTERNATIVE":
      return {
        ...state,
        alternative: action.payload,
      };
    case "CHANGE_STEP":
      return {
        ...state,
        step: action.payload,
      };
  }
};

export default globalReducer;
