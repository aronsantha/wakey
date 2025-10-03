import { useState, useEffect } from "react";
import { useStickyState } from "../hooks.js";
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
      {/* <div className="stars"></div> */}
      {/* <div className="flex flex-col gap-4 z-50 absolute">
        <BaseModal
          type={"info"}
          isOpen={isModalOpen}
          timeFormat={timeFormat}
          offsetInMins={offsetInMins}
          handleClose={() => setIsModalOpen(false)}
          handleSelectTimeFormat={(format) => () => setTimeFormat(format)}
          handleSelectOffset={(mins) => setOffset(mins)}
        />
      </div> */}
      <main className="flex flex-col gap-6 h-full px-4 py-8 text-center bg-red-300">
        <h1 className="text-4xl caprasimo text-[#fec119] text-shadow-[0_0_40px_#fec119]">
          It's sleepy time...
        </h1>
        <h2 className="text-[#e4af1d] font-serif text-xl text-shadow-2xl">
          If you fall asleep in <span className="font-bold">{offsetInMins} minutes</span>, here are
          your ideal wake-up times for perfect, restful sleep.
        </h2>
        <p className="text-xs">Note: you can adjust your fall asleep time in the settings.</p>
      </main>

      {/* <div className="flex px-3 h-12 items-center backdrop-blur-lg bg-neutral-900/50 justify-end fixed bottom-0 w-full">
        <Cog6ToothIcon
          as={"button"}
          tabIndex="0"
          onClick={() => setIsModalOpen(true)}
          className=" z-10   cursor-pointer rounded-full text-white opacity-50 transition-all duration-75 hover:opacity-100 h-8"
          aria-label="Open settings modal"
        />
      </div> */}
    </>
  );
}

export default App;
