import styled from "styled-components";
import LogoPNG from "assets/user-profile-icon-free-vector.png";
import Banner from "assets/banner.jpg";

interface Props {
  userID: Number;
  side: String;
}

const InGameProfile = ({ userID, side }: Props): JSX.Element => {

  return (
    <ProfileContainer>
      <BannerContainer>
        <ProfileBanner src={Banner} ></ProfileBanner>
      </BannerContainer>
      <BodyColor></BodyColor>
      <ProfileInformation>
        <ProfileImage src={LogoPNG} ></ProfileImage>
        <ProfileDetails>
          <div>PlaceHolderName</div>
          <div>Rating: 9999</div>
          <div>"Freelo"</div>
        </ProfileDetails>
      </ProfileInformation>
      <GameInformation >
        <img ></img>
      </GameInformation>
    </ProfileContainer>
  )
}

export default InGameProfile

const ProfileContainer = styled.div`
  position: relative;
  height: 100%;
  width: 48%;
`;

const BannerContainer = styled.div`
  height: 30%;
  background-color: blue;
`;

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
  top: 15%;
  left: 0; 
  right: 0; 
  margin-left: auto; 
  margin-right: auto; 
  background-color: #333333;
  height: 32%;
  width: 85%;
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

const GameInformation = styled.div`
  position: absolute;
  top: 70%;
  left: 0; 
  right: 0; 
  margin-left: auto; 
  margin-right: auto;
  background-color: #333333;
  height: 16%;
  width: 85%;
`;