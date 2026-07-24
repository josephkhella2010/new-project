import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createUseStyles } from "react-jss";
import HomePage from "../Home/HomePage";

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
        <div className={classes.mainWrapper}>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}
