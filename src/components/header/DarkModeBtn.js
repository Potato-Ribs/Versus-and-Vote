import { useState } from "react";
import styled from "styled-components";

const Toggle = styled.button`
  font-size: 24px;
  margin-left: 60px;
  border: none;
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.bgColor};
`;

function DarkModeBtn({ isDark, setIsDark }) {
  return (
    <Toggle onClick={() => setIsDark((prev) => !prev)}>
      {isDark ? "☀️" : "🌙"}
    </Toggle>
  );
}

export default DarkModeBtn;
