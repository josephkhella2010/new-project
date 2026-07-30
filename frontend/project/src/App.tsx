import { ToastContainer } from "react-toastify";
import "./App.css";
import RoutesPage from "./Pages/Routes/RoutesPage";

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      <RoutesPage />
    </>
  );
}

export default App;
