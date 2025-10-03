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

      <div className="w-full max-w-[1200px] mx-auto text-center">
        <Cog6ToothIcon
          as={"button"}
          tabindex="0"
          onClick={() => setIsModalOpen(true)}
          className="fixed top-4 right-4 -ml-5 cursor-pointer rounded-full text-white opacity-50 transition-all duration-75 hover:opacity-100 h-8"
          aria-label="Open settings modal"
        />
        <h1 className="text-7xl caprasimo text-[#fec119] text-shadow-[0_0_40px_#fec119]">
          Time to sleep...
        </h1>
        <div className="flex justify-between flex-col items-center gap-6 my-10 w-full px-2">
          <h2 className="text-[#745b18] font-serif text-2xl">
            Let's find you a wake up time for perfect, restful sleep.{" "}
          </h2>
          <div className="overflow-y-auto  overflow-x-hidden  flex-wrap flex gap-3 w-full max-w-[800px] max-h-[50vh] no-scrollbar">
            {sleepLengthArray.map((interval, index) => (
              <div
                key={index}
                className="grow  first:text-6xl first:w-full first:h-50 h-16 max-h-50 gap-y-1 text-xl bg-black/10 backdrop-blur-sm py-4 first:py-6 px-5 first:px-12  overflow-hidden rounded-2xl flex-wrap flex justify-between items-center"
              >
                <p className="barlow">{formatTime(interval)}</p>
                <div className="h-full inline-block">
                  <RadialBar intervalHours={intervals[index]} ranking={5 - index} />
                </div>
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
