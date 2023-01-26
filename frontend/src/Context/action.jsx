import axios from "axios";
const ROOT_URL = "http://aeoragy.iptime.org:18081/login";

export const loginUser = async (dispatch, loginPayload) => {
  const requestOptions = {
    url: `${ROOT_URL}`,
    method: "POST",
    headers: {
      "context-Type": "application/json",
    },
    data: loginPayload,
  };
  try {
    const response = await axios(requestOptions);
    if (response.status == 200) {
      dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
      localStorage.setItem("currentUser", JSON.stringify(response.data));
      return response.data;
    } else {
      dispatch({ type: "LOGIN_ERROR", error: response.data.error[0] });
    }
    return;
  } catch (e) {
    dispatch({ type: "LOGIN_ERROR", error: e });
  }
};

export async function logout(dispatch) {
  dispatch({ type: "LOGOUT" });
  localStorage.removeItem("currentUser");
  localStorage.removeItem("token");
}
