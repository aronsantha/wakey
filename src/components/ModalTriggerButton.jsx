function ModalTriggerButton({
  modalKey,
  shownModal,
  handleSetModal,
  IconSolid,
  IconOutline,
  label,
}) {
  return (
    <button
      onClick={() => handleSetModal()}
      className="text-lilac/70 z-10 flex h-10 w-14 cursor-pointer flex-col items-center rounded transition-all duration-75 hover:text-neutral-300 focus:text-neutral-300 focus:ring-2 focus:ring-white focus:outline-none"
      style={{
        opacity: shownModal === modalKey && "1",
      }}
      aria-label={`Open ${label} modal`}
    >
      {shownModal === modalKey ? (
        <IconSolid className="mb-1 h-6" aria-hidden="true" />
      ) : (
        <IconOutline className="mb-1 h-6" aria-hidden="true" />
      )}
      <p className="text-[11px] leading-[11px] font-bold">{label}</p>
    </button>
  );
}

export default ModalTriggerButton;
