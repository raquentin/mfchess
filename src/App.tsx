//* import third-party
import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

//* import local (utils)
import ThemeColorContext from "./context/colorContext";
import {UserProvider} from "./context/UserContext";

//* import local (pages)
import Index from "components/pages/index/IndexView";
import Profile from "components/pages/profile/ProfileView";
import Game from "components/pages/game/GameView";
import Login from "components/Login"
import ChatRoom from "components/ChatRoom";


/* 
 * App is the head component for the entire site
*/
const App = (): JSX.Element => {
  //* component logic
  const location = useLocation();
  const [themeColor, setThemeColor] = useState<string>("#287485");

  //* render
  return (
    <UserProvider>
      <ThemeColorContext.Provider value={themeColor}>
        <AnimatePresence mode="wait">
          <Routes key={location.pathname} location={location}>
            <Route path="/" element={<Index />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/game" element={<Game />} />
            
            {/*! Temporary */}
            <Route path="/login" element={<Login />} />
            <Route path="/chatroom" element={<ChatRoom />} />
          </Routes>
        </AnimatePresence>
      </ThemeColorContext.Provider>
    </UserProvider>
  );
  
}

export default App;

//
