
import { BackgroundPaths } from './BackgroundPaths';
import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

const Portfolio = () => {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const projects = [
    {
      id: 1,
      title: "SneakerDojo Monitors",
      emoji: "🔍",
      category: "Web Scraping & Automation",
      description: "A sneaker monitoring and automation tool used to track high-demand sneaker releases across local websites and APIs. Designed to improve inventory decisions for resellers and automate notifications when new products are released.",
      features: [
        "Automated sneaker tracking from multiple sources using web scraping",
        "Included bot functionalities for purchasing actions",
        "Built a modular backend with scraping queues and alert system"
      ],
      stack: "PostgreSQL, TypeScript, Drizzle, Puppeteer, React, Azure, Docker",
      demoUrl: "#contact",
      detailsUrl: "#contact"
    },
    {
      id: 2,
      title: "Web Scrapper (E-Commerce)",
      emoji: "🛒",
      category: "ASP.NET Development",
      description: "An automated data extraction platform to pull structured product information from multiple online stores. Built with RESTful endpoints and database persistence for scaling to multiple retailers.",
      features: [
        "Built using ASP.NET Core MVC for robust backend structure",
        "Parsed HTML content using HtmlAgilityPack",
        "Stored and queried extracted data using SQL Server and Entity Framework"
      ],
      stack: "ASP.NET Core MVC, C#, SQL Server, HtmlAgilityPack",
      demoUrl: "#contact",
      detailsUrl: "#contact"
    },
    {
      id: 3,
      title: "CrowdBook",
      emoji: "📚",
      category: "Full-Stack Platform",
      description: "A crowd-powered book sharing and discovery platform with real-time notifications and rental coordination. It included both a web portal and an Android application with shared backend infrastructure.",
      features: [
        "Designed a searchable book catalog with user-contributed listings",
        "Developed a RESTful API with Spring Boot and documented via Swagger",
        "Built a cross-platform frontend using Ionic and Angular"
      ],
      stack: "Spring Boot, Ionic, Angular, TypeScript, Swagger",
      demoUrl: "#contact",
      detailsUrl: "#contact"
    },
    {
      id: 4,
      title: "EduGo — AR Learning System",
      emoji: "🧠",
      category: "AR Education",
      description: "An educational app that integrates Augmented Reality (AR) to improve user engagement and concept retention. Aimed at schools and learners seeking immersive learning tools.",
      features: [
        "Developed backend API for managing content and user sessions",
        "Used TypeScript and TypeORM with ExpressJS",
        "Deployed to AWS EC2 with Docker for containerized environment"
      ],
      stack: "TypeScript, TypeORM, ExpressJS, Docker, AWS EC2",
      demoUrl: "#contact",
      detailsUrl: "#contact"
    }
  ];

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px', // Trigger when project is in center of viewport
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = projectRefs.current.findIndex(ref => ref === entry.target);
          if (index !== -1) {
            setActiveProjectIndex(index);
          }
        }
      });
    }, observerOptions);

    projectRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      projectRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <section id="portfolio" className="relative pt-48 pb-24 bg-black overflow-hidden">
      <BackgroundPaths />
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header Group */}
        <motion.div 
          className="text-center mb-20"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.p 
            className="text-gray-400 text-sm tracking-[0.3em] uppercase mb-6 font-medium"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.6 }}
          >
            Portfolio
          </motion.p>
          <motion.h2 
            className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[0.9] mb-10 tracking-tight"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.8 }}
          >
            Featured <span className="italic">Projects</span>
          </motion.h2>
          <motion.p 
            className="text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed font-light"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.6 }}
          >
            A showcase of my technical projects, from automation tools to full-stack applications.
          </motion.p>
        </motion.div>
        
        {/* Projects Grid */}
        <div className="space-y-16">
          {projects.map((project, index) => {
            const isActive = activeProjectIndex === index;
            
            return (
              <motion.div
                key={project.id}
                ref={(el) => (projectRefs.current[index] = el)}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
                viewport={{ once: true, margin: "-50px" }}
              >
              {/* Project Content Group */}
              <motion.div 
                className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.15
                    }
                  }
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {/* Project Header Group */}
                <motion.div 
                  className="mb-6"
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <motion.span 
                      className="text-4xl"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.2, type: "spring", stiffness: 200 }}
                    >
                      {project.emoji}
                    </motion.span>
                    <span className="text-sm text-gray-400 font-medium tracking-wide uppercase">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 text-lg leading-relaxed mb-6">
                    {project.description}
                  </p>
                </motion.div>

                {/* Features Group */}
                <motion.div 
                  className="mb-8"
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <h4 className="text-white font-bold mb-4">Key Features:</h4>
                  <ul className="space-y-3">
                    {project.features.map((feature, featureIndex) => (
                      <li 
                        key={featureIndex} 
                        className="text-gray-300 flex items-start"
                      >
                        <span className="text-white mr-3 mt-1">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Tech Stack Group */}
                <motion.div 
                  className="mb-8"
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <h4 className="text-white font-bold mb-3">Tech Stack:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.split(', ').map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="px-3 py-1 bg-gray-800 text-gray-200 text-sm rounded-full border border-gray-700 hover:bg-gray-700 transition-colors duration-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Project Links Group */}
                <motion.div 
                  className="flex gap-4"
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <motion.a 
                    href={project.detailsUrl}
                    className="px-6 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition-colors duration-200 font-medium inline-block"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Contact for Details
                  </motion.a>
                  <motion.a 
                    href={project.demoUrl}
                    className="px-6 py-3 border border-gray-600 text-white rounded-full hover:bg-gray-800 transition-colors duration-200 font-medium inline-block"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Discuss Project
                  </motion.a>
                </motion.div>
              </motion.div>

              {/* Project Visual */}
              <motion.div 
                className={`${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 + 0.4, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <motion.div 
                  className={`rounded-[2rem] p-8 border h-96 flex items-center justify-center transition-all duration-300 ${
                    isActive 
                      ? 'bg-gradient-to-br from-gray-900 to-gray-700 border-gray-400 shadow-gray-500/20' 
                      : 'bg-gray-900 border-gray-800'
                  }`}
                  whileHover={{ scale: 1.02, rotate: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-center">
                    <motion.div 
                      className="text-6xl mb-4"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      {project.emoji}
                    </motion.div>
                    <div className="text-white font-bold text-xl">{project.title}</div>
                    <div className={`text-sm mt-2 transition-colors duration-300 ${
                      isActive ? 'text-gray-300' : 'text-gray-400'
                    }`}>{project.category}</div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
            );
          })}
        </div>
        
        {/* View All Button */}
        <div className="text-center mt-20">
          <a 
            href="#contact"
            className="group relative px-12 py-4 bg-transparent border-2 border-white/30 rounded-full text-white hover:bg-white hover:text-black transition-all duration-300 overflow-hidden text-lg font-medium inline-block"
          >
            <span className="relative z-10">Discuss More Projects</span>
            <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
