import { useEffect } from "react";
import Axios from "axios";
import {useNavigate} from 'react-router-dom';

type loginInput = {
  user: { loggedIn: any; };
};

const Login: React.FunctionComponent = ()  => {
  const user = {loggedIn: false};
  // sends the token to backend, and retrieve sub(UserID) from backend.
  const navigate = useNavigate();
  // const handleOnClick = useCallback(() => navigate('/sample', {replace: true}), [navigate]);
  function handleCredentialResponse(response: { credential: any; }) {
    Axios.post("http://localhost:3002/login", {
      token: response.credential
    }).then((response) => {
      console.log(response.data);
      getUserInfo(response.data.sub); // just for showcasing.
    });
  }

  // Use sub(UserID) to retrieve user info in db.
  function getUserInfo(userID: String) {
    Axios.post("http://localhost:3002/userInfo", {
      sub: userID
    }).then((response) => {
      // updateUser(response.data.result[0].name, true);
      navigate('/', {replace: true});
    });
  }

  function signOut() {
    window.google.accounts.id.disableAutoSelect();
    // updateUser(null, false);
    navigate('/', {replace: true});
  }
  
  window.onload = function () {
    google.accounts.id.initialize({
      client_id: "YOUR_GOOGLE_CLIENT_ID",
      callback: handleCredentialResponse
    });
    google.accounts.id.renderButton(
      document.getElementById("buttonDiv")!,
      {
        theme: "outline", size: "large",
        type: "standard"
      }  // customization attributes
    );
    google.accounts.id.prompt(); // also display the One Tap dialog
  }

  useEffect(() => {
    let google = window.google;
    // Initialize google auth using our OAuth 2.0 Client ID
    google.accounts.id.initialize({
      client_id:
        "33451040036-fcevscq8eogthqf0ve60bbdqrs03obpr.apps.googleusercontent.com",
      callback: handleCredentialResponse,
    });

    // Render the button using google's library
    google.accounts.id.renderButton(
      document.getElementById("buttonDiv")!,
      {
        theme: "outline", size: "small",
        type: "standard"
      } // customization attributes
    );
    // google.accounts.id.prompt(); // also display the One Tap dialog
  })

  return (
    <div>
      {/* The Google Login Button */}
      {/* <div id="buttonDiv"></div> */}
      {user.loggedIn ? <button onClick={signOut}> Logout </button> : <div id="buttonDiv"></div>}
      {/* <h1 id="nameBanner">Name: {userName}</h1>
      <button onClick={onSignout}> Sign Out </button> */}
      {/* To see the problems -> <ProblemBody></ProblemBody> */}
      {/* <ProblemBody></ProblemBody> */}
    </div>
  );
}

export default Login;