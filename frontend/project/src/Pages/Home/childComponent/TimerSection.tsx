import { useEffect, useState } from "react";

export default function TimerSection() {
  const timeLimit = 60;
  const [timer, setTimer] = useState(timeLimit);

  const [randomCode, setRandomCode] = useState(() =>
    Math.floor(10000 + Math.random() * 90000),
  );

  useEffect(() => {
    let time: number = timeLimit;
    const interval = setInterval(() => {
      if (time > 0) {
        time--;
        setTimer(time);
      } else {
        const newCode = Math.floor(10000 + Math.random() * 90000);
        setRandomCode(newCode);
        time = timeLimit; // Reset local variable
        setTimer(time); // Reset state
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);
  return (
    <div>
      remaining time {timer} seconds
      <h2>{randomCode}</h2>
    </div>
  );
}
