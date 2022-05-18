import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../Interfaces";
const initialState: any = {
  users: [],
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setInitialSate: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    editUser: (state, action: PayloadAction<User>) => {
      const index = state.users.findIndex(
        (user: User) => user.id === action.payload.id
      );
      state.users[index] = action.payload;
    },
    removeUser: (state, action: PayloadAction<User>) => {
      const index = state.users.findIndex(
        (user: User) => user.id === action.payload.id
      );
      state.users[index] = action.payload;
    },
  },
});

export const { setInitialSate, addUser, editUser, removeUser } =
  userSlice.actions;

export default userSlice.reducer;
