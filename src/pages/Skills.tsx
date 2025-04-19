import { memo } from 'react';
import { motion } from 'framer-motion';
import { StaggerContainer, FadeInUp } from '../components/MotionElements';
import SkillsBackground3D from '../components/SkillsBackground3D';
import { containerVariants } from '../config/framer';
import { 
  Code2, Database, Cloud, Wrench,
  Code, FileType, Globe,
  Box, Frame, Wind,
  Server, Coffee, Leaf,
  Layers, FileJson, PenTool,
  Container, CloudCog, GitBranch,
  Network, Terminal, Lock,
  MonitorIcon, Key, Shield,
  SendHorizonal, Trello, FileText, FileCode,
  Layout, GitFork, Sparkles,
  Package, Table
} from 'lucide-react';

const skills = [
  { 
    category: 'Frontend',
    icon: Code2,
    color: 'from-cyan-500 to-blue-500',
    mainSkills: [
      { name: 'React.js', icon: Code },
      { name: 'Next.js', icon: Globe },
      { name: 'Angular', icon: Box },
      { name: 'TypeScript', icon: FileType },
      { name: 'JavaScript', icon: FileCode }
    ],
    otherSkills: [
      { name: 'HTML/CSS', icon: FileText },
      { name: 'Tailwind CSS', icon: Wind },
      { name: 'Bootstrap', icon: Layout },
      { name: 'Shadcn UI', icon: Frame },
      { name: 'Framer Motion', icon: Sparkles }
    ]
  },
  { 
    category: 'Backend',
    icon: Database,
    color: 'from-green-500 to-emerald-500',
    mainSkills: [
      { name: 'Java', icon: Coffee },
      { name: 'Spring Boot', icon: Leaf },
      { name: 'Kotlin', icon: PenTool },
      { name: 'Node.js', icon: Server },
      { name: 'Express.js', icon: Network }
    ],
    otherSkills: [
      { name: 'JPA/JDBC', icon: Database },
      { name: 'Spring Security', icon: Shield },
      { name: 'Spring MVC', icon: GitFork },
      { name: 'RESTful APIs', icon: Network },
      { name: 'OpenAPI/Swagger', icon: FileJson }
    ]
  },
  { 
    category: 'Databases',
    icon: Table,
    color: 'from-orange-500 to-red-500',
    mainSkills: [
      { name: 'PostgreSQL', icon: Database },
      { name: 'MongoDB', icon: Database },
      { name: 'MySQL', icon: Database },
      { name: 'AWS RDS', icon: CloudCog }
    ],
    otherSkills: [
      { name: 'SQL', icon: Database },
      { name: 'NoSQL', icon: Database },
      { name: 'Mongoose', icon: Leaf },
      { name: 'GraphQL', icon: Layers }
    ]
  },
  { 
    category: 'DevOps',
    icon: Cloud,
    color: 'from-purple-500 to-pink-500',
    mainSkills: [
      { name: 'AWS', icon: CloudCog },
      { name: 'Docker', icon: Container },
      { name: 'CI/CD', icon: GitBranch },
      { name: 'Git', icon: GitBranch }
    ],
    otherSkills: [
      { name: 'AWS EC2', icon: Server },
      { name: 'AWS ECS', icon: Server },
      { name: 'AWS S3', icon: Cloud },
      { name: 'AWS RDS', icon: Database },
      { name: 'Linux', icon: Terminal },
      { name: 'Networking', icon: Network }
    ]
  },
  { 
    category: 'Tools & Skills',
    icon: Wrench,
    color: 'from-yellow-500 to-amber-500',
    mainSkills: [
      { name: 'IntelliJ IDEA', icon: Terminal },
      { name: 'WebStrom', icon: Terminal },
      { name: 'VS Code', icon: MonitorIcon },
      { name: 'Jira', icon: Trello },
      { name: 'Postman', icon: SendHorizonal },
      { name: 'GitHub', icon: GitFork }
    ],
    otherSkills: [
      { name: 'npm', icon: Package },
      { name: 'Maven', icon: Box },
      { name: 'JWT Auth', icon: Lock },
      { name: 'API Keys', icon: Key },
      { name: 'Chrome DevTools', icon: MonitorIcon }
    ]
  }
] as const;

const SkillCard = memo(({ skillGroup, index }: {
  skillGroup: typeof skills[number];
  index: number;
}) => {
  const Icon = skillGroup.icon;
  
  return (
    <motion.div
      variants={containerVariants}
      custom={index}
      className="relative group backdrop-blur-sm"
    >
      <div className="relative bg-gray-900/40 rounded-xl p-6 border border-gray-800/50 hover:border-gray-700/50 transition-colors will-change-transform">
        <div className="flex items-center gap-3 mb-6">
          <div className={`p-2 rounded-lg bg-gradient-to-r ${skillGroup.color} bg-opacity-10`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl font-semibold text-white">
            {skillGroup.category}
          </h2>
        </div>

        <div className="space-y-4">
          {/* Main skills */}
          <div className="flex flex-wrap gap-2">
            {skillGroup.mainSkills.map((skill) => {
              // Only try to get icon if it exists
              const SkillIcon = 'icon' in skill ? skill.icon : null;
              return (
                <motion.div
                  key={skill.name}
                  variants={containerVariants}
                  className={`px-4 py-2 rounded-lg bg-gray-800/50 
                    border border-gray-700/50 text-white font-medium hover:border-gray-600/50 
                    transition-colors cursor-default flex items-center gap-2`}
                >
                  {SkillIcon && <SkillIcon className="w-4 h-4 text-gray-400" />}
                  {skill.name}
                </motion.div>
              );
            })}
          </div>

          {/* Other skills */}
          <div className="flex flex-wrap gap-2">
            {skillGroup.otherSkills.map((skill) => {
              // Only try to get icon if it exists
              const SkillIcon = 'icon' in skill ? skill.icon : null;
              return (
                <motion.span 
                  key={skill.name}
                  variants={containerVariants}
                  className="px-3 py-1 text-sm bg-gray-800/50 text-gray-300 rounded-full 
                    hover:bg-gray-700/50 transition-colors cursor-default flex items-center gap-2"
                >
                  {SkillIcon && <SkillIcon className="w-3 h-3 text-gray-400" />}
                  {skill.name}
                </motion.span>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  )
});

SkillCard.displayName = 'SkillCard';

const Skills = memo(() => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden">
      <SkillsBackground3D />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-[1]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <StaggerContainer className="space-y-8">
          <FadeInUp>
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-center mb-16 mt-10">
              My
              <span className="block mt-2 bg-gradient-to-r from-cyan-400 via-cyan-500 to-green-400 bg-clip-text text-transparent">
                Expertise
              </span>
            </h1>
          </FadeInUp>

          <motion.div
            variants={containerVariants}
            className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8"
          >
            {skills.map((skillGroup, index) => (
              <SkillCard 
                key={skillGroup.category} 
                skillGroup={skillGroup} 
                index={index}
              />
            ))}
          </motion.div>
        </StaggerContainer>
      </div>
    </div>
  );
});

Skills.displayName = 'Skills';
export default Skills;