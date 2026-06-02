import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Code2, Bot, Palette, TrendingUp, ArrowUpRight, X, CheckCircle2, Zap, Layers } from 'lucide-react';

interface ServiceDetail {
  num: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  desc: string;
  tags: string[];
  fullDesc: string;
  features: string[];
  stats: Array<{ label: string; value: string }>;
  technologies: string[];
}

const services: ServiceDetail[] = [
  {
    num: '01',
    icon: Code2,
    title: 'Technology & Development',
    desc: 'Custom platforms, scalable architectures, and cutting-edge web applications built for performance and longevity.',
    tags: ['Full-Stack', 'Mobile Apps', 'Cloud'],
    fullDesc: 'We architect and build digital products that scale. From high-performance web applications to complex backend systems, our engineering team delivers robust, secure, and maintainable solutions using modern tech stacks. Every line of code is written with scalability, security, and user experience in mind.',
    features: [
      'Custom web & mobile application development',
      'Microservices & API architecture design',
      'Cloud infrastructure on AWS, Azure, GCP',
      'Database design & optimization',
      'DevOps & CI/CD pipeline setup',
      'Legacy system modernization',
    ],
    stats: [
      { label: 'Projects Delivered', value: '150+' },
      { label: 'Uptime SLA', value: '99.9%' },
      { label: 'Code Coverage', value: '95%+' },
    ],
    technologies: ['React', 'Node.js', 'Python', 'Go', 'PostgreSQL', 'AWS', 'Docker', 'Kubernetes'],
  },
  {
    num: '02',
    icon: Bot,
    title: 'AI & Automation',
    desc: 'Intelligent workflows, predictive analytics, and autonomous systems that multiply your team\'s output.',
    tags: ['Machine Learning', 'NLP', 'Workflows'],
    fullDesc: 'Harness the power of artificial intelligence to transform your operations. We build custom AI solutions that automate repetitive tasks, extract insights from data, and enable intelligent decision-making at scale. From conversational AI to predictive models, we make AI work for your business.',
    features: [
      'Custom machine learning model development',
      'Natural language processing solutions',
      'Intelligent document processing',
      'Predictive analytics & forecasting',
      'AI-powered chatbots & virtual assistants',
      'Workflow automation & RPA',
    ],
    stats: [
      { label: 'Processes Automated', value: '500+' },
      { label: 'Efficiency Gain', value: '3x' },
      { label: 'Models Deployed', value: '80+' },
    ],
    technologies: ['TensorFlow', 'PyTorch', 'OpenAI', 'LangChain', 'Python', 'FastAPI', 'Redis', 'Vector DBs'],
  },
  {
    num: '03',
    icon: Palette,
    title: 'Design & Creative',
    desc: 'Brand identities, immersive UI/UX, and creative direction that makes your business impossible to ignore.',
    tags: ['Branding', 'UI/UX', 'Motion'],
    fullDesc: 'Design is not just how it looks — it is how it works. Our creative team crafts visually stunning, intuitively functional experiences that captivate users and communicate your brand\'s essence. From brand strategy to pixel-perfect interfaces, we design with purpose and precision.',
    features: [
      'Brand identity & visual systems',
      'User experience (UX) research & design',
      'User interface (UI) design & prototyping',
      'Motion design & micro-interactions',
      'Design systems & component libraries',
      'Creative direction & art direction',
    ],
    stats: [
      { label: 'Design Awards', value: '25+' },
      { label: 'User Satisfaction', value: '98%' },
      { label: 'Conversion Lift', value: '40%' },
    ],
    technologies: ['Figma', 'Framer', 'After Effects', 'Blender', 'WebGL', 'Three.js', 'Lottie', 'Spline'],
  },
  {
    num: '04',
    icon: TrendingUp,
    title: 'Strategy & Consulting',
    desc: 'Growth roadmaps, market positioning, and operational frameworks built from decades of collective experience.',
    tags: ['Growth Plans', 'Fundraising', 'Ops'],
    fullDesc: 'Strategy without execution is hallucination. We combine deep market intelligence with hands-on operational expertise to craft growth strategies that actually get implemented. Whether you are scaling, pivoting, or entering new markets, we provide the clarity and roadmap you need.',
    features: [
      'Market analysis & competitive positioning',
      'Go-to-market strategy & execution',
      'Revenue growth & monetization planning',
      'Investor pitch decks & fundraising support',
      'Operational efficiency audits',
      'M&A advisory & due diligence',
    ],
    stats: [
      { label: 'Revenue Growth', value: '300%' },
      { label: 'Funds Raised', value: '$50M+' },
      { label: 'Markets Entered', value: '12' },
    ],
    technologies: ['Tableau', 'Power BI', 'Mixpanel', 'Amplitude', 'Salesforce', 'HubSpot', 'Notion', 'Airtable'],
  },
];

