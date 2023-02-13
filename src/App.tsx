//* import libs
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

//* import pages
import Nav from "./components/common/nav/Container";
import IndexPage from "./components/pages/index/Container";
import ProfilePage from "./components/pages/profile/Container";

const App = (): JSX.Element => {
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