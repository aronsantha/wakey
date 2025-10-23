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
      className="z-10 flex h-10 w-14 cursor-pointer flex-col items-center rounded text-[#7a72ad] opacity-50 transition-all duration-75 hover:opacity-100 focus:opacity-100 focus:ring-2 focus:ring-white focus:outline-none"
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
