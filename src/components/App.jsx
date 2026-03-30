import { useState, useEffect } from "react";
import { useStickyState } from "../hooks.js";
import BaseModal from "./BaseModal.jsx";
import ModalTriggerButton from "./ModalTriggerButton.jsx";
import SleepIndicator from "./SleepIndicator.jsx";
import {
  ONE_HOUR_MS,
  SLEEP_CYCLE_INTERVALS,
  LOCALE_FORMAT_MAP,
  DEFAULT_FALL_ASLEEP_MINUTES,
  MAX_FALL_ASLEEP_MINUTES,
} from "../constants.js";

import {
  Cog8ToothIcon as Cog8ToothIconOutline,
  HeartIcon as HeartIconOutline,
  InformationCircleIcon as InformationCircleIconOutline,
} from "@heroicons/react/24/outline";
import {
  Cog8ToothIcon,
  HeartIcon,
  InformationCircleIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";

function App() {
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
    <div className="mx-auto flex flex-col justify-center px-7 pb-6 text-center">
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
    <div className="mx-auto flex flex-col justify-center px-7 pb-6 text-left">
      <h2 className="mt-8 font-bold">How we sleep</h2>
      <div className="mt-3 *:leading-[1.3rem]">
        <p className="text-sm text-neutral-600">
          Every time we sleep, we go through cycles of about 90 minutes. Waking
          up in the middle of a cycle can leave us groggy — even if we sleep for
          many hours.
        </p>
        <p className="mt-4 text-sm text-neutral-600">
          But if we schedule our wake-up time to the end of a sleep cycle, we
          feel more rested.
        </p>
      </div>
      <h2 className="mt-6 font-bold">Tailored for you</h2>
      <div className="mt-3 *:leading-[1.3rem]">
        <p className="text-sm text-neutral-600">
          Wakey helps you find the ideal time for waking up rested. You can even
          set up how long it takes you to fall asleep, and choose your preferred
          time format. Wakey will remember your choices for next time.
        </p>
      </div>

      <div className="mt-8 flex items-center justify-center text-amber-500/80">
        <p className="font-caprasimo">Sleep tight!</p>
        <SparklesIcon className="ml-1 w-3 pb-2" aria-hidden="true" />
      </div>
    </div>
  );

  const creatorModalContent = (
    <div className="mx-auto flex flex-col justify-center px-7 pt-8 pb-6 text-left">
      <div className="flex items-center justify-center text-amber-500/80">
        <p className="font-caprasimo">Hey there, I'm Aron</p>
        <span className="ml-1" aria-hidden="true">
          👋🏼
        </span>
      </div>
      <div className="mt-6 *:leading-[1.3rem]">
        <p className="text-sm text-neutral-600">
          I'm a troubled sleeper. I've tried many other sleep apps, but none of
          them fully matched my needs. They either lacked important features,
          had poor usability, or simply didn't look great.
        </p>
        <p className="mt-4 text-sm text-neutral-600">
          So I built Wakey. And although I built this app for myself, I also
          kept others in mind in the process: I included accessibility features
          and made sure it looks great on any device size.
        </p>
        <p className="mt-4 text-sm text-neutral-600">
          I hope you'll enjoy using the app as much as I do! If you have any
          feedback or suggestions, feel free to reach out via my website:{" "}
          <a
            href="https://aronsantha.com"
            target="_blank"
            className="cursor-pointer text-amber-500 underline underline-offset-2 hover:text-amber-700"
          >
            aronsantha.com
          </a>
          .
        </p>
      </div>
    </div>
  );

  const modalMap = {
    ABOUT: {
      label: "About",
      content: aboutModalContent,
      IconSolid: InformationCircleIcon,
      IconOutline: InformationCircleIconOutline,
    },
    CREATOR: {
      label: "Creator",
      content: creatorModalContent,
      IconSolid: HeartIcon,
      IconOutline: HeartIconOutline,
    },

    SETTINGS: {
      label: "Settings",
      content: settingsModalContent,
      IconSolid: Cog8ToothIcon,
      IconOutline: Cog8ToothIconOutline,
    },
  };

  return (
    <>
      <div className="stars -z-10 hidden md:block"></div>
      <BaseModal
        modalTitle={shownModal}
        isOpen={Boolean(shownModal)}
        timeFormat={timeFormat}
        handleClose={() => setShownModal("")}
        children={shownModal && modalMap[shownModal].content}
      />
      <div className="flex min-h-[100dvh] flex-col items-center overflow-y-auto bg-emerald-700 md:justify-center">
        {/* <footer
          role="tablist"
          className="p-safe fixed right-0 bottom-0 left-0 z-50 h-14 w-full border-t-[1px] border-neutral-100/20 bg-neutral-950/50 px-3 backdrop-blur-xl"
        >
          <div className="mx-auto flex h-full w-full max-w-[800px] items-center justify-around px-6 pt-px">
            {Object.keys(modalMap).map((modalKey) => {
              return (
                <ModalTriggerButton
                  role="tab"
                  key={modalKey}
                  modalKey={modalKey}
                  shownModal={shownModal}
                  handleSetModal={() => setShownModal(modalKey)}
                  IconSolid={modalMap[modalKey].IconSolid}
                  IconOutline={modalMap[modalKey].IconOutline}
                  label={modalMap[modalKey].label}
                />
              );
            })}
          </div>
        </footer> */}
        <main className="mt-16 mb-24 flex max-w-[500px] flex-col px-6 text-center">
          <div className="mb-14 flex flex-col gap-4">
            <h1 className="font-caprasimo mb-8 text-4xl text-amber-500/80">
              It's sleepy time...
            </h1>
            <h2 className="text-neutral-400 text-shadow-[0_0_2px] text-shadow-neutral-900">
              If you fall asleep in{" "}
              <button
                className="inline cursor-pointer font-bold text-amber-500/80"
                onClick={() => setShownModal("SETTINGS")}
              >
                {offsetInMins || 0} minutes
              </button>
              , we recommend these wake-up times. Pick one, set up your alarm,
              and wake up refreshed.
            </h2>
          </div>

          <div className="flex w-full flex-col items-center gap-y-2">
            <div className="mb-5 w-full rounded-xl bg-[#030014] px-3 py-5 text-3xl text-amber-500 shadow-[0_0_8px_white]/10 outline-2 outline-amber-500/30">
              <div className="relative flex h-lh flex-row items-center justify-center gap-x-3 gap-y-1">
                <div
                  className="absolute right-2 grid h-2/3 max-w-[15px] items-center"
                  aria-label={SLEEP_CYCLE_INTERVALS[0] + " " + "hours"}
                  title={SLEEP_CYCLE_INTERVALS[0] + " " + "hours"}
                ></div>
                <div className="flex items-end gap-1">
                  <div className="grid">
                    <p className="font-digital col-1 row-1 opacity-90">
                      {formatTime(sleepLengthArray[0]).time}
                    </p>
                    <p className="font-digital col-1 row-1 opacity-5">00:00</p>
                  </div>

                  {timeFormat === "12h" && (
                    <p className="mb-px text-[8px] tracking-wide text-white/30">
                      {formatTime(sleepLengthArray[0]).timeOfDay}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="flex w-full flex-col overflow-clip rounded-2xl bg-[#030014] text-lg shadow-[0_0_8px_white]/10 outline-amber-400/30">
              {sleepLengthArray.slice(1).map((interval, index) => {
                const offsetIndex = index + 1;
                const heightPercents = [35, 50, 70, 85, 100];
                const sleepHours = SLEEP_CYCLE_INTERVALS[offsetIndex];
                return (
                  <div key={index}>
                    <div className="flex flex-row items-center justify-between border-b-[1px] border-white/10 px-8 py-4">
                      <SleepIndicator
                        heightPercent={heightPercents[index]}
                        sleepHours={sleepHours}
                      />
                      <div className="mx-auto flex items-end gap-1">
                        <div className="grid">
                          <p className="font-digital text-lilac z-10 col-1 row-1">
                            {formatTime(interval).time}
                          </p>
                          <p className="font-digital text-lilac/10 col-1 row-1">
                            00:00
                          </p>
                        </div>

                        {timeFormat === "12h" && (
                          <p className="mb-px text-[8px] tracking-wide text-white/20">
                            {formatTime(interval).timeOfDay}
                          </p>
                        )}
                      </div>
                      <p className="text-lilac/40 -ml-8 w-8 text-[10px] tracking-tighter">
                        {sleepHours} h
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
