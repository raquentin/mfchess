//* import third-party deps
import { Link } from "react-router-dom";

//* import local
import ViewWrapper from "components/common/ViewWrapper";

/*
 * ProfileView is the head component for the profile page (mfchess.com/user/{userID}, or mrchess.com/profile for now)
 * @returns JSX.element jsx structure for the profile page
*/
const ProfileView = (): JSX.Element => {
  //* render
  return (
    <ViewWrapper> {/** holds animation and container logic*/}
      <h2>Profile</h2>
      <Link to="/">index page</Link>
    </ViewWrapper>
    );
}

export default ProfileView;
