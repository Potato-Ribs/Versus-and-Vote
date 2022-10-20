import styled from "styled-components";

const StyledAds = styled.div`
  width: 180px;
  height: 100vh;
  background-color: tomato;

  .commercial {
    width: 180px;
    height: 320px;
    background-color: gray;
    :not(:last-child) {
      margin-bottom: 20px;
    }
  }
`;

const Ads = () => {
  return (
    <StyledAds className="Ads">
      <div className="commercial">광고</div>
      <div className="commercial">광고</div>
    </StyledAds>
  );
};

export default Ads;
