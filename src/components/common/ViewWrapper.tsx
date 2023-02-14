//* import third-party deps
import { ReactNode } from "react";
import { motion } from "framer-motion";

interface ViewWrapperProps {
  children?: ReactNode; //* props of containers must be ReactNodes
}

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