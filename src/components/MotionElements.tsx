import { motion, type HTMLMotionProps } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../config/framer';
import { ReactNode } from 'react';

interface MotionProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
}

export const MotionContainer = motion.div;

export const StaggerContainer = ({ children, className = "", ...props }: MotionProps) => (
  <MotionContainer
    variants={staggerContainer}
    initial="hidden"
    animate="show"
    className={className}
    {...props}
  >
    {children}
  </MotionContainer>
);

interface FadeInUpProps extends MotionProps {
  delay?: number;
}

export const FadeInUp = ({ children, className = "", delay = 0, ...props }: FadeInUpProps) => (
  <motion.div
    variants={fadeInUp}
    custom={delay}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

export const SlideInLeft = ({ children, className = "", ...props }: MotionProps) => (
  <motion.div
    initial={{ x: -60, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={defaultTransition}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

export const SlideInRight = ({ children, className = "", ...props }: MotionProps) => (
  <motion.div
    initial={{ x: 60, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={defaultTransition}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
); 