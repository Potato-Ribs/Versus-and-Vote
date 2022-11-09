import { useSelector } from "react-redux";
import styled, { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "../../theme";
import GithubCard from "./GithubCard";

const StyledFooter = styled.footer`
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.bgColor};
  padding: 1rem 4rem;
  /* border-top: ${(props) => props.theme.textColor + " solid 0.3px"}; */
  display: flex;
  justify-content: space-between;
  align-items: center;

  .anchor > a {
    color: ${(props) => props.theme.textColor};
    text-decoration: none;
    font-size: 1.1rem;
    font-weight: 700;
    :hover {
      filter: brightness(0.5);
    }
  }

  .logo {
    width: 110px;
  }

  .footer-anchor-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .anchor {
    width: 200px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
  }

  .footer-contents {
    height: 2.5rem;
    display: flex;
    font-size: 0.8rem;
    letter-spacing: 0.5px;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
`;

const Footer = () => {
  const isDark = useSelector((state) => state.isDark.value);
  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <StyledFooter>
        <div>
          <img
            className="logo"
            src={
              isDark
                ? "https://velog.velcdn.com/images/2pandi/post/0195ad06-f54d-4958-a4a6-6dc358cf62a4/image.jpeg"
                : "https://velog.velcdn.com/images/2pandi/post/47f2da28-e528-49dc-bcc5-d76cff41cc74/image.jpeg"
            }
            alt=""
          />
        </div>
        <div>
          <div className="footer-contents">
            <div>이메일: yeonwoopark22@gmail.com, coder.2pandi@gmail.com</div>
            <div>디스코드: SEB_FE_40_박연우#5385, SEB_FE_40_이예빈#2999</div>
          </div>
        </div>
        <div className="footer-anchor-wrapper">
          <div className="anchor">
            <a
              href="https://github.com/Potato-Ribs/Versus-and-Vote"
              target="_blank"
            >
              github
            </a>
            <div>|</div>
            <a
              href="https://github.com/Potato-Ribs/Versus-and-Vote/issues"
              target="_blank"
            >
              issue
            </a>
          </div>
          <div>© 2022 Versus and Vote, All rights reserved.</div>
        </div>
        <div>
          <GithubCard text="2pandi" />
          <GithubCard text="HyeonWooGa" />
        </div>
      </StyledFooter>
    </ThemeProvider>
  );
};

export default Footer;
