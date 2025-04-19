import emailjs from '@emailjs/browser';

export const initEmailJS = () => {
  // Public key is used for initialization (not UserID)
  emailjs.init(import.meta.env.VITE_PUBLIC_KEY as string);
};

// Service and template IDs
export const EMAILJS_SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
export const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;

export default emailjs; 