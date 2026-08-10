/* import { useEffect, useRef, useState } from "react";

interface PropsType {
  resetCode: () => void;
  verifyCode: () => void;
}
export default function Timer({ resetCode, verifyCode }: PropsType) {
  const intervalRef = useRef<number | null>(null);
  const [timer, setTimer] = useState(60);

  const startTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    const dateNow = new Date(Date.now());
    const dateWithMoreSecond = new Date(Date.now() + 60 * 1000);

    const diffTimer = Number(dateWithMoreSecond) - Number(dateNow);

    let time = Math.floor(diffTimer / 1000);

    intervalRef.current = window.setInterval(() => {
      String(time--);

      if (time >= 0) {
        setTimer(time);
      } else {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      }
    }, 1000);
  };

  useEffect(() => {
    const id = window.setTimeout(() => {
      startTimer();
    }, 0);

    return () => {
      clearTimeout(id);

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handleReset = () => {
    resetCode();
    startTimer();
  };

  return (
    <>
      <div>
        {" "}
        Timer is: {timer < 10 && timer > 0 ? `0${timer}` : timer} seconds left
      </div>

     

      <div>
        <button
          onClick={() => {
            verifyCode();
          }}
        >
          VerifyCode
        </button>
        <button onClick={() => handleReset()}>reset code</button>
      </div>
    </>
  );
}
 */
import { createUseStyles } from "react-jss";
import { useEffect, useRef, useState } from "react";

const useStyles = createUseStyles({
  timerContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "18px",
    marginTop: "25px",
    color: "#e5e7eb",
    fontSize: "15px",
    fontWeight: 500,
  },

  timerText: {
    padding: "10px 18px",
    borderRadius: "8px",
    backgroundColor: "#1f2937",
    border: "1px solid #4b5563",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
  },

  buttonsContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "12px",

    "@media (max-width: 500px)": {
      flexDirection: "column",
      width: "100%",
    },
  },

  button: {
    minWidth: "120px",
    height: "42px",
    padding: "8px 16px",
    borderRadius: "8px",
    border: "1px solid rgba(255, 255, 255, 0.35)",
    outline: "none",
    background:
      "linear-gradient(135deg, #43536c 0%, #33527c 45%, #283b68 100%)",
    color: "#ffffff",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
    boxShadow: "0 6px 15px rgba(0, 0, 0, 0.25)",
    transition: "all 0.2s ease",

    "&:hover": {
      border: "1px solid #ffffff",
      transform: "translateY(-2px)",
      boxShadow: "0 8px 18px rgba(0, 0, 0, 0.35)",
    },

    "&:active": {
      transform: "translateY(0)",
    },

    "@media (max-width: 500px)": {
      width: "100%",
    },
  },
});

interface PropsType {
  resetCode: () => void;
  verifyCode: () => void;
}

export default function Timer({ resetCode, verifyCode }: PropsType) {
  const classes = useStyles();

  const intervalRef = useRef<number | null>(null);
  const [timer, setTimer] = useState(60);

  const startTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    const dateNow = new Date(Date.now());
    const dateWithMoreSecond = new Date(Date.now() + 60 * 1000);

    const diffTimer = Number(dateWithMoreSecond) - Number(dateNow);

    let time = Math.floor(diffTimer / 1000);

    intervalRef.current = window.setInterval(() => {
      String(time--);

      if (time >= 0) {
        setTimer(time);
      } else {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      }
    }, 1000);
  };

  useEffect(() => {
    const id = window.setTimeout(() => {
      startTimer();
    }, 0);

    return () => {
      clearTimeout(id);

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handleReset = () => {
    resetCode();
    startTimer();
  };

  return (
    <div className={classes.timerContainer}>
      <div className={classes.timerText}>
        Timer is: {timer < 10 && timer > 0 ? `0${timer}` : timer} seconds left
      </div>

      <div className={classes.buttonsContainer}>
        <button
          className={classes.button}
          onClick={() => {
            verifyCode();
          }}
        >
          VerifyCode
        </button>

        <button className={classes.button} onClick={() => handleReset()}>
          reset code
        </button>
      </div>
    </div>
  );
}
