import { useState, useEffect } from "react";
import { useStickyState } from "../hooks.js";
import BaseModal from "./BaseModal.jsx";
import {
  Cog6ToothIcon,
  InformationCircleIcon,
  SparklesIcon,
} from "@heroicons/react/20/solid";

function App() {
  const ONE_HOUR_MS = 60 * 60 * 1000;
  const SLEEP_CYCLE_INTERVALS = [9, 7.5, 6, 4.5, 3, 1.5];
  const LOCALE_FORMAT_MAP = { "12h": "en-US", "24h": "en-GB" };
  const DEFAULT_FALL_ASLEEP_MINUTES = 15;
  const MAX_FALL_ASLEEP_MINUTES = 90;

  const [offsetInMins, setOffset] = useStickyState(
    DEFAULT_FALL_ASLEEP_MINUTES,
    "time-to-fall-asleep",
  );
  const [timeFormat, setTimeFormat] = useStickyState("12h", "time-format");
  const offsetInMs = offsetInMins * 60 * 1000;
  const [time, setTime] = useState(new Date());
  const [shownModal, setShownModal] = useState("");

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  const sleepLengthArray = SLEEP_CYCLE_INTERVALS.map(
    (hours) => new Date(time.getTime() + offsetInMs + hours * ONE_HOUR_MS),
  );

  function formatTime(time) {
    const timeString = time.toLocaleTimeString(LOCALE_FORMAT_MAP[timeFormat], {
      hour: "2-digit",
      minute: "2-digit",
    });

    return {
      time: timeString.split(" ")[0],
      timeOfDay: timeString.split(" ")[1],
    };
  }

  const settingsModalContent = (
    <div className="mx-auto flex flex-col justify-center px-4 pb-6 text-center">
      <h2 className="mt-8 mb-2 font-bold">Fall asleep time</h2>
      <p className="text-xs text-neutral-500">
        The calculator includes the time it takes to fall asleep, which is 15
        minutes for most people. You can tweak this number to better align with
        your own sleep habits. (Limit: {MAX_FALL_ASLEEP_MINUTES} minutes){" "}
      </p>
      <div className="mx-auto mt-6 flex max-w-fit flex-row overflow-clip rounded-3xl bg-neutral-800">
        <button
          onClick={() => offsetInMins > 0 && setOffset(offsetInMins - 5)}
          className="font-digital text-md flex w-20 cursor-pointer items-center justify-center rounded-l-3xl rounded-r-3xl bg-neutral-900"
        >
          -
        </button>
        <div className="flex w-full flex-col items-center justify-center gap-1 py-2">
          <div className="grid text-xl text-amber-400/80">
            <p className="font-digital col-1 row-1 ml-auto">{offsetInMins}</p>
            <p className="font-digital col-1 row-1 opacity-5">00</p>
          </div>

          <p className="text-xs text-neutral-400">minutes</p>
        </div>
        <button
          className="font-digital text-md flex w-20 cursor-pointer items-center justify-center rounded-l-3xl rounded-r-3xl bg-neutral-900"
          onClick={() =>
            offsetInMins < MAX_FALL_ASLEEP_MINUTES &&
            setOffset(offsetInMins + 5)
          }
        >
          +
        </button>
      </div>

      <h2 className="mt-8 mb-2 font-bold">Time format</h2>
      <p className="text-xs text-neutral-500">
        Time will be displayed in your selected time format.
      </p>
      <div className="mx-auto mt-6 flex flex-row items-center gap-2">
        <button
          onClick={() => setTimeFormat("12h")}
          className={`cursor-pointer rounded-md px-4 py-2 text-sm font-semibold text-white ${
            timeFormat === "12h"
              ? "outline-1 outline-amber-400/80"
              : "bg-neutral-900"
          }`}
        >
          12-hour
        </button>
        <button
          onClick={() => setTimeFormat("24h")}
          className={`cursor-pointer rounded-md px-4 py-2 text-sm font-semibold text-white ${
            timeFormat === "24h"
              ? "outline-1 outline-amber-400/80"
              : "bg-neutral-900"
          }`}
        >
          24-hour
        </button>
      </div>
    </div>
  );

  const aboutModalContent = (
    <div className="mx-auto flex flex-col justify-center px-4 pb-6 text-left">
      <h2 className="mt-8 mb-3 font-bold">How sleep works</h2>
      <p className="text-sm text-neutral-500">
        Our sleep naturally follows cycles of about 90 minutes, where each cycle
        goes through the stages of light sleep, deep sleep, and REM.
      </p>
      <p className="mt-3 text-sm text-neutral-500">
        Waking up during deep sleep can leave us feeling drained, even after a
        full night's rest. But if we wake closer to the end of a sleep cycle,
        we're more likely to wake up feeling refreshed.
      </p>

      <h2 className="mt-8 mb-3 font-bold">Tailored for you</h2>
      <p className="text-sm text-neutral-500">
        Wakey helps you find the ideal time to wake up rested, ready for the
        day. You can also customise your experience by setting how long it takes
        you to fall asleep, and choosing your preferred time format.
      </p>
      <div className="mt-8 flex items-center justify-center text-amber-400">
        <p className="font-caprasimo">Sleep tight!</p>
        <SparklesIcon className="ml-1 w-3 pb-2" />
      </div>
    </div>
  );

  // const timeCard = (

  // )

  const ModalMap = {
    SETTINGS: settingsModalContent,
    ABOUT: aboutModalContent,
  };

  return (
    <>
      <div className="stars hidden md:block"></div>
      <div className="absolute z-50 flex flex-col gap-4">
        <BaseModal
          modalTitle={shownModal}
          isOpen={Boolean(shownModal)}
          timeFormat={timeFormat}
          handleClose={() => setShownModal("")}
          children={shownModal && ModalMap[shownModal]}
        />
      </div>
      <div className="flex h-screen flex-col items-center overflow-y-auto scroll-smooth pb-40 md:justify-center">
        <footer className="fixed right-0 bottom-0 z-50 h-12 w-full bg-neutral-900/50 px-3 backdrop-blur-lg">
          <div className="mx-auto flex h-full w-full max-w-[800px] items-center justify-between px-4">
            <button
              onClick={() => setShownModal("ABOUT")}
              className="z-10 h-10 w-10 cursor-pointer rounded-full p-2 text-white opacity-50 transition-all duration-75 hover:opacity-100 focus:ring-2 focus:ring-white focus:outline-none"
              style={{
                opacity: shownModal === "ABOUT" && "1",
              }}
              aria-label="Open about modal"
            >
              <InformationCircleIcon className="h-full w-full" />
            </button>
            <h1 className="font-caprasimo pb-1 text-2xl text-white/30">
              wakey
            </h1>
            <button
              onClick={() => setShownModal("SETTINGS")}
              className="z-10 h-10 w-10 cursor-pointer rounded-full p-2 text-white opacity-50 transition-all duration-75 hover:opacity-100 focus:ring-2 focus:ring-white focus:outline-none"
              style={{
                opacity: shownModal === "SETTINGS" && "1",
              }}
              aria-label="Open settings modal"
            >
              <Cog6ToothIcon className="h-full w-full" />
            </button>
          </div>
        </footer>
        <main className="mt-16 flex max-w-[500px] flex-col px-4 text-center">
          <div className="mb-14 flex flex-col gap-4">
            <h1 className="font-caprasimo mb-8 text-4xl text-[#fec119]">
              It's sleepy time...
            </h1>
            <h2 className="text-neutral-300 text-shadow-[0_0_2px] text-shadow-neutral-900">
              If you fall asleep in{" "}
              <button
                className="inline cursor-pointer font-bold text-[#fec119]"
                onClick={() => setShownModal("SETTINGS")}
              >
                {offsetInMins || 0} minutes
              </button>
              , these are the ideal wake-up times for a refreshing sleep:
            </h2>
          </div>

          <div className="flex w-full flex-row flex-wrap items-center gap-x-2 gap-y-2">
            {sleepLengthArray.map((interval, index) => {
              const heightPercent = index * 20;
              return (
                <div
                  key={index}
                  className="min-w-fit grow rounded-md bg-black/40 px-3 py-2 text-lg shadow-[0_0_20px_white]/5 backdrop-blur-sm first:mb-3 first:w-full first:rounded-xl first:py-5 first:text-3xl first:text-amber-400 first:shadow-[0_0_10px_#fec119]/60"
                >
                  <div className="flex h-lh flex-row items-center justify-center gap-x-3 gap-y-1">
                    <div
                      className="grid h-2/3 max-w-[15px] items-center"
                      aria-label={SLEEP_CYCLE_INTERVALS[index] + " " + "hours"}
                      title={SLEEP_CYCLE_INTERVALS[index] + " " + "hours"}
                    >
                      <svg
                        className="col-1 row-1 text-white/5"
                        fill="currentColor"
                        height="100%"
                        width="100%"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 32 32"
                        xml:space="preserve"
                      >
                        <g>
                          <path
                            d="M17,4c-0.2,0-0.5,0-0.7,0l-0.1,0c-0.4,0-0.8,0.4-0.9,0.8s0.1,0.9,0.5,1.1C18.4,7.3,20,10,20,13c0,4.4-3.6,8-8,8
		c-2.3,0-4.6-1-6.1-2.8c-0.3-0.3-0.8-0.4-1.2-0.3c-0.4,0.2-0.6,0.6-0.6,1.1c1,6.4,6.4,11,12.8,11c7.2,0,13-5.8,13-13S24.2,4,17,4z"
                          />
                          <path
                            d="M6,13.2C6.1,13.7,6.5,14,7,14s0.9-0.3,1-0.8c0.5-2.2,1-2.7,3.3-3.3C11.7,9.9,12,9.5,12,9s-0.3-0.9-0.8-1C9,7.5,8.5,7,8,4.8
		C7.9,4.3,7.5,4,7,4S6.1,4.3,6,4.8C5.5,7,5,7.5,2.8,8C2.3,8.1,2,8.5,2,9s0.3,0.9,0.8,1C5,10.5,5.5,11,6,13.2z"
                          />
                          <path d="M11,14c-0.6,0-1,0.4-1,1s0.4,1,1,1c0,0.6,0.4,1,1,1s1-0.4,1-1c0.6,0,1-0.4,1-1s-0.4-1-1-1c0-0.6-0.4-1-1-1S11,13.4,11,14z" />
                        </g>
                      </svg>
                      <svg
                        className="col-1 row-1 text-amber-400"
                        style={{
                          clipPath: `inset(${heightPercent}% 0 0  0)`,
                        }}
                        fill="currentColor"
                        height="100%"
                        width="100%"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 32 32"
                        xml:space="preserve"
                      >
                        <g>
                          <path
                            d="M17,4c-0.2,0-0.5,0-0.7,0l-0.1,0c-0.4,0-0.8,0.4-0.9,0.8s0.1,0.9,0.5,1.1C18.4,7.3,20,10,20,13c0,4.4-3.6,8-8,8
		c-2.3,0-4.6-1-6.1-2.8c-0.3-0.3-0.8-0.4-1.2-0.3c-0.4,0.2-0.6,0.6-0.6,1.1c1,6.4,6.4,11,12.8,11c7.2,0,13-5.8,13-13S24.2,4,17,4z"
                          />
                          <path
                            d="M6,13.2C6.1,13.7,6.5,14,7,14s0.9-0.3,1-0.8c0.5-2.2,1-2.7,3.3-3.3C11.7,9.9,12,9.5,12,9s-0.3-0.9-0.8-1C9,7.5,8.5,7,8,4.8
		C7.9,4.3,7.5,4,7,4S6.1,4.3,6,4.8C5.5,7,5,7.5,2.8,8C2.3,8.1,2,8.5,2,9s0.3,0.9,0.8,1C5,10.5,5.5,11,6,13.2z"
                          />
                          <path d="M11,14c-0.6,0-1,0.4-1,1s0.4,1,1,1c0,0.6,0.4,1,1,1s1-0.4,1-1c0.6,0,1-0.4,1-1s-0.4-1-1-1c0-0.6-0.4-1-1-1S11,13.4,11,14z" />
                        </g>
                      </svg>
                    </div>
                    <div className="flex items-end gap-1">
                      <div className="grid">
                        <p className="font-digital col-1 row-1">
                          {formatTime(interval).time}
                        </p>
                        <p className="font-digital col-1 row-1 opacity-5">
                          00:00
                        </p>
                      </div>

                      {timeFormat === "12h" && (
                        <p className="mb-px text-[8px] tracking-wide text-white/30">
                          {formatTime(interval).timeOfDay}
                        </p>
                      )}
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
