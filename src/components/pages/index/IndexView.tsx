//* import third-party deps
import { useContext } from "react";
import { Link } from "react-router-dom";

//* import local
import ViewWrapper from "components/common/ViewWrapper";
import LogoSVG from "assets/LogoSVG";
import ThemeColorContext from "context/colorContext";

const IndexPage = (): JSX.Element => {
  const themeColor = useContext(ThemeColorContext);

  return (
    <ViewWrapper> {/** holds animation and container logic*/}
      <div className="page-container">
        <LogoSVG width={30} color={themeColor} />  
        <div className="right-side-content">
          <h1 className="title-text">mfChess</h1>
          <button className="play-button">Play</button>
        </div>
      </div>
    </ViewWrapper>
    );
}

export default IndexPage;
