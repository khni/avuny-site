import { useState, useEffect, ReactNode } from 'react'
import { motion, AnimatePresence, Variants } from 'motion/react'
import { ChevronRight, ArrowRight, Play, Pause } from 'lucide-react'

// Types
export interface FeatureItem {
  title: string
  description: string
  content?: ReactNode
  icon?: ReactNode
  additionalDetails?: string[]
}

interface FeatureShowcaseProps {
  data: FeatureItem[]
  sectionTitle?: string
  sectionSubtitle?: string
  primaryColor?: string
  autoPlayInterval?: number
  showNavigationDots?: boolean
  showAutoPlayControls?: boolean
  className?: string
  layout?: 'side-by-side' | 'stacked' | 'grid'
  ctaText?: string
  onCtaClick?: () => void
  onFeatureClick?: (index: number) => void
}

// Default fallback icons for when no icon is provided
const DefaultIcons = [
  <div key="1" className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
    <div className="h-6 w-6 rounded bg-blue-500" />
  </div>,
  <div key="2" className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
    <div className="h-6 w-6 rounded bg-green-500" />
  </div>,
  <div key="3" className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
    <div className="h-6 w-6 rounded bg-purple-500" />
  </div>,
  <div key="4" className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
    <div className="h-6 w-6 rounded bg-orange-500" />
  </div>,
]

