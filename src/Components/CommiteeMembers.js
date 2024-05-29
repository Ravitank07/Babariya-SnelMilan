import React, { useState } from "react";
import Modal from "./Modal/Modal";

const CommiteeMembers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="h-screen overflow-auto p-8">
      <div className="m-12">
        <div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={openModal}
          >
            Open Modal
          </button>
        </div>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <div>
            <h2 className="text-lg font-bold mb-4">Commitee Members Details</h2>
            <div>
              <input type="text" placeholder="Enter Text" />
            </div>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded mt-4"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default CommiteeMembers;
