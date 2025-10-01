import { useState, useEffect } from "react";
import { useStickyState } from "./hooks.js";
import "./App.css";
import BatterySvg from "./assets/battery.svg";

function App() {
  const [offsetInMins, setOffset] = useStickyState(15, "time-to-fall-asleep");
  const [timeFormat, setTimeFormat] = useStickyState("12h", "time-format");
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

  // TODO: add ability to switch between 12h and 24h format, save in localstorage
  // TODO: add ability to set time it takes to fall asleep, save in localstorage
  function formatTime(date) {
    return date.toLocaleTimeString(timeFormat === "24h" ? "en-GB" : "en-US", {
      hour: "numeric",
      minute: "numeric",
    });
  }
  const toggleTimeFormat = () => {
    setTimeFormat((prevFormat) => (prevFormat === "12h" ? "24h" : "12h"));
  };

  return (
    <>
      <h1>Current time: {formatTime(time)}</h1>
      <img
        src={BatterySvg}
        alt="Battery"
        style={{ background: "red", height: "100px", width: "120px" }}
      />

      <h2>Recommended wakeup times:</h2>
      <p>{formatTime(sevenAndAHalfHours)}</p>
      <p>{formatTime(nineHours)}</p>
      <div>
        <button onClick={() => setOffset((offsetInMins) => offsetInMins + 15)}>
          Time to fall asleep is {offsetInMins} minutes
        </button>
        <button onClick={toggleTimeFormat}>Currently using {timeFormat} clock.</button>
      </div>
    </>
  );
}

export default App;
