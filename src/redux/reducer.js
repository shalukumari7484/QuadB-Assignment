import { createSlice } from "@reduxjs/toolkit";

// Load todos from local storage
const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("todos");
    if (serializedState === null) {
      return [];
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.warn("Could not load todos", e);
    return [];
  }
};

// Save todos to local storage
const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("todos", serializedState);
  } catch (e) {
    console.warn("Could not save todos", e);
  }
};

const initialState = loadFromLocalStorage();

const addTodoReducer = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodos: (state, action) => {
      state.push(action.payload);
      saveToLocalStorage(state);
      return state;
    },
    removeTodos: (state, action) => {
      const newState = state.filter((item) => item.id !== action.payload);
      saveToLocalStorage(newState);
      return newState;
    },
    updateTodos: (state, action) => {
      const newState = state.map((todo) => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            item: action.payload.item,
          };
        }
        return todo;
      });
      saveToLocalStorage(newState);
      return newState;
    },
    completeTodos: (state, action) => {
      const newState = state.map((todo) => {
        if (todo.id === action.payload) {
          return {
            ...todo,
            completed: true,
          };
        }
        return todo;
      });
      saveToLocalStorage(newState);
      return newState;
    },
  },
});

export const {
  addTodos,
  removeTodos,
  updateTodos,
  completeTodos,
} = addTodoReducer.actions;
export const reducer = addTodoReducer.reducer;
