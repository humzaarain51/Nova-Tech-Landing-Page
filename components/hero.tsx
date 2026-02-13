'use client'

import { useState, useEffect } from 'react'

export function Hero() {
  const handleLaunchClick = () => {
    const element = document.querySelector('#contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleLearnClick = () => {
    const element = document.querySelector('#features')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/hero%20background.jpg)',
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 text-white animate-fadeInUp drop-shadow-lg">
          Welcome to{' '}
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradientShift">
            NovaTech
          </span>
        </h1>

        <p className="text-lg sm:text-xl lg:text-2xl text-white/95 mb-8 max-w-2xl mx-auto animate-fadeInUp leading-relaxed drop-shadow-md" style={{ animationDelay: '0.2s' }}>
          Transform your business with cutting-edge AI-powered solutions. Automate workflows, boost productivity, and scale with confidence.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
          <button
            onClick={() => {
              // open pricing modal (default to Basic)
              const evt = new CustomEvent('openPricingModal', { detail: { plan: 'Basic' } })
              window.dispatchEvent(evt)
            }}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105 text-lg"
          >
            Get Started
          </button>
          <button
            onClick={handleLearnClick}
            className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-300 text-lg"
          >
            Learn More
          </button>
        </div>

        {/* Trust Badge */}
        <div className="mt-16 animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
          <p className="text-sm text-white/80 mb-4">Trusted by leading companies worldwide</p>
          <div className="flex justify-center items-center gap-8 flex-wrap opacity-80">
            {['TechCorp', 'StartupAI', 'FutureWorks', 'CloudFirst'].map((company) => (
              <p key={company} className="font-semibold text-white/75">
                {company}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}
