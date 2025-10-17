import { BackgroundPaths } from './BackgroundPaths';
import { motion } from 'framer-motion';
import { WORK_EXPERIENCES } from '@/constants/experiences';
import { useTimelineCardTracking } from '@/hooks/useActiveCard';
import { ExperienceCard } from './ExperienceCard';
import { fadeInUp } from '@/utils/animations';

const Experience = () => {
  const { activeCardIndex, cardRefs } = useTimelineCardTracking<HTMLDivElement>(
    WORK_EXPERIENCES.length
  );

  return (
    <section id="experience" className="relative pt-48 pb-24 bg-black overflow-hidden">
      <BackgroundPaths />
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <p className="text-gray-400 text-sm tracking-[0.3em] uppercase mb-6 font-medium">Career Timeline</p>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[0.9] mb-10 tracking-tight">
            Work <span className="italic">Experience</span>
          </h2>
          <p className="text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed font-light">
            Over 3 years of experience in software development, specializing in iOS and backend systems.
          </p>
        </motion.div>

        {/* Experience Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Center line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-700" />

          <div className="space-y-12">
            {WORK_EXPERIENCES.map((experience, index) => (
              <ExperienceCard
                key={experience.id}
                experience={experience}
                index={index}
                isActive={activeCardIndex === index}
                cardRef={(el) => (cardRefs.current[index] = el)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;