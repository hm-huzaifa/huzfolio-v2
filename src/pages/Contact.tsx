import { memo, useState, FormEvent, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, GithubIcon, Linkedin, Instagram } from 'lucide-react';
import { TbBrandLinktree } from 'react-icons/tb'
import { BsWhatsapp } from 'react-icons/bs';
import { StaggerContainer, FadeInUp } from '../components/MotionElements';
import ContactBackground3D from '../components/ContactBackground3D';
import { containerVariants } from '../config/framer';
import emailjs, { initEmailJS, EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID } from '../utils/emailjs';

export const contactMethods = [
  {
    icon: Mail,
    title: 'Email',
    value: 'mhuzaifa150@gmail.com',
    link: 'mailto:mhuzaifa150@gmail.com'
  },
  {
    icon: GithubIcon,
    title: 'GitHub',
    value: 'github.com/hm-huzaifa',
    link: 'https://github.com/hm-huzaifa'
  },
  {
    icon: Linkedin,
    title: 'LinkedIn',
    value: 'linkedin.com/in/hmhuzaifa',
    link: 'https://www.linkedin.com/in/hmhuzaifa'
  },
  {
    icon: BsWhatsapp,
    title: 'WhatsApp',
    value: '+92 345 4245718',
    link: 'https://wa.me/923454245718'
  },
  {
    icon: Instagram,
    title: 'Instagram',
    value: '@h.m_huzaifa',
    link: 'https://instagram.com/h.m_huzaifa'
  },
  {
    icon: TbBrandLinktree,
    title: 'Linktree',
    value: 'Muhammad Huzaifa',
    link: 'https://linktr.ee/hmhuzaifa'
  }
] as const;

const ContactForm = memo(() => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean;
    message?: string;
  }>({});

  useEffect(() => {
    // Initialize EmailJS when component mounts
    initEmailJS();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus({
        success: false,
        message: 'Please fill in all fields'
      });
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Add a hidden time input to the form before sending
      const timeInput = document.createElement('input');
      timeInput.type = 'hidden';
      timeInput.name = 'time';
      timeInput.value = new Date().toLocaleString();
      formRef.current?.appendChild(timeInput);
      
      // Using the form reference approach as recommended in EmailJS docs
      const result = await emailjs.sendForm(
        EMAILJS_SERVICE_ID as string,
        EMAILJS_TEMPLATE_ID as string,
        formRef.current as HTMLFormElement,
        {
          publicKey: import.meta.env.VITE_PUBLIC_KEY as string,
        }
      );
      
      // Remove the time input after sending
      formRef.current?.removeChild(timeInput);

      if (result.text === 'OK') {
        setSubmitStatus({
          success: true,
          message: 'Your message has been sent successfully!'
        });
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus({
        success: false,
        message: 'Failed to send your message. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form 
      ref={formRef}
      variants={containerVariants}
      className="space-y-6 backdrop-blur-sm bg-gray-900/40 p-6 rounded-xl border border-gray-800/50"
      onSubmit={handleSubmit}
    >
      {submitStatus.message && (
        <div className={`p-4 rounded-lg ${
          submitStatus.success 
            ? 'bg-green-500/20 border border-green-500/50 text-green-200' 
            : 'bg-red-500/20 border border-red-500/50 text-red-200'
        }`}>
          {submitStatus.message}
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg 
            text-gray-100 focus:outline-none focus:border-cyan-500/50 transition-colors"
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg 
            text-gray-100 focus:outline-none focus:border-cyan-500/50 transition-colors"
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg 
            text-gray-100 focus:outline-none focus:border-cyan-500/50 transition-colors resize-none"
          placeholder="Your message..."
        />
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r 
          from-cyan-500 to-cyan-600 text-white font-medium rounded-lg hover:from-cyan-600 
          hover:to-cyan-700 transition-all duration-200 disabled:opacity-70"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
        <Send size={18} />
      </motion.button>
    </motion.form>
  );
});

ContactForm.displayName = 'ContactForm';

const Contact = memo(() => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden">
      <ContactBackground3D />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-[1]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <StaggerContainer className="space-y-8">
          <FadeInUp>
            <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-4 mt-10">
              Let's <span className="text-cyan-400">Connect</span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-center">
              Have a question or want to work together? Feel free to reach out through any of these channels or send me a message directly.
            </p>
          </FadeInUp>

          <div className="grid lg:grid-cols-2 gap-8 pt-12">
            <motion.div variants={containerVariants} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                {contactMethods.map((method) => {
                  const Icon = method.icon;
                  return (
                    <motion.a
                      key={method.title}
                      href={method.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      variants={containerVariants}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-start gap-4 p-4 backdrop-blur-sm bg-gray-900/40 
                        rounded-xl border border-gray-800/50 hover:border-gray-700/50 transition-colors"
                    >
                      <div className="p-2 rounded-lg bg-cyan-500/10">
                        <Icon className="w-5 h-5 text-cyan-400" />
                      </div>
                      <div>
                        <h3 className="text-gray-200 font-medium mb-1">{method.title}</h3>
                        <p className="text-gray-400 text-sm">{method.value}</p>
                      </div>
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>

            <ContactForm />
          </div>
        </StaggerContainer>
      </div>
    </div>
  );
});

Contact.displayName = 'Contact';
export default Contact;