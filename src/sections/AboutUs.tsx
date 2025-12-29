'use client'
import { useRef, ReactNode } from 'react'
import { motion, useInView, Variants } from 'motion/react'
import {
  Rocket,
  Zap,
  Code2,
  Handshake,
  Users,
  Target,
  Globe,
  Award,
  TrendingUp,
  Shield,
  Heart,
  Sparkles,
  ArrowUpRight,
  Star,
  CheckCircle,
  Clock,
  PieChart,
  Coffee,
} from 'lucide-react'

// Types
export interface TeamMember {
  id?: string | number
  name: string
  role: string
  description?: string
  image?: string
  icon?: ReactNode
  expertise?: string[]
  social?: { platform: string; url: string; icon: ReactNode }[]
}

export interface PrincipleItem {
  id?: string | number
  title: string
  description: string
  icon?: ReactNode
  gradient?: string
}

export interface StatItem {
  id?: string | number
  label: string
  value: string
  suffix?: string
  prefix?: string
  description?: string
  icon?: ReactNode
}

interface AboutUsProps {
  companyName?: string
  tagline?: string
  mission?: string | ReactNode
  vision?: string | ReactNode
  story?: string | ReactNode
  principles?: PrincipleItem[]
  team?: TeamMember[]
  stats?: StatItem[]
  primaryColor?: string
  secondaryColor?: string
  animateOnScroll?: boolean
  animationSpeed?: 'slow' | 'normal' | 'fast'
  showTeam?: boolean
  showStats?: boolean
  showPrinciples?: boolean
  className?: string
}

// Default Avuny data
const defaultPrinciples: PrincipleItem[] = [
  {
    id: 1,
    title: 'Business-First Mindset',
    description:
      'We align technology with business objectives, ensuring every line of code contributes to your growth and ROI.',
    icon: <TrendingUp className="h-6 w-6" />,
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    id: 2,
    title: 'Technical Excellence',
    description:
      'Clean, scalable, and maintainable code is our standard. We build for today with tomorrow in mind.',
    icon: <Code2 className="h-6 w-6" />,
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    id: 3,
    title: 'User-Centric Design',
    description:
      'We create intuitive experiences that delight users and drive engagement, backed by data and research.',
    icon: <Users className="h-6 w-6" />,
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    id: 4,
    title: 'Partnership Approach',
    description:
      "We're more than vendors; we're partners invested in your success, supporting you every step of the way.",
    icon: <Handshake className="h-6 w-6" />,
    gradient: 'from-orange-500 to-red-500',
  },
]

const defaultTeam: TeamMember[] = [
  {
    id: 1,
    name: 'Khaled Eleskandrany',
    role: 'Lead Developer & Founder',
    description:
      '10+ years in full-stack development, specializing in scalable architecture and performance optimization.',
    icon: <Code2 className="h-8 w-8" />,
    expertise: ['React/Next.js', 'Node.js', 'AWS', 'System Design'],
  },
  {
    id: 2,
    name: 'Sarah Chen',
    role: 'UX/UI Design Lead',
    description:
      'Crafting beautiful, functional interfaces that solve real user problems and drive business results.',
    icon: <Users className="h-8 w-8" />,
    expertise: ['Figma', 'Design Systems', 'User Research', 'Prototyping'],
  },
  {
    id: 3,
    name: 'Marcus Rivera',
    role: 'DevOps Architect',
    description:
      'Building robust infrastructure and CI/CD pipelines that ensure reliability and scalability.',
    icon: <Zap className="h-8 w-8" />,
    expertise: ['Docker', 'Kubernetes', 'CI/CD', 'Cloud Infrastructure'],
  },
  {
    id: 4,
    name: 'Priya Sharma',
    role: 'Product Strategist',
    description:
      'Translating business goals into actionable product roadmaps and user-centric features.',
    icon: <Target className="h-8 w-8" />,
    expertise: ['Product Strategy', 'Agile', 'Market Analysis', 'Roadmapping'],
  },
]

