const savedTheme = JSON.parse(window.localStorage.getItem("themeData"));

const themeReducer = (state = savedTheme || false, action) => {
  switch (action.type) {
    case "TOGGLED":
      return !state;
    default:
      return state;
  }
};

export default themeReducer;
