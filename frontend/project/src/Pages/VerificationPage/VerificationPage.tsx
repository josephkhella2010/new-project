import { useCallback, useEffect, useRef, useState } from "react";
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
