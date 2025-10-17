import { BackgroundPaths } from './BackgroundPaths';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { buildContactOptionsForPortfolio } from '@/utils/contactHelpers';
import { ContactOptionCard } from './ContactOptionCard';
import { fadeInUp } from '@/utils/animations';

function Contact() {
  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: () => api.getProfile(),
  });

  const contactOptions = buildContactOptionsForPortfolio(profile);

  return (
    <section id="contact" className="relative pt-36 pb-24 bg-black overflow-hidden">
      <BackgroundPaths />
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          {/* Header */}
          <motion.div
            className="mb-16"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <p className="text-gray-400 text-sm tracking-[0.3em] uppercase mb-6 font-medium">Get In Touch</p>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[0.9] tracking-tight mb-8">
              Let's Build
              <br />
              <span className="italic">Something Great</span>
            </h2>
            <p className="text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed font-light">
              Ready to start your project? Choose the best way to connect with me.
            </p>
          </motion.div>

          {/* Contact Options Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {contactOptions.map((option, index) => (
              <ContactOptionCard key={option.id} option={option} index={index} />
            ))}
          </div>

          {/* Contact Information */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            {/* Direct Contact */}
            <div className="bg-gray-900 border border-gray-800 rounded-[1.5rem] p-6">
              <h3 className="text-lg font-black text-white mb-4">Direct Contact</h3>
              <div className="space-y-3">
                {profile?.email && (
                  <a
                    href={`mailto:${profile.email}`}
                    className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group"
                  >
                    <span className="text-xl">📧</span>
                    <span className="group-hover:underline">{profile.email}</span>
                  </a>
                )}
                {profile?.phone && (
                  <div className="flex items-center gap-3 text-gray-300">
                    <span className="text-xl">📞</span>
                    <span>{profile.phone}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Location & Response */}
            <div className="bg-gray-900 border border-gray-800 rounded-[1.5rem] p-6">
              <h3 className="text-lg font-black text-white mb-4">Quick Info</h3>
              <div className="space-y-3">
                {profile?.location && (
                  <div className="flex items-center gap-3 text-gray-300">
                    <span className="text-xl">📍</span>
                    <span>{profile.location}</span>
                  </div>
                )}
                <div className="flex items-center gap-3 text-gray-300">
                  <span className="text-xl">⚡</span>
                  <span>Usually responds within 24 hours</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Download CV Section */}
          {profile?.resumePdfUrl && (
            <motion.div
              className="mt-12"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <a
                href={profile.resumePdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-block px-12 py-4 bg-transparent border-2 border-white text-white rounded-full hover:bg-white hover:text-black transition-all duration-300 text-lg font-medium"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download CV
                </span>
                <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full"></div>
              </a>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Contact;