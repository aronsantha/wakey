import { useState, useEffect } from "react";
import { useStickyState } from "../hooks.js";
import BaseModal from "./BaseModal.jsx";
import SettingsSection from "./SettingsSection.jsx";
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
import { ClockIcon } from "@heroicons/react/20/solid";

function App() {
  const [offsetInMins, setOffset] = useStickyState(
    DEFAULT_FALL_ASLEEP_MINUTES,
    "wakey-fall-asleep-mins",
  );
  const [timeFormat, setTimeFormat] = useStickyState(
    "12h",
    "wakey-time-format",
  );

  const [bgStyle, setBgStyle] = useStickyState("default", "wakey-bg");

  const offsetInMs = offsetInMins * 60 * 1000;
  const [time, setTime] = useState(new Date());
  const [activeModal, setActiveModal] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const activateModal = (modalName) => {
    setActiveModal(modalName);
    setIsModalOpen(true);
  };

  const deactivateModal = (timeout) => {
    setIsModalOpen(false);
    setTimeout(() => {
      setActiveModal("");
    }, timeout);
  };

  useEffect(() => {
    if (!bgStyle) return;

    document.documentElement.setAttribute("data-bgstyle", bgStyle);
  }, [bgStyle]);

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
    <div className="mx-auto flex flex-col justify-center px-4 pb-6">
      <SettingsSection title="Wind down">
        <p className="mb-2">The time you need to fall asleep.</p>

        <div className="mx-auto mt-4 flex flex-row overflow-clip rounded-2xl bg-neutral-800">
          <button
            onClick={() => offsetInMins > 0 && setOffset(offsetInMins - 5)}
            className="font-digital text-md flex w-20 cursor-pointer items-center justify-center rounded-l-2xl bg-neutral-900"
          >
            -
          </button>

          <div className="flex w-full items-end justify-center gap-2 py-2">
            <div className="grid text-xl text-amber-400/80">
              <p className="font-digital col-1 row-1 ml-auto">{offsetInMins}</p>
              <p className="font-digital col-1 row-1 opacity-5">00</p>
            </div>

            <p className="text-xs text-neutral-400">min</p>
          </div>
          <button
            className="font-digital text-md flex w-20 cursor-pointer items-center justify-center rounded-r-2xl bg-neutral-900"
            onClick={() =>
              offsetInMins < MAX_FALL_ASLEEP_MINUTES &&
              setOffset(offsetInMins + 5)
            }
          >
            +
          </button>
        </div>
      </SettingsSection>

      <SettingsSection title="Time format">
        <div className="mt-4 flex w-full flex-row items-center justify-center gap-2">
          <button
            onClick={() => setTimeFormat("12h")}
            className={`cursor-pointer rounded-md px-6 py-2 text-sm font-semibold text-white outline-1 transition-all duration-300 ease-[cubic-bezier(0.66,0,0,1.009)] ${
              timeFormat === "12h"
                ? "grow outline-amber-400/80"
                : "bg-neutral-900 outline-amber-400/0"
            }`}
          >
            12-hour
          </button>
          <button
            onClick={() => setTimeFormat("24h")}
            className={`cursor-pointer rounded-md px-6 py-2 text-sm font-semibold text-white outline-1 transition-all duration-300 ease-[cubic-bezier(0.66,0,0,1.009)] ${
              timeFormat === "24h"
                ? "grow outline-amber-400/80"
                : "bg-neutral-900 outline-amber-400/0"
            }`}
          >
            24-hour
          </button>
        </div>
      </SettingsSection>

      <SettingsSection title="Background">
        <p className="text-xs text-neutral-500">
          A gently shifting night sky or solid color.
        </p>

        <div className="mt-4 flex w-full flex-row items-center justify-center gap-2">
          <button
            onClick={() => setBgStyle("default")}
            className={`cursor-pointer rounded-md px-6 py-2 text-sm font-semibold text-white outline-1 transition-all duration-300 ease-[cubic-bezier(0.66,0,0,1.009)] ${
              bgStyle === "default"
                ? "grow outline-amber-400/80"
                : "bg-neutral-900 outline-amber-400/0"
            }`}
          >
            Night sky
          </button>
          <button
            onClick={() => setBgStyle("solid")}
            className={`cursor-pointer rounded-md px-6 py-2 text-sm font-semibold text-white outline-1 transition-all duration-300 ease-[cubic-bezier(0.66,0,0,1.009)] ${
              bgStyle === "solid"
                ? "grow outline-amber-400/80"
                : "bg-neutral-900 outline-amber-400/0"
            }`}
          >
            Solid
          </button>
        </div>
      </SettingsSection>
    </div>
  );

  const aboutModalContent = (
    <div className="mx-auto flex flex-col justify-center px-7 pb-6 text-left">
      <h2 className="mt-8 font-bold">How we sleep</h2>
      <div className="mt-3 text-sm text-neutral-500">
        <p>
          Every time we sleep, we go through cycles of about 90 minutes. Waking
          up in the middle of a cycle can leave us groggy — even if we sleep for
          many hours.
        </p>
        <p className="mt-4">
          But if we schedule our wake-up time to the end of a sleep cycle, we
          feel more rested.
        </p>
      </div>
      <h2 className="mt-6 font-bold">Tailored for you</h2>
      <div className="mt-3 text-sm text-neutral-500">
        <p>
          Wakey helps you find the ideal time for waking up rested. You can even
          set up how long it takes you to fall asleep, and choose your preferred
          time format. Wakey will remember your choices for next time.
        </p>
      </div>

      <div className="mt-8 flex items-center justify-center text-amber-500/80">
        <p className="font-heading">Sleep tight!</p>
        <SparklesIcon className="ml-1 w-3 pb-2" aria-hidden="true" />
      </div>
    </div>
  );

  const creatorModalContent = (
    <div className="mx-auto flex flex-col justify-center px-7 pt-8 pb-6 text-left">
      <p className="text-amber-500/80">
        Hey, I'm Aron, and I'm a troubled sleeper...
      </p>
      <div className="mt-6 text-sm text-neutral-500">
        <p>
          One of the few things that helped me over the years was following the
          scientific advice on sleep cycles.
        </p>

        <p className="mt-4">
          I tried many sleep apps to help with that, but they were always a
          compromise: missing features, poor design, or a clunky user
          experience.
        </p>

        <p className="mt-4">
          So I built Wakey. It's simple, it's accessible, and it looks polished.
          It's basically the app I wish I had years ago.
        </p>
        <p className="mt-4">I hope you'll enjoy using it as much as I do!</p>
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
      <div className="stars -z-10"></div>
      <BaseModal
        modalTitle={activeModal && modalMap[activeModal].label}
        isOpen={isModalOpen}
        timeFormat={timeFormat}
        handleClose={() => deactivateModal(300)}
        children={activeModal && modalMap[activeModal].content}
      />
      <div className="flex min-h-[100dvh] flex-col items-center overflow-y-auto md:justify-center">
        <footer className="pb-safe bg-theme fixed right-0 bottom-0 left-0 z-50 w-full border-t-[1px] border-neutral-100/15 px-3 backdrop-blur-xl">
          <div
            role="tablist"
            className="mx-auto flex h-14 w-full max-w-[800px] items-center justify-around px-6 pt-px"
          >
            {Object.keys(modalMap).map((modalKey) => {
              return (
                <ModalTriggerButton
                  role="tab"
                  key={modalKey}
                  modalKey={modalKey}
                  activeModal={activeModal}
                  handleSetModal={() => activateModal(modalKey)}
                  IconSolid={modalMap[modalKey].IconSolid}
                  IconOutline={modalMap[modalKey].IconOutline}
                  label={modalMap[modalKey].label}
                />
              );
            })}
          </div>
        </footer>
        <main className="mt-10 mb-16 flex max-w-[500px] flex-col px-6 text-center">
          <div className="mb-14 flex flex-col gap-4">
            <h1 className="font-heading mb-5 text-4xl tracking-tight text-amber-500/80 md:mb-8 md:text-5xl">
              It's sleepy time...
            </h1>
            <h2 className="text-neutral-400 text-shadow-[0_0_2px] text-shadow-neutral-900">
              If you fall asleep in{" "}
              <button
                className="inline cursor-pointer font-bold text-amber-500/80"
                onClick={() => activateModal("SETTINGS")}
              >
                {offsetInMins || 0} minutes
              </button>
              , these are the recommended times to wake up refreshed.
            </h2>
          </div>

          <div className="flex w-full flex-col items-center gap-y-2">
            <div className="mb-5 w-full rounded-xl bg-[#030014] px-3 py-4 text-2xl text-amber-500 shadow-[0_0_8px_white]/10 outline-2 outline-amber-500/30">
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
                      <p className="text-lilac/80 -ml-8 w-8 text-[10px] tracking-tight">
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
