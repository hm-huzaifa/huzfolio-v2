import { memo } from 'react';
import { motion } from 'framer-motion';
import { StaggerContainer, FadeInUp } from '../components/MotionElements';
import {CalendarIcon, ArrowRight, MapPin} from 'lucide-react';
import { containerVariants } from '../config/framer';
import ExperienceBackground3D from '../components/ExperienceBackground3D';

// Define experience data
const experiences = [
  {
    title: "Software Engineer",
    company: "OHOO LABS",
    period: "April 2025 - Present",
    location: "Remote - Souel, South Korea",
    highlights: [
      "Working on a NestJS-based backend for a unified e-commerce platform integrating multiple local Korean e-commerce sites with support for dropshipping.",
      "Integrated third-party shipment, refund, and order management APIs to streamline backend operations and logistics."
    ]
  },
  {
    title: "Senior Software Engineer",
    company: "Zedfour Technologies",
    period: "Jan 2024 - Mar 2025",
    location: "On Site - Lahore, Pakistan",
    highlights: [
      "Developed Java Spring Boot talent profile management application from scratch",
      "Implemented JWT authentication, role-based access control, and security modules",
      "Built Receipt Automation System using Kotlin Spring Boot and MongoDB",
      "Developed management dashboards with NextJS and Shadcn UI",
      "Implemented OpenAPI specifications and generated client SDKs",
      "Optimized performance with Spring Cache",
      "Migrated Angular application from v13 to v17",
      "Managed AWS infrastructure (EC2, RDS PostgreSQL)",
      "Set up CI/CD pipelines for continuous integration",
      "Created ReactJS admin dashboards and Spring Boot REST APIs"
    ]
  },
  {
    title: "Full Stack Developer",
    company: "Freelancer",
    period: "Mar 2022 - Jan 2024",
    location: "Remote - Lahore, Pakistan",
    highlights: [
      "Developed healthcare web app with ReactJS, Node.js, Express, and MongoDB",
      "Built appointment scheduling, doctor-patient communication, and AI chatbots",
      "Implemented deep learning models for medical diagnosis",
      "Created freelance platform using MERN stack",
      "Developed seller gig management system and buyer-seller connections"
    ]
  }
];

const Experience = memo(() => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden">
      <ExperienceBackground3D />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-[1]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <StaggerContainer className="space-y-12">
          <FadeInUp>
            <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-4 mt-10">
              Professional <span className="text-cyan-400">Experience</span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-center mb-12">
              A chronicle of my professional journey and the impact I've made.
            </p>
          </FadeInUp>

          <motion.div
            variants={containerVariants}
            className="space-y-12"
          >
            {experiences.map((experience, index) => (
              <motion.div 
                key={`${experience.company}-${index}`}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { 
                    opacity: 1, 
                    y: 0,
                    transition: {
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: index * 0.1
                    }
                  }
                }}
                className="relative"
              >
                <div className="relative group bg-gray-900/40 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800/50 p-6 lg:p-8 transition-all duration-300 hover:border-cyan-500/30 hover:bg-gray-900/60">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                      <h3 className="text-2xl font-semibold bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
                        {experience.title}
                      </h3>
                      <div className="flex flex-col items-end text-gray-400 md:mt-0 gap-4">
                        <div className="flex items-center">
                          <CalendarIcon size={16} className="mr-1" />
                          <span>{experience.period}</span>
                        </div>
                        <div className="flex items-center text-xs">
                          <MapPin size={16} className="mr-1" />
                          <p>{experience.location}</p>
                        </div>
                      </div>
                    </div>
                    
                    <h4 className="text-xl font-medium text-white mb-4">{experience.company}</h4>
                    
                    <div className="space-y-2">
                      {experience.highlights.map((highlight, i) => (
                        <div key={i} className="flex items-start">
                          <ArrowRight className="min-w-[16px] h-[16px] mt-1 mr-2 text-cyan-400" size={16} />
                          <p className="text-gray-300">{highlight}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </StaggerContainer>
      </div>
    </div>
  );
});

Experience.displayName = 'Experience';
export default Experience; 