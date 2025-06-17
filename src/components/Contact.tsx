import { motion } from 'framer-motion'
import { Mail, Github, Linkedin } from 'lucide-react'

const socialLinks = [
  {
    name: 'Email',
    icon: Mail,
    href: 'mailto:allenjoseph012@gmail.com',
    color: 'text-neon-blue',
  },
  {
    name: 'GitHub',
    icon: Github,
    href: 'https://github.com/AllenJoseph0',
    color: 'text-white',
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    href: 'https://www.linkedin.com/in/allenjoseph012',
    color: 'text-neon-purple',
  },
]

export const Contact = () => {
  return (
    <section id="contact" className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-orbitron mb-6">
            Let's <span className="text-neon-blue">Connect</span>
          </h2>
          
          <p className="text-gray-300 mb-12">
            I'm always open to discussing new projects, creative ideas, or
            opportunities to be part of your vision.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="glass-card p-6 flex flex-col items-center gap-4 hover:bg-white/5 transition-colors"
              >
                <link.icon className={`w-8 h-8 ${link.color}`} />
                <span className="text-gray-300">{link.name}</span>
              </motion.a>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-12 text-gray-400"
          >
            <p>Based in Your Location</p>
            <p className="text-sm mt-2">Available for remote work worldwide</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
} 