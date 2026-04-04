import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  CloseButton,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/16/solid";

function BaseModal({ isOpen, handleClose, modalTitle, children }) {
  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-50 text-neutral-400 focus:outline-none"
      onClose={handleClose}
    >
      <DialogBackdrop className="fixed inset-0 bottom-0 cursor-pointer overflow-hidden bg-black/20 backdrop-blur-[3px]" />
      <div className="fixed inset-0 bottom-0 w-screen overflow-y-auto">
        <div className="flex h-full items-end justify-center overflow-hidden sm:items-center">
          <DialogPanel
            transition
            className="ease-apple max-h-[80dvh] w-full max-w-[640px] rounded-t-3xl border-t-[1px] border-neutral-100/15 bg-black/80 pb-7 shadow-lg backdrop-blur-xs transition-all duration-300 not-sm:pb-14 not-sm:data-[closed]:translate-y-full sm:rounded-3xl sm:border-[1px] sm:data-[closed]:opacity-0"
          >
            <div className="flex items-center justify-between p-4">
              <DialogTitle className="font-heading grow text-center text-2xl">
                {modalTitle}
              </DialogTitle>
              <CloseButton
                as={"button"}
                aria-label="Close modal"
                className="-ml-9 w-9 cursor-pointer rounded-full border-[1px] border-neutral-100/30 p-1.5 text-neutral-100/50 transition-all duration-75 hover:text-neutral-100"
              >
                <XMarkIcon />
              </CloseButton>
            </div>

            <div className="pb-safe h-full overflow-y-auto">{children}</div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default BaseModal;
