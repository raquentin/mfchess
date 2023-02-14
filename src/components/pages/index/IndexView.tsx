//* import third-party deps
import { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

//* import local
import ViewWrapper from "components/common/ViewWrapper";
import LogoPNG from "assets/logo.png";
import ThemeColorContext from "context/colorContext";

/*
 * IndexView is the head component for the index page (mfchess.com/)
 * @returns JSX.element jsx structure for the index page
*/
const IndexView = (): JSX.Element => {
  //* component logic
  const themeColor = useContext(ThemeColorContext);

  //* styled-components
  const Logo = styled.img`
    height: 200px;
    background-color: ${themeColor};
  `;

  //* render
  return (
    <ViewWrapper> {/** holds animation and container logic*/}
      <div className="page-container">
        <Logo className="logo-image" src={LogoPNG} />  
        <div className="right-side-content">
          <h1 className="title-text">mfChess</h1>
          <Link to="/profile" className="play-button">Play</Link>
        </div>
      </div>
    </ViewWrapper>
  );
}

export default IndexView;
