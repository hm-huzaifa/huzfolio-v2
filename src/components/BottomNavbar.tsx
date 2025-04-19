import { memo, useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Home, User, Briefcase, Mail, Award, Code } from 'lucide-react';

const navbarVariants = {
  hidden: { y: 100 },
  visible: { 
    y: 0, 
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 20,
    }
  }
};

const links = [
  { id: 'home', icon: Home, label: 'Home' },
  { id: 'about', icon: User, label: 'About' },
  { id: 'experience', icon: Award, label: 'Experience' },
  { id: 'projects', icon: Code, label: 'Projects' },
  { id: 'skills', icon: Briefcase, label: 'Skills' },
  { id: 'contact', icon: Mail, label: 'Contact' },
];

const BottomNavbar = memo(() => {
  const [visible, setVisible] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const prevScrollPos = useRef(0);
  const ticking = useRef(false);

  // Handle scroll to show/hide navbar
  useEffect(() => {
    document.body.style.overflowY = 'scroll';
    
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const isScrollingDown = prevScrollPos.current < currentScrollPos;
          setVisible(currentScrollPos <= 10 || !isScrollingDown);
          prevScrollPos.current = currentScrollPos;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Detect active section while scrolling - improved version with threshold calculation
  useEffect(() => {
    const sections = links.map(link => document.getElementById(link.id));
    
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const threshold = windowHeight * 0.35; // Adjust the threshold for better accuracy
      
      // Find all sections that are currently in the viewport
      const visibleSections = sections
        .filter(section => {
          if (!section) return false;
          const rect = section.getBoundingClientRect();
          // Section is considered visible if it occupies a significant portion of the viewport
          return rect.top < windowHeight - threshold && rect.bottom > threshold;
        })
        .map(section => section!.id);
      
      // If any sections are visible, set the first one as active
      if (visibleSections.length > 0) {
        const newActiveSection = visibleSections[0];
        if (newActiveSection !== activeSection) {
          setActiveSection(newActiveSection);
        }
      }
    };
    
    // Run the check immediately on mount
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  // Function to scroll to section
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      variants={navbarVariants}
      initial="hidden"
      animate={visible ? "visible" : "hidden"}
      className="fixed bottom-4 sm:bottom-6 inset-x-0 flex justify-center items-center z-50 px-4 sm:px-2 [transform:translateZ(0)]"
    >
      <div 
        className="flex items-center justify-between w-[95%] sm:w-full max-w-md sm:max-w-2xl md:max-w-3xl lg:max-w-4xl bg-transparent border border-white/20 rounded-full p-1 sm:p-2 shadow-xl backdrop-blur-lg"
      >
        {links.map((link) => {
          const isActive = activeSection === link.id;
          return (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={`flex flex-col sm:flex-row items-center justify-center sm:gap-2 py-2 rounded-full transition-all duration-300 ${
                isActive
                  ? 'bg-white/90 text-black font-medium px-2 sm:px-3 md:px-5 lg:px-6'
                  : 'text-white/90 hover:text-white hover:bg-white/10 px-2 sm:px-3 md:px-5 lg:px-6'
              }`}
            >
              <link.icon size={16} className="sm:size-[18px]" />
              <span className="text-[10px] sm:text-xs md:text-sm font-medium">{link.label}</span>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
});

BottomNavbar.displayName = 'BottomNavbar';
export default BottomNavbar;