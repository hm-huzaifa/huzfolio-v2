import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { fadeIn } from '../config/framer';

interface AnimatedPageProps {
  children: ReactNode;
}

const AnimatedPage = ({ children }: AnimatedPageProps) => {
  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="show"
      exit="hidden"
      className="min-h-screen pt-16 bg-gradient-to-b from-black via-gray-900 to-black"
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPage; 