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

  const ONE_HOUR_MS = 60 * 60 * 1000;
  const SLEEP_CYCLE_INTERVALS = [9, 7.5, 6, 4.5, 3, 1.5];
  const sleepLengthArray = SLEEP_CYCLE_INTERVALS.map(
    (hours) => new Date(time.getTime() + offsetInMs + hours * ONE_HOUR_MS),
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

          <div className="flex w-full flex-col flex-wrap items-center gap-x-4 gap-y-1">
            {sleepLengthArray.map((interval, index) => {
              const widthPercentage = 100 - index * 10;
              return (
                <>
                  <div
                    key={index}
                    style={{ width: `${widthPercentage}%` }}
                    className="flex min-w-fit flex-col items-center justify-center gap-x-3 gap-y-1 rounded-t-sm rounded-b-4xl bg-black/40 px-3 py-2 text-lg shadow-[0_0_20px_white]/5 backdrop-blur-sm first:mb-6 first:flex-col first:gap-4 first:rounded-3xl first:border-2 first:border-amber-400/50 first:py-7 first:text-3xl first:text-amber-400 first:shadow-[0_0_10px_#fec119]"
                  >
                    <div className="grid h-lh">
                      <p className="font-digital col-1 row-1">
                        {formatTime(interval)}
                      </p>
                      <p className="font-digital col-1 row-1 opacity-15">
                        00:00
                      </p>
                    </div>
                    <p className="mt-auto text-xs tracking-wide text-white/25">
                      {SLEEP_CYCLE_INTERVALS[index]}h
                    </p>
                  </div>
                </>
              );
            })}
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
