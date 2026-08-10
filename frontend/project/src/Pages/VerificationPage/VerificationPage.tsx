/* import { useCallback, useEffect, useRef, useState } from "react";
import { createUseStyles } from "react-jss";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../Redux/store/store";
import Timer from "./childComponent/Timer";
import ChangePasswordSection from "../../utilities/Common/ChangePasswordSection";
import { setShowPasswordSection } from "../../Redux/slices/Common/ShowChangePassword";
import { fetchStopCodeCorrect } from "../../Redux/slices/loadAndErrorSlice/loadAndErrorSlice";

const useStyles = createUseStyles({
  inputsContainer: {
    display: "flex",
    gap: "10px",
  },
  inputs: {
    width: "30px",
    height: "50px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
});

export default function VerificationPage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { showPasswordSection } = useSelector(
    (state: RootState) => state.ShowPasswordSectionSlice,
  );
  const { codeCorrect } = useSelector((state: RootState) => state.loadingSlice);
  const { users } = useSelector((state: RootState) => state.userSlice);
  const { isSuccess } = useSelector((state: RootState) => state.loadingSlice);
  const id = localStorage.getItem("id");
  const findUser = users.find((u) => u._id === id);
  const inputsArr = Array.from({ length: 5 }, (_, i) => i);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [inputsVal, setInputsVal] = useState<string[]>(new Array(5).fill(""));
  const collectedCode = inputsVal.join("");
  const focusInput = useCallback((index: number) => {
    inputRefs.current[index]?.focus();
  }, []);

  /////////////////////////// functions ///////

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    const pastedCode = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 5);

    if (!pastedCode) return;

    const values = pastedCode.split("");

    setInputsVal((prev) => {
      const newValues = [...prev];

      values.forEach((value, index) => {
        newValues[index] = value;
      });

      return newValues;
    });

    // focus last filled input
    const lastIndex = values.length - 1;
    focusInput(lastIndex);
  };

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const value = e.target.value.replace(/\D/g, "");

    setInputsVal((prev) => {
      const newValues = [...prev];
      newValues[index] = value;
      return newValues;
    });

    if (value && index < inputsArr.length - 1) {
      focusInput(index + 1);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && inputsVal[index] === "" && index > 0) {
      focusInput(index - 1);
    }
  };

  function resetCode() {
    if (!id) return;

    dispatch({
      type: "RESEND_CODE_REQUEST",
      payload: {
        resetToken: id,
      },
    });
  }

  function verifyCode() {
    if (!id) return;

    dispatch({
      type: "CHECK_CODE_REQUEST",
      payload: {
        resetToken: id,
        code: Number(collectedCode),
      },
    });
  }
  useEffect(() => {
    if (codeCorrect) {
      dispatch(setShowPasswordSection());

      dispatch(fetchStopCodeCorrect());
    }
  }, [codeCorrect, dispatch]);
  useEffect(() => {
    dispatch({ type: "USERS_REQUEST" });
  }, [dispatch]);

  //console.log("inputsVal:", inputsVal);
  console.log("collectedCode:", collectedCode);
  console.log("findUser", findUser);
  console.log("isSuccess", isSuccess);

  return (
    <div>
      <h1>verification-code</h1>

      <p> Your code is :{findUser?.verificationCode}</p>

      <div className={classes.inputsContainer}>
        {inputsArr.map((_, index) => (
          <input
            key={index}
            className={classes.inputs}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            maxLength={1}
            inputMode="numeric"
            value={inputsVal[index]}
            onChange={(e) => handleInput(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
          />
        ))}
      </div>
      <Timer resetCode={resetCode} verifyCode={verifyCode} />
      {showPasswordSection && <ChangePasswordSection />}
    </div>
  );
}
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { createUseStyles } from "react-jss";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../Redux/store/store";
import Timer from "./childComponent/Timer";
import ChangePasswordSection from "../../utilities/Common/ChangePasswordSection";
import { setShowPasswordSection } from "../../Redux/slices/Common/ShowChangePassword";
import { fetchStopCodeCorrect } from "../../Redux/slices/loadAndErrorSlice/loadAndErrorSlice";

const useStyles = createUseStyles({
  mainContainer: {
    minHeight: "100vh",
    width: "100%",
    backgroundColor: "#1f2937",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "30px 20px",
    boxSizing: "border-box",
    position: "relative",
  },

  verificationCard: {
    width: "100%",
    maxWidth: "500px",
    padding: "40px",
    boxSizing: "border-box",
    borderRadius: "20px",
    background:
      "linear-gradient(135deg, #43536c 0%, #33527c 45%, #283b68 100%)",
    boxShadow: "0 20px 45px rgba(0, 0, 0, 0.35)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",

    "@media (max-width: 600px)": {
      padding: "30px 20px",
      width: "95%",
    },

    "@media (max-width: 400px)": {
      padding: "25px 15px",
    },
  },

  title: {
    color: "#ffffff",
    fontSize: "30px",
    fontWeight: 600,
    margin: 0,
    textAlign: "center",

    "@media (max-width: 500px)": {
      fontSize: "25px",
    },
  },

  codeText: {
    color: "#e5e7eb",
    fontSize: "15px",
    margin: "0 0 10px",
    textAlign: "center",

    "& span": {
      color: "#ffffff",
      fontWeight: 700,
      letterSpacing: "2px",
    },
  },

  inputsContainer: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
    alignItems: "center",
    margin: "10px 0",

    "@media (max-width: 450px)": {
      gap: "6px",
    },
  },

  inputs: {
    width: "50px",
    height: "55px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    borderRadius: "8px",
    border: "1px solid #9ca3af",
    outline: "none",
    backgroundColor: "#f9fafb",
    color: "#1f2937",
    fontSize: "22px",
    fontWeight: 600,
    boxSizing: "border-box",
    transition: "all 0.2s ease",

    "&:focus": {
      border: "2px solid #ffffff",
      boxShadow: "0 0 0 3px rgba(255, 255, 255, 0.15)",
      transform: "translateY(-2px)",
    },

    "@media (max-width: 450px)": {
      width: "42px",
      height: "50px",
      fontSize: "20px",
    },

    "@media (max-width: 350px)": {
      width: "38px",
      height: "46px",
      fontSize: "18px",
    },
  },
});

export default function VerificationPage() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { showPasswordSection } = useSelector(
    (state: RootState) => state.ShowPasswordSectionSlice,
  );

  const { codeCorrect } = useSelector((state: RootState) => state.loadingSlice);

  const { users } = useSelector((state: RootState) => state.userSlice);

  const { isSuccess } = useSelector((state: RootState) => state.loadingSlice);

  const id = localStorage.getItem("id");

  const findUser = users.find((u) => u._id === id);

  const inputsArr = Array.from({ length: 5 }, (_, i) => i);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [inputsVal, setInputsVal] = useState<string[]>(new Array(5).fill(""));

  const collectedCode = inputsVal.join("");

  const focusInput = useCallback((index: number) => {
    inputRefs.current[index]?.focus();
  }, []);

  /* functions */

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    const pastedCode = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 5);

    if (!pastedCode) return;

    const values = pastedCode.split("");

    setInputsVal((prev) => {
      const newValues = [...prev];

      values.forEach((value, index) => {
        newValues[index] = value;
      });

      return newValues;
    });

    // focus last filled input
    const lastIndex = values.length - 1;
    focusInput(lastIndex);
  };

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const value = e.target.value.replace(/\D/g, "");

    setInputsVal((prev) => {
      const newValues = [...prev];
      newValues[index] = value;
      return newValues;
    });

    if (value && index < inputsArr.length - 1) {
      focusInput(index + 1);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && inputsVal[index] === "" && index > 0) {
      focusInput(index - 1);
    }
  };

  function resetCode() {
    if (!id) return;

    dispatch({
      type: "RESEND_CODE_REQUEST",
      payload: {
        resetToken: id,
      },
    });
  }

  function verifyCode() {
    if (!id) return;

    dispatch({
      type: "CHECK_CODE_REQUEST",
      payload: {
        resetToken: id,
        code: Number(collectedCode),
      },
    });
  }

  useEffect(() => {
    if (codeCorrect) {
      dispatch(setShowPasswordSection());

      dispatch(fetchStopCodeCorrect());
    }
  }, [codeCorrect, dispatch]);

  useEffect(() => {
    dispatch({ type: "USERS_REQUEST" });
  }, [dispatch]);

  //console.log("inputsVal:", inputsVal);
  console.log("collectedCode:", collectedCode);
  console.log("findUser", findUser);
  console.log("isSuccess", isSuccess);

  return (
    <div className={classes.mainContainer}>
      <div className={classes.verificationCard}>
        <h1 className={classes.title}>Verification Code</h1>

        <p className={classes.codeText}>
          Your code is : <span>{findUser?.verificationCode}</span>
        </p>

        <div className={classes.inputsContainer}>
          {inputsArr.map((_, index) => (
            <input
              key={index}
              className={classes.inputs}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              maxLength={1}
              inputMode="numeric"
              value={inputsVal[index]}
              onChange={(e) => handleInput(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
            />
          ))}
        </div>

        <Timer resetCode={resetCode} verifyCode={verifyCode} />

        {showPasswordSection && <ChangePasswordSection />}
      </div>
    </div>
  );
}