const defaultStats: StatItem[] = [
  {
    id: 1,
    label: 'Projects Delivered',
    value: '50',
    suffix: '+',
    icon: <Rocket className="h-5 w-5" />,
    description: 'Successful launches across industries',
  },
  {
    id: 2,
    label: 'Client Satisfaction',
    value: '98',
    suffix: '%',
    icon: <Heart className="h-5 w-5" />,
    description: 'Based on post-project reviews',
  },
  {
    id: 3,
    label: 'Code Quality Score',
    value: '9.8',
    prefix: '/10',
    icon: <Award className="h-5 w-5" />,
    description: 'Average code review score',
  },
  {
    id: 4,
    label: 'Uptime',
    value: '99.9',
    suffix: '%',
    icon: <Shield className="h-5 w-5" />,
    description: 'Production systems reliability',
  },
]

// Animation presets
const animationSpeeds = {
  slow: { duration: 0.8, stagger: 0.3 },
  normal: { duration: 0.6, stagger: 0.2 },
  fast: { duration: 0.4, stagger: 0.1 },
}

// Color mapping
const colorMap = {
  blue: {
    primary: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-600 dark:bg-blue-500',
    light: 'bg-blue-50 dark:bg-blue-900/20',
    gradient: 'from-blue-500 to-cyan-500',
  },
  purple: {
    primary: 'text-purple-600 dark:text-purple-400',
    bg: 'bg-purple-600 dark:bg-purple-500',
    light: 'bg-purple-50 dark:bg-purple-900/20',
    gradient: 'from-purple-500 to-pink-500',
  },
  green: {
    primary: 'text-green-600 dark:text-green-400',
    bg: 'bg-green-600 dark:bg-green-500',
    light: 'bg-green-50 dark:bg-green-900/20',
    gradient: 'from-green-500 to-emerald-500',
  },
  orange: {
    primary: 'text-orange-600 dark:text-orange-400',
    bg: 'bg-orange-600 dark:bg-orange-500',
    light: 'bg-orange-50 dark:bg-orange-900/20',
    gradient: 'from-orange-500 to-red-500',
  },
  indigo: {
    primary: 'text-indigo-600 dark:text-indigo-400',
    bg: 'bg-indigo-600 dark:bg-indigo-500',
    light: 'bg-indigo-50 dark:bg-indigo-900/20',
    gradient: 'from-indigo-500 to-blue-500',
  },
}

