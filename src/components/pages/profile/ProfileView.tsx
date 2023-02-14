//* import third-party deps
////import { Link } from "react-router-dom";

//* import local
import ViewWrapper from "components/common/ViewWrapper";
import Nav from "components/common/nav/NavView";

/*
 * ProfileView is the head component for the profile page (mfchess.com/user/{userID}, or mrchess.com/profile for now)
 @returns JSX.element jsx structure for the profile page
*/
const ProfileView = (): JSX.Element => {
  //* render
  return (
    <ViewWrapper backgroundColor={"#333333"}> {/** holds animation and container logic*/}
      <Nav />
      <p>hi</p>
    </ViewWrapper>
    );
}

export default ProfileView;
