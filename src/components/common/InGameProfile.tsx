import styled from "styled-components";
import { useState, useEffect } from "react";
import LogoPNG from "assets/user-profile-icon-free-vector.png";
import Banner from "assets/banner.jpg";
import { useGame } from "context/WebSocket";
import { UserType } from "types/UserType";

interface Props {
  userID: Number;
  side: String;
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
    <ProfileContainer>
      <BannerContainer>
        <ProfileBanner src={Banner} ></ProfileBanner>
      </BannerContainer>
      <BodyColor></BodyColor>
      <ProfileInformation>
        <ProfileImage src={player.profilePictureUrl} ></ProfileImage>
        <ProfileDetails>
          <div>{player.name}</div>
          {/* <div>Rating: 9999</div>
          <div>"Freelo"</div> */}
        </ProfileDetails>
      </ProfileInformation>
      <GameInformation >
        <TimerContainer>{standardizeTime()}</TimerContainer>
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

const TimerContainer = styled.div`
  color: white;
`;