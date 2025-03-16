
import { deleteCase, deleteDocs } from "@/lib/actions";
import Button from "./util/Button";

export default function Modal({ id, owner, case_no, doc , isOpen, onCloseModal, onDelete, children }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 flex justify-center items-center z-50"
    >
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <div>{children}</div>
        <div className="flex justify-end gap-3">
          <Button type="button" onClick={onCloseModal} variant="modalButton">Cancel</Button>
          <Button type="button" variant="modalButton" onClick={async () => {
              
              if (id) {
                await deleteCase(id);
              } else {
                await deleteDocs(owner, case_no, doc);
              }
              onDelete&& onDelete(doc);
              onCloseModal();
            }} >Delete</Button>
        </div>
      </div>
    </div>
  );
};
