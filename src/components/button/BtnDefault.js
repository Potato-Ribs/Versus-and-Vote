import styled from "styled-components";

export const BtnDefault = styled.button`
  height: 50px;
  padding: 0 20px;
  border-radius: 10px;
  font-size: 18px;
  border: 1px solid ${(props) => props.theme.textColor};
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.bgColor};

  &:hover {
    background-color: ${(props) => props.theme.bgColorOpacity};
    cursor: pointer;
  }
`;
