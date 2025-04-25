import { motion } from "framer-motion";

const Spinner = () => {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1 }}
      className="h-10 w-10 border-4 border-red-500 border-t-transparent rounded-full"
    />
  );
};

export default Spinner;
