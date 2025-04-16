import {ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full shadow-xl/30 flex justify-center items-center z-50">
      <div className="bg-gray-100 rounded-lg shadow-xl p-7 relative">
        <button
          className="absolute top-2 right-2 text-gray-500 ring-2 hover:text-gray-700 focus:outline-none"
          onClick={onClose}
        >
          <svg
            className="h-6 w-6 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M18.2 5.8a1 1 0 0 0-1.4-1.4L12 10.6 7.2 5.8a1 1 0 0 0-1.4 1.4L10.6 12 5.8 16.8a1 1 0 0 0 1.4 1.4L12 13.4 16.8 18.2a1 1 0 0 0 1.4-1.4L13.4 12 18.2 7.2a1 1 0 0 0 0-1.4z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;