"use client"

import React from 'react'

export default function WhatsAppButton() {
  const phone = '+923113277798'
  const text = encodeURIComponent('Hi NovaTech, can we talk?')
  const href = `https://api.whatsapp.com/send?phone=${phone}&text=${text}`

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title="Chat with us on WhatsApp"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex items-center justify-center w-14 h-14 bg-green-500 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-green-400"
    >
      <svg className="w-7 h-7 text-white drop-shadow" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M20.52 3.48A11.86 11.86 0 0012.02 0C5.4 0 .14 4.86.02 11.3c0 2.01.53 3.97 1.53 5.7L0 24l6.2-1.63a11.3 11.3 0 005.85 1.5c6.62 0 11.88-4.86 12-11.3a11.86 11.86 0 00-1.53-5.7z" fill="#25D366"/>
        <path d="M17.5 14.1c-.3-.15-1.78-.88-2.06-.98-.28-.1-.48-.15-.68.15s-.78.98-.96 1.18c-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.48-.9-.8-1.5-1.78-1.67-2.08-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2 0-.37-.02-.52-.02-.15-.68-1.64-.94-2.25-.25-.59-.5-.5-.68-.51-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.8.37-.28.3-1.06 1.04-1.06 2.53 0 1.48 1.09 2.92 1.24 3.13.15.2 2.15 3.44 5.2 4.82 3.05 1.38 3.05.92 3.6.86.55-.06 1.78-.72 2.03-1.41.24-.7.24-1.3.17-1.41-.07-.12-.27-.2-.57-.35z" fill="#fff"/>
      </svg>
    </a>
  )
}
