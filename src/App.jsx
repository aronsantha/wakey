import { useState, useEffect } from "react";
import { useStickyState } from "./hooks.js";
import RadialBar from "./RadialBar.jsx";

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
      <div className="stars"></div>
      <svg xmlns="http://www.w3.org/2000/svg" className="noise">
        <filter id="noise" x="0" y="0">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feBlend mode="screen" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" opacity="0.5" />
      </svg>
      <div className=" w-full max-w-[1200px] mx-auto text-center">
        <h1 className="pacifico">Time to sleep...</h1>
        <div className="flex justify-between flex-col items-center gap-6 my-10 w-full px-2">
          <h2>Recommended wakeup times:</h2>
          <div className="overflow-auto h-[500px] flex flex-col gap-3 w-full  max-w-[800px] no-scrollbar">
            {sleepLengthArray
              .map((interval, index) => (
                <div
                  key={index}
                  className="bg-black/40 backdrop-blur-sm py-5 px-10 rounded-2xl flex justify-between items-center gap-4 "
                >
                  <p className="text-5xl  barlow ">{formatTime(interval)}</p>
                  <div className="h-20 shrink-0">
                    <RadialBar intervalHours={intervals[index]} ranking={index} />
                  </div>
                </div>
              ))
              .reverse()}
          </div>
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
      </div>
    </>
  );
}

export default App;
