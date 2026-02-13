import { NextRequest, NextResponse } from 'next/server'
import { sendEmail } from '@/lib/email-services'

// Validation function
function validateContactForm(data: unknown): { isValid: boolean; errors: string[] } {
  const errors: string[] = []

  if (typeof data !== 'object' || data === null) {
    return { isValid: false, errors: ['Invalid request data'] }
  }

  const form = data as Record<string, unknown>

  // Validate name
  if (!form.name || typeof form.name !== 'string' || form.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long')
  }

  // Validate email
  if (!form.email || typeof form.email !== 'string') {
    errors.push('Valid email is required')
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(form.email)) {
      errors.push('Invalid email format')
    }
  }

  // Validate message
  if (!form.message || typeof form.message !== 'string' || form.message.trim().length < 10) {
    errors.push('Message must be at least 10 characters long')
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json()

    // Validate form data
    const { isValid, errors } = validateContactForm(body)

    if (!isValid) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed',
          errors,
        },
        { status: 400 }
      )
    }

    const { name, email, message } = body as { name: string; email: string; message: string }

    // Send email using configured email service
    try {
      await sendEmail(name, email, message)
      console.log('[v0] Email sent successfully from:', email)
    } catch (emailError) {
      console.error('[v0] Email sending failed:', emailError)
      // Throw the error so we can see what went wrong
      throw emailError
    }

    // Optional: Save to database
    // await db.contactSubmission.create({
    //   name,
    //   email,
    //   message,
    //   createdAt: new Date(),
    // })

    return NextResponse.json(
      {
        success: true,
        message: 'Message sent successfully! We will get back to you soon.',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('[v0] Contact API error:', error)

    const errorMessage = error instanceof Error ? error.message : String(error)
    console.error('[v0] Detailed error:', errorMessage)

    return NextResponse.json(
      {
        success: false,
        message: errorMessage,
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

// Handle other methods
export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    }
  )
}
