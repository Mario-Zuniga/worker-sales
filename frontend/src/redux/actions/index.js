import axios from "axios";

export const storeWorker = (content) => ({
  type: "STORE",
  payload: content,
});

export const toggled = () => {
  return {
    type: "TOGGLED",
  };
};

export async function fetchData(dispatch, getState) {
  const response = await axios.get("api/users");
  dispatch({ type: "STORE", payload: response.data });
}
