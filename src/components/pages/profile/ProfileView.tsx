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
    uploadProfileImage.current.click();
  }

  function onProfileBannerClick() {
    uploadProfileBanner.current.click();
  }

  //* render
  return (
    <ViewWrapper backgroundColor={"#333333"} hasNavbar> {/** holds animation and container logic*/}
      <input ref={uploadProfileBanner} type={"file"} accept={"image/png, image/jpeg"} hidden={true}></input>
      <input ref={uploadProfileImage} type={"file"} accept={"image/png, image/jpeg"} hidden={true}></input>
      <PageContainer>
        <BannerContainer>
          <ProfileBanner src={Banner}></ProfileBanner>
          { editMode ? <BannerOverlay onClick={onProfileBannerClick}>Change banner</BannerOverlay> : null }
        </BannerContainer>
        <BodyColor></BodyColor>
        <ProfileInformation>
          <ProfileImageContainer>
            <ProfileImage src={LogoPNG}></ProfileImage>
            { editMode ? <ProfileImageOverlay onClick={onProfileImageClick}>Change profile picture</ProfileImageOverlay> : null }
          </ProfileImageContainer>
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
        {/*{ editMode ? */}
        <AdditionalSettings className={editMode ? "visible" : "hidden"}>
          <ColorHint>Background Color</ColorHint>
          <ColorContainer>
            <ColorItem color={"#287485"}/>
            <ColorItem color={"#2062af"}/>
            <ColorItem color={"#f4b528"}/>
            <ColorItem color={"#dd3e48"}/>
            <ColorItem color={"#bf89ae"}/>
            <ColorItem color={"#5c88be"}/>
            <ColorItem color={"#59bc10"}/>
            <ColorItem color={"#e87034"}/>
            <ColorItem color={"#f84c44"}/>
            <ColorItem color={"#8c47fb"}/>
            <ColorItem color={"#51c1ee"}/>
            <ColorItem color={"#8cc453"}/>
            <ColorItem color={"#c2987d"}/>
            <ColorItem color={"#ce7777"}/>
            <ColorItem color={"#9086ba"}/>
          </ColorContainer>
        </AdditionalSettings> 
        {/*: null }*/}
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
  position: absolute;
  height: 30%;
  width: 100%;
  top: 0;
  left: 0;
  background-size: cover;
  object-fit: cover;
  background-repeat: no-repeat;
`;

const BannerOverlay = styled.div`
  position: absolute;
  height: 30%;
  width: 100%;
  top: 0;
  left: 0;
  background-color: #333333;
  text-align: center;
  color: white;
  opacity: 0;

  transition: all 0.4s ease;
  &:hover {
    opacity: 0.5;
  }
`

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

/*const ProfileImage = styled.img`
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
`;*/

const ProfileImageContainer = styled.div`
  height: 100%;
  aspect-ratio: 1 / 1;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const ProfileImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  height: calc(100% - 10px);
  aspect-ratio: 1 / 1;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  margin: 5px;
`;

const ProfileImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: calc(100% - 10px);
  aspect-ratio: 1 / 1;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  margin: 5px;
  background-color: #333333;
  text-align: center;
  color: white;
  opacity: 0;

  transition: all 0.4s ease;
  &:hover {
    opacity: 0.5;
  }
`

const ProfileDetails = styled.div`
  color: white;
  font-weight: bold;
  font-size: 1vw; 
  height: 95%;
`;

const ProfileName = styled.input`
  background-color: transparent;
  color: white;
  font-size: 1.75vw;
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
  height: 50%;
  width: 50%;
  display: flex;
  align-items: flex-start;
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
      color: green;
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
      date: "2022-02-28",
      winner: 1
    },
    {
      id: 2,
      players: "Player 3 vs Player 4",
      result: "0-1",
      accuracy: "76%",
      moves: "42",
      date: "2022-02-25",
      winner: 2
    },
    {
      id: 3,
      players: "Player 5 vs Player 6",
      result: "1/2-1/2",
      accuracy: "94%",
      moves: "50",
      date: "2022-02-21",
      winner: 0
    }
  ];

  const getResultSquare = (winner: any) => {
    if (winner === 1) {
      return <span style={{backgroundColor: "green"}}>&#x2B;</span>;
    } else if (winner === 2) {
      return <span style={{backgroundColor: "red"}}>&#x2212;</span>;
    }
  };

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
            <td>
              {item.result}{" "}
              {getResultSquare(item.winner)}
            </td>
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
  height: 1.5vw;
  padding: 2px;
`;

const EditButton = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 5px;
  background-color: #444444;
  border: 0;
  color: white;
  font-size: 1em;
  font-weight: 800;
  text-decoration: none;
  padding: 0.5em 2em;

  transition: all 0.2s ease;
  &:hover {
    background-color: #555555;
  }
`;

const AdditionalSettings = styled.div`
  position: absolute;
  top: 35%;
  left: 52.5%; 
  right: 0; 
  margin-left: 5%; 
  margin-right: auto; 
  background-color: #333333;
  height: 55%;
  width: 37.5%;
  display: flex;
  align-items: center;

  transition: all 0.4s ease;
  &.visible {
    visibility: visible;
    opacity: 100%;
  }

  transition: all 0.4s ease;
  &.hidden {
    visibility: none;
    opacity: 0%;
  }
`

const ColorHint = styled.div`
  position: absolute;
  top: 2.5%;
  left: 2.5%;
  color: white;
  font-weight: bold;
`

const ColorContainer = styled.div`
  position: absolute;
  top: 10%;
  left: 2.5%;
  width: 95%;
  height: 50%;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
`

interface ColorProps {
  color: string;
}

const ColorItem = styled.div<ColorProps>`
  margin: 0.1em;
  background-color: ${(p: ColorProps) => p.color};
  
  transition: all 0.05s ease;
  &:hover {
    border: 0.1em solid #202020;
  }
`