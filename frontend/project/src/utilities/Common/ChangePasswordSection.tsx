/* import { useState } from "react";
import { HiMiniXMark } from "react-icons/hi2";
import { createUseStyles } from "react-jss";
import { useDispatch } from "react-redux";
import { fetchStopCodeCorrect } from "../../Redux/slices/loadAndErrorSlice/loadAndErrorSlice";
import { setHidePasswordSection } from "../../Redux/slices/Common/ShowChangePassword";
import { useNavigate } from "react-router-dom";

const useStyles = createUseStyles({
  mainContainer: {
    backgroundColor: "#00000099",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100dvh",
    zIndex: 9999,

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  formContainer: {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "10px",
  },
  closeContainer: {
    backgroundColor: "white",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    position: "absolute",
    top: "10px",
    right: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    fontSize: "24px",
  },
});

export default function ChangePasswordSection() {
  const classes = useStyles();
  const [inputVal, setInputVal] = useState<string>("");
  const navigate=useNavigate()
  const id = localStorage.getItem("id");
  const dispatch = useDispatch();
  console.log("id", id);

  function changePassword() {
    if (!id) return;

    dispatch({
      type: "CHANGE_PASSWORD_REQUEST",
      payload: {
        resetToken: id,
        password: inputVal,
      },
    });
    dispatch(fetchStopCodeCorrect());
    dispatch(setHidePasswordSection());
    navigate("/")
  }

  return (
    <div className={classes.mainContainer}>
      <div
        className={classes.closeContainer}
        onClick={() => {
          dispatch(fetchStopCodeCorrect());
          dispatch(setHidePasswordSection());
        }}
      >
        <HiMiniXMark />
      </div>
      <div className={classes.formContainer}>
        <label htmlFor="password">
          <p> Password</p>
          <input
            type="password"
            placeholder="Enter Your Password"
            id="password"
            name="password"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
          />
        </label>

        <button
          onClick={() => {
            changePassword();
          }}
        >
          {" "}
          Change password
        </button>
      </div>
    </div>
  );
}
 */

import { useState } from "react";
import { HiMiniXMark } from "react-icons/hi2";
import { createUseStyles } from "react-jss";
import { useDispatch } from "react-redux";
import { fetchStopCodeCorrect } from "../../Redux/slices/loadAndErrorSlice/loadAndErrorSlice";
import { setHidePasswordSection } from "../../Redux/slices/Common/ShowChangePassword";
import { useNavigate } from "react-router-dom";

const useStyles = createUseStyles({
  mainContainer: {
    backgroundColor: "#00000099",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100dvh",
    zIndex: 9999,

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    boxSizing: "border-box",
  },

  formContainer: {
    background:
      "linear-gradient(135deg, #43536c 0%, #33527c 45%, #283b68 100%)",
    width: "100%",
    maxWidth: "450px",
    padding: "35px",
    borderRadius: "18px",
    boxSizing: "border-box",
    boxShadow: "0 20px 50px rgba(0, 0, 0, 0.45)",

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",

    "& h2": {
      color: "#ffffff",
      margin: "0",
      fontSize: "26px",
      fontWeight: 600,
      textAlign: "center",
    },

    "& input": {
      width: "100%",
      height: "45px",
      boxSizing: "border-box",
      borderRadius: "8px",
      border: "1px solid #9ca3af",
      outline: "none",
      padding: "8px 12px",
      backgroundColor: "#f9fafb",
      color: "#1f2937",
      fontSize: "15px",
      transition: "all 0.2s ease",

      "&:focus": {
        border: "2px solid #43536c",
        boxShadow: "0 0 0 3px rgba(255, 255, 255, 0.15)",
      },

      "&::placeholder": {
        color: "#6b7280",
      },
    },

    "& button": {
      width: "65%",
      height: "45px",
      marginTop: "5px",
      borderRadius: "8px",
      border: "1px solid rgba(255, 255, 255, 0.4)",
      outline: "none",
      padding: "5px",
      background:
        "linear-gradient(135deg, #43536c 0%, #33527c 45%, #283b68 100%)",
      color: "#ffffff",
      fontSize: "15px",
      fontWeight: 600,
      cursor: "pointer",
      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
      transition: "all 0.2s ease",

      "&:hover": {
        border: "1px solid #ffffff",
        transform: "translateY(-2px)",
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.4)",
      },

      "&:active": {
        transform: "translateY(0)",
      },

      "@media (max-width: 500px)": {
        width: "75%",
      },
    },

    "@media (max-width: 500px)": {
      maxWidth: "95%",
      padding: "25px 20px",
    },
  },

  closeContainer: {
    backgroundColor: "#ffffff",
    color: "#1f2937",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    position: "absolute",
    top: "20px",
    right: "25px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    fontSize: "24px",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.25)",
    transition: "all 0.2s ease",

    "&:hover": {
      backgroundColor: "#1f2937",
      color: "#ffffff",
      transform: "rotate(90deg)",
    },

    "@media (max-width: 500px)": {
      width: "35px",
      height: "35px",
      top: "15px",
      right: "15px",
      fontSize: "20px",
    },
  },

  inputContainer: {
    width: "100%",
  },
});

export default function ChangePasswordSection() {
  const classes = useStyles();
  const [inputVal, setInputVal] = useState("");
  const navigate = useNavigate();
  const id = localStorage.getItem("id");
  const dispatch = useDispatch();

  console.log("id", id);

  function changePassword() {
    if (!id) return;

    dispatch({
      type: "CHANGE_PASSWORD_REQUEST",
      payload: {
        resetToken: id,
        password: inputVal,
      },
    });

    dispatch(fetchStopCodeCorrect());
    dispatch(setHidePasswordSection());
    navigate("/");
  }

  return (
    <div className={classes.mainContainer}>
      <div
        className={classes.closeContainer}
        onClick={() => {
          dispatch(fetchStopCodeCorrect());
          dispatch(setHidePasswordSection());
        }}
      >
        <HiMiniXMark />
      </div>

      <div className={classes.formContainer}>
        <h2>Password</h2>

        <div className={classes.inputContainer}>
          <input
            type="password"
            placeholder="Enter Your Password"
            id="password"
            name="password"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
          />
        </div>

        <button
          onClick={() => {
            changePassword();
          }}
        >
          Change password
        </button>
      </div>
    </div>
  );
}
