import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  CloseButton,
} from "@headlessui/react";
import { XCircleIcon } from "@heroicons/react/20/solid";

function BaseModal({
  isOpen,
  handleClose,
  handleSelectTimeFormat,
  handleSelectOffset,
  offsetInMins,
  timeFormat,
}) {
  return (
    <>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={handleClose}
      >
        <DialogBackdrop className="fixed inset-0 cursor-pointer overflow-y-auto bg-black/20 backdrop-blur-xs duration-1000" />
        <div className="fixed inset-0 w-screen overflow-y-auto p-2 sm:p-6">
          <div className="flex min-h-full items-center justify-center">
            <DialogPanel
              transition
              className="w-full max-w-5xl overflow-clip rounded-lg bg-black/80 shadow-lg backdrop-blur-xs duration-200 data-[closed]:transform-[scale(98%)] data-[closed]:opacity-0"
            >
              <div className="flex items-center px-2 py-1">
                <DialogTitle className="text-md grow px-1 text-center font-bold text-white">
                  Settings
                </DialogTitle>
                <CloseButton
                  as={"button"}
                  aria-label="Close modal"
                  className="-ml-10 cursor-pointer rounded-full text-white opacity-50 transition-all duration-75 hover:opacity-100"
                >
                  <XCircleIcon className="w-8" />
                </CloseButton>
              </div>

              <div className="mx-auto flex max-w-[600px] flex-col justify-center px-4 pb-6 text-center">
                <h2 className="mt-8 mb-2 font-bold">Fall asleep time</h2>
                <p className="text-xs text-neutral-500">
                  The calculator includes the time it takes to fall asleep,
                  which is 15 minutes for most people. You can tweak this number
                  to better align with your own sleep habits. (Limit: 90
                  minutes){" "}
                </p>
                <div className="mx-auto mt-6 flex max-w-fit flex-row overflow-hidden rounded-3xl bg-neutral-800">
                  <button
                    onClick={() =>
                      offsetInMins > 0 && handleSelectOffset(offsetInMins - 5)
                    }
                    className="font-digital flex shrink-0 cursor-pointer items-center bg-neutral-900 px-5 text-sm"
                  >
                    -
                  </button>

                  <div className="flex w-full flex-col items-center justify-center gap-2 py-2">
                    <div className="mx-20 grid text-xl text-amber-400/80">
                      <p className="font-digital col-1 row-1 ml-auto">
                        {offsetInMins}
                      </p>
                      <p className="font-digital col-1 row-1 opacity-5">00</p>
                    </div>

                    <p className="text-xs text-neutral-400">minutes</p>
                  </div>
                  <button
                    className="font-digital flex shrink-0 cursor-pointer items-center bg-neutral-900 px-5 text-sm"
                    onClick={() =>
                      offsetInMins < 90 && handleSelectOffset(offsetInMins + 5)
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
                    onClick={() => handleSelectTimeFormat("12h")}
                    className={`cursor-pointer rounded-md px-4 py-2 text-sm font-semibold text-white ${
                      timeFormat === "12h"
                        ? "outline-1 outline-amber-400/80"
                        : "bg-neutral-900"
                    }`}
                  >
                    12-hour
                  </button>
                  <button
                    onClick={() => handleSelectTimeFormat("24h")}
                    className={`cursor-pointer rounded-md px-4 py-2 text-sm font-semibold text-white ${
                      timeFormat === "24h"
                        ? "outline-1 outline-amber-400/80"
                        : "bg-neutral-900"
                    }`}
                  >
                    24-hour
                  </button>

                  {/* 
                Our sleep naturally follows cycles of about 90 minutes, moving through light sleep,
                deep sleep, and REM. Waking up in the middle of deep sleep can leave us feeling
                groggy and tired, even if we've slept for a long time. But waking up closer to the
                end of a cycle, when sleep is lighter, makes it easier to get up and feeling
                refreshed.*/}
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default BaseModal;
