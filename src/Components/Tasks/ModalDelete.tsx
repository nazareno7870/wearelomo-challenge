import "./ModalDelete.css";
import Trash from '../../assets/trash.svg';
import { ModalDeleteProps} from "../../Interfaces";

export default function ModalTaskDelete({
  deleteTask,
  setDeleteTask,
  handleDeleteTask,
}: ModalDeleteProps) {
  return (
    <div className="modal__task">
      <div className="modal__task__content">
          <img src={Trash} alt="trashIcon" />
        <h4>Are you sure you want to delete this task?</h4>
        <div className="modal__buttons">
          <button className="btn_modal danger" onClick={() => handleDeleteTask(deleteTask)}>Yes</button>
          <button className="btn_modal" onClick={() => setDeleteTask(null)}>No</button>
        </div>
      </div>
    </div>
  );
}
