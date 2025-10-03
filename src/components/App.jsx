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
      <div className="stars"></div>

      <div className="w-full max-w-[1200px] mx-auto text-center h-[100dvh]">
        <Cog6ToothIcon
          as={"button"}
          tabindex="0"
          onClick={() => setIsModalOpen(true)}
          className="fixed top-4 right-4 -ml-5 cursor-pointer rounded-full text-white opacity-50 transition-all duration-75 hover:opacity-100 h-8"
          aria-label="Open settings modal"
        />
        <h1 className="text-7xl caprasimo text-[#fec119] text-shadow-[0_0_40px_#fec119]">
          It's sleepy time...
        </h1>
        <div className="flex justify-between flex-col items-center gap-6 my-10 w-full px-2">
          <h2 className="text-[#e4af1d] font-serif text-2xl text-shadow-2xl">
            If you fall asleep in <span className="font-bold">{offsetInMins} minutes</span>, here
            are your ideal wake-up times for perfect, restful sleep.
          </h2>
          <p>Note: you can adjust your fall asleep time in the settings.</p>
          <div className="flex-wrap flex overflow-y-auto gap-3 w-full max-w-[800px] max-h-[50vh] no-scrollbar px-5 py-5">
            {sleepLengthArray.map((interval, index) => (
              <div
                key={index}
                className="grow first:mb-10 first:shadow-[0_0_10px_#fec119] first:text-6xl first:py-18 first:w-full gap-5 text-xl bg-black/20 backdrop-blur-sm py-4  px-8    rounded-2xl  flex flex-col  "
              >
                <p className="barlow text-amber-200">{formatTime(interval)}</p>
                <p className="text-xs opacity-40">{intervals[index]} hours</p>
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
