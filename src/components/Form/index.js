import React, { useContext, useMemo, useState } from "react";
import Input from "components/Input";
import useInput from "../hooks/useInput";

import { StyledForm, StyledAddButton } from "./styles";
import { context } from "../../context/TaskListContext";

const Form = () => {
  const [task, setTask, resetTask] = useInput("");
  const formContext = useContext(context);

  const addTask = (e) => {
    e.preventDefault();
    if (task) {
      formContext.addTask({ text: task });
      resetTask();
    }
  };
  const isTaskExists = useMemo(() => {
    return formContext.taskList.some(({ text }) => task === text);
  }, [task]);

  return (
    <StyledForm onSubmit={addTask}>
      <Input value={task} onChange={setTask} />
      <StyledAddButton disabled={isTaskExists || !task}>
        ADD TASK
      </StyledAddButton>
    </StyledForm>
  );
};
export default Form;
