import styled from "styled-components";

const StyledInput = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  .input-box {
    font-size: 1.1rem;
    border-radius: 0.3rem;
    padding: 0.5rem 0.75rem;
    margin-top: 0.25rem;
  }
`;

const Input = ({
  label,
  type,
  inputValue,
  setInput,
  placeholder,
  required,
}) => {
  const onInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
  };
  return (
    <StyledInput className="Input">
      <label className="input-label">{label}</label>
      {required ? (
        <input
          className="input-box"
          type={type}
          value={inputValue}
          onChange={onInputChange}
          placeholder={placeholder}
          required
        />
      ) : (
        <input
          className="input-box"
          type={type}
          value={inputValue}
          onChange={onInputChange}
          placeholder={placeholder}
        />
      )}
    </StyledInput>
  );
};

export default Input;
