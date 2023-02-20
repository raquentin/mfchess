import { useEffect, useContext } from "react";
import Axios from "axios";
import {useNavigate} from 'react-router-dom';
import {UserContext} from "../context/UserContext";

type loginInput = {
  user: { loggedIn: any; };
};

/**
 * ! Will fix and clean up later! (gio)
 */

const Login: React.FunctionComponent = ()  => {
  const user = useContext(UserContext)
  const navigate = useNavigate();
  
  function handleCredentialResponse(response: { credential: any; }) {
    console.log("Logged in:", response.credential)

    // Axios.post("http://localhost:3002/login", {
    //   token: response.credential
    // }).then((response) => {
    //   console.log(response.data);
    //   getUserInfo(response.data.sub); // just for showcasing.
    // });
  }

  // Use sub(UserID) to retrieve user info in db.
  function getUserInfo(userID: String) {
    // Axios.post("http://localhost:3002/userInfo", {
    //   sub: userID
    // }).then((response) => {
    //   // updateUser(response.data.result[0].name, true);
    //   navigate('/', {replace: true});
    // });
  }

  function signOut() {
    window.google.accounts.id.disableAutoSelect();
    // updateUser(null, false);
    navigate('/', {replace: true});
  }
  
  useEffect( () => {
    let google = window.google;
    // Initialize google auth using our OAuth 2.0 Client ID
    google.accounts.id.initialize({
      client_id:
        "830413447287-hjqll1sr9jeasrp0k4tele329bsumpep.apps.googleusercontent.com",
      callback: handleCredentialResponse,
    });

    // Render the button using google's library
    google.accounts.id.renderButton(
      document.getElementById("buttonDiv")!,
      {
        theme: "outline", size: "small",
        type: "standard"
      }
    );
    google.accounts.id.prompt();
  })

  return (
    <div>
      {user!.loggedIn ? <button onClick={signOut}> Logout </button> : <div id="buttonDiv"></div>}
    </div>
  );
}

export default Login;