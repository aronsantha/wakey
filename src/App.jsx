import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [offsetInMins, setOffset] = useState(15);
  const offsetInMs = offsetInMins * 60 * 1000;
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  const step = 60 * 60 * 1000;
  const sevenAndAHalfHours = new Date(time.getTime() + offsetInMs + step * 7.5);
  const nineHours = new Date(time.getTime() + offsetInMs + step * 9);
  function formatTime(date) {
    return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric" });
  }

  return (
    <>
      <h1>Current time: {formatTime(time)}</h1>
      <h2>Recommended wakeup times:</h2>
      <p>{formatTime(sevenAndAHalfHours)}</p>
      <p>{formatTime(nineHours)}</p>
      <div>
        <button onClick={() => setOffset((offsetInMins) => offsetInMins + 15)}>
          Time to fall asleep is {offsetInMins} minutes
        </button>
      </div>
    </>
  );
}

export default App;
