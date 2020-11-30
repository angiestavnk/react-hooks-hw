import React, { useContext, useState } from "react";
import Input from "components/Input";

import { StyledForm, StyledAddButton } from "./styles";
import { context } from "../../context/TaskListContext";

const Form = () => {
  const [inputValue, setInputValue] = useState("");
  const formContext = useContext(context);
  const onChange = (value) => setInputValue(value);

  const addTask = (e) => {
    e.preventDefault();
    if (inputValue) {
      formContext.addTask({ text: inputValue });
      setInputValue("");
    }
  };
  const isTaskExists = formContext.taskList.some(
    ({ text }) => inputValue === text
  );

  return (
    <StyledForm onSubmit={addTask}>
      <Input value={inputValue} onChange={onChange} />
      <StyledAddButton disabled={isTaskExists || !inputValue}>
        ADD TASK
      </StyledAddButton>
    </StyledForm>
  );
};
export default Form;
