import { memo } from 'react';
import { StaggerContainer, FadeInUp } from '../components/MotionElements';
import { Code2, Cpu, Globe2, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';
import AboutBackground3D from '../components/AboutBackground3D';
import { containerVariants, fadeInUp } from '../config/framer';

const experiences = [
  {
    icon: Code2,
    title: "Full-Stack Development",
    description: "Building robust and scalable web applications with modern technologies and best practices."
  },
  {
    icon: Globe2,
    title: "Cloud Architecture",
    description: "Designing and implementing cloud-native solutions for optimal performance and scalability."
  },
  {
    icon: Cpu,
    title: "System Design",
    description: "Creating efficient and maintainable system architectures for complex applications."
  },
  {
    icon: Rocket,
    title: "Innovation",
    description: "Pushing boundaries with cutting-edge technologies and creative solutions."
  }
] as const;

const ExperienceCard = memo(({ experience, index }: { 
  experience: typeof experiences[number];
  index: number;
}) => (
  <motion.div
    variants={fadeInUp}
    custom={index}
    className="p-4 bg-gray-900/40 backdrop-blur-sm rounded-xl border border-gray-800/50 hover:border-cyan-500/20 transition-colors group"
  >
    <experience.icon className="w-6 h-6 text-cyan-400 mb-3 transform group-hover:scale-110 transition-transform" />
    <h3 className="text-lg font-semibold mb-2 text-white">{experience.title}</h3>
    <p className="text-gray-400 text-sm">{experience.description}</p>
  </motion.div>
));

ExperienceCard.displayName = 'ExperienceCard';

const SkillBadge = memo(({ skill }: { skill: string }) => (
  <motion.span
    variants={fadeInUp}
    whileHover={{ scale: 1.05 }}
    className="px-4 py-2 bg-gradient-to-r from-cyan-500/10 to-green-500/10 rounded-full text-cyan-400 border border-cyan-400/20 text-sm hover:border-cyan-400/40 transition-colors"
  >
    {skill}
  </motion.span>
));

SkillBadge.displayName = 'SkillBadge';

const About = memo(() => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden">
      <AboutBackground3D />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-[1]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <StaggerContainer 
          variants={containerVariants}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          <div className="space-y-8">

            <FadeInUp>
              <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-white">
                Crafting Digital
                <span className="block mt-2 bg-gradient-to-r from-cyan-400 via-cyan-500 to-green-400 bg-clip-text text-transparent">
                  Experiences
                </span>
              </h1>
            </FadeInUp>
            
            <FadeInUp>
              <p className="text-gray-300 text-lg leading-relaxed">
                Hi, I'm Huzaifa, a versatile software engineer who transforms complex challenges into elegant solutions.
                My passion lies in crafting high-performance systems across multiple domains and technologies.
              </p>
            </FadeInUp>
            
            <FadeInUp>
              <p className="text-gray-300 text-lg leading-relaxed">
                My journey began with a fundamental curiosity about how things work at their core. 
                Today, that curiosity powers my ability to architect and build sophisticated systems that make an impact. 
                I thrive on mastering new technologies to deliver the optimal solution, no matter the challenge.
              </p>
            </FadeInUp>

            <FadeInUp>
              <p className="text-gray-300 text-lg leading-relaxed">
                From system design to implementation, I approach each aspect with technical precision and creative vision—building technology that matters.
              </p>
            </FadeInUp>

            <motion.div
              variants={containerVariants}
              className="flex flex-wrap gap-4 pt-4"
            >
              {['Java', 'Spring Boot', 'React', 'Next', 'Cloud'].map((skill) => (
                <SkillBadge key={skill} skill={skill} />
              ))}
            </motion.div>
          </div>

          <motion.div
            variants={containerVariants}
            className="space-y-8"
          >
            <FadeInUp>
              <div className="relative rounded-2xl overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-transparent z-10" />
                <img
                  src="https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
                  alt="Developer workspace"
                  loading="lazy"
                  className="rounded-2xl shadow-2xl shadow-cyan-500/10 transform hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
            </FadeInUp>

            <motion.div
              variants={containerVariants}
              className="grid grid-cols-2 gap-4"
            >
              {experiences.map((exp, index) => (
                <ExperienceCard 
                  key={exp.title} 
                  experience={exp} 
                  index={index}
                />
              ))}
            </motion.div>
          </motion.div>
        </StaggerContainer>
      </div>
    </div>
  );
});

About.displayName = 'About';
export default About;