import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { click } from "../../app/features/isDarkSlice";

const Toggle = styled.button`
  font-size: 24px;
  margin-left: 60px;
  border: none;
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.bgColor};
`;

function DarkModeBtn() {
  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.isDark.value);

  return (
    <Toggle onClick={() => dispatch(click())}>{isDark ? "☀️" : "🌙"}</Toggle>
  );
}

export default DarkModeBtn;
