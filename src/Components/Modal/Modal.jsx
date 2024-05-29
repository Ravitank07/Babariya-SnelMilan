import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  const overlayClasses = isOpen
    ? "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30"
    : "hidden";
  const modalClasses = isOpen ? "bg-white p-8 rounded-md shadow-lg" : "hidden";

  return (
    <div className={overlayClasses} onClick={onClose}>
      <div className={modalClasses} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
