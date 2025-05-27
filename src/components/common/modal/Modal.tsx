import React from "react";

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  isOpen: boolean;
}

const Modal: React.FC<ModalProps> = ({ isOpen, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-1">
      <div className="bg-white rounded shadow-lg p-6 min-w-[300px]">
        {children}
      </div>
    </div>
  );
};

export default Modal;
