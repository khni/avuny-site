'use client'
import { useState, useRef, ReactNode } from 'react'
import { motion, useInView, AnimatePresence } from 'motion/react'
import {
  CheckCircle,
  Clock,
  Zap,
  TrendingUp,
  ArrowRight,
  Sparkles,
  Target,
  Rocket,
  Layers,
  Shield,
  Users,
} from 'lucide-react'

// Types
export interface TimelineItem {
  step: string | number
  title: string
  description: string
  icon?: ReactNode
  duration?: string
  status?: 'completed' | 'current' | 'upcoming'
  highlights?: string[]
  details?: string[]
  metrics?: { label: string; value: string }[]
  color?: string
  gradient?: string
}

interface TimelineProps {
  data: TimelineItem[]
  title?: string | ReactNode
  subtitle?: string | ReactNode
  orientation?: 'vertical' | 'horizontal' | 'compact'
  animateOnScroll?: boolean
  animationSpeed?: 'slow' | 'normal' | 'fast'
  showConnectors?: boolean
  showStatusIcons?: boolean
  interactive?: boolean
  autoAdvance?: boolean
  autoAdvanceInterval?: number
  onStepClick?: (index: number, item: TimelineItem) => void
  className?: string
  primaryColor?: string
  secondaryColor?: string
  variant?: 'default' | 'minimal' | 'detailed' | 'cards'
}

// Icon mapping for step numbers
const stepIcons = [Target, Rocket, Layers, Shield, Users, Zap, TrendingUp, CheckCircle]

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

