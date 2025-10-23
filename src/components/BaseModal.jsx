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
      <DialogBackdrop className="fixed inset-0 cursor-pointer overflow-y-auto bg-black/20 backdrop-blur-[3px] duration-1000 min-[400px]:bottom-0" />
      <div className="fixed inset-0 w-screen overflow-y-auto p-2 max-[401px]:p-0 min-[400px]:bottom-0">
        <div className="flex h-full items-center justify-center">
          <DialogPanel
            transition
            className="w-full max-w-[400px] overflow-clip border-neutral-100/10 bg-black/90 shadow-lg backdrop-blur-xs duration-100 data-[closed]:transform-[scale(98%)] data-[closed]:opacity-0 max-[401px]:h-full min-[400px]:rounded-lg min-[400px]:border-[1px]"
          >
            <div className="flex items-center px-3 py-3">
              <DialogTitle className="text-md grow px-1 text-center text-lg font-extrabold capitalize">
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
