import { Dialog, DialogBackdrop, DialogPanel, DialogTitle, CloseButton } from "@headlessui/react";
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
                <DialogTitle className="grow px-1 text-center text-md font-bold text-white">
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

              <div className="flex justify-center flex-col pb-6 px-4">
                <h2 className="font-bold mt-5">Fall asleep time</h2>
                <div className="relative h-26 my-6 flex items-center flex-col gap-3  bg-neutral-800 rounded-md overflow-hidden">
                  <input
                    className=" text-amber-400/80 font-bold font-digital text-center text-2xl w-full h-full pb-4 rounded-md"
                    value={offsetInMins}
                    placeholder="00"
                    min={0}
                    max={99}
                    type="number"
                    pattern="\d*"
                    onChange={(event) => {
                      const value = event.target.value;
                      if (value.length <= 2) {
                        handleSelectOffset(value);
                      }
                    }}
                  />
                  <p className="text-sm absolute bottom-2 text-neutral-400">minutes</p>
                </div>
                <div className="flex flex-col gap-4 px-1">
                  <p className="text-xs text-center text-neutral-500 ">
                    The calculator includes the time it takes to fall asleep, which is 15 minutes
                    for most people. You can tweak this number to better align with your personal
                    sleep habits.
                  </p>
                  <p className="text-xs text-center text-neutral-600">
                    Note: the highest available fall asleep time is 99 minutes.
                  </p>
                </div>

                <h2 className="font-bold mt-5">Time format</h2>
                {/* <p className="flex flex-col gap-12 px-2 pt-14 pb-10 sm:px-10">
                Our sleep naturally follows cycles of about 90 minutes, moving through light sleep,
                deep sleep, and REM. Waking up in the middle of deep sleep can leave us feeling
                groggy and tired, even if we've slept for a long time. But waking up closer to the
                end of a cycle, when sleep is lighter, makes it easier to get up and feeling
                refreshed. Fall asleep time: The app also takes into account the average time it
                takes to fall asleep, which is around 15 minutes for most people. However, we let
                you customize this time to better fit your personal habits. Time format: Select the
                time format you prefer, either 12-hour (AM/PM) or 24-hour.
              </p> */}
                {/* <button
                  onClick={handleSelectTimeFormat("24h")}
                  className="px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600"
                >
                  24h
                </button>
                              <button
                  onClick={handleSelectTimeFormat("12h")}
                  className="px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600"
                >
                  AM/PM
                </button>
                */}
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default BaseModal;
