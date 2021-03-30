import axios from "axios";
import env from "../../config/env";

const getUserData = async (token: string) => {
  console.log(env.REACT_NATIVE_API_URL);
  const res = await axios.get(`${env.REACT_NATIVE_API_URL}/authed/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export default getUserData;
