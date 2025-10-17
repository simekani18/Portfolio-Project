
import profileImage from '@/images/Me.jpeg';
import { BackgroundPathsLight } from './BackgroundPathsLight';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

const About = () => {
  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: () => api.getProfile(),
  });

  return (
    <section id="about" className="relative pt-48 pb-24 bg-white overflow-hidden">
      <BackgroundPathsLight />
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content - Profile Image Group */}
          <motion.div
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="relative">
              {/* Profile Image Container */}
              <motion.div
                className="w-96 h-96 lg:w-[500px] lg:h-[500px] rounded-[2rem] overflow-hidden shadow-2xl"
                whileHover={{ scale: 1.02, rotate: 1 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={profile?.profileImageUrl || profileImage}
                  alt={`Professional headshot of ${profile?.fullName || 'Simekani Mabambi'}, ${profile?.title || 'Software Engineer'} with ${profile?.yearsOfExperience || 3}+ years of experience`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </motion.div>
          
          {/* Right Content Group */}
          <motion.div
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
            {/* Header Group */}
            <motion.div 
              className="mb-10"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-gray-500 text-sm tracking-[0.3em] uppercase mb-6 font-medium">About me</p>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-black leading-[0.9] tracking-tight">
                Normal<br />
                Human With<br />
                Great<br />
                <span className="italic">Creativity</span>
              </h2>
            </motion.div>
            
            {/* Description Group */}
            <motion.p
              className="text-gray-600 text-xl leading-relaxed mb-10 font-light"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.6 }}
            >
              {profile?.bio || 'Software Engineer with 3+ years of practical experience delivering solutions across native iOS development, full-stack web applications, and backend systems. Skilled in building iOS apps using Swift and UIKit, developing modern web interfaces with React and Node.js, and implementing secure backend services using C#, .NET, and PostgreSQL. Experienced in Agile environments and cloud platforms like AWS and Azure, with a focus on clean architecture, performance, and maintainability. Passionate about using automation and AI tools to enhance engineering workflows and product delivery.'}
            </motion.p>
            
            {/* CTA Button Group */}
            <motion.a 
              href="/Simekani_Mabambi_CV.pdf" 
              download="Simekani_Mabambi_CV.pdf"
              className="group relative inline-block px-10 py-4 bg-black text-white rounded-full hover:bg-gray-800 transition-all duration-300 text-lg font-medium"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">See More</span>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
