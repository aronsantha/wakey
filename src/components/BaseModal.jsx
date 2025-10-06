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

              <div className="flex flex-col justify-center px-4 pb-6">
                <h2 className="mt-5 font-bold">Fall asleep time</h2>
                <div className="relative my-6 flex h-26 flex-col items-center gap-3 overflow-hidden rounded-md bg-neutral-800">
                  <input
                    className="font-digital h-full w-full rounded-md pb-4 text-center text-2xl font-bold text-amber-400/80"
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
                  <p className="absolute bottom-2 text-sm text-neutral-400">
                    minutes
                  </p>
                </div>
                <div className="flex flex-col gap-4 px-1">
                  <p className="text-center text-xs text-neutral-500">
                    The calculator includes the time it takes to fall asleep,
                    which is 15 minutes for most people. You can tweak this
                    number to better align with your personal sleep habits.
                  </p>
                  <p className="text-center text-xs text-neutral-600">
                    Note: the highest available fall asleep time is 99 minutes.
                  </p>
                </div>

                <h2 className="mt-5 font-bold">Time format</h2>
                <div className="mt-6 flex flex-row gap-2">
                  <button
                    onClick={() => handleSelectTimeFormat("24h")}
                    className={`cursor-pointer rounded-md px-4 py-2 text-sm font-semibold text-white ${
                      timeFormat === "24h" ? "bg-neutral-800" : "bg-neutral-500"
                    }`}
                  >
                    24h
                  </button>
                  <button
                    onClick={() => handleSelectTimeFormat("12h")}
                    className={`cursor-pointer rounded-md px-4 py-2 text-sm font-semibold text-white ${
                      timeFormat === "12h" ? "bg-neutral-800" : "bg-neutral-500"
                    }`}
                  >
                    AM/PM
                  </button>
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
