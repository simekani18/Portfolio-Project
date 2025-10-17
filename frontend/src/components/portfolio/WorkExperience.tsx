import { BackgroundPaths } from './BackgroundPaths';
import { motion } from 'framer-motion';

const WorkExperience = () => {
  const experiences = [
    {
      id: 1,
      period: "Jan 2024 - Present",
      title: "Software Engineer",
      company: "Direct Transact, South Africa",
      description: [
        "Designed and developed a PCI-compliant tokenization system securing sensitive payment data",
        "Led implementation of microservices architecture using Kubernetes and Kafka for scalable backend infrastructure",
        "Developed using C#, .NET Core, PostgreSQL, and AWS cloud services (EC2, RDS, Aurora)",
        "Automated deployment pipelines and collaborated with cross-functional teams to maintain high code quality"
      ]
    },
    {
      id: 2,
      period: "Jan 2022 - Dec 2023",
      title: "iOS Developer (Contracted to ABSA Bank)",
      company: "DVT, South Africa",
      description: [
        "Solo iOS developer for ABSA's short-term insurance division, independently building and maintaining feature-rich iOS apps",
        "Advocated and implemented SOLID principles, led code reviews, and ensured adherence to Apple's Human Interface Guidelines",
        "Actively participated in Agile ceremonies, sprint planning, and feature releases",
        "Delivered seamless user experiences aligned with business requirements and compliance standards",
        "KEY ACHIEVEMENT: Successfully delivered critical short-term insurance app features as sole iOS developer"
      ]
    },
    {
      id: 3,
      period: "Jan 2021 - Dec 2021",
      title: "Graduate iOS Developer",
      company: "DVT, South Africa",
      description: [
        "Integrated third-party APIs and built user-friendly interfaces consistent with Apple's HIG standards",
        "Demonstrated quick adaptability to new tools and frameworks, contributing to team projects with efficient solutions",
        "Collaborated with senior developers to deliver high-quality mobile applications"
      ]
    }
  ];

  const skills = {
    "Languages & Frameworks": ["Swift", "C#", "TypeScript", "JavaScript", "Java", "HTML", "UIKit", "SwiftUI", ".NET Core"],
    "Databases": ["PostgreSQL", "SQL Server", "TypeORM", "Drizzle", "Entity Framework"],
    "Cloud Platforms": ["AWS (EC2, RDS, Aurora)", "Azure"],
    "Tooling & DevOps": ["Git", "GitHub", "Azure Repos", "Docker", "Kubernetes", "CI/CD pipelines"],
    "Soft Skills": ["Agile Methodologies", "Code Reviews", "Technical Writing", "Technical Demos", "Collaboration"]
  };

  return (
    <section id="work-experience" className="relative py-24 bg-black overflow-hidden">
      <BackgroundPaths />
      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8">
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
            Career Timeline
          </motion.p>
          <motion.h2 
            className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[0.9] mb-10 tracking-tight"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.8 }}
          >
            Work <span className="italic">Experience</span>
          </motion.h2>
          <motion.p 
            className="text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed font-light"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.6 }}
          >
            Over 3 years of experience in software development, specializing in iOS and backend systems.
          </motion.p>
        </motion.div>

        {/* Centered Experience Timeline */}
        <div className="relative">
          {/* Center line */}
          <motion.div 
            className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-700"
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            viewport={{ once: true }}
          ></motion.div>
          
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div 
                key={exp.id} 
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'justify-end' : 'justify-start'
                }`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.4,
                  ease: "easeOut" 
                }}
                viewport={{ once: true, margin: "-100px" }}
              >
                {/* Timeline dot */}
                <motion.div 
                  className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rounded-full z-10"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: index * 0.4 + 0.3,
                    type: "spring",
                    stiffness: 200 
                  }}
                  viewport={{ once: true }}
                ></motion.div>
                
                {/* Experience card */}
                <motion.div 
                  className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}
                  initial={{ 
                    opacity: 0, 
                    x: index % 2 === 0 ? 50 : -50,
                    scale: 0.9 
                  }}
                  whileInView={{ 
                    opacity: 1, 
                    x: 0,
                    scale: 1 
                  }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.4 + 0.5,
                    ease: "easeOut" 
                  }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: 1.02,
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                >
                  <motion.div 
                    className="bg-gray-900 rounded-[1.5rem] p-8 shadow-sm border border-gray-800"
                    whileHover={{ 
                      borderColor: "rgb(55 65 81)",
                      boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
                    }}
                  >
                    <motion.span 
                      className="text-sm text-gray-400 font-medium"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.4 + 0.7 }}
                      viewport={{ once: true }}
                    >
                      {exp.period}
                    </motion.span>
                    <motion.h4 
                      className="text-xl font-bold text-white mt-1"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.4 + 0.8 }}
                      viewport={{ once: true }}
                    >
                      {exp.title}
                    </motion.h4>
                    <motion.p 
                      className="text-gray-300 font-medium mb-4"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.4 + 0.9 }}
                      viewport={{ once: true }}
                    >
                      {exp.company}
                    </motion.p>
                    <ul className="space-y-2">
                      {exp.description.map((item, descIndex) => (
                        <motion.li 
                          key={descIndex} 
                          className="text-gray-300 text-sm flex items-start"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ 
                            duration: 0.3, 
                            delay: index * 0.4 + 1.0 + descIndex * 0.1 
                          }}
                          viewport={{ once: true }}
                        >
                          <span className="text-white mr-2">•</span>
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Technical Skills Section Group */}
        <motion.div 
          className="mt-20"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Skills Header Group */}
          <motion.div 
            className="text-center mb-16"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-4xl md:text-5xl font-black text-white mb-6">Technical Skills</h3>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Technologies and tools I work with to bring ideas to life
            </p>
          </motion.div>
          
          {/* Skills Grid Group */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {Object.entries(skills).map(([category, skillList]) => (
              <motion.div 
                key={category} 
                className="bg-gray-900 rounded-[1.5rem] p-6 border border-gray-800"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.6 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <h4 className="font-bold text-white mb-4 text-lg">{category}</h4>
                <div className="flex flex-wrap gap-2">
                  {skillList.map((skill, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-gray-800 text-gray-200 text-sm rounded-full border border-gray-700 hover:bg-gray-700 transition-colors duration-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Education & Languages Section Group */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-20"
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
          {/* Education Card */}
          <motion.div 
            className="bg-gray-900 rounded-3xl p-8 shadow-sm border border-gray-800"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <h3 className="text-2xl font-bold text-white mb-6">Education</h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-white">Bachelor of Science (BSc): Information & Knowledge Systems</h4>
                <p className="text-gray-300 font-medium">University of Pretoria, South Africa</p>
                <p className="text-sm text-gray-400 mb-3">2019 - 2021</p>
                <p className="text-gray-300 text-sm">
                  Focus: Software Design, Operating Systems, Business Management
                </p>
              </div>
              <div>
                <h4 className="font-bold text-white">High School Diploma</h4>
                <p className="text-gray-300 font-medium">Maragon Private School, Ruimsig, South Africa</p>
                <p className="text-sm text-gray-400 mb-3">2018</p>
                <p className="text-gray-300 text-sm">
                  Top performer in CAT with 73% overall average, strong in Business, Math, and Accounting
                </p>
              </div>
            </div>
          </motion.div>
          
          {/* Languages Card */}
          <motion.div 
            className="bg-gray-900 rounded-3xl p-8 shadow-sm border border-gray-800"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <h3 className="text-2xl font-bold text-white mb-6">Languages</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">English</span>
                <span className="px-3 py-1 bg-green-800 text-green-200 text-sm rounded-full">Native</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Afrikaans</span>
                <span className="px-3 py-1 bg-gray-700 text-gray-200 text-sm rounded-full">Advanced</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Sotho</span>
                <span className="px-3 py-1 bg-yellow-800 text-yellow-200 text-sm rounded-full">Intermediate</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WorkExperience;