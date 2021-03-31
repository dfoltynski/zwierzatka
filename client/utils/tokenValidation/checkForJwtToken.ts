import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import env from "../../config/env";

const checkForJwtToken = async () => {
  try {
    const token = await AsyncStorage.getItem("jwtToken");
    try {
      // if token is valid return true
      await axios.get(`${env.REACT_NATIVE_API_URL}/authed/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(token);
      return true;
    } catch (error) {
      // if token is invalid return false
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};

export default checkForJwtToken;
