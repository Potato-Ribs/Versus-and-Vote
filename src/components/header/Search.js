import styled from "styled-components";

const Form = styled.form``;

const Input = styled.input`
  width: 200px;
  height: 40px;
  border: 1px solid black;
  border-radius: 20px;
  padding: 0 35px;
`;

const Button = styled.button`
  position: relative;
  left: 35px;
  border: none;
  background-color: white;
`;

function Search() {
  return (
    <Form>
      <Button>🔎</Button>
      <Input />
    </Form>
  );
}

export default Search;
