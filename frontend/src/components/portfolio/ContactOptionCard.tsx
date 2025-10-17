import { motion } from 'framer-motion';
import { PortfolioContactOption } from '@/constants/contactOptions';

interface ContactOptionCardProps {
  option: PortfolioContactOption;
  index: number;
}

export const ContactOptionCard = ({ option, index }: ContactOptionCardProps) => {
  const isPrimary = option.type === 'primary';

  return (
    <motion.a
      href={option.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: 'easeOut' }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ y: -8 }}
    >
      <div
        className={`rounded-[1.5rem] p-8 h-full transition-all duration-300 ${
          isPrimary
            ? 'bg-white text-black group-hover:bg-gray-100'
            : 'bg-gray-900 border border-gray-800 group-hover:border-gray-600 group-hover:bg-gray-800'
        }`}
      >
        {/* Icon */}
        <div className="text-4xl mb-6">
          <motion.span initial={{ scale: 1 }} whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
            {option.icon}
          </motion.span>
        </div>

        {/* Title */}
        <h3 className={`text-xl font-black mb-3 ${isPrimary ? 'text-black' : 'text-white group-hover:text-gray-100'}`}>
          {option.title}
        </h3>

        {/* Description */}
        <p className={`text-base leading-relaxed mb-6 ${isPrimary ? 'text-gray-700' : 'text-gray-400 group-hover:text-gray-300'}`}>
          {option.description}
        </p>

        {/* Action Button */}
        <div
          className={`inline-flex items-center justify-center px-6 py-3 rounded-full font-medium transition-all duration-300 ${
            isPrimary ? 'bg-black text-white hover:bg-gray-800' : 'bg-white text-black hover:bg-gray-200'
          }`}
        >
          <span>{option.action}</span>
          <svg
            className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </motion.a>
  );
};
