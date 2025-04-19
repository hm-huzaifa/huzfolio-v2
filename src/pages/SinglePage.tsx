import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Home from './Home';
import About from './About';
import Projects from './Projects';
import Skills from './Skills';
import Contact from './Contact';
import Experience from './Experience';

// Animation variants for sections
const sectionVariants = {
  hidden: { 
    opacity: 0,
    y: 50
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  },
  exit: { 
    opacity: 0,
    y: -50,
    transition: {
      duration: 0.3,
      ease: "easeIn"
    }
  }
};

const SinglePage = () => {
  // Refs for each section
  const homeRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  
  // Track which section is in view with a larger margin
  const homeInView = useInView(homeRef, { amount: 0.3 });
  const aboutInView = useInView(aboutRef, { amount: 0.3 });
  const experienceInView = useInView(experienceRef, { amount: 0.3 });
  const projectsInView = useInView(projectsRef, { amount: 0.3 });
  const skillsInView = useInView(skillsRef, { amount: 0.3 });
  const contactInView = useInView(contactRef, { amount: 0.3 });
  
  const [activeSection, setActiveSection] = useState<string>('home');
  const [loaded, setLoaded] = useState(false);

  // Update active section based on which one is in view
  useEffect(() => {
    if (homeInView) setActiveSection('home');
    else if (aboutInView) setActiveSection('about');
    else if (experienceInView) setActiveSection('experience');
    else if (projectsInView) setActiveSection('projects');
    else if (skillsInView) setActiveSection('skills');
    else if (contactInView) setActiveSection('contact');

    // Also update class for CSS transitions
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      if (section.id === activeSection) {
        section.classList.add('active');
      } else {
        section.classList.remove('active');
      }
    });
  }, [homeInView, aboutInView, experienceInView, projectsInView, skillsInView, contactInView, activeSection]);

  // Set loaded after initial render
  useEffect(() => {
    setLoaded(true);
  }, []);

  // Function to scroll to a section
  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative bg-black text-white">
      {/* Navigation dots */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 hidden md:flex flex-col gap-4">
        {[
          { id: 'home', ref: homeRef, label: 'Home' },
          { id: 'about', ref: aboutRef, label: 'About' },
          { id: 'experience', ref: experienceRef, label: 'Experience' },
          { id: 'projects', ref: projectsRef, label: 'Projects' },
          { id: 'skills', ref: skillsRef, label: 'Skills' },
          { id: 'contact', ref: contactRef, label: 'Contact' }
        ].map(section => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.ref)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              activeSection === section.id
                ? 'bg-cyan-400 scale-125'
                : 'bg-gray-500 hover:bg-gray-400'
            }`}
            aria-label={`Scroll to ${section.label}`}
          >
            <span className="sr-only">{section.label}</span>
          </button>
        ))}
      </div>

      {/* Home Section */}
      <section 
        ref={homeRef} 
        className={`min-h-screen relative ${activeSection === 'home' ? 'active' : ''}`}
        id="home"
      >
        <AnimatePresence mode="wait">
          {(homeInView || !loaded) && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={sectionVariants}
              className="w-full h-full"
            >
              <Home />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* About Section */}
      <section 
        ref={aboutRef} 
        className={`min-h-screen relative ${activeSection === 'about' ? 'active' : ''}`}
        id="about"
      >
        <AnimatePresence mode="wait">
          {aboutInView && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={sectionVariants}
              className="w-full h-full"
            >
              <About />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Experience Section */}
      <section 
        ref={experienceRef} 
        className={`min-h-screen relative ${activeSection === 'experience' ? 'active' : ''}`}
        id="experience"
      >
        <AnimatePresence mode="wait">
          {experienceInView && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={sectionVariants}
              className="w-full h-full"
            >
              <Experience />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Projects Section */}
      <section 
        ref={projectsRef} 
        className={`min-h-screen relative ${activeSection === 'projects' ? 'active' : ''}`}
        id="projects"
      >
        <AnimatePresence mode="wait">
          {projectsInView && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={sectionVariants}
              className="w-full h-full"
            >
              <Projects />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Skills Section */}
      <section 
        ref={skillsRef} 
        className={`min-h-screen relative ${activeSection === 'skills' ? 'active' : ''}`}
        id="skills"
      >
        <AnimatePresence mode="wait">
          {skillsInView && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={sectionVariants}
              className="w-full h-full"
            >
              <Skills />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Contact Section */}
      <section 
        ref={contactRef} 
        className={`min-h-screen relative ${activeSection === 'contact' ? 'active' : ''}`}
        id="contact"
      >
        <AnimatePresence mode="wait">
          {contactInView && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={sectionVariants}
              className="w-full h-full"
            >
              <Contact />
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
};

export default SinglePage; 