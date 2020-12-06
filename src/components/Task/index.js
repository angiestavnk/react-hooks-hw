import React, { Fragment, useCallback, useContext, useState } from "react";
import Input from "components/Input";
import { context } from "../../context/TaskListContext";
import {
  StyledEdit,
  StyledTask,
  StyledDelete,
  StyledCheck,
  StyledText,
  StyledButton,
  StyledNotCheck,
  StyledEditForm,
  StyledButtonsWrapper,
} from "./styles";
import { text } from "@fortawesome/fontawesome-svg-core";

const Task = (props) => {
  const [editValue, setEditValue] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [isDone, setIsDone] = useState(props.isDone);
  // const onEditChange = useCallback((event) => setEditValue(event), []);
  const taskContext = useContext(context);
  const onEditPress = () => {
    setEditValue(props.text);
    setIsEdit(true);
  };

  const onSaveEdit = (e) => {
    e.preventDefault();
    if (editValue) {
      const exist = taskContext.taskList.some(
        ({ text }) => text === editValue && editValue !== props.text
      );
      if (exist) {
        alert("Already exist");
      } else {
        const { id } = props;
        taskContext.addTask({ id, text: editValue });
        setEditValue("");
        setIsEdit(false);
      }
    }
  };

  const checkStatus = () => {
    taskContext.checkTask({ text: text, isDone: !isDone, id: id });
    setIsDone(!isDone);
  };

  const onRemove = useCallback(() => taskContext.removeTask(id), []);

  const { children, text, id } = props;

  return (
    <StyledTask>
      {isEdit ? (
        <StyledEditForm onSubmit={onSaveEdit} onBlur={onSaveEdit}>
          <Input
            onChange={setEditValue}
            value={editValue}
            placeholder="Task must contain title"
          />
        </StyledEditForm>
      ) : (
        <Fragment>
          <StyledText
            style={{ textDecoration: isDone ? "line-through" : "none" }}
          >
            {children}
          </StyledText>

          <StyledButtonsWrapper>
            <StyledButton onClick={onEditPress}>
              <StyledEdit />
            </StyledButton>
            <StyledButton onClick={onRemove}>
              <StyledDelete />
            </StyledButton>
            <StyledButton onClick={checkStatus}>
              {isDone ? <StyledCheck /> : <StyledNotCheck />}
            </StyledButton>
          </StyledButtonsWrapper>
        </Fragment>
      )}
    </StyledTask>
  );
};

export default Task;
