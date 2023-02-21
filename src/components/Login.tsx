import { useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import {defaultUser, useUser} from "../context/UserContext";
import {UserType} from "../types/User"

import AxiosInstance from "../utils/axiosInstance";

/**
 * ! Will fix and clean up later! (gio)
 */

const Login: React.FunctionComponent = ()  => {
  const [user, updateUser, fetchUser] = useUser()
  const navigate = useNavigate();
  /**
   * ! Will write the typescript stuff for this
   */
  const handleCredentialResponse = (response: { credential: any; }) => {
    console.log("Logged in:", response.credential)
    AxiosInstance({
      method: 'post',
      url: "login",
      data: {token: response.credential},
    }).then((response) => {
      console.log(response.data);
      updateUser!((user: UserType) => {
        user.loggedIn = true;
        user.userID = response.data.sub
        // console.log("setted")
        return user;
      })
      navigate('/', {replace: true});
      fetchUser!();
    })
    // Axios.post("http://localhost:3002/login", {
    //   token: response.credential
    // }).then((response) => {
    //   console.log(response.data);
    //   getUserInfo(response.data.sub); // just for showcasing.
    // });
  }

  // Use sub(UserID) to retrieve user info in db.
  const getUserInfo = (userID: String) => {
    // Axios.post("http://localhost:3002/userInfo", {
    //   sub: userID
    // }).then((response) => {
    //   // updateUser(response.data.result[0].name, true);
    //   navigate('/', {replace: true});
    // });
  }

  const signOut = () => {
    window.google.accounts.id.disableAutoSelect();
    updateUser!((user: UserType) => defaultUser())
    navigate('/', {replace: true});
  }
  
  // componentDidMount(){
  useEffect( () => {
    let google = window.google;
    // Initialize google auth using our OAuth 2.0 Client ID
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
  // }
  },[])

  return (
    <div>
      <>{user!.loggedIn ? <button onClick={signOut}> Logout </button> : <div id="buttonDiv"></div>}
        {console.log(user)}
      </>
    </div>
  );
}

export default Login;