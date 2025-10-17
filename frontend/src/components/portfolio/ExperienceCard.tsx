import { motion } from 'framer-motion';
import { WorkExperience } from '@/constants/experiences';

interface ExperienceCardProps {
  experience: WorkExperience;
  index: number;
  isActive: boolean;
  cardRef: (el: HTMLDivElement | null) => void;
}

export const ExperienceCard = ({ experience, index, isActive, cardRef }: ExperienceCardProps) => {
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      ref={cardRef}
      className={`relative flex items-center ${isLeft ? 'justify-end' : 'justify-start'}`}
      initial={{ opacity: 0, x: isLeft ? 100 : -100 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: index * 0.3, ease: 'easeOut' }}
      viewport={{ once: true, margin: '-50px' }}
    >
      {/* Timeline dot */}
      <div
        className={`absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full z-10 transition-colors duration-300 ${
          isActive ? 'bg-gray-400' : 'bg-white'
        }`}
      />

      {/* Experience card */}
      <div className={`w-5/12 ${isLeft ? 'pr-8' : 'pl-8'}`}>
        <div
          className={`rounded-[1.5rem] p-8 shadow-sm border transition-all duration-300 ${
            isActive
              ? 'bg-gradient-to-br from-gray-900 to-gray-700 border-gray-400 shadow-gray-500/20'
              : 'bg-gray-900 border-gray-800'
          }`}
        >
          <span
            className={`text-sm font-medium transition-colors duration-300 ${
              isActive ? 'text-gray-300' : 'text-gray-400'
            }`}
          >
            {experience.period}
          </span>
          <h4 className="text-xl font-bold text-white mt-1">{experience.title}</h4>
          <p className="text-gray-300 font-medium mb-4">{experience.company}</p>
          <ul className="space-y-2">
            {experience.description.map((item, descIndex) => (
              <li key={descIndex} className="text-gray-300 text-sm flex items-start">
                <span
                  className={`mr-2 transition-colors duration-300 ${
                    isActive ? 'text-gray-300' : 'text-white'
                  }`}
                >
                  •
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};
