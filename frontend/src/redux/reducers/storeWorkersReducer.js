const storeWorkersReducer = (state = null, action) => {
  switch (action.type) {
    case "STORE": {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};

export default storeWorkersReducer;
