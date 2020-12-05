import React, { createContext, useEffect, useReducer, useState } from "react";
import { v4 } from "uuid";
import { getState, saveState } from "../utils/localStorage";

const ADD_TASK = "ADD_TASK";
const REMOVE_TASK = "REMOVE_TASK";
const CHECK_TASK = "CHECK_TASK";

const initialState = getState() || [];

export const context = createContext({ taskList: initialState });
const { Provider } = context;

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      const taskId = action.task.id
        ? state.find(({ id: taskId }) => taskId === action.task.id)
        : { id: v4() };
      const text = action.task.text;
      const task = {
        ...taskId,
        text,
        isDone: false,
      };
      const filteredState = state.filter(({ id }) => id !== action.task.id);
      saveState([task, ...filteredState]);
      return [task, ...filteredState];

    case REMOVE_TASK:
      const filtredState = state.filter(({ id }) => id !== action.taskId);
      saveState(filtredState);
      return filtredState;
    case CHECK_TASK:
      const { isDone, id: checkId } = action.task;
      const changedState = state.filter(({ id }) => id !== checkId);
      const result = isDone
        ? [...changedState, action.task]
        : [action.task, ...changedState];
      saveState(result);
      return result;
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