const FeatureShowcase: React.FC<FeatureShowcaseProps> = ({
  data,
  sectionTitle = 'Why Choose Us',
  sectionSubtitle = 'Discover what makes our approach different',
  primaryColor = 'primary',
  autoPlayInterval = 4000,
  showNavigationDots = true,
  showAutoPlayControls = true,
  className = '',
  layout = 'side-by-side',
  ctaText = 'Learn More',
  onCtaClick,
  onFeatureClick,
}) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isHovering, setIsHovering] = useState(false)

  // Auto-rotate through items
  useEffect(() => {
    if (!isAutoPlaying || isHovering) return

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % data.length)
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [isAutoPlaying, isHovering, autoPlayInterval, data.length])

  const handleItemClick = (index: number) => {
    setActiveIndex(index)
    setIsAutoPlaying(false)
    onFeatureClick?.(index)

    // Resume auto-play after double the interval of inactivity
    setTimeout(() => {
      if (!isHovering) {
        setIsAutoPlaying(true)
      }
    }, autoPlayInterval * 2)
  }

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying)
  }

  const nextFeature = () => {
    setActiveIndex((prev) => (prev + 1) % data.length)
    setIsAutoPlaying(false)
  }

  const prevFeature = () => {
    setActiveIndex((prev) => (prev - 1 + data.length) % data.length)
    setIsAutoPlaying(false)
  }

  const colorClasses = {
    primary: {
      bg: `bg-${primaryColor}`,
      text: `text-${primaryColor}`,
      border: `border-${primaryColor}`,
      light: `${primaryColor === 'primary' ? 'bg-primary/10' : `bg-${primaryColor}/10`}`,
      medium: `${primaryColor === 'primary' ? 'bg-primary/20' : `bg-${primaryColor}/20`}`,
    },
  }

  // Animation variants
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  }

  const contentVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, x: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      x: -20,
      transition: {
        duration: 0.3,
      },
    },
  }

  const renderFeatureCards = () => (
    <div className="space-y-4">
      {data.map((item, index) => {
        const isActive = activeIndex === index
        return (
          <motion.div
            key={index}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onClick={() => handleItemClick(index)}
            className={`
              relative p-6 rounded-2xl cursor-pointer transition-all duration-300
              ${
                isActive
                  ? `bg-gradient-to-r ${colorClasses.primary.light} border-2 border-${primaryColor}/30 shadow-lg`
                  : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }
              ${className}
            `}
          >
            {/* Active Indicator */}
            {isActive && (
              <motion.div
                layoutId="activeIndicator"
                className={`absolute left-0 top-0 bottom-0 w-1 ${colorClasses.primary.bg} rounded-l-lg`}
              />
            )}

            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-3">
                  <div
                    className={`
                    p-3 rounded-xl transition-colors duration-300 flex-shrink-0
                    ${isActive ? colorClasses.primary.medium : 'bg-gray-100 dark:bg-gray-700'}
                  `}
                  >
                    {item.icon || DefaultIcons[index % DefaultIcons.length]}
                  </div>
                  <div className="flex-1">
                    <h3
                      className={`font-semibold text-lg ${isActive ? colorClasses.primary.text : 'text-gray-800 dark:text-white'}`}
                    >
                      {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">{item.description}</p>
                  </div>
                </div>

                {/* Content (if provided) */}
                {item.content && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{
                      opacity: isActive ? 1 : 0,
                      height: isActive ? 'auto' : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className={`ml-16 ${!isActive ? 'overflow-hidden' : ''}`}
                  >
                    {item.content}
                  </motion.div>
                )}
              </div>

              <motion.div
                animate={{ rotate: isActive ? 90 : 0 }}
                transition={{ duration: 0.3 }}
                className="ml-4"
              >
                <ChevronRight
                  className={`
                  h-5 w-5 transition-colors duration-300 flex-shrink-0
                  ${isActive ? colorClasses.primary.text : 'text-gray-400'}
                `}
                />
              </motion.div>
            </div>

            {/* Progress Bar for Auto-play */}
            {isActive && isAutoPlaying && !isHovering && (
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: autoPlayInterval / 1000, ease: 'linear' }}
                className={`absolute bottom-0 left-0 right-0 h-1 ${colorClasses.primary.bg}/30 rounded-b-lg`}
              />
            )}
          </motion.div>
        )
      })}
    </div>
  )

  const renderActiveContent = () => {
    const activeItem = data[activeIndex]

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="sticky top-8 h-fit"
        >
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 shadow-xl h-full">
            {/* Icon and Title */}
            <div className="flex items-center gap-4 mb-6">
              <div className={`p-3 rounded-xl ${colorClasses.primary.medium}`}>
                {activeItem.icon || DefaultIcons[activeIndex % DefaultIcons.length]}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {activeItem.title}
              </h3>
            </div>

            {/* Description */}
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              {activeItem.description}
            </p>

            {/* Content */}
            {activeItem.content && (
              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 mb-8">
                {activeItem.content}
              </div>
            )}

            {/* Additional Details */}
            {activeItem.additionalDetails && activeItem.additionalDetails.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="space-y-4 mb-8"
              >
                {activeItem.additionalDetails.map((detail, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 text-gray-600 dark:text-gray-400"
                  >
                    <div className={`h-2 w-2 rounded-full ${colorClasses.primary.bg}`} />
                    <span>{detail}</span>
                  </div>
                ))}
              </motion.div>
            )}

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onCtaClick}
              className={`w-full py-3 px-6 ${colorClasses.primary.bg} text-white font-medium rounded-xl flex items-center justify-center gap-2 hover:shadow-lg transition-shadow duration-300`}
            >
              {ctaText}
              <ArrowRight className="h-4 w-4" />
            </motion.button>

            {/* Navigation Controls */}
            {data.length > 1 && (
              <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={prevFeature}
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Previous
                </button>

                {showAutoPlayControls && (
                  <button
                    onClick={toggleAutoPlay}
                    className={`p-2 rounded-full ${isAutoPlaying ? colorClasses.primary.medium : 'bg-gray-100 dark:bg-gray-700'}`}
                  >
                    {isAutoPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </button>
                )}

                <button
                  onClick={nextFeature}
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    )
  }

  const renderGridLayout = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {data.map((item, index) => {
        const isActive = activeIndex === index
        return (
          <motion.div
            key={index}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.03 }}
            onClick={() => handleItemClick(index)}
            className={`
              p-6 rounded-2xl cursor-pointer transition-all duration-300
              ${
                isActive
                  ? `bg-gradient-to-br ${colorClasses.primary.light} border-2 border-${primaryColor}/30 shadow-lg`
                  : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-md'
              }
            `}
          >
            <div className="flex items-start gap-4">
              <div
                className={`
                p-3 rounded-xl transition-colors duration-300 flex-shrink-0
                ${isActive ? colorClasses.primary.medium : 'bg-gray-100 dark:bg-gray-700'}
              `}
              >
                {item.icon || DefaultIcons[index % DefaultIcons.length]}
              </div>
              <div>
                <h3
                  className={`font-semibold text-lg ${isActive ? colorClasses.primary.text : 'text-gray-800 dark:text-white'}`}
                >
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mt-2">{item.description}</p>

                {isActive && item.content && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                    className="mt-4"
                  >
                    {item.content}
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )

  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {sectionTitle}
          </h2>
          {sectionSubtitle && (
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">{sectionSubtitle}</p>
          )}
        </motion.div>

        {layout === 'grid' ? (
          renderGridLayout()
        ) : layout === 'stacked' ? (
          <div className="space-y-8">
            {renderFeatureCards()}
            <div className="mt-8">{renderActiveContent()}</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div>{renderFeatureCards()}</div>
            <div>{renderActiveContent()}</div>
          </div>
        )}

        {/* Navigation Dots */}
        {showNavigationDots && data.length > 1 && (
          <div className="flex justify-center gap-2 mt-12">
            {data.map((_, index) => (
              <button
                key={index}
                onClick={() => handleItemClick(index)}
                className="focus:outline-none"
                aria-label={`Go to feature ${index + 1}`}
              >
                <motion.div
                  animate={{
                    scale: activeIndex === index ? 1.2 : 1,
                    backgroundColor:
                      activeIndex === index
                        ? primaryColor === 'primary'
                          ? 'rgb(59 130 246)'
                          : `var(--color-${primaryColor})`
                        : 'rgb(209 213 219)',
                  }}
                  transition={{ duration: 0.3 }}
                  className="h-3 w-3 rounded-full"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

// Export as default
export default FeatureShowcase
