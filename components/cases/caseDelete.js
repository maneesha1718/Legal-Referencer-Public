'use client';

import { Trash2 } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { useState } from 'react';
import Modal from "../Modal";

export default function CaseDelete({id, doc, owner, case_no, onDelete, className}) {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  
  const closeModal = () => {
    setModalOpen(false);
  };

  const trashIconClass = twMerge( 'size-5', 'cursor-pointer', className);

  return (
    <>
      <div onClick={openModal}>
        <Trash2 className={trashIconClass} />
      </div>

      <Modal isOpen={isModalOpen} onCloseModal={closeModal} id={id} owner={owner} case_no={case_no} doc={doc}
      
      onDelete={onDelete && (() => {
        // Perform the delete operation
        // Call the onDelete function passed from parent after server-side deletion
        onDelete(doc); // Call the parent's onDelete to update the UI optimistically

        // Close the modal after the delete action
        closeModal();
      })}
      >
        <h2 className=' text-xl text-red/80 pb-4 ' >Are you sure?</h2>
        <p className='pb-1.5 text-base ' >Do you really want to delete it permanently?</p>
        <p className=" pb-5 text-sm text-black/70 ">
          You can not undo this action.
        </p>
      </Modal>
    </>
  );
}
