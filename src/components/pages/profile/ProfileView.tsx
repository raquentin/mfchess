//* import third-party
import { Link } from "react-router-dom";

//* import local
import ViewWrapper from "../../common/ViewWrapper";

const ProfilePage = (): JSX.Element => {
  return (
    <ViewWrapper>
      <h2>Profile</h2>
      <Link to="/">index page</Link>
    </ViewWrapper>
    );
}

export default ProfilePage;
