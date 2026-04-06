import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  CloseButton,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/16/solid";
import { useMobileSwipe } from "../hooks";

function BaseModal({ isOpen, handleDismiss, modalTitle, children }) {
  const swipeRef = useMobileSwipe({
    onSwipe: (onSwipe) => {
      const vh = window.visualViewport?.height || window.innerHeight;
      const vv = window.visualViewport?.width || window.innerWidth;

      if (vv > 640) return;

      const dismissThreshold = (vh / 100) * 20;
      const swipeLength = Math.round(onSwipe.deltaY);

      const downSwipe = onSwipe.direction === "DOWN";

      if (!downSwipe) return;

      if (swipeLength < dismissThreshold) {
        handlePartialDismiss(swipeLength);
        return;
      }

      handleDismiss();
    },
  });

  const handlePartialDismiss = (swipeLength) => {
    const el = swipeRef.current;
    if (!el) return;
    el.classList.remove("snap-back");

    el.style.setProperty("--swipe-y-length", `${swipeLength}px`);
    el.classList.remove("slide-up");
    el.classList.add("snap-back");

    el.addEventListener(
      "animationend",
      (event) => {
        if (event.animationName === "snapBack") {
          el.classList.remove("snap-back");
          el.style.removeProperty("--swipe-y-length");
        }
      },
      { once: true },
    );
  };

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-50 text-neutral-400 focus:outline-none"
      onClose={handleDismiss}
    >
      <DialogBackdrop
        transition
        className="animate-fade-in fixed inset-0 cursor-pointer overflow-hidden bg-black/30 sm:backdrop-blur-[3px]"
      />
      <div className="fixed inset-0 flex w-screen flex-col items-center justify-end overflow-hidden sm:justify-center">
        <DialogPanel
          ref={swipeRef}
          transition
          className="slide-panel slide-up w-full max-w-[640px] overflow-hidden rounded-t-3xl border-t-[1px] border-neutral-800 bg-black/80 pb-7 shadow-lg backdrop-blur-xs transition-all delay-10 not-sm:pb-14 not-sm:data-[closed]:translate-y-full sm:rounded-3xl sm:border-[1px] sm:duration-75 sm:data-[closed]:scale-0"
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
