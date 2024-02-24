import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/"></Route>
        <Route path="/403">{/* {Forbidden Page} */}</Route>
        <Route path="*">{/* {Not Found Page} */}</Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
