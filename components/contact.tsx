'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Loader2 } from 'lucide-react'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'

export function Contact() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const responseData = await response.json()

      if (!response.ok) {
        console.error('[v0] API Error Response:', responseData)
        const errorMsg = responseData.details || responseData.message || responseData.errors?.[0] || 'Failed to send message'
        throw new Error(errorMsg)
      }

      setSubmitted(true)
      setFormData({ name: '', email: '', message: '' })
      setTimeout(() => setSubmitted(false), 5000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      console.error('[v0] Contact form error:', err)
    } finally {
      setLoading(false)
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'humzaarain51@gmail.com',
      href: 'mailto:humzaarain51@gmail.com',
      action: 'Send Email',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+92 311 3277798',
      href: 'tel:+923113277798',
      action: 'Call Now',
    },
    {
      icon: MapPin,
      label: 'Address',
      value: 'Ocean Towers',
      href: 'https://maps.app.goo.gl/kWw954Yp8bzQ84NM9',
      action: 'View Map',
    },
  ]

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 to-gray-800" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Get In Touch
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message anytime.
          </p>
        </div>

        {/* Contact Grid */}
        <div className={`grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {/* Contact Info Cards */}
          {contactInfo.map((info, index) => {
            const Icon = info.icon
            return (
              <a
                key={index}
                href={info.href}
                target={info.href.startsWith('mailto:') || info.href.startsWith('tel:') ? undefined : '_blank'}
                rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="glass rounded-2xl p-8 text-center hover:scale-105 hover:shadow-lg transition-all duration-300 group cursor-pointer"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg group-hover:shadow-blue-500/50 transition-all duration-300">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {info.label}
                </h3>
                <p className="text-gray-300 mb-4">{info.value}</p>
                <span className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors duration-300">
                  {info.action}
                </span>
              </a>
            )
          })}
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block text-white font-semibold mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-6 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                placeholder="John Doe"
              />
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-white font-semibold mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-6 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                placeholder="john@example.com"
              />
            </div>

            {/* Message Input */}
            <div>
              <label htmlFor="message" className="block text-white font-semibold mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-6 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 resize-none"
                placeholder="Tell us about your project..."
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending...
                </>
              ) : (
                'Send Message'
              )}
            </button>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/20 border border-red-500 text-red-100 px-6 py-3 rounded-lg text-center font-semibold animate-fadeInUp">
                {error}
              </div>
            )}

            {/* Success Message */}
            {submitted && (
              <div className="bg-green-500/20 border border-green-500 text-green-100 px-6 py-3 rounded-lg text-center font-semibold animate-fadeInUp">
                Thank you! We'll get back to you soon.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
