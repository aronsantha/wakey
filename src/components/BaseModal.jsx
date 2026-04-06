import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  CloseButton,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/16/solid";
import { useMobileSwipe } from "../hooks";

function BaseModal({ isOpen, handleClose, modalTitle, children }) {
  const ref = useMobileSwipe(({ direction }) => {
    if (direction !== "DOWN") return;
    handleClose();
  });

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-50 text-neutral-400 focus:outline-none"
      onClose={handleClose}
    >
      <DialogBackdrop
        transition
        className="animate-fade-in fixed inset-0 cursor-pointer overflow-hidden bg-black/30 sm:backdrop-blur-[3px]"
      />
      <div className="fixed inset-0 flex w-screen flex-col items-center justify-end overflow-hidden sm:justify-center">
        <DialogPanel
          ref={ref}
          transition
          className="slide-panel w-full max-w-[640px] overflow-hidden rounded-t-3xl border-t-[1px] border-neutral-100/15 bg-black/80 pb-7 shadow-lg backdrop-blur-xs transition-all delay-80 not-sm:pb-14 not-sm:data-[closed]:translate-y-full sm:rounded-3xl sm:border-[1px] sm:data-[closed]:scale-0"
        >
          <div className="sticky top-0 flex items-center justify-between bg-gradient-to-b from-black from-70% to-transparent p-4">
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
    </Dialog>
  );
}

export default BaseModal;
