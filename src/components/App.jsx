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

  const oneHourMs = 60 * 60 * 1000;
  const intervals = [9, 7.5, 6, 4.5, 3, 1.5];
  const sleepLengthArray = intervals.map(
    (hours) => new Date(time.getTime() + offsetInMs + hours * oneHourMs)
  );

  function formatTime(time) {
    return time.toLocaleTimeString("en-GB", {
      hour: "numeric",
      minute: "numeric",
    });
  }

  return (
    <>
      <div className="stars"></div>
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
      <div className="h-screen pb-40 flex flex-col md:justify-center items-center overflow-y-auto scroll-smooth">
        <footer className="z-50 flex px-3 h-14 items-center backdrop-blur-lg bg-neutral-900/50 justify-end fixed bottom-0 right-0 w-full">
          <Cog6ToothIcon
            as={"button"}
            onClick={() => setIsModalOpen(true)}
            className="p-2 z-10 cursor-pointer rounded-full text-white opacity-50 transition-all duration-75 hover:opacity-100 h-12"
            aria-label="Open settings modal"
          />
        </footer>
        <main className="flex flex-col gap-10 px-4 mt-16 text-center max-w-[600px]">
          <div className="flex flex-col gap-4 ">
            <h1 className="font-caprasimo text-5xl text-[#fec119] text-shadow-[0_0_40px_#fec119] mb-10">
              It's sleepy time...
            </h1>
            <h2 className="text-neutral-300 text-lg text-shadow-neutral-900 text-shadow-[0_0_2px]">
              If you fall asleep in{" "}
              <span className="font-bold text-[#fec119]">{offsetInMins || 0} minutes</span>*, these
              are the ideal wake-up times for perfect, refreshing sleep.
            </h2>
            <p className="text-xs text-neutral-400">*Note: you can adjust this in the settings.</p>
          </div>

          <div className="flex-wrap flex gap-3 w-full">
            {sleepLengthArray.map((interval, index) => (
              <div
                key={index}
                className="grow first:w-full first:shadow-[0_0_20px_#fec119]/10 first:shadow-amber-300 first:border-3 first:border-amber-400/20 border-black/10 border-4 items-center py-3 justify-center first:mb-3 first:text-amber-400/80 text-amber-400/60 first:text-5xl first:py-8  gap-x-3 first:gap-4 text-xl first:bg-black/40 bg-black/20 backdrop-blur-sm px-3 rounded-2xl flex flex-row first:flex-col"
              >
                <div className="h-lh grid">
                  <p className="col-1 row-1 font-digital ">{formatTime(interval)}</p>
                  <p className="col-1 row-1 font-digital opacity-15">00:00</p>
                </div>
                <p className="text-xs text-white/25 mt-auto">{intervals[index]} hours</p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