const Timeline: React.FC<TimelineProps> = ({
  data,
  title = 'Our Process',
  subtitle = 'Step-by-step journey to success',
  orientation = 'vertical',
  animateOnScroll = true,
  animationSpeed = 'normal',
  showConnectors = true,
  showStatusIcons = true,
  interactive = true,
  autoAdvance = false,
  autoAdvanceInterval = 5000,
  onStepClick,
  className = '',
  primaryColor = 'blue',
  secondaryColor = 'purple',
  variant = 'default',
}) => {
  const [activeStep, setActiveStep] = useState(0)
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: !animateOnScroll, margin: '-100px' })

  const colors = colorMap[primaryColor as keyof typeof colorMap] || colorMap.blue
  const secondaryColors = colorMap[secondaryColor as keyof typeof colorMap] || colorMap.purple

  // Animation speeds
  const animationSpeeds = {
    slow: { duration: 0.8, stagger: 0.3 },
    normal: { duration: 0.6, stagger: 0.2 },
    fast: { duration: 0.4, stagger: 0.1 },
  }

  const speed = animationSpeeds[animationSpeed]

  const handleStepClick = (index: number) => {
    if (interactive) {
      setActiveStep(index)
      onStepClick?.(index, data[index])
    }
  }

  const getStepIcon = (index: number, item: TimelineItem) => {
    if (item.icon) return item.icon

    const IconComponent = stepIcons[index % stepIcons.length]
    return <IconComponent className="h-6 w-6" />
  }

  const getStatusIcon = (index: number) => {
    if (index < activeStep) {
      return <CheckCircle className="h-5 w-5 text-green-500" />
    }
    if (index === activeStep) {
      return (
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="h-5 w-5"
        >
          <div className={`h-full w-full rounded-full ${colors.bg} animate-pulse`} />
        </motion.div>
      )
    }
    return <div className="h-5 w-5 rounded-full border-2 border-gray-300 dark:border-gray-600" />
  }

  // Vertical Timeline Component
  const renderVerticalTimeline = () => (
    <div className="relative">
      {/* Vertical line */}
      {showConnectors && (
        <motion.div
          initial={{ height: 0 }}
          animate={isInView ? { height: '100%' } : { height: 0 }}
          transition={{ duration: speed.duration * 2, ease: 'easeInOut' }}
          className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gray-300 to-gray-300 dark:from-gray-600 dark:to-gray-600"
        >
          {/* Progress line */}
          <motion.div
            initial={{ height: 0 }}
            animate={
              isInView
                ? {
                    height: `${((activeStep + 1) / data.length) * 100}%`,
                  }
                : { height: 0 }
            }
            transition={{ duration: speed.duration * 2, ease: 'easeInOut' }}
            className={`absolute top-0 left-0 right-0 ${colors.bg}`}
          />
        </motion.div>
      )}

      <div className="space-y-12">
        {data.map((item, index) => {
          const isActive = index === activeStep
          const isCompleted = index < activeStep
          const isUpcoming = index > activeStep
          const itemColors = item.color
            ? colorMap[item.color as keyof typeof colorMap] || colors
            : colors

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: speed.duration, delay: index * speed.stagger }}
              onClick={() => handleStepClick(index)}
              className={`
                relative pl-16 cursor-pointer transition-all duration-300
                ${interactive ? 'hover:pl-20' : ''}
                ${className}
              `}
            >
              {/* Step connector dot */}
              <motion.div
                animate={
                  isInView
                    ? {
                        scale: [0, 1.2, 1],
                        opacity: [0, 1, 1],
                      }
                    : {}
                }
                transition={{
                  duration: speed.duration,
                  delay: index * speed.stagger,
                }}
                className={`
                  absolute left-0 top-0 h-12 w-12 rounded-full border-4 border-white dark:border-gray-800
                  ${isActive || isCompleted ? itemColors.bg : 'bg-gray-300 dark:bg-gray-600'}
                  ${isActive ? 'shadow-lg shadow-blue-500/30' : ''}
                `}
              >
                <div className="flex h-full items-center justify-center">
                  {getStepIcon(index, item)}
                </div>

                {/* Status ring for active step */}
                {isActive && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: [0, 1.5, 1], opacity: [0, 0.5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 rounded-full border-2 border-blue-400"
                  />
                )}
              </motion.div>

              {/* Step number badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{
                  duration: speed.duration,
                  delay: index * speed.stagger + 0.1,
                  type: 'spring',
                  stiffness: 200,
                }}
                className={`absolute -left-2 top-8 h-6 w-6 rounded-full ${itemColors.bg} text-white text-xs font-bold flex items-center justify-center shadow-lg`}
              >
                {item.step}
              </motion.div>

              {/* Content card */}
              <motion.div
                whileHover={interactive ? { x: 8 } : {}}
                className={`
                  p-6 rounded-2xl transition-all duration-300
                  ${
                    isActive
                      ? `bg-gradient-to-r ${itemColors.light} border-2 border-${itemColors.bg.split('-')[1]}-300 shadow-xl`
                      : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
                  }
                  ${isCompleted ? 'opacity-90' : ''}
                `}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3
                        className={`text-xl font-bold ${isActive ? itemColors.primary : 'text-gray-800 dark:text-white'}`}
                      >
                        {item.title}
                      </h3>
                      {showStatusIcons && <div className="ml-2">{getStatusIcon(index)}</div>}
                    </div>
                    {item.duration && (
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
                        <Clock className="h-4 w-4" />
                        <span>{item.duration}</span>
                      </div>
                    )}
                  </div>
                  {isActive && (
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Sparkles className={`h-5 w-5 ${itemColors.primary}`} />
                    </motion.div>
                  )}
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-4">{item.description}</p>

                {/* Highlights */}
                {item.highlights && item.highlights.length > 0 && isActive && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ delay: 0.2 }}
                    className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex flex-wrap gap-2">
                      {item.highlights.map((highlight, idx) => (
                        <span
                          key={idx}
                          className={`px-3 py-1 rounded-full text-sm ${itemColors.light} ${itemColors.primary}`}
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Details */}
                {item.details && item.details.length > 0 && isActive && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mt-4 space-y-2"
                  >
                    {item.details.map((detail, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400"
                      >
                        <div className={`h-1.5 w-1.5 rounded-full mt-2 ${itemColors.bg}`} />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </motion.div>
                )}

                {/* Metrics */}
                {item.metrics && item.metrics.length > 0 && isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-6 grid grid-cols-2 gap-4"
                  >
                    {item.metrics.map((metric, idx) => (
                      <div
                        key={idx}
                        className="text-center p-3 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700"
                      >
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                          {metric.value}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )

  // Horizontal Timeline Component
  const renderHorizontalTimeline = () => (
    <div className="relative py-8">
      {/* Horizontal line */}
      {showConnectors && (
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: '100%' } : {}}
          transition={{ duration: speed.duration * 2 }}
          className="absolute left-0 right-0 top-1/2 h-0.5 bg-gradient-to-r from-gray-300 to-gray-300 dark:from-gray-600 dark:to-gray-600 -translate-y-1/2"
        >
          {/* Progress line */}
          <motion.div
            initial={{ width: 0 }}
            animate={
              isInView
                ? {
                    width: `${((activeStep + 1) / data.length) * 100}%`,
                  }
                : {}
            }
            transition={{ duration: speed.duration * 2 }}
            className={`absolute top-0 left-0 bottom-0 ${colors.bg}`}
          />
        </motion.div>
      )}

      <div className="relative flex justify-between">
        {data.map((item, index) => {
          const isActive = index === activeStep
          const isCompleted = index < activeStep
          const itemColors = item.color
            ? colorMap[item.color as keyof typeof colorMap] || colors
            : colors

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: speed.duration, delay: index * speed.stagger }}
              onClick={() => handleStepClick(index)}
              className="relative flex flex-col items-center w-1/4 px-4"
            >
              {/* Step indicator */}
              <motion.div
                animate={
                  isInView
                    ? {
                        scale: [0, 1.2, 1],
                        opacity: [0, 1, 1],
                      }
                    : {}
                }
                transition={{
                  duration: speed.duration,
                  delay: index * speed.stagger,
                }}
                className={`
                  relative z-10 h-16 w-16 rounded-full border-4 border-white dark:border-gray-800 mb-4
                  ${isActive || isCompleted ? itemColors.bg : 'bg-gray-300 dark:bg-gray-600'}
                  ${isActive ? 'shadow-lg shadow-blue-500/30' : ''}
                `}
              >
                <div className="flex h-full items-center justify-center">
                  {getStepIcon(index, item)}
                </div>

                {/* Step number */}
                <div
                  className={`absolute -top-2 -right-2 h-8 w-8 rounded-full ${itemColors.bg} text-white text-xs font-bold flex items-center justify-center shadow-lg`}
                >
                  {item.step}
                </div>
              </motion.div>

              {/* Content */}
              <motion.div
                whileHover={interactive ? { y: -5 } : {}}
                className={`
                  w-full p-4 rounded-xl text-center
                  ${
                    isActive
                      ? `bg-gradient-to-b ${itemColors.light} border-2 border-${itemColors.bg.split('-')[1]}-300 shadow-lg`
                      : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
                  }
                `}
              >
                <h4
                  className={`font-bold mb-2 ${isActive ? itemColors.primary : 'text-gray-800 dark:text-white'}`}
                >
                  {item.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                  {item.description}
                </p>
              </motion.div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )

  // Cards Timeline Variant
  const renderCardsTimeline = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {data.map((item, index) => {
        const isActive = index === activeStep
        const isCompleted = index < activeStep
        const itemColors = item.color
          ? colorMap[item.color as keyof typeof colorMap] || colors
          : colors

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: speed.duration, delay: index * speed.stagger }}
            onClick={() => handleStepClick(index)}
            className={`
              relative p-6 rounded-2xl cursor-pointer transition-all duration-300
              ${
                isActive
                  ? `bg-gradient-to-br ${itemColors.light} border-2 border-${itemColors.bg.split('-')[1]}-300 shadow-2xl scale-105`
                  : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg'
              }
            `}
          >
            {/* Step indicator */}
            <div className="flex items-center justify-between mb-4">
              <div
                className={`
                h-12 w-12 rounded-xl flex items-center justify-center
                ${isActive || isCompleted ? itemColors.bg : 'bg-gray-100 dark:bg-gray-700'}
              `}
              >
                <span className="text-white font-bold text-lg">{item.step}</span>
              </div>
              {showStatusIcons && <div>{getStatusIcon(index)}</div>}
            </div>

            <h3
              className={`text-lg font-bold mb-3 ${isActive ? itemColors.primary : 'text-gray-800 dark:text-white'}`}
            >
              {item.title}
            </h3>

            <p className="text-gray-600 dark:text-gray-300 mb-4">{item.description}</p>

            {/* Progress indicator */}
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Progress</span>
                <span className="font-medium">
                  {isCompleted ? 'Completed' : isActive ? 'In Progress' : 'Upcoming'}
                </span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full mt-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: isCompleted ? '100%' : isActive ? '60%' : '0%' }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className={`h-full ${itemColors.bg} rounded-full`}
                />
              </div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )

  return (
    <section ref={containerRef} className="py-16 md:py-24 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800">
            <Clock className="h-4 w-4 text-blue-500" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Process Timeline
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">{subtitle}</p>
          )}
        </motion.div>

        {/* Timeline content based on variant */}
        {variant === 'cards'
          ? renderCardsTimeline()
          : orientation === 'horizontal'
            ? renderHorizontalTimeline()
            : renderVerticalTimeline()}

        {/* Navigation controls */}
        {interactive && data.length > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-4 mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleStepClick(Math.max(0, activeStep - 1))}
              disabled={activeStep === 0}
              className="px-6 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </motion.button>

            <div className="flex items-center gap-2">
              {data.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleStepClick(index)}
                  className="focus:outline-none"
                >
                  <motion.div
                    animate={{
                      scale: activeStep === index ? 1.3 : 1,
                      backgroundColor: activeStep === index ? colors.bg : 'rgb(209 213 219)',
                    }}
                    transition={{ duration: 0.3 }}
                    className="h-2 w-2 rounded-full"
                  />
                </button>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleStepClick(Math.min(data.length - 1, activeStep + 1))}
              disabled={activeStep === data.length - 1}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next Step
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default Timeline
