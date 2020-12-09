import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import Task from "components/Task";

import { StyledHeight, StyledList } from "./styles";
import { context } from "../../context/TaskListContext";
import useHeight from "../hooks/useHeight";

const List = () => {
  const listContext = useContext(context);
  const listRef = useRef(null);
  const height = useHeight(listRef, listContext.taskList);

  const listMemo = useMemo(() => {
    return listContext.taskList.map(({ text, id, isDone }) => (
      <Task key={id} isDone={isDone} id={id} text={text}>
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
