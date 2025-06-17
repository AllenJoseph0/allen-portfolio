import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'

export const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark-lighter to-dark opacity-50" />
      
      {/* Animated particles will be added here later */}
      
      <div className="container-custom relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-orbitron mb-6">
            <span className="text-white">Hi, I'm </span>
            <span className="text-neon-blue">Allen Joseph</span>
          </h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto"
          >
            Turning Ideas into Reality with Code & Creativity
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex justify-center gap-4"
          >
            <a
              href="#projects"
              className="glass-card px-8 py-3 text-neon-blue hover:bg-neon-blue/10 transition-colors"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="glass-card px-8 py-3 text-white hover:bg-white/10 transition-colors"
            >
              Contact Me
            </a>
          </motion.div>
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowDown className="w-6 h-6 text-neon-blue" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
} 