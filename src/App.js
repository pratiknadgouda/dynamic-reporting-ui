import { Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import useAuth from "./utils/useAuth";
import LoginPage from "./components/LoginPage";
import DoctorsView from "./components/DoctorsView";
import PatientsView from "./components/PatientsView";
import GenerateReportForm from "./components/GenerateReportForm";

const App = () => {
  const isLoggedIn = useAuth();
  return (
    <>
      {isLoggedIn && <NavBar />}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*">{/* {Not Found Page} */}</Route>
        <Route path="/doctor" element={<DoctorsView />} />
        <Route path="/patient" element={<PatientsView />} />
        <Route path="/generate-report/:id?" element={<GenerateReportForm />} />
      </Routes>
    </>
  );
};

export default App;
