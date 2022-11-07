import styled from "styled-components";

export const BtnAccent = styled.button`
  height: 50px;
  padding: 0 20px;
  border-radius: 10px;
  font-size: 18px;
  color: ${(props) => props.theme.bgColor};
  background-color: ${(props) => props.theme.accentColor};
  border: none;

  &:hover {
    background-color: ${(props) => props.theme.textColorOpacity};
    cursor: pointer;
  }
`;
