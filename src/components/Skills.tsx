import { motion } from 'framer-motion'

const skills = [
  {
    category: 'Programming & Development',
    items: [
      { name: 'Python', level: 90 },
      { name: 'C', level: 85 },
      { name: 'Flutter', level: 80 },
      { name: 'HTML/CSS', level: 85 },
    ],
  },
  {
    category: 'Data & Analysis',
    items: [
      { name: 'Pandas/NumPy', level: 85 },
      { name: 'Tableau', level: 80 },
      { name: 'Power BI', level: 75 },
      { name: 'Advanced Excel', level: 85 },
    ],
  },
  {
    category: 'Tools & Platforms',
    items: [
      { name: 'AWS (S3, EC2)', level: 70 },
      { name: 'SQL', level: 80 },
      { name: 'Firebase', level: 65 },
      { name: 'Git/GitHub', level: 85 },
    ],
  },
]

const certifications = [
  {
    name: 'The Joy of Computing Python',
    issuer: 'NPTEL',
  },
  {
    name: 'AWS Essential Training for Developers',
    issuer: 'AWS',
  },
  {
    name: 'Generative AI Data Analyst',
    issuer: 'AI Certification',
  },
]

export const Skills = () => {
  return (
    <section id="skills" className="section-padding bg-dark-lighter">
      <div className="container-custom">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl font-orbitron text-center mb-12"
        >
          My <span className="text-neon-blue">Skills</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {skills.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
              className="glass-card p-6"
            >
              <h3 className="text-xl font-orbitron mb-6 text-neon-blue">
                {category.category}
              </h3>
              <div className="space-y-4">
                {category.items.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: skillIndex * 0.1 }}
                  >
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300">{skill.name}</span>
                      <span className="text-neon-blue">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-dark rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: skillIndex * 0.1 }}
                        className="h-full bg-neon-blue rounded-full"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-12"
        >
          <h3 className="text-2xl font-orbitron text-center mb-8 text-neon-blue">
            Certifications
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="glass-card p-6 text-center"
              >
                <h4 className="text-lg font-orbitron mb-2">{cert.name}</h4>
                <p className="text-gray-400">{cert.issuer}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
} 