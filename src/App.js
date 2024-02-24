import { Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import useAuth from "./utils/useAuth";

const App = () => {
  const isLoggedIn = useAuth();
  return (
    <>
      {isLoggedIn && <NavBar />}
      <Routes>
        <Route path="/"></Route>
        <Route path="*">{/* {Not Found Page} */}</Route>
      </Routes>
    </>
  );
};

export default App;
