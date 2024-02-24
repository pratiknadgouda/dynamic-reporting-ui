import { Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import useAuth from "./utils/useAuth";
import LoginPage from "./components/LoginPage";
import DoctorsView from "./components/DoctorsView";
import PatientsView from "./components/PatientsView";

const App = () => {
  const isLoggedIn = useAuth();
  return (
    <>
      {isLoggedIn && <NavBar />}
      <Routes>
        <Route path="/"></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="*">{/* {Not Found Page} */}</Route>
        <Route path="/doctor" element={<DoctorsView />}></Route>
        <Route path="/patient" element={<PatientsView />}></Route>
      </Routes>
    </>
  );
};

export default App;
