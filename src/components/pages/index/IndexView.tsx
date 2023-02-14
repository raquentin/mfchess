//* import third-party deps
import { Link } from "react-router-dom";
import styled from "styled-components";

//* import local
import ViewWrapper from "components/common/ViewWrapper";
import LogoPNG from "assets/logo.png";

/*
 * IndexView is the head component for the index page (mfchess.com/)
 * @returns JSX.element jsx structure for the index page
*/
const IndexView = (): JSX.Element => {
  //* styled-components
  const PageContainer = styled.div`

  `;
  const Logo = styled.img`
    height: 200px;
  `;

  //* render
  return (
    <ViewWrapper> {/** holds animation and container logic*/}
      <PageContainer>
        <Logo className="logo-image" src={LogoPNG} />  
        <div className="right-side-content">
          <h1 className="title-text">mfChess</h1>
          <Link to="/profile" className="play-button">Play</Link>
        </div>
      </PageContainer>
    </ViewWrapper>
  );
}

export default IndexView;
