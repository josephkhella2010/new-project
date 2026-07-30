import { useEffect, useRef, useState } from "react";

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

      {/*       {timer === 0 && <button onClick={() => handleReset()}>reset code</button>}
      <div>{timer > 0 && <button>VerifyCode</button>}</div> */}

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
