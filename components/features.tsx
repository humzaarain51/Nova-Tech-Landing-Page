'use client'

import React, { useState } from 'react'
import { Zap, Brain, Gauge, Lock, BarChart3, Users } from 'lucide-react'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'

export function Features() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 })
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Intelligence',
      description: 'Advanced machine learning algorithms that learn and adapt to your business needs in real-time.',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Process millions of transactions per second with our optimized infrastructure.',
    },
    {
      icon: Lock,
      title: 'Enterprise Security',
      description: 'Bank-grade encryption and compliance with industry standards to protect your data.',
    },
    {
      icon: Gauge,
      title: 'Unlimited Scalability',
      description: 'Grow without limits. Our cloud infrastructure scales automatically with your business.',
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Real-time dashboards and insights to make data-driven decisions.',
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Built-in tools for seamless communication and workflow management.',
    },
  ]

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to succeed in one powerful platform
          </p>
        </div>

        {/* Features Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {features.map((feature, index) => {
            const Icon = feature.icon
            // helper component to load image with fallbacks
            const FeatureImage: React.FC<{ title: string }> = ({ title }) => {
              const base = `/${encodeURIComponent(title)}`
              const exts = ['.jpg', '.png', '.webp']
              const [srcIndex, setSrcIndex] = useState(0)
              const src = `${base}${exts[srcIndex]}`

              return (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={src}
                  alt={title}
                  onError={() => {
                    if (srcIndex < exts.length - 1) setSrcIndex((i) => i + 1)
                  }}
                  className="w-20 h-20 md:w-24 md:h-24 rounded-md object-cover flex-shrink-0 shadow-md"
                />
              )
            }
            return (
              <div
                key={index}
                className={`group glass rounded-2xl p-8 hover:scale-105 hover:shadow-xl transition-all duration-300 transform cursor-pointer ${
                  isVisible ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  animationDelay: isVisible ? `${index * 0.1}s` : '0s',
                }}
              >
                {/* Icon */}
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-6 h-6 text-white" />
                </div>

                {/* Title with image */}
                <div className="flex items-center gap-4 mb-3">
                  <FeatureImage title={feature.title} />
                  <h3 className="text-xl font-bold text-gray-900">
                    {feature.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>

                {/* Decorative Line */}
                <div className="mt-6 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded w-0 group-hover:w-12 transition-all duration-300"></div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
