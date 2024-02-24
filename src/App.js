import { Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./Components/NavBar";
import useAuth from "./utils/useAuth";
import LoginPage from "./Components/LoginPage";

const App = () => {
  const isLoggedIn = useAuth();
  return (
    <>
      {isLoggedIn && <NavBar />}
      <Routes>
        <Route path="/"></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="*">{/* {Not Found Page} */}</Route>
      </Routes>
    </>
  );
};

export default App;
