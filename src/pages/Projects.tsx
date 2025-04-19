import { memo } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { StaggerContainer, FadeInUp } from '../components/MotionElements';
import ProjectBackground3D from '../components/ProjectBackground3D';
import { containerVariants, projectCardVariants, projectTagVariants } from '../config/framer';

// Import project images
import OutstonneImage from '../assets/Outstonne-mockup.png';
import BailyDugleImage from '../assets/Baily-Dugle-Mockup.png';

const projects = [
  {
    title: 'OUTSTONNE Social Media',
    description: 'A social media platform for sharing pin/art-works with seamless user experience',
    image: OutstonneImage,
    github: 'https://github.com/hm-huzaifa/outstonne_social-media-app',
    demo: 'https://outstonne.netlify.app',
    tags: ['ReactJS', 'Sanity', 'Google Auth']
  },
  {
    title: 'Baily Dugle NEWS App',
    description: 'NEWS application with categorized content and multi-country support',
    image: BailyDugleImage,
    github: 'https://github.com/hm-huzaifa/Baily_Dugle-News_app',
    demo: 'https://github.com/hm-huzaifa/Baily_Dugle-News_app',
    tags: ['MEAN Stack', 'NEWS API', 'Categorization']
  },
  {
    title: 'Daily-Notes MERN App',
    description: 'Complete MERN Stack note-taking application with user authentication',
    image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    github: 'https://github.com/hm-huzaifa/iNotebook',
    demo: 'https://github.com/hm-huzaifa/iNotebook',
    tags: ['MongoDB', 'Express', 'React', 'Node.js']
  },
  {
    title: 'Netflix Clone - Angular',
    description: 'Feature-rich Netflix clone built with Angular 17 and various libraries',
    image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2426&q=80',
    github: 'https://github.com/hm-huzaifa/netflix-angular-17',
    demo: 'https://github.com/hm-huzaifa/netflix-angular-17',
    tags: ['Angular 17', 'Swiper', 'Google Auth']
  }
] as const;

const ProjectCard = memo(({ project, index }: { 
  project: typeof projects[number];
  index: number;
}) => (
  <motion.div
    variants={projectCardVariants}
    custom={index}
    className="group relative bg-gray-900/40 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800/50"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    
    <div className="relative">
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60" />
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-semibold mb-3 bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
          {project.title}
        </h3>
        <p className="text-gray-300 mb-4 leading-relaxed">{project.description}</p>
        
        <motion.div 
          variants={containerVariants}
          className="flex flex-wrap gap-2 mb-6"
        >
          {project.tags.map((tag, tagIndex) => (
            <motion.span
              key={tagIndex}
              variants={projectTagVariants}
              className="px-3 py-1 bg-cyan-900/30 text-cyan-400 rounded-full text-sm border border-cyan-500/20"
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>

        <div className="flex gap-4">
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
          >
            <Github size={20} />
            Code
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 transition-colors"
          >
            <ExternalLink size={20} />
            Live Demo
          </motion.a>
        </div>
      </div>
    </div>
  </motion.div>
));

ProjectCard.displayName = 'ProjectCard';

const Projects = memo(() => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden">
      <ProjectBackground3D />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-[1]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <StaggerContainer className="space-y-8">
          <FadeInUp>
            <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-4 mt-10">
              Featured <span className="text-cyan-400">Work</span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-center mb-12">
              A collection of projects that showcase my technical capabilities and creative solutions.
            </p>
          </FadeInUp>

          <motion.div
            variants={containerVariants}
            className="grid md:grid-cols-2 gap-8"
          >
            {projects.map((project, index) => (
              <ProjectCard 
                key={project.title} 
                project={project} 
                index={index}
              />
            ))}
          </motion.div>
        </StaggerContainer>
      </div>
    </div>
  );
});

Projects.displayName = 'Projects';
export default Projects;