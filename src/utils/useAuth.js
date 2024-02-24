import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userStore from "../store/userStore";

const useAuth = () => {
  const { loggedIn, role } = userStore((state) => state);
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      navigate("/login", { repalce: true });
    } else if (loggedIn) {
      if (role === "DOCTOR") {
        navigate("/doctor");
      } else if (role === "PATIENT") {
        navigate("/patient");
      }
    }
  }, [loggedIn, navigate]);
  return loggedIn;
};

export default useAuth;