const AboutUs: React.FC<AboutUsProps> = ({
  companyName = 'Avuny',
  tagline = 'Building Digital Excellence',
  mission = 'We transform ideas into exceptional digital experiences that drive business growth. Our mission is to bridge the gap between innovative technology and business success through clean, scalable, and user-centric solutions.',
  vision = 'To be the most trusted partner for businesses seeking to leverage technology for sustainable growth, known for our technical excellence, strategic approach, and unwavering commitment to client success.',
  story = 'Founded by Khaled Eleskandrany who saw a gap between technical execution and business strategy, Avuny was born from a simple belief: great software should not only work perfectly but also drive tangible business results. What started as a small team of passionate engineers has grown into a full-service digital agency, but our core philosophy remains unchanged - we build with purpose, precision, and partnership.',
  principles = defaultPrinciples,
  team = defaultTeam,
  stats = defaultStats,
  primaryColor = 'blue',
  secondaryColor = 'purple',
  animateOnScroll = true,
  animationSpeed = 'normal',
  showTeam,
  showStats,
  showPrinciples,
  className = '',
}) => {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: !animateOnScroll, margin: '-100px' })

  const speed = animationSpeeds[animationSpeed]
  const colors = colorMap[primaryColor as keyof typeof colorMap] || colorMap.blue
  const secondaryColors = colorMap[secondaryColor as keyof typeof colorMap] || colorMap.purple

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: speed.duration,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  }

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: speed.duration, ease: 'easeOut' },
    },
  }

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: speed.stagger,
      },
    },
  }

  const renderPrinciples = () => (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {principles.map((principle, index) => (
        <motion.div
          key={principle.id || index}
          variants={itemVariants}
          whileHover={{
            y: -10,
            transition: { duration: 0.3 },
          }}
          className="group relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
          <div className="relative p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 group-hover:border-gray-300 dark:group-hover:border-gray-600 transition-all duration-300 h-full">
            {/* Icon with gradient background */}
            <div
              className={`relative inline-flex p-3 rounded-xl mb-4 bg-gradient-to-br ${principle.gradient || colors.gradient}`}
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-white"
              >
                {principle.icon}
              </motion.div>

              {/* Floating particles */}
              <motion.div
                animate={{
                  y: [0, -5, 0],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-white/50"
              />
              <motion.div
                animate={{
                  y: [0, -3, 0],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 0.2 }}
                className="absolute -bottom-1 -left-1 h-2 w-2 rounded-full bg-white/50"
              />
            </div>

            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              {principle.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">{principle.description}</p>

            {/* Hover line effect */}
            <motion.div
              initial={{ width: 0 }}
              whileHover={{ width: '100%' }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent"
            />
          </div>
        </motion.div>
      ))}
    </motion.div>
  )

  const renderStats = () => (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className="grid grid-cols-2 md:grid-cols-4 gap-6"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.id || index}
          variants={fadeInUp}
          whileHover={{ scale: 1.05 }}
          className="relative"
        >
          <div className="relative p-6 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 text-center">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden rounded-2xl">
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute -top-20 -right-20 h-40 w-40 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full"
              />
            </div>

            <div className="relative">
              {/* Icon */}
              <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/30 mb-4">
                <div className={colors.primary}>{stat.icon}</div>
              </div>

              {/* Stat value */}
              <div className="mb-2">
                <span className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </span>
                {stat.prefix && (
                  <span className="text-2xl text-gray-500 dark:text-gray-400 ml-1">
                    {stat.prefix}
                  </span>
                )}
                {stat.suffix && (
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent ml-1">
                    {stat.suffix}
                  </span>
                )}
              </div>

              {/* Label */}
              <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                {stat.label}
              </h4>

              {/* Description */}
              {stat.description && (
                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.description}</p>
              )}
            </div>

            {/* Glow effect on hover */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-500" />
          </div>
        </motion.div>
      ))}
    </motion.div>
  )

  const renderTeam = () => (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {team.map((member, index) => (
        <motion.div
          key={member.id || index}
          variants={itemVariants}
          whileHover={{ y: -8 }}
          className="group relative"
        >
          <div className="relative p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500" />
            </div>

            {/* Profile */}
            <div className="relative">
              {/* Icon/Avatar */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
                className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 mb-4"
              >
                <div className={colors.primary}>{member.icon || <Users className="h-8 w-8" />}</div>
              </motion.div>

              {/* Name and Role */}
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                {member.name}
              </h3>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-blue-600 dark:text-blue-400 font-medium">{member.role}</span>
                <ArrowUpRight className="h-4 w-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
              </div>

              {/* Description */}
              {member.description && (
                <p className="text-gray-600 dark:text-gray-300 mb-4">{member.description}</p>
              )}

              {/* Expertise */}
              {member.expertise && member.expertise.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {member.expertise.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Hover effect line */}
            <motion.div
              initial={{ width: 0 }}
              whileHover={{ width: '100%' }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500"
            />
          </div>
        </motion.div>
      ))}
    </motion.div>
  )

  return (
    <section ref={containerRef} className={`py-16 md:py-24 px-4 md:px-8 lg:px-16 ${className}`}>
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-24"
        >
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
            <Sparkles className="h-4 w-4 text-blue-500" />
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Our Story</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            About{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {companyName}
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            {tagline}
          </p>

          {/* Animated underline */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100px' }}
            transition={{ delay: 0.5, duration: 1 }}
            className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"
          />
        </motion.div>

        {/* Story Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-16 md:mb-24"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              {/* Floating elements */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-6 -left-6 h-24 w-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl"
              />

              <div className="relative p-8 md:p-12 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-2xl">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  Our Journey
                </h2>
                <div className="space-y-4 text-lg text-gray-600 dark:text-gray-300">
                  {typeof story === 'string' ? <p>{story}</p> : story}
                </div>

                {/* Decorative corner */}
                <div className="absolute -bottom-4 -right-4 h-20 w-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl -z-10" />
              </div>
            </div>

            <div className="space-y-8">
              {/* Mission */}
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                transition={{ delay: 0.4 }}
                className="relative p-6 bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-800 rounded-2xl"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      Our Mission
                    </h3>
                    <div className="text-gray-600 dark:text-gray-300">
                      {typeof mission === 'string' ? <p>{mission}</p> : mission}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Vision */}
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                transition={{ delay: 0.6 }}
                className="relative p-6 bg-gradient-to-br from-purple-50 to-white dark:from-purple-900/20 dark:to-gray-800 rounded-2xl"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
                    <Globe className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      Our Vision
                    </h3>
                    <div className="text-gray-600 dark:text-gray-300">
                      {typeof vision === 'string' ? <p>{vision}</p> : vision}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Our Principles */}
        {showPrinciples && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
            className="mb-16 md:mb-24"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Our <span className={colors.primary}>Principles</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                The core values that guide every project we undertake and every decision we make
              </p>
            </div>
            {renderPrinciples()}
          </motion.div>
        )}

        {/* Stats */}
        {showStats && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1 }}
            className="mb-16 md:mb-24"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                By the <span className={secondaryColors.primary}>Numbers</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Quantifying our impact and commitment to excellence
              </p>
            </div>
            {renderStats()}
          </motion.div>
        )}

        {/* Our Team */}
        {showTeam && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.2 }}
            className="mb-16"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Meet Our{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Team
                </span>
              </h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Passionate experts dedicated to turning your vision into reality
              </p>
            </div>
            {renderTeam()}
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 opacity-90" />

          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -100, 0],
                  x: [0, 50, 0],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 20 + i * 3,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="absolute h-32 w-32 bg-white/10 rounded-full blur-2xl"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${30 + i * 10}%`,
                }}
              />
            ))}
          </div>

          <div className="relative p-8 md:p-12 text-center">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-flex p-4 rounded-2xl bg-white/20 backdrop-blur-sm mb-6"
            >
              <Coffee className="h-8 w-8 text-white" />
            </motion.div>

            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Build Something Amazing?
            </h3>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Lets discuss how Avuny can help transform your ideas into exceptional digital
              experiences.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-xl hover:shadow-2xl transition-shadow duration-300 flex items-center gap-3 mx-auto group"
            >
              <span>Start Your Project</span>
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowUpRight className="h-5 w-5" />
              </motion.div>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export const AboutUsAvuny = () => (
  <AboutUs
    companyName="Avuny"
    tagline="Building Digital Excellence"
    mission={
      <>
        At Avuny, we transform ideas into exceptional digital experiences that drive business
        growth. Our mission is to bridge the gap between innovative technology and business success
        through clean, scalable, and user-centric solutions.
      </>
    }
    vision={
      <>
        To be the most trusted partner for businesses seeking to leverage technology for sustainable
        growth, known for our technical excellence, strategic approach, and unwavering commitment to
        client success.
      </>
    }
    story={
      <>
        Founded by Khaled Eleskandrany who saw a gap between technical execution and business
        strategy, Avuny was born from a simple belief: great software should not only work perfectly
        but also drive tangible business results. What started as a small team of passionate
        engineers has grown into a full-service digital agency, but our core philosophy remains
        unchanged - we build with purpose, precision, and partnership. Today, we work with startups
        and established businesses alike, helping them navigate the digital landscape with
        confidence and clarity.
      </>
    }
    animateOnScroll={true}
    animationSpeed="normal"
    primaryColor="blue"
    secondaryColor="purple"
    showTeam={false}
    showStats={false}
    showPrinciples={true}
  />
)

// Export both the customizable component and the pre-configured version
export default AboutUs
