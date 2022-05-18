import { ModalFormProps } from "../../Interfaces";
import "./ModalDeleteUser.css";

export default function ModalForm({ children,setShowNewUser,setShowUpdateUser }: ModalFormProps) {

  const handleClose = () => {
    setShowNewUser(false);
    setShowUpdateUser(false);
  }

  return (
    <div className="modal__user">
      <div className="modal__user__content">
        {children}
        <div className="close__modal" onClick={handleClose}>X</div>
      </div>
    </div>
  );
}
