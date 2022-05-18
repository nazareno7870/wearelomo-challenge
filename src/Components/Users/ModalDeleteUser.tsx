import "./ModalDeleteUser.css";
import Trash from "../../assets/trash.svg";
import { ModalDeleteUserProps } from "../../Interfaces";

export default function ModalDeleteUser({
  deleteUser,
  setDeleteUser,
  handleDeleteUser,
}: ModalDeleteUserProps) {
  return (
    <>
      {deleteUser && (
        <div className="modal__user">
          <div className="modal__user__content">
            <img src={Trash} alt="trashIcon" />
            <h4>Are you sure you want to delete this user?</h4>
            <div className="modal__buttons">
              <button
                className="btn_modal danger"
                onClick={() => handleDeleteUser(deleteUser)}
              >
                Yes
              </button>
              <button className="btn_modal" onClick={() => setDeleteUser(null)}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