function ServiceModal({ service, onClose }: { service: ServiceDetail; onClose: () => void }) {
  const Icon = service.icon;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-8"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-ink/90 backdrop-blur-xl" />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.95 }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-gold/10 bg-surface/80 backdrop-blur-md"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 lg:p-8 border-b border-gold/5 bg-surface/80 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center">
              <Icon size={22} className="text-gold" />
            </div>
            <div>
              <span className="text-[10px] tracking-[0.2em] uppercase text-gold/60 block">Service {service.num}</span>
              <h3 className="font-display text-lg text-pearl font-medium">{service.title}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full border border-gold/10 flex items-center justify-center text-muted hover:text-gold hover:border-gold/30 transition-colors"
            data-hover
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-6 lg:p-8 space-y-8">
          {/* Description */}
          <p className="text-sm text-muted leading-relaxed font-light">{service.fullDesc}</p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {service.stats.map((stat) => (
              <div key={stat.label} className="text-center p-4 rounded-xl border border-gold/5 bg-ink/30">
                <div className="font-display text-2xl text-gold font-semibold mb-1">{stat.value}</div>
                <div className="text-[10px] tracking-[0.15em] uppercase text-muted">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Features */}
          <div>
            <h4 className="text-xs font-medium tracking-[0.2em] uppercase text-pearl mb-4 flex items-center gap-2">
              <CheckCircle2 size={14} className="text-gold" />
              What We Deliver
            </h4>
            <div className="grid sm:grid-cols-2 gap-3">
              {service.features.map((feature) => (
                <div key={feature} className="flex items-start gap-3 p-3 rounded-lg border border-gold/5 bg-ink/20">
                  <Zap size={14} className="text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-cream/80">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies */}
          <div>
            <h4 className="text-xs font-medium tracking-[0.2em] uppercase text-pearl mb-4 flex items-center gap-2">
              <Layers size={14} className="text-gold" />
              Technologies & Tools
            </h4>
            <div className="flex flex-wrap gap-2">
              {service.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 text-[11px] font-medium tracking-wider text-gold bg-gold/5 border border-gold/10 rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="pt-4 border-t border-gold/5">
            <a
              href="#contact"
              onClick={onClose}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gold text-ink font-display font-medium text-xs tracking-[0.15em] uppercase hover:bg-gold-light transition-all duration-300 rounded-lg"
              data-hover
            >
              Start a Project
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function TiltCard({ service, index, onOpen }: { service: ServiceDetail; index: number; onOpen: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('rotateX(0deg) rotateY(0deg)');
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    setTransform(`rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
    setGlowPos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  };

  const handleMouseLeave = () => {
    setTransform('rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setGlowPos({ x: 50, y: 50 });
  };

  const Icon = service.icon;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.23, 1, 0.32, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative perspective-container"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div
        className="relative p-8 lg:p-10 rounded-2xl border border-gold/5 bg-surface/40 backdrop-blur-sm overflow-hidden transition-shadow duration-500 hover:shadow-[0_0_60px_rgba(212,168,83,0.08)]"
        style={{ transform: transform, transition: 'transform 0.15s ease-out', transformStyle: 'preserve-3d' }}
      >
        {/* Glow effect */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(600px circle at ${glowPos.x}% ${glowPos.y}%, rgba(212,168,83,0.06), transparent 40%)`,
          }}
        />

        <div className="relative z-10" style={{ transform: 'translateZ(30px)' }}>
          <div className="flex items-start justify-between mb-8">
            <div className="w-12 h-12 rounded-xl bg-gold/5 border border-gold/10 flex items-center justify-center group-hover:bg-gold/10 transition-colors">
              <Icon size={20} className="text-gold" />
            </div>
            <span className="font-display text-xs text-muted tracking-wider">{service.num}</span>
          </div>

          <h3 className="font-display text-xl text-pearl font-medium mb-4 group-hover:text-gold transition-colors duration-300">
            {service.title}
          </h3>

          <p className="text-sm text-muted leading-relaxed mb-8 font-light">
            {service.desc}
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {service.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-[10px] font-medium tracking-wider uppercase text-muted border border-gold/10 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <button
            onClick={onOpen}
            className="flex items-center gap-2 text-gold text-xs font-medium tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:underline underline-offset-4"
            data-hover
          >
            Learn more
            <ArrowUpRight size={12} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [activeService, setActiveService] = useState<ServiceDetail | null>(null);

  return (
    <section id="services" ref={sectionRef} className="relative py-32 lg:py-40">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-xs font-body font-medium tracking-[0.3em] uppercase text-gold mb-6 block">
            What We Do
          </span>
          <h2 className="font-serif text-pearl font-light text-4xl lg:text-6xl leading-tight mb-6">
            Services crafted for <em className="text-gold not-italic">excellence</em>
          </h2>
          <p className="text-muted text-base max-w-xl mx-auto font-light">
            Every solution is bespoke. Every detail is deliberate. We don&apos;t do templates — we build legacies.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, i) => (
            <TiltCard key={service.num} service={service} index={i} onOpen={() => setActiveService(service)} />
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {activeService && (
          <ServiceModal service={activeService} onClose={() => setActiveService(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
