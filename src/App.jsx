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
  const intervals = [1.5, 3, 4.5, 6, 7.5, 9];
  const sleepLengthArray = intervals.map(
    (hours) => new Date(time.getTime() + offsetInMs + hours * step)
  );

  const sevenAndAHalfHours = sleepLengthArray[4];
  const nineHours = sleepLengthArray[5];

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
      <h1 className="pacifico">Time to sleep...</h1>
      <div className="flex justify-between flex-col gap-6 my-10 w-full">
        <h2>Recommended wakeup times:</h2>

        {sleepLengthArray
          .map((interval, index) => (
            <div
              key={index}
              className="bg-[#4d4756] py-2 px-10 rounded-2xl  flex items-center justify-between w-full "
            >
              <p className="text-3xl font-bold">{formatTime(interval)}</p>
              <div className="h-20 shrink-0">
                <RadialBar intervalHours={intervals[index]} ranking={index} />
              </div>
            </div>
          ))
          .reverse()}
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <button onClick={() => setOffset((offsetInMins) => offsetInMins + 15)}>
            If you fall asleep in {offsetInMins} mins.
          </button>
          <button onClick={() => setOffset(15)}>↩️</button>
        </div>
        <button onClick={toggleTimeFormat}>Currently using {timeFormat} clock.</button>
      </div>
    </>
  );
}

export default App;
