import { useDispatch } from "react-redux";
import axios from "../utils/axios";
import { refreshUser } from "../Store/userSlice";

const useRefreshToken = () => {
  const dispatch = useDispatch();

  const refresh = async () => {
    const { data } = await axios.post(
      "auth/refreshtoken",
      {},
      {
        withCredentials: true,
      }
    );

    dispatch(refreshUser(data));

    return data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
