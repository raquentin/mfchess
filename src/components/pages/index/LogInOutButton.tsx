//* import third-party deps
import { Link } from "react-router-dom";
import styled from "styled-components";
import { SetStateAction, useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';
import {defaultUser, useUser} from "context/UserContext";
import {UserType} from "types/UserType"
import { useGame } from "context/WebSocket";

import AxiosInstance from "utils/axiosInstance";



//* import local

/*
 * IndexView is the head component for the index page (mfchess.com/)
 @returns JSX.element jsx structure for the index page
*/
const LogInOutButton: React.FunctionComponent = (): JSX.Element => {
  const [user, updateUser, fetchUser] = useUser();
  const [,,,,,,,, clearLocalStorage] = useGame();

  // console.log("User: ", user);

  const navigate = useNavigate();
  
  /**
   * * Takes in credential String from google after logging in, pass to backed for decode, then
   * * use update user. Finally, navigate to main page and call fetchUser to fetch user from db.
   * ! No idea how to write the typescript stuff for this
   */
  const handleCredentialResponse = (response: { credential: string; }) => {
    const credential: string  = response.credential
    console.log("####### Button login")
    AxiosInstance({
      method: 'post',
      url: "login",
      data: {token: credential},
    }).then((response) => {
      console.log("####### Button Update User")
      updateUser!((user: UserType) => {
        const updatedUser = {
          ...user,
          loggedIn: true,
          userID: response.data.sub,
          jwtCredential: credential
        };
        
        return updatedUser;
      })
      navigate('/', {replace: true});
      // fetchUser!();
    }).catch((err) => {
      throw new Error(err)
    })
  }

  /**
   * * reset user to default (defined in UserContext)
   */
  const signOut = () => {
    window.google.accounts.id.disableAutoSelect();

    console.log("####### Button logout")
    console.log("Sign out 11", defaultUser)
    updateUser!(defaultUser);
    clearLocalStorage();
    navigate('/', {replace: true});
    // user.loggedIn = false;
    // console.log(user)
    console.log("Sign out 1")

  }
  
  /**
   * * If not logged in, renders the login button and pops the prompt out.
   * ? useEffect seems to run twice because of strictmode, doesn't affect anything for now.
   */
  useEffect( () => {
    let google = window.google;
    google.accounts.id.initialize({
      client_id:
        "830413447287-hjqll1sr9jeasrp0k4tele329bsumpep.apps.googleusercontent.com",
      callback: handleCredentialResponse,
    });

    if (!user!.loggedIn) {
      // Render the button using google's library
      google.accounts.id.renderButton(
        document.getElementById("buttonDiv")!,
        {
          theme: "outline", size: "small",
          type: "standard"
        }
      );
      google.accounts.id.prompt();
    }
  },[])


  //* render
  return (
    <>
      {user!.loggedIn
      ? (
        <PlayButtonFake onClick={signOut}>logout bu</PlayButtonFake>
      )
      : (
        <PlayButton to="/login">login bu</PlayButton>
      )}
    </>
    
  );
}

export default LogInOutButton;


//lines below this point are styled-components logic

/*
 * PlayButton is the play button that extends the react-router-dom Link component
 TODO: make the hover effect better
*/
export const PlayButton = styled(Link)`
  background-color: #333333;
  border: 0.22em solid black;
  border-radius: 14px;
  color: white;
  font-size: 3em;
  font-weight: 800;
  text-decoration: none;
  padding: 0.25em 0.5em;

  transition: all 0.3s ease;
  &:hover {
    background-color: #287485;
  }
`;
export const PlayButtonFake = styled.div`
  background-color: #333333;
  border: 0.22em solid black;
  border-radius: 14px;
  color: white;
  font-size: 3em;
  font-weight: 800;
  text-decoration: none;
  padding: 0.25em 0.5em;

  transition: all 0.3s ease;
  &:hover {
    background-color: #287485;
  }
`;
