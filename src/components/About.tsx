import { motion } from 'framer-motion'
import { Download } from 'lucide-react'

export const About = () => {
  return (
    <section id="about" className="section-padding bg-dark-lighter">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          {/* Image Section */}
          <div className="relative">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative z-10"
            >
              <div className="aspect-square rounded-2xl overflow-hidden glass-card">
                <img
                  src={`${import.meta.env.BASE_URL}assets/images/profile.jpg`}
                  alt="Allen Joseph"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-neon-blue rounded-lg animate-float" />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-neon-purple rounded-lg animate-float" style={{ animationDelay: '1s' }} />
          </div>

          {/* Content Section */}
          <div>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-4xl font-orbitron mb-6"
            >
              About <span className="text-neon-blue">Me</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-gray-300 mb-6"
            >
              I'm a Computer Science graduate from Amal Jyothi College of Engineering (2020-2024) with a passion for AI, 
              robotics, and software development. My journey in tech has been driven by a desire to create impactful 
              solutions that make a difference in people's lives.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-gray-300 mb-8"
            >
              From developing AI-powered vision assistance for the visually impaired to creating autonomous 
              firefighting robots, I combine technical expertise with innovative thinking to solve real-world 
              problems. I'm particularly interested in the intersection of AI, robotics, and human-computer 
              interaction.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <a
                href={`${import.meta.env.BASE_URL}assets/resume/resume.pdf`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 glass-card px-6 py-3 text-neon-blue hover:bg-neon-blue/10 transition-colors"
              >
                <Download size={20} />
                View Resume
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 