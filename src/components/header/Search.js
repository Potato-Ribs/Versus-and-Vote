import styled from "styled-components";

const Form = styled.form`
  .input-wrapper {
    display: grid;
  }
`;

const Input = styled.input`
  width: 200px;
  height: 40px;
  border: 1px solid black;
  border-radius: 20px;
  padding: 0 50px;
  position: relative;
  grid-column: 1/2;
  grid-row: 1/2;
`;

const Button = styled.button`
  width: fit-content;
  height: fit-content;
  align-self: center;
  border: none;
  margin-left: 20px;
  background-color: white;
  grid-column: 1/2;
  grid-row: 1/2;
  z-index: 1;
`;

function Search() {
  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Form onSubmit={onSubmit}>
      <div className="input-wrapper">
        <Button>🔎</Button>
        <Input />
      </div>
    </Form>
  );
}

export default Search;
