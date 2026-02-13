'use client'

import { useEffect, useState, useRef } from 'react'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'

export function Stats() {
  const [counts, setCounts] = useState({ clients: 0, projects: 0, satisfaction: 0 })
  const hasAnimated = useRef(false)
  const { ref: statsRef, isVisible } = useScrollAnimation({ threshold: 0.5 })

  useEffect(() => {
    if (isVisible && !hasAnimated.current) {
      hasAnimated.current = true
      animateCounters()
    }
  }, [isVisible])

  const animateCounters = () => {
    const duration = 2000
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)

      setCounts({
        clients: Math.floor(progress * 500),
        projects: Math.floor(progress * 10000),
        satisfaction: Math.floor(progress * 99),
      })

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    animate()
  }

  const stats = [
    {
      value: `${counts.clients}+`,
      label: 'Enterprise Clients',
      suffix: 'clients',
    },
    {
      value: `${counts.projects}+`,
      label: 'Projects Delivered',
      suffix: 'projects',
    },
    {
      value: `${counts.satisfaction}%`,
      label: 'Satisfaction Rate',
      suffix: 'satisfied',
    },
  ]

  return (
    <section ref={statsRef} id="stats" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 to-purple-600">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Our Impact
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Trusted by businesses around the world
          </p>
        </div>

        {/* Stats Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`text-center glass rounded-2xl p-8 backdrop-blur-md transition-all duration-700 ${
                isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
              style={{
                transitionDelay: isVisible ? `${index * 0.1}s` : '0s',
              }}
            >
              <div className="text-5xl sm:text-6xl font-bold text-white mb-4 animate-countUp">
                {stat.value}
              </div>
              <p className="text-xl text-blue-100 font-semibold mb-2">
                {stat.label}
              </p>
              <p className="text-sm text-blue-200">
                {stat.suffix}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Message */}
        <div className="mt-16 text-center">
          <p className="text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Our commitment to excellence and innovation continues to drive transformative results for our global client base.
          </p>
        </div>
      </div>
    </section>
  )
}
