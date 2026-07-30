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
