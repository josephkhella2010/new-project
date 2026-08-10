/* import { useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../Redux/store/store";
import { setHideEmailSection } from "../../Redux/slices/Common/showEmailSection";
import { HiMiniXMark } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { fetchStopCodeSuccess } from "../../Redux/slices/loadAndErrorSlice/loadAndErrorSlice";

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

export default function EmailSection() {
  const classes = useStyles();
  const [inputVal, setInputVal] = useState<string>("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showEmailSection } = useSelector(
    (state: RootState) => state.ShowEmailSectionSlice,
  );
  const { codeSuccess } = useSelector((state: RootState) => state.loadingSlice);
  useEffect(() => {
    function fixHeight() {
      if (showEmailSection) {
        document.body.style.overflow = "hidden";
        document.body.style.height = "100dvh";
      } else {
        document.body.style.overflow = "auto";
        document.body.style.height = "100dvh";
      }
    }

    fixHeight();

    // cleanup when component unmounts
    return () => {
      document.body.style.overflow = "auto";
      document.body.style.height = "100dvh";
    };
  }, [showEmailSection]);

  function handleSendCode() {
    dispatch({
      type: "FORGOT_PASSWORD_REQUEST",
      payload: {
        email: inputVal,
      },
    });
  }
  useEffect(() => {
    if (codeSuccess) {
      dispatch(setHideEmailSection());

      navigate("/verification-code");

      // reset immediately
      dispatch(fetchStopCodeSuccess());
    }
  }, [codeSuccess, navigate, dispatch]);
  return (
    <div className={classes.mainContainer}>
      <div
        className={classes.closeContainer}
        onClick={() => dispatch(setHideEmailSection())}
      >
        <HiMiniXMark />
      </div>
      <div className={classes.formContainer}>
        <label htmlFor="email">
          <p> Email</p>
          <input
            type="text"
            placeholder="Enter Your Email"
            id="email"
            name="email"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
          />
        </label>

        <button
          onClick={() => {
            handleSendCode();
          }}
        >
          {" "}
          send Code
        </button>
      </div>
    </div>
  );
}
 */



import { useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../Redux/store/store";
import { setHideEmailSection } from "../../Redux/slices/Common/showEmailSection";
import { HiMiniXMark } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { fetchStopCodeSuccess } from "../../Redux/slices/loadAndErrorSlice/loadAndErrorSlice";

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
      margin: "0 0 10px",
      fontSize: "26px",
      fontWeight: 600,
      textAlign: "center",
    },

    "& label": {
      width: "100%",
      color: "#ffffff",
      fontSize: "15px",
      fontWeight: 500,
      marginBottom: "-10px",
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
      width: "60%",
      height: "45px",
      marginTop: "5px",
      borderRadius: "8px",
      border: "1px solid rgba(255, 255, 255, 0.4)",
      outline: "none",
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
      padding: "25px 20px",
      maxWidth: "95%",
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

  emailTitle: {
    color: "#ffffff",
    fontSize: "26px",
    fontWeight: 600,
    textAlign: "center",
    margin: "0 0 5px",
  },

  inputContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
});

export default function EmailSection() {
  const classes = useStyles();

  const [inputVal, setInputVal] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { showEmailSection } = useSelector(
    (state: RootState) => state.ShowEmailSectionSlice,
  );

  const { codeSuccess } = useSelector(
    (state: RootState) => state.loadingSlice
  );

  useEffect(() => {
    function fixHeight() {
      if (showEmailSection) {
        document.body.style.overflow = "hidden";
        document.body.style.height = "100dvh";
      } else {
        document.body.style.overflow = "auto";
        document.body.style.height = "100dvh";
      }
    }

    fixHeight();

    // cleanup when component unmounts
    return () => {
      document.body.style.overflow = "auto";
      document.body.style.height = "100dvh";
    };
  }, [showEmailSection]);

  function handleSendCode() {
    dispatch({
      type: "FORGOT_PASSWORD_REQUEST",
      payload: {
        email: inputVal,
      },
    });
  }

  useEffect(() => {
    if (codeSuccess) {
      dispatch(setHideEmailSection());

      navigate("/verification-code");

      // reset immediately
      dispatch(fetchStopCodeSuccess());
    }
  }, [codeSuccess, navigate, dispatch]);

  return (
    <div className={classes.mainContainer}>
      <div
        className={classes.closeContainer}
        onClick={() => dispatch(setHideEmailSection())}
      >
        <HiMiniXMark />
      </div>

      <div className={classes.formContainer}>
        <h2 className={classes.emailTitle}>
          Email
        </h2>

        <div className={classes.inputContainer}>
          <input
            type="text"
            placeholder="Enter Your Email"
            id="email"
            name="email"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
          />
        </div>

        <button
          onClick={() => {
            handleSendCode();
          }}
        >
          send Code
        </button>
      </div>
    </div>
  );
}

