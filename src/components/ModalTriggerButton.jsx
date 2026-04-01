function ModalTriggerButton({
  modalKey,
  activeModal,
  handleSetModal,
  IconSolid,
  IconOutline,
  label,
}) {
  return (
    <button
      onClick={() => handleSetModal()}
      className="text-lilac/70 z-10 flex h-10 w-14 cursor-pointer flex-col items-center rounded transition-all duration-75 focus:outline-none pointer-fine:hover:text-neutral-300 pointer-fine:focus:text-neutral-300 pointer-fine:focus:ring-2 pointer-fine:focus:ring-white"
      aria-label={`Open ${label} modal`}
    >
      {activeModal === modalKey ? (
        <IconSolid className="mb-1 h-6" aria-hidden="true" />
      ) : (
        <IconOutline className="mb-1 h-6" aria-hidden="true" />
      )}
      <p className="text-[11px] leading-[11px] font-bold">{label}</p>
    </button>
  );
}

export default ModalTriggerButton;
