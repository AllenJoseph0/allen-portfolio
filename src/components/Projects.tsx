import { motion } from 'framer-motion'
import { Github } from 'lucide-react'

const projects = [
  {
    title: 'AI Voice Calling Application',
    description: 'Developing a real-time conversational AI system with an end-to-end voice streaming pipeline using WebSockets, Silero VAD, Whisper, RAG, LLM, and TTS.',
    image: `${import.meta.env.BASE_URL}assets/images/voice-ai.jpg`, // Placeholder image path
    tags: ['Vite', 'TypeScript', 'Python', 'Whisper', 'RAG', 'WebSocket'],
    github: 'https://github.com/AllenJoseph0', // Placeholder link
    date: 'Oct 2025 – Present'
  },
  {
    title: 'Agentic Web Applications',
    description: 'Built agentic web platforms (Fitness Agent, WebGen, AgentGen) using LangChain and Model Context Protocol (MCP) for personalized recommendations and dynamic site generation.',
    image: `${import.meta.env.BASE_URL}assets/images/agent-web.jpg`, // Placeholder image path
    tags: ['JavaScript', 'TypeScript', 'LangChain', 'MCP', 'React'],
    github: 'https://github.com/AllenJoseph0', // Placeholder link
    date: 'Aug 2024 – Present'
  },
  {
    title: 'Retrieval-Augmented Generation (RAG) Systems',
    description: 'Built scalable RAG backends with Flask/Node.js, LangGraph, and Qdrant. Integrated multiple LLMs and multimodal engines (TTS, voice interaction).',
    image: `${import.meta.env.BASE_URL}assets/images/rag-system.jpg`, // Placeholder image path
    tags: ['Flask', 'Node.js', 'LangChain', 'LangGraph', 'RAG', 'Qdrant'],
    github: 'https://github.com/AllenJoseph0', // Placeholder link
    date: 'Jun 2024 – Present'
  },
  {
    title: 'Bharatanatyam Gesture Recognition',
    description: 'Developed real-time mudra recognition with 90% accuracy using OpenCV and MediaPipe. Built Flask web app for live video streaming and gesture display.',
    image: `/assets/images/bharatanatyam.jpg`,
    tags: ['Python', 'OpenCV', 'Flask', 'MediaPipe'],
    github: 'https://github.com/AllenJoseph0/MudraVision',
    date: 'Feb 2025'
  },
  {
    title: 'AI-Driven Multi-Robot Fire Suppression',
    description: 'Created autonomous firefighting robot with indoor navigation and 85% fire detection success rate. Integrated sensors for fire detection and suppression.',
    image: `${import.meta.env.BASE_URL}assets/images/fire-robot.jpg`,
    tags: ['Python', 'Hardware Integration', 'AI', 'Robotics'],
  
    date: 'May 2024'
  },
  {
    title: 'SeekAssist: AI Vision Assistance',
    description: 'Built mobile app to describe images using AI with 92% label accuracy. Delivered output via voice and text for visually impaired users.',
    image: `/assets/images/seekassist.jpg`,
    tags: ['Flutter', 'AI', 'Mobile Development'],
    github: 'https://github.com/AllenJoseph0/SeekAssist',
    date: 'Jun 2023'
  }
]

export const Projects = () => {
  return (
    <section id="projects" className="section-padding">
      <div className="container-custom">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl font-orbitron text-center mb-12"
        >
          My <span className="text-neon-blue">Projects</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group"
            >
              <div className="glass-card h-full overflow-hidden flex flex-col">
                {/* Project Image */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback in case image fails to load
                      const target = e.target as HTMLImageElement;
                      target.src = `https://placehold.co/600x400/020617/93c5fd?text=${project.title.split(' ').join('+')}`;
                    }}
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                    >
                      <Github className="w-6 h-6 text-white" />
                    </a>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-orbitron">{project.title}</h3>
                    <span className="text-sm text-neon-blue flex-shrink-0 ml-2 text-right">{project.date}</span>
                  </div>
                  <p className="text-gray-300 mb-4 flex-grow">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-sm bg-neon-blue/10 text-neon-blue rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}


