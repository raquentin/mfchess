//* import third-party deps
import styled from "styled-components";
import { useRef, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

//* import local
import ViewWrapper from "components/common/ViewWrapper";
import LogoPNG from "assets/user-profile-icon-free-vector.png";
import Banner from "assets/banner.jpg";
import USFlag from "assets/flags/United-States.png"

/*
 * ProfileView is the head component for the profile page (mfchess.com/user/{userID}, or mrchess.com/profile for now)
 @returns JSX.element jsx structure for the profile page
*/
const ProfileView = (): JSX.Element => {
  const btnDefaultText = "Edit Profile";
  const btnSaveText = "Save Changes";

  const [editMode, setEditMode] = useState(false);
  const [btnText, setBtnText] = useState(btnDefaultText);

  const uploadProfileBanner = useRef(document.createElement("input"));
  const uploadProfileImage = useRef(document.createElement("input"));

  function onEditButtonClick() {
    if (editMode) {
      setEditMode(false);
      setBtnText(btnDefaultText);
    } else {
      setEditMode(true);
      setBtnText(btnSaveText);
    }
  }

  function onProfileImageClick() {
    if (editMode) {
      uploadProfileImage.current.click();
    }
  }

  function onProfileBannerClick() {
    if (editMode) {
      uploadProfileBanner.current.click();
    }
  }

  //* render
  return (
    <ViewWrapper backgroundColor={"#333333"} hasNavbar> {/** holds animation and container logic*/}
      <input ref={uploadProfileBanner} type={"file"} accept={"image/png, image/jpeg"} hidden={true}></input>
      <input ref={uploadProfileImage} type={"file"} accept={"image/png, image/jpeg"} hidden={true}></input>
      <PageContainer>
        <BannerContainer>
          <ProfileBanner src={Banner} onClick={onProfileBannerClick}></ProfileBanner>
        </BannerContainer>
        <BodyColor></BodyColor>
        <ProfileInformation>
          <ProfileImage src={LogoPNG} onClick={onProfileImageClick}></ProfileImage>
          <ProfileDetails>
            <ProfileName type="text" readOnly={!editMode} defaultValue={"PlaceHolderName"}></ProfileName>
            <FlagAndRatingContainer>
              <FlagIcon src={USFlag}></FlagIcon>
              <div>9999</div>
            </FlagAndRatingContainer>
            <div>"Freelo"</div>
            <EditButton onClick={onEditButtonClick}>{btnText}</EditButton>
          </ProfileDetails>
        </ProfileInformation>
        <GameLogInformation>
          <GameLogTable />
        </GameLogInformation>
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
`;

const ProfileBanner = styled.img`
  height: 100%;
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;

  transition: all 0.4s ease;
  &:hover {
    opacity: 0.5;
  }
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

  transition: all 0.4s ease;
  &:hover {
    opacity: 0.5;
  }
`;

const ProfileDetails = styled.div`
  color: white;
  font-weight: bold;
  font-size: 1vw; 
  height: 95%;
`;

const ProfileName = styled.input`
  background-color: transparent;
  color: white;
  font-size: 1vw;
  font-weight: bold;
  border: none;

  &:focus {
    background-color: #505050;
    outline: none;
  }
`;

const GameLogInformation = styled.div`
  position: absolute;
  top: 40%;
  left: 0; 
  right: 0; 
  margin-left: 5%; 
  margin-right: auto; 
  background-color: #333333;
  height: 25%;
  width: 50%;
  display: flex;
  align-items: center;
  overflow-x: auto;
  table {
    width: 100%;
    border-collapse: collapse;
    th {
      background-color: #444444;
      color: #fff;
      font-weight: bold;
      border: none;
      padding: 8px;
    }
    td {
      color: #fff;
      border: 1px solid black;
      padding: 8px;
      text-align: center;
      border: none;
    }
    .clock {
      font-size: 20px;
    }
  }
`;

const GameLogTable = () => {
  const data = [
    {
      id: 1,
      players: "Player 1 vs Player 2",
      result: "1-0",
      accuracy: "89%",
      moves: "28",
      date: "2022-02-28"
    },
    {
      id: 2,
      players: "Player 3 vs Player 4",
      result: "0-1",
      accuracy: "76%",
      moves: "42",
      date: "2022-02-25"
    },
    {
      id: 3,
      players: "Player 5 vs Player 6",
      result: "1/2-1/2",
      accuracy: "94%",
      moves: "50",
      date: "2022-02-21"
    }
  ];

  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th>Players</th>
          <th>Result</th>
          <th>Accuracy</th>
          <th>Moves</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td><span className="clock">&#x23F1;</span></td>
            <td>{item.players}</td>
            <td>{item.result}</td>
            <td>{item.accuracy}</td>
            <td>{item.moves}</td>
            <td>{item.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const FlagAndRatingContainer = styled.div`
  display: flex;
  align-items: center;
`;

const FlagIcon = styled.img`
  height: 20px;
  padding: 2px;
`;

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