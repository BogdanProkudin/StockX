import React from "react";
interface Imodal {
  closeModal: () => void;
  item: {
    image: string;
    data: [];
  };
}
const Modal: React.FC<Imodal> = ({ closeModal, item }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-[300px] rounded-lg bg-white p-4 text-black shadow-lg">
        <h1>Modal</h1>
        <p>Your modal content goes here.</p>
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
