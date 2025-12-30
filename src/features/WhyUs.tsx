'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Rocket, Zap, Code2, Handshake, ChevronRight, ArrowRight } from 'lucide-react'
import FeatureShowcase from '@/components/FeatureShowCase'

// Your data
const whyAvunyData = [
  {
    title: 'Business-Driven Development',
    description: 'We don’t just write code — we build solutions aligned with your business goals.',
    content: (
      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <Rocket className="h-5 w-5 text-primary" />
        <span>Strategy-first approach focused on ROI & growth</span>
      </div>
    ),
  },
  {
    title: 'Performance First',
    description: 'Fast load times, optimized assets, and scalable architecture from day one.',
    content: (
      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <Zap className="h-5 w-5 text-primary" />
        <span>Core Web Vitals, caching & edge-ready systems</span>
      </div>
    ),
  },
  {
    title: 'Clean & Maintainable',
    description: 'Readable, structured code that grows with your product — not against it.',
    content: (
      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <Code2 className="h-5 w-5 text-primary" />
        <span>Type-safe, documented & scalable architecture</span>
      </div>
    ),
  },
  {
    title: 'Long-Term Partnership',
    description: 'We think beyond launch and support you as your product evolves.',
    content: (
      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <Handshake className="h-5 w-5 text-primary" />
        <span>Continuous improvement & technical guidance</span>
      </div>
    ),
  },
]
export default function WhyAvunySection() {
  return (
    <section id="why-us">
      <FeatureShowcase
        data={whyAvunyData}
        sectionTitle="Our Advantages"
        sectionSubtitle="Discover what makes us different"
      />
    </section>
  )
}

// export default function WhyAvunySection() {
//   const [activeIndex, setActiveIndex] = useState(0)
//   const [isAutoPlaying, setIsAutoPlaying] = useState(true)

//   // Auto-rotate through items
//   useEffect(() => {
//     if (!isAutoPlaying) return

//     const interval = setInterval(() => {
//       setActiveIndex((prev) => (prev + 1) % whyAvunyData.length)
//     }, 4000)

//     return () => clearInterval(interval)
//   }, [isAutoPlaying])

//   const handleItemClick = (index: number) => {
//     setActiveIndex(index)
//     setIsAutoPlaying(false)

//     // Resume auto-play after 8 seconds of inactivity
//     setTimeout(() => setIsAutoPlaying(true), 8000)
//   }

//   return (
//     <section
//       id="why-us"
//       className="py-16 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-background to-muted/20"
//     >
//       <div className="max-w-6xl mx-auto">
//         {/* Section Header */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-12"
//         >
//           <h2 className="text-3xl md:text-4xl font-bold mb-4">
//             Why Choose <span className="text-primary">Avuny</span>
//           </h2>
//           <p className="text-muted-foreground max-w-2xl mx-auto">
//             Discover what makes our approach different and how we deliver exceptional results
//           </p>
//         </motion.div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
//           {/* Left Column - Feature Cards */}
//           <div className="space-y-4">
//             {whyAvunyData.map((item, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.5, delay: index * 0.1 }}
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={() => handleItemClick(index)}
//                 className={`
//                   relative p-6 rounded-2xl cursor-pointer transition-all duration-300
//                   ${
//                     activeIndex === index
//                       ? 'bg-gradient-to-r from-primary/10 to-primary/5 border-2 border-primary/30 shadow-lg'
//                       : 'bg-card border border-border hover:border-primary/20'
//                   }
//                 `}
//               >
//                 {/* Active Indicator */}
//                 {activeIndex === index && (
//                   <motion.div
//                     layoutId="activeIndicator"
//                     className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-l-lg"
//                   />
//                 )}

