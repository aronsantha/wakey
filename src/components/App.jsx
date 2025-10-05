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
    (hours) => new Date(time.getTime() + offsetInMs + hours * oneHourMs),
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
      <div className="absolute z-50 flex flex-col gap-4">
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
      <div className="flex h-screen flex-col items-center overflow-y-auto scroll-smooth pb-40 md:justify-center">
        <footer className="fixed right-0 bottom-0 z-50 flex h-12 w-full items-center justify-end bg-neutral-900/50 px-3 backdrop-blur-lg">
          <Cog6ToothIcon
            as={"button"}
            onClick={() => setIsModalOpen(true)}
            className="z-10 h-10 cursor-pointer rounded-full p-2 text-white opacity-50 transition-all duration-75 hover:opacity-100"
            aria-label="Open settings modal"
          />
        </footer>
        <main className="mt-16 flex max-w-[600px] flex-col gap-8 px-4 text-center">
          <div className="flex flex-col gap-4">
            <h1 className="font-caprasimo mb-8 text-4xl text-[#fec119] text-shadow-[0_0_40px_#fec119]">
              It's sleepy time...
            </h1>
            <h2 className="text-neutral-300 text-shadow-[0_0_2px] text-shadow-neutral-900">
              If you fall asleep in{" "}
              <span className="font-bold text-[#fec119]">
                {offsetInMins || 0} minutes
              </span>
              , these are the ideal wake-up times for a refreshing sleep:
            </h2>
          </div>

          <div className="flex w-full flex-wrap gap-x-4 gap-y-2">
            {sleepLengthArray.map((interval, index) => (
              <div
                key={index}
                className="flex grow flex-row items-center justify-center gap-x-3 rounded-xl border-3 border-black/10 bg-black/20 px-3 py-2 text-lg text-amber-400/70 backdrop-blur-sm first:mb-3 first:w-full first:flex-col first:gap-4 first:border-3 first:border-amber-400/20 first:bg-black/40 first:py-6 first:text-3xl first:text-amber-400/80 first:shadow-[0_0_20px_#fec119]/10 first:shadow-amber-300"
              >
                <div className="grid h-lh">
                  <p className="font-digital col-1 row-1">
                    {formatTime(interval)}
                  </p>
                  <p className="font-digital col-1 row-1 opacity-15">00:00</p>
                </div>
                <p className="mt-auto text-xs tracking-wide text-white/25">
                  {intervals[index]}h
                </p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
