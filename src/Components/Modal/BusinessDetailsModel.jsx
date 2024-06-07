import React from "react";

const ViewModal = ({ isOpen, onClose, closeModal }) => {
  const overlayClasses = isOpen
    ? "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30"
    : "hidden";
  const modalClasses = isOpen ? "bg-white p-8 rounded-md shadow-lg" : "hidden";

  return (
    <div className={overlayClasses} onClick={onClose}>
      <div className={modalClasses} onClick={(e) => e.stopPropagation()}>
        <h2 className='text-xl mb-4'>Add Business</h2>
        <form>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='businessName'>
              Business Name
            </label>
            <input
              type='text'
              id='businessName'
              className='w-full px-3 py-2 border rounded'
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='businessDescription'>
              Business Description
            </label>
            <textarea
              id='businessDescription'
              className='w-full px-3 py-2 border rounded'
            />
          </div>
          <div className='flex justify-end'>
            <button
              type='button'
              className='bg-gray-500 text-white px-4 py-2 rounded mr-2'
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              type='submit'
              className='bg-blue-500 text-white px-4 py-2 rounded'
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ViewModal;
