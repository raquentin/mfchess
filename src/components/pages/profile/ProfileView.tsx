//* import third-party deps
import styled from "styled-components";

//* import local
import ViewWrapper from "components/common/ViewWrapper";
import InGameProfile from "components/common/InGameProfile";
import LogoPNG from "assets/user-profile-icon-free-vector.png";
import Banner from "assets/banner.jpg";
import EditPNG from "assets/edit.png";
import USFlag from "assets/flags/United-States.png"

/*
 * ProfileView is the head component for the profile page (mfchess.com/user/{userID}, or mrchess.com/profile for now)
 @returns JSX.element jsx structure for the profile page
*/
const ProfileView = (): JSX.Element => {
  //* render
  return (
    <ViewWrapper backgroundColor={"#333333"} hasNavbar> {/** holds animation and container logic*/}
      <PageContainer>
        <BannerContainer>
          <ProfileBanner src={Banner}></ProfileBanner>
        </BannerContainer>
        <BodyColor></BodyColor>
        <ProfileInformation>
          <ProfileImage src={LogoPNG}></ProfileImage>
          <ProfileDetails>
            <div>PlaceHolderName</div>
            <FlagAndRatingContainer>
              <FlagIcon src={USFlag}></FlagIcon>
              <div>9999</div>
            </FlagAndRatingContainer>
            <div>"Freelo"</div>
            <EditButton>Edit Profile</EditButton>
          </ProfileDetails>
        </ProfileInformation>
      </PageContainer>
    </ViewWrapper>
  );
}

export default ProfileView;

//lines below this point are styled-components logic
const PageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const BannerContainer = styled.div`
  height: 30%;
  background-color: blue;
`

const ProfileBanner = styled.img`
  height: 100%;
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
`;

const BodyColor = styled.div`
  height: 70%;
  background-color: #287485;
`;

const ProfileInformation = styled.div`
  position: absolute;
  top: 10%;
  left: 0; 
  right: 0; 
  margin-left: 5%; 
  margin-right: auto; 
  background-color: #333333;
  height: 25%;
  width: 50%;
  display: flex;
  align-items: center;
`;

const ProfileImage = styled.img`
  height: calc(100% - 10px);
  aspect-ratio: 1 / 1;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  margin: 5px;
`;

const ProfileDetails = styled.div`
  color: white;
  font-weight: bold;
  font-size: 1vw; 
  height: 95%;
`;

const FlagAndRatingContainer = styled.div`
  display: flex;
  align-items: center;
`

const FlagIcon = styled.img`
  height: 20px;
  padding: 2px;
`

const EditButton = styled.button`
  position: absolute;
  bottom: 0;
  margin: 5px;
  background-color: black;
  color: white;
  font-size: 1em;
  font-weight: 800;
  text-decoration: none;
  padding: 0.5em 2em;

  transition: all 0.8s ease;
  &:hover {
    background-color: grey;
  }
`;