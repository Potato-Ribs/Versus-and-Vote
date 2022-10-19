import styled from "styled-components";

const StyledAds = styled.div`
  width: 180px;
  height: 100vh;
  background-color: tomato;
  margin-left: 40px;
`;

const Ads = () => {
  return (
    <StyledAds className="Ads">
      <div className="commercial"></div>
      <div className="commercial"></div>
    </StyledAds>
  );
};

export default Ads;
