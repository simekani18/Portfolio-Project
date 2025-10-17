import { motion } from 'framer-motion';
import { TechnicalSkill, getSkillLevelIndicator } from '@/constants/skills';

interface SkillCardProps {
  skill: TechnicalSkill;
  index: number;
}

const CIRCLE_CIRCUMFERENCE = 175.93;

export function SkillCard({ skill, index }: SkillCardProps) {
  const skillLevel = getSkillLevelIndicator(skill.level);

  return (
    <motion.div
      className="bg-white rounded-xl p-4 text-center border border-gray-200 hover:shadow-md transition-all duration-300 group"
      variants={{
        hidden: { opacity: 0, scale: 0.8, y: 20 },
        visible: { opacity: 1, scale: 1, y: 0 },
      }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      whileHover={{ scale: 1.05, y: -3 }}
    >
      {/* Skill Name */}
      <h3 className="font-bold text-black text-sm mb-3 group-hover:text-gray-700 transition-colors">
        {skill.name}
      </h3>

      {/* Circular Progress */}
      <div className="relative w-16 h-16 mx-auto mb-3">
        <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
          {/* Background circle */}
          <circle cx="32" cy="32" r="28" stroke="rgb(229 231 235)" strokeWidth="4" fill="none" />
          {/* Progress circle */}
          <motion.circle
            cx="32"
            cy="32"
            r="28"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            className={skillLevel.color}
            strokeDasharray={CIRCLE_CIRCUMFERENCE}
            initial={{ strokeDashoffset: CIRCLE_CIRCUMFERENCE }}
            animate={{ strokeDashoffset: CIRCLE_CIRCUMFERENCE - (CIRCLE_CIRCUMFERENCE * skill.level) / 100 }}
            transition={{ duration: 1.2, delay: index * 0.03 + 0.5, ease: 'easeOut' }}
          />
        </svg>
        {/* Percentage in center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            className="text-xs font-bold text-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.03 + 1.0 }}
          >
            {skill.level}%
          </motion.span>
        </div>
      </div>

      {/* Skill Level */}
      <div className={`text-xs font-medium px-2 py-1 rounded-full ${skillLevel.color} bg-gray-100`}>
        {skillLevel.text}
      </div>

      {/* Category Badge */}
      <div className="text-xs text-gray-500 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
        {skill.category}
      </div>
    </motion.div>
  );
}
