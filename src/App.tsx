//* import third-party
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

//* import local (utils)
import RouteWrapper from "./components/common/ViewWrapper";

//* import local (pages)
import Nav from "./components/common/nav/NavView";
import Index from "./components/pages/index/IndexView";
import Profile from "./components/pages/profile/ProfileView";

const App = (): JSX.Element => {
  const location = useLocation();

  return (<>
    <Nav />
    <AnimatePresence mode="wait">
      <Routes key={location.pathname} location={location}>
        <Route path="/" element={<Index />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </AnimatePresence>
  </>);
}

export default App;