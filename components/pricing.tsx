'use client'

import { Check } from 'lucide-react'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'
import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'

const PricingModal = dynamic(() => import('./pricing-modal'), { ssr: false })

export function Pricing() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 })
  const plans = [
    {
      name: 'Basic',
      price: '$299',
      description: 'Perfect for startups and small teams',
      features: [
        'Up to 5 users',
        '10GB storage',
        'Basic analytics',
        'Email support',
        'Monthly reports',
      ],
      highlighted: false,
    },
    {
      name: 'Pro',
      price: '$999',
      description: 'Ideal for growing businesses',
      features: [
        'Unlimited users',
        '1TB storage',
        'Advanced analytics',
        'Priority support',
        'Real-time dashboards',
        'Custom integrations',
        'API access',
      ],
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For large-scale operations',
      features: [
        'Unlimited everything',
        'Dedicated support',
        'Custom solutions',
        'SLA guarantee',
        'On-premise option',
        'Advanced security',
        'Compliance support',
      ],
      highlighted: false,
    },
  ]

  const [modalOpen, setModalOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<string | undefined>(undefined)

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as { plan?: string }
      setSelectedPlan(detail?.plan)
      setModalOpen(true)
    }
    window.addEventListener('openPricingModal', handler as EventListener)
    return () => window.removeEventListener('openPricingModal', handler as EventListener)
  }, [])

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the perfect plan for your business
          </p>
        </div>

        {/* Pricing Cards */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-6 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                plan.highlighted
                  ? 'ring-2 ring-blue-600 relative shadow-2xl'
                  : 'glass'
              } p-8 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: isVisible ? `${index * 0.1}s` : '0s',
              }}
            >
              {/* Popular Badge */}
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-bold">
                  Most Popular
                </div>
              )}

              {/* Plan Name */}
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {plan.name}
              </h3>

              {/* Description */}
              <p className="text-gray-600 mb-6 text-sm">
                {plan.description}
              </p>

              {/* Price */}
              <div className="mb-8">
                <span className="text-5xl font-bold text-gray-900">
                  {plan.price}
                </span>
                {plan.price !== 'Custom' && (
                  <span className="text-gray-600 ml-2">/month</span>
                )}
              </div>

              {/* CTA Button */}
              <button
                onClick={() => {
                  const evt = new CustomEvent('openPricingModal', { detail: { plan: plan.name } })
                  window.dispatchEvent(evt)
                }}
                className={`w-full py-3 px-6 rounded-lg font-bold mb-8 transition-all duration-200 transform active:scale-95 hover:scale-105 ${
                  plan.highlighted
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/50'
                    : 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50'
                }`}
              >
                Get Started
              </button>

              {/* Features List */}
              <div className="space-y-4">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-4">
            All plans include a 14-day free trial. No credit card required.
          </p>
            <button
              onClick={() => {
                const evt = new CustomEvent('openPricingModal', { detail: { plan: 'Basic' } })
                window.dispatchEvent(evt)
              }}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 active:scale-95"
            >
              Start Your Free Trial
            </button>
        </div>
          <PricingModal open={modalOpen} onOpenChange={(v) => setModalOpen(v)} defaultPlan={selectedPlan} />
      </div>
    </section>
  )
}
