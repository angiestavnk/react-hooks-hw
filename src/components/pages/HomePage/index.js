import React from "react";

import TaskProvider from "context/TaskListContext";
import { getState } from "utils/localStorage";

import List from "components/List";
import Form from "components/Form";

import { StyledWrapper } from "./styles";

const HomePage = () => {
  return (
    <TaskProvider>
      <StyledWrapper>
        <Form />
        <List />
      </StyledWrapper>
    </TaskProvider>
  );
};

export default HomePage;
