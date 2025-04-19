import { memo } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { StaggerContainer, FadeInUp } from '../components/MotionElements';
import BlogBackground3D from '../components/BlogBackground3D';
import { containerVariants, projectTagVariants } from '../config/framer';

const blogs = [
  {
    title: "Building Modern Web Applications",
    description: "Exploring the latest techniques and best practices in web development using React and Next.js",
    date: "March 15, 2024",
    readTime: "5 min read",
    tags: ["React", "Next.js", "Web Dev"],
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1920&h=1080&auto=format&fit=crop"
  },
  {
    title: "Spring Boot Security Best Practices",
    description: "A comprehensive guide to implementing secure authentication and authorization in Spring Boot applications",
    date: "March 10, 2024",
    readTime: "8 min read",
    tags: ["Spring Boot", "Security", "Java"],
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=1920&h=1080&auto=format&fit=crop"
  },
  // Add more blog posts as needed
] as const;

const BlogCard = memo(({ blog, index }: { 
  blog: typeof blogs[number];
  index: number;
}) => {
  return (
    <motion.div
      variants={containerVariants}
      custom={index}
      className="group relative bg-gray-900/40 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800/50"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative">
        <div className="relative h-48 overflow-hidden">
          <motion.img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60" />
        </div>
        
        <div className="p-6">
          <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
            <div className="flex items-center gap-1">
              <Calendar size={14} className="text-cyan-400" />
              <span>{blog.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={14} className="text-cyan-400" />
              <span>{blog.readTime}</span>
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold mb-3 bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
            {blog.title}
          </h2>
          
          <p className="text-gray-300 mb-4 leading-relaxed line-clamp-2">
            {blog.description}
          </p>
          
          <motion.div 
            variants={containerVariants}
            className="flex flex-wrap gap-2 mb-6"
          >
            {blog.tags.map((tag, tagIndex) => (
              <motion.span
                key={tagIndex}
                variants={projectTagVariants}
                className="px-3 py-1 bg-cyan-900/30 text-cyan-400 rounded-full text-sm border border-cyan-500/20"
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>
          
          <motion.button 
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Read More 
            <ArrowRight size={20} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
});

BlogCard.displayName = 'BlogCard';

const Blog = memo(() => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden">
      <BlogBackground3D />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-[1]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <StaggerContainer className="space-y-8">
          <FadeInUp>
            <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-4 mt-10">
              Latest <span className="text-cyan-400">Insights</span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-center">
              Exploring ideas, sharing knowledge, and documenting my journey through software development.
            </p>
          </FadeInUp>

          <motion.div
            variants={containerVariants}
            className="grid md:grid-cols-2 gap-8 pt-12"
          >
            {blogs.map((blog, index) => (
              <BlogCard 
                key={blog.title} 
                blog={blog} 
                index={index}
              />
            ))}
          </motion.div>
        </StaggerContainer>
      </div>
    </div>
  );
});

Blog.displayName = 'Blog';
export default Blog;