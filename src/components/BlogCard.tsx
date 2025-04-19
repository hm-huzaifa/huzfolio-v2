import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react';
import { motion } from 'framer-motion';

interface BlogCardProps {
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
  image: string;
  index: number;
  shouldAnimate: boolean;
}

const BlogCard = ({ title, description, date, readTime, tags, image, index, shouldAnimate }: BlogCardProps) => {
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.5,
      }
    })
  };

  return (
    <motion.div
      custom={index}
      initial={shouldAnimate ? "hidden" : false}
      animate="visible"
      variants={variants}
      className="relative group"
    >
      <div className="relative bg-gray-900/40 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800/50 hover:border-cyan-500/20 transition-colors">
        <div className="relative h-48 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
        </div>
        
        <div className="p-6">
          <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>{readTime}</span>
            </div>
          </div>
          
          <h2 className="text-xl font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors">
            {title}
          </h2>
          
          <p className="text-gray-400 mb-4">
            {description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map(tag => (
              <div key={tag} className="flex items-center gap-1 text-xs text-cyan-400 bg-cyan-950/30 px-2 py-1 rounded-full">
                <Tag size={12} />
                <span>{tag}</span>
              </div>
            ))}
          </div>
          
          <button className="flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
            Read More <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogCard; 