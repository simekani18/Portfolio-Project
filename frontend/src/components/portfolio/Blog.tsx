import { BackgroundPathsLight } from './BackgroundPathsLight';
import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

const Blog = () => {
  const [activeBlogIndex, setActiveBlogIndex] = useState(0);
  const blogRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Mock blog data
  const blogPosts = [
    {
      id: 1,
      title: "Building Scalable iOS Apps with Swift and UIKit",
      date: "Dec 15, 2024",
      thumbnail: "📱",
      summary: "Exploring best practices for architecting iOS applications that can grow with your user base and feature requirements."
    },
    {
      id: 2,
      title: "Microservices Architecture with .NET Core",
      date: "Nov 28, 2024",
      thumbnail: "🏗️",
      summary: "A deep dive into implementing microservices using .NET Core, Kubernetes, and PostgreSQL for enterprise applications."
    },
    {
      id: 3,
      title: "Full-Stack Development with React and TypeScript",
      date: "Nov 10, 2024",
      thumbnail: "⚛️",
      summary: "Modern web development practices using React 18, TypeScript, and best practices for maintainable codebases."
    },
    {
      id: 4,
      title: "Cloud Infrastructure on AWS: A Developer's Guide",
      date: "Oct 22, 2024",
      thumbnail: "☁️",
      summary: "Practical guide to deploying and scaling applications on AWS using EC2, RDS, and containerization strategies."
    }
  ];

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = blogRefs.current.findIndex(ref => ref === entry.target);
          if (index !== -1) {
            setActiveBlogIndex(index);
          }
        }
      });
    }, observerOptions);

    blogRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      blogRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <section id="blog" className="relative pt-48 pb-24 bg-white overflow-hidden">
      <BackgroundPathsLight />
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <p className="text-gray-500 text-sm tracking-[0.3em] uppercase mb-6 font-medium">Latest Insights</p>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-black leading-[0.9] mb-10 tracking-tight">
            Blog <span className="italic">Posts</span>
          </h2>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed font-light">
            Sharing insights on software development, iOS programming, and modern web technologies.
          </p>
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {blogPosts.map((post, index) => {
            const isActive = activeBlogIndex === index;
            
            return (
              <motion.div
                key={post.id}
                ref={(el) => (blogRefs.current[index] = el)}
                className={`rounded-[1.5rem] p-6 border transition-all duration-300 cursor-pointer group ${
                  isActive 
                    ? 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-400 shadow-gray-500/20' 
                    : 'bg-white border-gray-200 hover:border-gray-300'
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  ease: "easeOut" 
                }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ y: -5 }}
              >
                {/* Thumbnail */}
                <div className="text-4xl mb-4 text-center">
                  {post.thumbnail}
                </div>
                
                {/* Date */}
                <p className={`text-sm font-medium mb-3 transition-colors duration-300 ${
                  isActive ? 'text-gray-600' : 'text-gray-500'
                }`}>
                  {post.date}
                </p>
                
                {/* Title */}
                <h3 className="text-lg font-bold text-black mb-3 group-hover:text-gray-700 transition-colors leading-tight">
                  {post.title}
                </h3>
                
                {/* Summary */}
                <p className="text-gray-600 text-sm leading-relaxed">
                  {post.summary}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Visit Blog Button */}
        <div className="text-center">
          <motion.a 
            href="/blog"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-block px-12 py-4 bg-black text-white rounded-full hover:bg-gray-800 transition-all duration-300 text-lg font-medium"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Visit Blog</span>
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default Blog;