import { Link } from "react-router-dom";

const IndexPage = (): JSX.Element => {
  return (<>
    <h2>index</h2>
    <Link to="/profile">profile page</Link>
    </>);
}

export default IndexPage;
