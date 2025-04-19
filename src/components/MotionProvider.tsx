import { MotionConfig } from "framer-motion";
import { ReactNode } from "react";
import { defaultTransition } from "../config/framer";

interface MotionProviderProps {
  children: ReactNode;
}

export const MotionProvider = ({ children }: MotionProviderProps) => (
  <MotionConfig
    transition={defaultTransition}
    reducedMotion="user"
  >
    {children}
  </MotionConfig>
); 