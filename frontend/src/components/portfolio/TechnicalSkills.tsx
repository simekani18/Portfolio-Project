import { BackgroundPathsLight } from './BackgroundPathsLight';
import { motion } from 'framer-motion';
import { PORTFOLIO_SKILLS, SKILL_CATEGORIES } from '@/constants/skills';
import { SkillCard } from './SkillCard';
import { fadeInUp, staggerContainer } from '@/utils/animations';

function TechnicalSkills() {
  const expertLevelSkills = PORTFOLIO_SKILLS.filter((skill) => skill.level >= 85).length;

  return (
    <section id="technical-skills" className="relative pt-48 pb-24 bg-white overflow-hidden">
      <BackgroundPathsLight />
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <p className="text-gray-500 text-sm tracking-[0.3em] uppercase mb-6 font-medium">Technical Expertise</p>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-black leading-[0.9] mb-8 tracking-tight">
            Skills <span className="italic">Overview</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed font-light">
            A comprehensive view of my technical proficiency across different domains
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          className="bg-gray-50 rounded-[2rem] p-8 border border-gray-200"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {PORTFOLIO_SKILLS.map((skill, index) => (
              <SkillCard key={skill.name} skill={skill} index={index} />
            ))}
          </motion.div>
        </motion.div>

        {/* Category Legend */}
        <motion.div
          className="flex flex-wrap justify-center gap-6 mt-8 mb-12"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {SKILL_CATEGORIES.map((category) => (
            <div key={category} className="flex items-center gap-2 px-3 py-2 bg-white rounded-full border border-gray-200">
              <div className="w-2 h-2 bg-gray-600 rounded-full" />
              <span className="text-sm text-gray-600 font-medium">{category}</span>
            </div>
          ))}
        </motion.div>

        {/* Summary Stats */}
        <motion.div
          className="bg-black rounded-[2rem] p-8 text-white"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { value: '3+', label: 'Years Experience' },
              { value: expertLevelSkills, label: 'Expert Skills' },
              { value: SKILL_CATEGORIES.length, label: 'Categories' },
              { value: PORTFOLIO_SKILLS.length, label: 'Technologies' },
            ].map((stat) => (
              <motion.div key={stat.label} variants={fadeInUp} transition={{ duration: 0.5 }}>
                <div className="text-3xl md:text-4xl font-black mb-2">{stat.value}</div>
                <div className="text-gray-300 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default TechnicalSkills;