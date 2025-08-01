import { memo } from 'react';
import { ExternalLink, ArrowRight } from 'lucide-react';
import Background3D from '../components/HomeBackground3D';
import { StaggerContainer, FadeInUp } from '../components/MotionElements';
import { motion } from 'framer-motion';
import { heroTextVariants } from '../config/framer';
import ProfileImage from '../assets/me-1.png';

const Home = memo(() => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden">
      <Background3D />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-[1]" />
      
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="grid lg:grid-cols-5 gap-8 items-center">
            {/* Text Content - 3 columns on large screens */}
            <div className="lg:col-span-3">
              <StaggerContainer className="text-center lg:text-left space-y-8">
                <div className="space-y-4">
                  <motion.h1 
                    variants={heroTextVariants}
                    className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight"
                  >
                    <span className="block text-white mb-4">
                      Building the
                    </span>
                    <span className="block bg-gradient-to-r from-cyan-400 via-cyan-500 to-green-400 bg-clip-text text-transparent">
                      Future with Code
                    </span>
                  </motion.h1>
                </div>

                <FadeInUp>
                  <p className="mt-8 text-xl text-gray-300 max-w-3xl leading-relaxed">
                    Full-stack developer crafting innovative digital experiences with cutting-edge technologies.
                    Expert in building robust applications using Java, Spring Boot, and Next.js for scalable solutions.
                  </p>
                </FadeInUp>

                <FadeInUp>
                  <div className="mt-12 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                    <a
                      href="/src/assets/HuzaifaResume.pdf"
                      download
                      className="group px-10 py-4 bg-gradient-to-r from-cyan-500 to-cyan-400 text-black font-medium rounded-full hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 flex items-center gap-2"
                    >
                      Resume 
                      <ExternalLink size={20} />
                    </a>
                    <button
                      onClick={() => {
                        const contactSection = document.getElementById('contact');
                        contactSection?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="group px-8 py-4 border border-cyan-400 text-cyan-400 font-medium rounded-full transition-all duration-300 flex items-center gap-2 hover:bg-cyan-400 hover:text-black"
                    >
                      Contact 
                      <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                    </button>
                  </div>
                </FadeInUp>
              </StaggerContainer>
            </div>

            {/* Profile Image - 2 columns on large screens */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-2 flex justify-center lg:justify-end flex-col items-center"
            >
              <div className="relative">                
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-green-400 rounded-full blur-md opacity-70"></div>
                <div className="relative rounded-full border-4 border-white/10 w-96 h-96 md:w-80 md:h-80 sm:w-64 sm:h-64 p-0 flex items-center justify-center">
                  <div className="w-full h-full rounded-full overflow-hidden">
                    <img
                      src={ProfileImage}
                      alt="Profile"
                      className="w-full h-full pr-4 pt-10"
                    />
                  </div>
                </div>
              </div>
              
              {/* Name and tagline below the image */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-6 text-center"
              >
                <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
                  Muhammad Huzaifa
                </h2>
                <p className="text-gray-300 mt-2">Software Engineer</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
});

Home.displayName = 'Home';
export default Home;
