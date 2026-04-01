import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  CloseButton,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/20/solid";

function BaseModal({ isOpen, handleClose, modalTitle, children }) {
  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-50 text-neutral-400 focus:outline-none"
      onClose={handleClose}
    >
      <DialogBackdrop className="fixed inset-0 bottom-0 cursor-pointer overflow-y-auto bg-black/20 backdrop-blur-[3px]" />
      <div className="fixed inset-0 bottom-0 w-screen overflow-y-auto">
        <div className="flex h-full items-end justify-center overflow-hidden not-sm:pt-14 sm:items-center">
          <DialogPanel
            transition
            className="bg-theme/80 w-full max-w-[640px] overflow-clip rounded-t-3xl border-t-[1px] border-neutral-100/15 pb-7 shadow-lg backdrop-blur-xs not-sm:pb-14 not-sm:duration-300 data-[closed]:translate-y-full not-sm:data-[open]:ease-in-out sm:rounded-3xl sm:border-[1px] sm:data-[closed]:opacity-0"
          >
            <CloseButton
              as={"button"}
              aria-label="Close modal"
              className="fixed right-0 m-5 cursor-pointer rounded-full border-[1px] border-neutral-100/30 p-1.5 text-neutral-100/50 transition-all duration-75 hover:text-neutral-100"
            >
              <XMarkIcon className="w-6" />
            </CloseButton>

            <DialogTitle className="text-md grow px-1 pt-7 text-center text-lg font-extrabold">
              {modalTitle}
            </DialogTitle>
            <>{children}</>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default BaseModal;
