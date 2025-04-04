// import { useState, useRef } from "react";
// import ResultModal from "./ResultModal";

// export default function TimerChange({ title, targetTime }) {
//   const [timeExpired, setTimeExpired] = useState(false);
//   const [timeStarted, setTimeStarted] = useState(false);
//   const [result, setResult] = useState(""); 
//   const [timeLeft, setTimeLeft] = useState(targetTime); 
//   const [score, setScore] = useState(0);

//   const timer = useRef();
//   const startTime = useRef();

//   function handleStart() {
//     startTime.current = Date.now(); 
//     timer.current = setTimeout(() => {
//       setTimeExpired(true); 
//       setResult("Lost");
//       setScore(0); 
//     }, targetTime * 1000);
//     setTimeStarted(true);
//   }

//   function handleStop() {
//     clearTimeout(timer.current);
//     const elapsedTime = (Date.now() - startTime.current) / 1000; 
//     const remainingTime = Math.max(0, targetTime - elapsedTime).toFixed(2);
//     setTimeLeft(remainingTime);
//     setResult("Won"); 
//     const calculatedScore = Math.floor(remainingTime * 10); 
//     setScore(calculatedScore);
//     setTimeStarted(false);
//   }

//   return (
//     <section className="challenge">
//       <h2>{title}</h2>
//       {timeExpired && <p>You Lost!</p>}
//       <p className="challenge-time">
//         {targetTime} second{targetTime > 1 ? "s" : ""}
//       </p>
//       <p>
//         <button onClick={timeStarted ? handleStop : handleStart}>
//           {timeStarted ? "Stop" : "Start"} challenge
//         </button>
//       </p>
//       <p>{timeStarted ? "Time is running..." : "Timer inactive"}</p>

//       {/* Show ResultModal for both "Won" and "Lost" */}
//       {(timeExpired || result) && (
//         <ResultModal
//           result={result}
//           targetTime={targetTime}
//           timeLeft={timeLeft}
//           score={score}
//         />
//       )}
//     </section>
//   );
// }

import { useState, useRef, useEffect } from "react";
import ResultModal from "./ResultModal";

export default function TimerChange({ title, targetTime }) {
  const [timeExpired, setTimeExpired] = useState(false);
  const [timeStarted, setTimeStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [result, setResult] = useState("");
  const [score, setScore] = useState(0);
  const [clicks, setClicks] = useState(0);
  const [timeLeft, setTimeLeft] = useState(targetTime); // Track remaining time

  const timer = useRef();
  const startTime = useRef();
  const pauseTime = useRef();

  function handleStart() {
    setTimeStarted(true);
    setTimeExpired(false);
    setIsPaused(false);
    setClicks(0);
    setScore(0);
    setResult("");

    startTime.current = Date.now();
    setTimeLeft(targetTime);

    timer.current = setInterval(() => {
      const elapsed = (Date.now() - startTime.current) / 1000;
      const remaining = Math.max(0, targetTime - elapsed);
      setTimeLeft(remaining.toFixed(2));

      if (remaining <= 0) {
        clearInterval(timer.current);
        setTimeExpired(true);
        setResult("Time Up!");
        setTimeStarted(false);
      }
    }, 100);
  }

  function handleStop() {
    clearInterval(timer.current);
    setTimeExpired(true);
    setResult("Stopped");
    setTimeStarted(false);
  }

  function handlePause() {
    clearInterval(timer.current);
    setIsPaused(true);
    pauseTime.current = Date.now();
  }

  function handleResume() {
    setIsPaused(false);
    const pausedDuration = (Date.now() - pauseTime.current) / 1000;
    startTime.current += pausedDuration * 1000;

    timer.current = setInterval(() => {
      const elapsed = (Date.now() - startTime.current) / 1000;
      const remaining = Math.max(0, targetTime - elapsed);
      setTimeLeft(remaining.toFixed(2));

      if (remaining <= 0) {
        clearInterval(timer.current);
        setTimeExpired(true);
        setResult("Time Up!");
        setTimeStarted(false);
      }
    }, 100);
  }

  function handleClick() {
    if (timeStarted && !isPaused) {
      setClicks((prev) => prev + 1);
    }
  }

  // Update score when the game stops
  useEffect(() => {
    if (timeExpired) {
      setScore(clicks);
    }
  }, [timeExpired, clicks]);

  return (
    <section className="challenge">
      <h2>{title}</h2>
      <p className="challenge-time">Target: {targetTime} seconds</p>
      <p>Remaining Time: {timeLeft} seconds</p>

      <p>
        {!timeStarted && !isPaused && <button onClick={handleStart}>Start Challenge</button>}
        {timeStarted && !isPaused && <button onClick={handlePause}>Pause</button>}
        {isPaused && <button onClick={handleResume}>Resume</button>}
        {timeStarted && <button onClick={handleStop}>Stop</button>}
      </p>

      <p>{timeStarted ? "Time is running..." : isPaused ? "Paused" : "Timer inactive"}</p>

      {/* Click Counter Game */}
      {timeStarted && !isPaused && (
        <div className="game">
          <p>Click as many times as you can!</p>
          <button onClick={handleClick} style={{ padding: "10px 20px", fontSize: "16px" }}>
            Click Me! ({clicks})
          </button>
        </div>
      )}

      {/* Show ResultModal when the game ends */}
      {timeExpired && (
        <ResultModal result={result} targetTime={targetTime} timeLeft={timeLeft} score={score} />
      )}
    </section>
  );
}


