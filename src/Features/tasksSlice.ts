import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../Interfaces";

const initialState: Task[] = [];

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setInitialSate: (state, action: PayloadAction<Task[]>) => {
      return action.payload;
    },
    add: (state, action: PayloadAction<Task>) => {
      state.push(action.payload);
    },
    change: (state, action: PayloadAction<Task>) => {
      const index = state.findIndex((task) => task.id === action.payload.id);
      state[index] = action.payload;
    },
    remove: (state, action: PayloadAction<Task>) => {
      const index = state.findIndex((task) => task.id === action.payload.id);
      state.splice(index, 1);
    },
  },
});

export const { setInitialSate, add, change,remove } = taskSlice.actions;

export default taskSlice.reducer;
