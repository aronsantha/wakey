import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  CloseButton,
} from "@headlessui/react";
import { XCircleIcon } from "@heroicons/react/20/solid";

function BaseModal({ isOpen, handleClose, modalTitle, children }) {
  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-50 text-neutral-400 focus:outline-none"
      onClose={handleClose}
    >
      <DialogBackdrop className="backdrop-blur-[3px]f fixed inset-0 bottom-0 cursor-pointer overflow-y-auto bg-black/20" />
      <div className="fixed inset-0 bottom-0 w-screen overflow-y-auto">
        <div className="flex h-full items-end justify-center overflow-hidden not-sm:pt-14 sm:items-center">
          <DialogPanel
            transition
            className="w-full max-w-[640px] overflow-clip rounded-t-3xl border-t-[1px] border-neutral-100/15 bg-neutral-950/90 pb-14 shadow-lg backdrop-blur-xs not-sm:h-full not-sm:duration-300 data-[closed]:translate-y-full not-sm:data-[open]:ease-in-out sm:rounded-3xl sm:border-[1px] sm:data-[closed]:opacity-0"
          >
            <div className="flex items-center px-3 py-3">
              <DialogTitle className="text-md grow px-1 text-center text-lg font-extrabold">
                {modalTitle}
              </DialogTitle>
              <CloseButton
                as={"button"}
                aria-label="Close modal"
                className="-ml-10 cursor-pointer rounded-full opacity-50 transition-all duration-75 hover:opacity-100"
              >
                <XCircleIcon className="w-7" />
              </CloseButton>
            </div>
            <>{children}</>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default BaseModal;
