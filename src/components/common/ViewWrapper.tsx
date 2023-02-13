import { Route } from 'react-router-dom';

//* import libs
import { ContainerProps } from "../../utils/interfaces";
import { motion } from "framer-motion";

const ViewWrapper = ({ children }: ContainerProps): JSX.Element => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
}

export default ViewWrapper;