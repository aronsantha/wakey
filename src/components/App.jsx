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
      <div className="h-screen flex flex-col md:justify-center items-center overflow-y-auto">
        {/* <div className="z-50 flex px-3 h-12 items-center backdrop-blur-lg bg-neutral-900/50 justify-end fixed bottom-0 w-full">
          <Cog6ToothIcon
            as={"button"}
            tabIndex="0"
            onClick={() => setIsModalOpen(true)}
            className=" z-10   cursor-pointer rounded-full text-white opacity-50 transition-all duration-75 hover:opacity-100 h-8"
            aria-label="Open settings modal"
          />
        </div> */}
        <main className="flex flex-col gap-4 px-4 py-8 text-center">
          <h1 className="font-caprasimo text-5xl text-[#fec119] text-shadow-[0_0_40px_#fec119] m-6">
            It's sleepy time...
          </h1>
          <h2 className="text-neutral-300 text-xl  text-shadow-2xl">
            If you fall asleep in{" "}
            <span className="font-bold text-[#fec119]">{offsetInMins} minutes*</span>, these are the
            ideal wake-up times for perfect, refreshing sleep.
          </h2>
          <p className="text-xs text-neutral-400">*Note: you can adjust this in the settings.</p>
        </main>
        <div className="flex-wrap flex gap-3 w-full max-w-[800px] px-5 pt-5 mb-20 pb-10 ">
          {sleepLengthArray.map((interval, index) => (
            <div
              key={index}
              className="grow items-center first:mb-3 first:shadow-[0_0_20px_#fec119]/20 first:text-4xl   text-[#fec119]/80 first:py-5 first:w-full gap-2 first:gap-4 text-xl bg-black/40  backdrop-blur-sm py-3 px-8 rounded-2xl flex flex-col"
            >
              <div className="h-lh mx-auto relative w-full">
                <p className="font-digital absolute left-[50%] -translate-x-[50%]">
                  {formatTime(interval)}
                </p>
                <p className="font-digital absolute opacity-10 left-[50%] -translate-x-[50%]">
                  00:00
                </p>
              </div>
              <p className="text-xs text-neutral-400">{intervals[index]} hours</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
