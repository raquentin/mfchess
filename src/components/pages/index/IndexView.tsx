//* import third-party
import { Link } from "react-router-dom";

//* import local
import ViewWrapper from "../../common/ViewWrapper";

const IndexPage = (): JSX.Element => {
  return (
    <ViewWrapper>
      <h2>Index</h2>
      <Link to="/profile">profile page</Link>
    </ViewWrapper>
    );
}

export default IndexPage;