//                 <div className="flex items-start justify-between">
//                   <div>
//                     <div className="flex items-center gap-3 mb-2">
//                       <div
//                         className={`
//                         p-2 rounded-lg transition-colors duration-300
//                         ${activeIndex === index ? 'bg-primary/20' : 'bg-muted'}
//                       `}
//                       >
//                         {item.content?.props.children[0]}
//                       </div>
//                       <h3
//                         className={`font-semibold text-lg ${activeIndex === index ? 'text-primary' : ''}`}
//                       >
//                         {item.title}
//                       </h3>
//                     </div>
//                     <p className="text-muted-foreground ml-11">{item.description}</p>
//                   </div>

//                   <motion.div
//                     animate={{ rotate: activeIndex === index ? 90 : 0 }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     <ChevronRight
//                       className={`
//                       h-5 w-5 transition-colors duration-300
//                       ${activeIndex === index ? 'text-primary' : 'text-muted-foreground'}
//                     `}
//                     />
//                   </motion.div>
//                 </div>

//                 {/* Progress Bar for Auto-play */}
//                 {activeIndex === index && isAutoPlaying && (
//                   <motion.div
//                     initial={{ width: 0 }}
//                     animate={{ width: '100%' }}
//                     transition={{ duration: 4, ease: 'linear' }}
//                     className="absolute bottom-0 left-0 right-0 h-1 bg-primary/30 rounded-b-lg"
//                   />
//                 )}
//               </motion.div>
//             ))}
//           </div>

//           {/* Right Column - Active Content Display */}
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={activeIndex}
//               initial={{ opacity: 0, scale: 0.95, x: 20 }}
//               animate={{ opacity: 1, scale: 1, x: 0 }}
//               exit={{ opacity: 0, scale: 0.95, x: -20 }}
//               transition={{ duration: 0.4 }}
//               className="sticky top-8"
//             >
//               <div className="bg-gradient-to-br from-background to-muted border border-border rounded-2xl p-8 shadow-xl h-full">
//                 {/* Icon and Title */}
//                 <div className="flex items-center gap-4 mb-6">
//                   <div className="p-3 rounded-xl bg-primary/20">
//                     {whyAvunyData[activeIndex].content?.props.children[0]}
//                   </div>
//                   <h3 className="text-2xl font-bold">{whyAvunyData[activeIndex].title}</h3>
//                 </div>

//                 {/* Description */}
//                 <p className="text-lg text-muted-foreground mb-8">
//                   {whyAvunyData[activeIndex].description}
//                 </p>

//                 {/* Content */}
//                 <div className="bg-muted/30 rounded-xl p-6 mb-8">
//                   {whyAvunyData[activeIndex].content}
//                 </div>

//                 {/* Additional Details */}
//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 0.2 }}
//                   className="space-y-4"
//                 >
//                   <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                     <div className="h-2 w-2 rounded-full bg-primary" />
//                     <span>Industry best practices</span>
//                   </div>
//                   <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                     <div className="h-2 w-2 rounded-full bg-primary" />
//                     <span>Customized solutions for your needs</span>
//                   </div>
//                   <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                     <div className="h-2 w-2 rounded-full bg-primary" />
//                     <span>Transparent communication</span>
//                   </div>
//                 </motion.div>

//                 {/* CTA Button */}
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   className="mt-8 w-full py-3 px-6 bg-gradient-to-r from-primary to-primary/80 text-white font-medium rounded-xl flex items-center justify-center gap-2 hover:shadow-lg transition-shadow duration-300"
//                 >
//                   Learn More
//                   <ArrowRight className="h-4 w-4" />
//                 </motion.button>
//               </div>
//             </motion.div>
//           </AnimatePresence>
//         </div>

//         {/* Navigation Dots */}
//         <div className="flex justify-center gap-2 mt-12">
//           {whyAvunyData.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => handleItemClick(index)}
//               className="focus:outline-none"
//             >
//               <motion.div
//                 animate={{
//                   scale: activeIndex === index ? 1.2 : 1,
//                   backgroundColor: activeIndex === index ? 'rgb(59 130 246)' : 'rgb(229 231 235)',
//                 }}
//                 transition={{ duration: 0.3 }}
//                 className="h-3 w-3 rounded-full"
//               />
//             </button>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }
