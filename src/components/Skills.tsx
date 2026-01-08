import { motion } from 'framer-motion'

const technicalSkills = [
  {
    category: 'Programming Languages',
    items: ['Python', 'JavaScript', 'TypeScript', 'C'],
  },
  {
    category: 'Frameworks & Libraries',
    items: [
      'Flask',
      'FastAPI',
      'LangChain',
      'LangGraph',
      'Node.js',
      'Express.js',
      'React (CRA, Vite)',
      'Flutter',
    ],
  },
  {
    category: 'AI & Machine Learning',
    items: [
      'Retrieval-Augmented Generation (RAG)',
      'Prompt Engineering',
      'LangChain Agents',
      'Model Context Protocol (MCP)',
      'LLM Integration (OpenAI, Gemini, Groq)',
      'Whisper ASR',
      'HuggingFace Transformers',
      'MediaPipe',
    ],
  },
  {
    category: 'Speech & Multimodal Processing',
    items: [
      'Whisper (ASR)',
      'Deepgram STT/TTS',
      'Google TTS',
      'ElevenLabs',
      'Piper TTS',
      'Gemini Vision',
      'Tesseract OCR',
    ],
  },
  {
    category: 'Data Analysis & Visualization',
    items: ['Pandas', 'NumPy', 'Tableau', 'Power BI', 'Advanced Excel'],
  },
  {
    category: 'Databases & Vector Stores',
    items: [
      'SQL',
      'Firebase (Basic)',
      'Qdrant',
      'Pinecone (Familiar)',
      'JSON-based Data Stores',
    ],
  },
  {
    category: 'Web Technologies',
    items: [
      'HTML',
      'CSS',
      'JavaScript (ES6+)',
      'TypeScript',
      'REST APIs',
      'WebSockets',
    ],
  },
  {
    category: 'Cloud & Deployment',
    items: ['AWS (S3, EC2 – Basic)', 'Docker (Basic)', 'GitHub Pages', 'Vercel'],
  },
  {
    category: 'Web Scraping & Automation',
    items: ['Selenium', 'BeautifulSoup', 'Requests'],
  },
  {
    category: 'Developer Tools',
    items: ['VS Code', 'GitHub', 'Android Studio'],
  },
]

const softSkills = [
  'Quick Learner',
  'Adaptable',
  'Communication',
  'Time-Management',
  'Problem-Solving',
  'Presentation',
  'Analytical',
]

// Updated certifications list
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
    name: 'Generative AI for Data Scientists',
    issuer: 'IBM',
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
          {technicalSkills.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
              className="glass-card p-6"
            >
              <h3 className="text-xl font-orbitron mb-6 text-neon-blue">
                {category.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.items.map((skill, skillIndex) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: skillIndex * 0.05 }}
                    className="px-3 py-1 text-sm bg-neon-blue/10 text-neon-blue rounded-full"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Soft Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="my-16"
        >
          <h3 className="text-2xl font-orbitron text-center mb-8 text-neon-blue">
            Soft Skills
          </h3>
          <div className="glass-card p-6 flex flex-wrap justify-center gap-3">
            {softSkills.map((skill, index) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="px-4 py-2 text-md bg-dark/70 text-gray-200 rounded-full border border-neon-blue/20"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Certifications Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
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

