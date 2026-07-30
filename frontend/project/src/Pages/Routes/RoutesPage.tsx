import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createUseStyles } from "react-jss";
import HomePage from "../Home/HomePage";
import NavigationContainer from "../Navigation/NavigationContainer";
import RegisterPage from "../Register/RegisterPage";
import LoginPage from "../Login/LoginPage";
import VerificationPage from "../VerificationPage/VerificationPage";

const useStyles = createUseStyles({
  mainWrapper: {
    minHeight: "100vh",
  },
});

export default function RoutesPage() {
  const classes = useStyles();
  return (
    <div>
      <Router>
        <NavigationContainer />
        <div className={classes.mainWrapper}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />{" "}
            <Route path="/login" element={<LoginPage />} />{" "}
            <Route path="/verification-code" element={<VerificationPage />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}
