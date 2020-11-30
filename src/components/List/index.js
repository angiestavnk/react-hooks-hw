import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import Task from "components/Task";

import { StyledHeight, StyledList } from "./styles";
import { context } from "../../context/TaskListContext";

const List = () => {
  const listContext = useContext(context);
  const [height, setHeight] = useState(0);
  let listRef = useRef(null);
  useEffect(() => {
    const newHeight = listRef.current && listRef.current.offsetHeight;
    if (newHeight && height !== newHeight) {
      setHeight(newHeight);
    }
  }, [listContext.taskList]);
  const listMemo = useMemo(() => {
    return listContext.taskList.map(({ text, id, isDone }) => (
      <Task
        key={id}
        onDelete={listContext.removeTask}
        onSave={listContext.addTask}
        onCheck={listContext.checkTask}
        isDone={isDone}
        id={id}
      >
        {text}
      </Task>
    ));
  }, [listContext.taskList]);
  return (
    <StyledList ref={listRef}>
      {listMemo}
      <StyledHeight>List height: {height} px</StyledHeight>
    </StyledList>
  );
};
export default List;
