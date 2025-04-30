import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../features/todos/TodoSlice';

export const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
});
