import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled, { css } from "styled-components";
import {
  faTimesCircle,
  faEdit,
  faCheckSquare,
  faSquare,
} from "@fortawesome/free-regular-svg-icons";
import { palette } from "styled-theme";

const resetButton = css`
  appearance: none;
  box-shadow: none;
  outline: none;
  border: 0;
  border-radius: 0;
  background-color: transparent;
  cursor: pointer;
  padding: 0;
  margin: 0;
`;

export const StyledTask = styled.div.attrs(() => ({ palette: "grayscale" }))`
  display: flex;
  justify-content: space-between;
  padding: 8px 16px;
  border-bottom: 1px solid ${palette("grayscale", 1)};

  &:first-child {
    border-top: 1px solid ${palette("grayscale", 1)};
  }
`;

export const StyledDelete = styled(FontAwesomeIcon).attrs({
  icon: faTimesCircle,
})`
  color: red;
  font-size: 24px;
`;

export const StyledEdit = styled(FontAwesomeIcon).attrs({ icon: faEdit })`
  color: red;
  font-size: 24px;
`;
export const StyledNotCheck = styled(FontAwesomeIcon).attrs({
  icon: faSquare,
})`
  color: red;
  font-size: 24px;
`;
export const StyledCheck = styled(FontAwesomeIcon).attrs({
  icon: faCheckSquare,
})`
  color: red;
  font-size: 24px;
`;
export const StyledButton = styled.button.attrs({ type: "button" })`
  ${resetButton}
  display: flex;
  margin-right: 8px;
  max-width: 24px;
  max-height: 24px;
`;

export const StyledEditForm = styled.form`
  padding: 0;
  margin: 0;
`;

export const StyledButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 70px;
  min-width: 70px;
`;

export const StyledText = styled.span``;
