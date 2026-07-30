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
