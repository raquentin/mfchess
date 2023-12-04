import styled from "styled-components";
import { useState, useEffect } from "react";
import YourPFP from "assets/YourPFP.png";
import TheirPFP from "assets/TheirPFP.jpeg";

import Banner from "assets/banner.jpg";
import { useGame } from "context/WebSocket";
import { UserType } from "types/UserType";

interface Props {
  userID: number;
  side: string;
  startedGame: boolean;
  isTurn: boolean;
  player: UserType;
}

const InGameProfile = ({ userID, side, startedGame, isTurn, player }: Props): JSX.Element => {

  const [time, setTime] = useState(-1);
  const [pausedTime, setPausedTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);


  const initialTimeAmount: number = 300000;

  useEffect(() => {
    if(!startedGame) {
      return;
    } else if(time === -1) {
      // Get current time and set the timer to be 5 minutes
      setTime(Date.now());
      setHours(Math.floor((initialTimeAmount / (1000 * 60 * 60)) % 24));
      setMinutes(Math.floor((initialTimeAmount / 1000 / 60) % 60));
      setSeconds(Math.round((initialTimeAmount / 1000) % 60));
    }
    // Keep tracks of the duration that isn't the player's turn and
    // adds that duration to time once it becomes player's turn again
    if(!isTurn) {
      setPausedTime(Date.now());
    } else {
      setTime(time + (Date.now() - pausedTime))
    }

    // Triggers the clock once all conditions have been met
    if(isTurn && startedGame) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [startedGame, isTurn]);


  useEffect(() => {
    if(!isActive) return;
    const interval = setInterval(() => {
      const newTime = initialTimeAmount - (Date.now() - time);
      // console.log(newTime);
      if(newTime < 0) {
        setHours(0);
        setMinutes(0);
        setSeconds(0);
        clearInterval(interval);
        return;
      }
      setHours(Math.floor((newTime / (1000 * 60 * 60)) % 24));
      setMinutes(Math.floor((newTime / 1000 / 60) % 60));
      setSeconds(Math.round((newTime / 1000) % 60));
    }, 1000);
    return () => clearInterval(interval);
  }, [isActive, seconds])


  const standardizeTime = () => {
    let timeString = "";
    if(minutes < 10) {
      timeString += "0";
    }
    timeString += minutes.toString();
    timeString += ":"
    if(seconds < 10) {
      timeString += "0";
    }
    timeString += seconds.toString();
    return timeString;
  }

  return (
    <ProfileContainer backgroundColor={"#287485"}>
      <StatsContainer>
        <PFPImage src={player.profilePictureUrl} />
        <NotPFP>
          <PlayerName>{player.name}</PlayerName>
          <EloText>{1230}</EloText>
          <DescText lighterColorForText={"#b4e6f1"}>"I have stockfish open in another tab"</DescText>
        </NotPFP>
      </StatsContainer>
      <TimeContainer>
        <TimeText>{standardizeTime()}</TimeText>
      </TimeContainer>
    </ProfileContainer>

    // <ProfileContainer>
    //   <BannerContainer>
    //     <ProfileBanner src={Banner} ></ProfileBanner>
    //   </BannerContainer>
    //   <BodyColor></BodyColor>
    //   <ProfileInformation>
    //     <ProfileImage src={LogoPNG} ></ProfileImage>
    //     <ProfileDetails>
    //       <div>PlaceHolderName</div>
    //       <div>Rating: 9999</div>
    //       <div>"Freelo"</div>
    //     </ProfileDetails>
    //   </ProfileInformation>
    //   <GameInformation >
    //     <TimerContainer>{standardizeTime()}</TimerContainer>
    //   </GameInformation>
    // </ProfileContainer>
  )
}

export default InGameProfile

/*
 * ProfileContainer is the parent container for the entire profile card during games
 TODO: pass background color based on user color preference
*/
const ProfileContainer = styled.div<{backgroundColor: string}>`
  position: relative;
  width: 100%;
  padding: 3.2em 1.3em 1.3em 1.3em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${props => props.backgroundColor};
  height: 13em;
`;

/*
 * StatsContainer is the top part where the user pfp and elo, etc is
*/
const StatsContainer = styled.div`
  background-color: #333333;
  display: flex;
  gap: 0.2em;
  max-height: 7em;
`;
const PlayerName = styled.h2`
  margin: 0;
  font-size: 1.3em;
  color: white;
`;
const EloText = styled.h4`
  margin: 0;
  color: white;
`;
const DescText = styled.p<{lighterColorForText: string}>`
  margin: 0;
  color: ${props => props.lighterColorForText};
  font-style: italic;
`;
const TimeText = styled.h2`
  margin: 0;
  color: black;
`;

/*
 * TimeContainer is the bottom part with time left and captured pieces
 TODO: make the background-color match the white/black side like the figma does
*/
const TimeContainer = styled.div`
  background-color: #D9D9D9;
  height: 3em;
  display: flex;
  padding: 0em 0.5em;
  align-items: center;
  justify-content: space-between;
`;
const NotPFP = styled.div`
  display: flex;
  gap: 0.1em;
  padding: 0.3em 0.2em 0.2em 0em;
  flex-direction: column;
`;
const PFPImage = styled.img`
  display: flex;
  height: 100%;
`;
const BannerImage = styled.img`
  position: absolute;
  top: 0;
  width: 100%;
`;