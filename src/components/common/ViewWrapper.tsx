//* import third-party deps
import { ReactNode } from "react";
import { motion } from "framer-motion";

interface ViewWrapperProps {
  children?: ReactNode; //* props of containers must be ReactNodes
}

/*
 * ViewWrapper contains the page transition logic for RouteViews like IndexView and ProfileView
 * @param children: ViewWrapperProps = ReactNode (a page like IndexView)
 * @returns JSX.Element the child(ren) route page wrapped in page transition logic
*/
const ViewWrapper = ({ children }: ViewWrapperProps): JSX.Element => {
  return (
    <motion.div
      initial={{ opacity: 0.0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0.0 }}
    >
      {children}
    </motion.div>
  );
}

export default ViewWrapper;