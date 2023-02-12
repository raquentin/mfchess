//* import libs
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

//* import pages
import Nav from "./common/nav/Container";
import IndexPage from "./pages/index/Container";
import ProfilePage from "./pages/profile/Container";

export const App = (): JSX.Element => {
  const location = useLocation();

  return (<>
    <Nav />
    <AnimatePresence mode="wait">
      <Routes key={location.pathname} location={location}>
        <Route path="/" element={<IndexPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </AnimatePresence>
  </>);
}

export default App;