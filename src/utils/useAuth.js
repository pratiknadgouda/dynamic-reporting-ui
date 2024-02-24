import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userStore from "../store/userStore";

const useAuth = () => {
  const isLoggedIn = userStore((state) => state.loggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/forbidden", { repalce: true });
    }
  }, [isLoggedIn, navigate]);
  return isLoggedIn;
};

export default useAuth;
