import { useState, useEffect } from "react";
import { useStickyState } from "./hooks.js";
import RadialBar from "./RadialBar.jsx";
import "./App.css";

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
      <h2>Recommended wakeup times:</h2>
      <div className=" flex justify-between flex-col gap-6 my-10">
        <div className="bg-[#4d4756] py-5 px-10 rounded-2xl flex items-center  justify-between">
          <p className="text-3xl font-bold">{formatTime(sevenAndAHalfHours)}</p>
          <div className="h-20">
            <RadialBar hours={"7.5"} ranking={4} />
          </div>
        </div>

        <div className="bg-[#4d4756] py-5 px-10 rounded-2xl flex items-center  justify-between">
          <p className="text-3xl font-bold">{formatTime(nineHours)}</p>
          <div className="h-20">
            <RadialBar hours={"9"} ranking={5} />
          </div>
        </div>
      </div>

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
