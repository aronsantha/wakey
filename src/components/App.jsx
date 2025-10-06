import { useState, useEffect } from "react";
import { useStickyState } from "../hooks.js";
import BaseModal from "./BaseModal.jsx";
import { Cog6ToothIcon, MoonIcon } from "@heroicons/react/24/solid";

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
      <div className="stars hidden md:block"></div>
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
        <main className="mt-16 flex max-w-[600px] flex-col px-4 text-center">
          <div className="mb-14 flex flex-col gap-4">
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

          <div className="flex w-full flex-row flex-wrap items-center gap-x-2 gap-y-2">
            {sleepLengthArray.map((interval, index) => {
              const widthPercentage = 100 - index * 10;
              const heightPercent = index * 20;
              return (
                <div
                  key={index}
                  // style={{ width: `${widthPercentage}%` }}
                  className="min-w-fit grow rounded-md bg-black/40 px-3 py-2 text-lg shadow-[0_0_20px_white]/5 backdrop-blur-sm first:mb-2 first:w-full first:rounded-xl first:py-5 first:text-3xl first:text-amber-400 first:shadow-[0_0_10px_#fec119]/80"
                >
                  <div className="flex h-lh flex-row items-center justify-center gap-x-3 gap-y-1">
                    <div
                      className="grid h-full items-center"
                      aria-label={SLEEP_CYCLE_INTERVALS[index] + " " + "hours"}
                      title={SLEEP_CYCLE_INTERVALS[index] + " " + "hours"}
                      hours
                    >
                      <MoonIcon className="col-1 row-1 h-[60%] text-white/5" />
                      <MoonIcon
                        className="col-1 row-1 h-[60%] text-amber-400"
                        style={{
                          clipPath: `inset(${heightPercent}% 0 0  0)`,
                        }}
                      />
                    </div>
                    <div className="flex items-end gap-1">
                      <div className="grid">
                        <p className="font-digital col-1 row-1">
                          {formatTime(interval)}
                        </p>
                        <p className="font-digital col-1 row-1 opacity-5">
                          00:00
                        </p>
                      </div>
                      {/* <p className="mb-px text-[8px] tracking-wide text-white/30">
                        AM
                      </p> */}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
