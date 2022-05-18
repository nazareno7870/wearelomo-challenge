export interface User {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: string;
}

export interface Task {
  id: number;
  title: string;
  status: string;
}

export interface MessageProps {
  message: string;
}

export interface LayoutProps {
  children: React.ReactNode;
}

export interface ModalDeleteProps {
  deleteTask: Task;
  setDeleteTask: (task: Task | null) => void;
  handleDeleteTask: (task: Task) => void;
}

export interface ModalDeleteUserProps {
  deleteUser: User | null;
  setDeleteUser: (user: User | null) => void;
  handleDeleteUser: (user: User) => void;
}

export interface ModalFormProps {
  children: React.ReactNode;
  setShowNewUser: (showNewUser: boolean) => void;
  setShowUpdateUser: (showUpdateUser: boolean) => void;
}

export interface UserFormProps {
  user?: User;
  setShowUpdateUser: (showUpdateUser: boolean) => void;
  setShowNewUser: (showNewUser: boolean) => void;
  setAlertMessage: (alertMessage: string) => void;
  setShowAlert: (showAlert: boolean) => void;
}
