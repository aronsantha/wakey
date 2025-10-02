import { useState, useEffect } from "react";
import { useStickyState } from "../hooks.js";
import RadialBar from "./RadialBar.jsx";
import BaseModal from "./BaseModal.jsx";
import { Cog6ToothIcon } from "@heroicons/react/20/solid";

function App() {
  const [offsetInMins, setOffset] = useStickyState(15, "time-to-fall-asleep");
  const [timeFormat, setTimeFormat] = useStickyState("12h", "time-format");
  const offsetInMs = offsetInMins * 60 * 1000;
  const [time, setTime] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  const step = 60 * 60 * 1000;
  const intervals = [9, 7.5, 6, 4.5, 3, 1.5];
  const sleepLengthArray = intervals.map(
    (hours) => new Date(time.getTime() + offsetInMs + hours * step)
  );

  function formatTime(date) {
    return date.toLocaleTimeString(timeFormat === "24h" ? "en-GB" : "en-US", {
      hour: "numeric",
      minute: "numeric",
    });
  }

  return (
    <>
      <div className="stars opacity-50"></div>
      <svg xmlns="http://www.w3.org/2000/svg" className="noise -z-[999]">
        <filter id="noise" x="0" y="0">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feBlend mode="darken" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" opacity="1" />
      </svg>
      <div className="w-full max-w-[1200px] mx-auto text-center">
        <Cog6ToothIcon
          as={"button"}
          tabindex="0"
          onClick={() => setIsModalOpen(true)}
          className="fixed top-4 right-4 -ml-5 cursor-pointer rounded-full text-white opacity-50 transition-all duration-75 hover:opacity-100 h-8"
          aria-label="Open settings modal"
        />
        <h1 className="pacifico">Time to sleep...</h1>
        <div className="flex justify-between flex-col items-center gap-6 my-10 w-full px-2">
          <h2>Pick one of the scientifically recommended wake up times for a restful sleep:</h2>
          <div className="overflow-y-auto  overflow-x-hidden  flex-wrap flex gap-3 w-full max-w-[800px] max-h-[50vh] no-scrollbar">
            {sleepLengthArray.map((interval, index) => (
              <div
                key={index}
                className="grow first:text-6xl first:w-full first:h-50 h-20 max-h-50 gap-y-1 text-3xl bg-black/40 backdrop-blur-sm py-4 first:py-6 px-6 first:px-12  overflow-hidden rounded-3xl flex-wrap flex justify-between items-center"
              >
                <p className="barlow">{formatTime(interval)}</p>
                <div className="h-full">
                  <RadialBar intervalHours={intervals[index]} ranking={5 - index} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 z-50 absolute">
          <BaseModal
            type={"info"}
            isOpen={isModalOpen}
            timeFormat={timeFormat}
            offsetInMins={offsetInMins}
            handleClose={() => setIsModalOpen(false)}
            handleSelectTimeFormat={(format) => () => setTimeFormat(format)}
            handleSelectOffset={(mins) => setOffset(mins)}
          />
        </div>
      </div>
    </>
  );
}

export default App;
