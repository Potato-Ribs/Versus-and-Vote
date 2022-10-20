import { useState } from "react";
import styled from "styled-components";

const Toggle = styled.button`
  background-color: white;
  color: black;
  font-size: 24px;
  margin-left: 60px;
  border: none;
`;

function DarkModeBtn() {
  const [isDark, setIsDark] = useState(false);
  return (
    <Toggle onClick={() => setIsDark((prev) => !prev)}>
      {isDark ? "☀️" : "🌙"}
    </Toggle>
  );
}

export default DarkModeBtn;
