'use client'

import { useState, useEffect } from 'react'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.3 })

  const testimonials = [
    {
      quote: 'NovaTech transformed our operations. We saw a 40% increase in productivity within the first month.',
      author: 'Sarah Chen',
      role: 'CEO, TechCorp Solutions',
      avatar: '👩‍💼',
    },
    {
      quote: 'The AI integration is seamless and incredibly intuitive. Our team loves it.',
      author: 'Michael Rodriguez',
      role: 'CTO, StartupAI',
      avatar: '👨‍💼',
    },
    {
      quote: 'Best investment we made this year. The ROI speaks for itself.',
      author: 'Emily Watson',
      role: 'CFO, FutureWorks Inc',
      avatar: '👩‍💼',
    },
    {
      quote: 'Exceptional support and constant innovation. They truly care about their customers.',
      author: 'David Kumar',
      role: 'Founder, CloudFirst',
      avatar: '👨‍💼',
    },
  ]

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlay) return

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlay, testimonials.length])

  const goToSlide = (index: number) => {
    setActiveIndex(index)
    setIsAutoPlay(false)
  }

  const goToPrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
    setIsAutoPlay(false)
  }

  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
    setIsAutoPlay(false)
  }

  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Hear from industry leaders who trust NovaTech
          </p>
        </div>

        {/* Carousel Container */}
        <div className={`relative transition-all duration-1000 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}>
          {/* Testimonials Carousel */}
          <div className="relative overflow-hidden rounded-3xl">
            <div className="relative h-96 sm:h-80">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                    index === activeIndex
                      ? 'opacity-100 translate-x-0'
                      : index < activeIndex
                      ? 'opacity-0 -translate-x-full'
                      : 'opacity-0 translate-x-full'
                  }`}
                >
                  <div className="glass rounded-3xl p-8 sm:p-12 h-full flex flex-col justify-between backdrop-blur-md bg-white/10 border border-white/20">
                    {/* Star Rating */}
                    <div className="flex gap-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>

                    {/* Quote */}
                    <p className="text-gray-700 text-lg sm:text-xl leading-relaxed italic">
                      "{testimonial.quote}"
                    </p>

                    {/* Author Info */}
                    <div className="flex items-center gap-4">
                      <div className="text-4xl">{testimonial.avatar}</div>
                      <div>
                        <p className="font-bold text-gray-900">{testimonial.author}</p>
                        <p className="text-sm text-gray-600">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-all duration-300 transform hover:scale-110"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-all duration-300 transform hover:scale-110"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === activeIndex
                    ? 'bg-blue-600 w-3 h-3'
                    : 'bg-gray-300 hover:bg-gray-400 w-2 h-2'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
