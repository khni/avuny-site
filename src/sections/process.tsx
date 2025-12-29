import Timeline, { TimelineItem } from '@/components/AnimatedTimeline'

// Example usage with your data
export const AvunyTimeline = () => {
  const processData = [
    {
      step: '1',

      title: 'Discover & Plan',
      description:
        'We understand your goals, users, and constraints before writing a single line of code.',
      duration: '1-2 weeks',
      status: 'completed',
      highlights: ['Requirement Analysis', 'Stakeholder Workshops', 'Project Blueprint'],
      details: [
        'Comprehensive discovery sessions',
        'User persona development',
        'Technical feasibility study',
      ],
      metrics: [
        { label: 'Workshops', value: '3+' },
        { label: 'Documents', value: '5+' },
      ],
      color: 'blue',
    },
    {
      step: '2',
      title: 'Design & Build',
      description: 'Clean UI, solid architecture, and focused execution.',
      duration: '3-8 weeks',
      status: 'current',
      highlights: ['UI/UX Design', 'Architecture Setup', 'Sprint Development'],
      details: ['Prototype creation', 'Tech stack selection', 'Agile development sprints'],
      metrics: [
        { label: 'Sprints', value: '4+' },
        { label: 'Components', value: '50+' },
      ],
      color: 'purple',
    },
    {
      step: '3',
      title: 'Test & Launch',
      description: 'Thorough testing to ensure stability, performance, and security.',
      duration: '1-2 weeks',
      status: 'upcoming',
      highlights: ['QA Testing', 'Performance Audit', 'Security Check'],
      details: ['Automated testing', 'Load testing', 'Security vulnerability assessment'],
      metrics: [
        { label: 'Test Cases', value: '200+' },
        { label: 'Bugs Fixed', value: '100%' },
      ],
      color: 'green',
    },
    {
      step: '4',
      title: 'Support & Scale',
      description: 'Continuous improvements, optimizations, and new features.',
      duration: 'Ongoing',
      status: 'upcoming',
      highlights: ['Performance Monitoring', 'Feature Updates', 'Technical Support'],
      details: ['24/7 monitoring', 'Regular updates', 'Scalability planning'],
      metrics: [
        { label: 'Response Time', value: '< 2h' },
        { label: 'Uptime', value: '99.9%' },
      ],
      color: 'orange',
    },
  ]

  return (
    <section id="process">
      <Timeline
        data={processData as any}
        title="Our Development Process"
        subtitle="Transparent workflow from concept to launch and beyond"
        orientation="vertical"
        variant="detailed"
        interactive={true}
        showStatusIcons={true}
        showConnectors={true}
        animateOnScroll={true}
        animationSpeed="normal"
        //   onStepClick={handleStepClick}
        primaryColor="blue"
        secondaryColor="purple"
      />
    </section>
  )
}
