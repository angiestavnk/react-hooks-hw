import React, { createContext, useReducer } from "react";
import { v4 } from "uuid";
import { getState, saveState } from "../utils/localStorage";

const ADD_TASK = "ADD_TASK";
const REMOVE_TASK = "REMOVE_TASK";
const CHECK_TASK = "CHECK_TASK";

const initialState = getState() || [];

export const context = createContext({ taskList: initialState });
const { Provider, Consumer } = context;

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      let taskId = action.task.id
        ? state.find(({ id: taskId }) => taskId === action.task.id)
        : { id: v4() };
      let text = action.task.text;
      let task = {
        ...taskId,
        text,
        isDone: false,
      };
      let filteredState = state.filter(({ id }) => id !== action.task.id);
      saveState([task, ...filteredState]);
      return [task, ...filteredState];

    case REMOVE_TASK:
      let filtredState = state.filter(({ id }) => id !== action.taskId);
      saveState(filtredState);
      return filtredState;
    case CHECK_TASK:
      let isDone = action.task.isDone;
      let id = action.task.id;
      let editTask = {
        isDone,
        text: action.task.text,
        id,
      };
      let index = state.findIndex(({ id }) => id === editTask.id);
      state.splice(index, 1, editTask);
      saveState(state);
      return state;
    default:
      return state;
  }
};
const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  const addTask = (task) => dispatch({ type: ADD_TASK, task: task });
  const removeTask = (taskId) =>
    dispatch({ type: REMOVE_TASK, taskId: taskId });
  const checkTask = (task) => dispatch({ type: CHECK_TASK, task: task });
  return (
    <Provider
      value={{
        taskList: state,
        addTask,
        removeTask,
        checkTask,
      }}
    >
      {children}
    </Provider>
  );
};

export default TaskProvider;
