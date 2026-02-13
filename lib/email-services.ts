/**
 * Email Service Implementations
 * Choose ONE implementation and uncomment it in the contact API route
 */

// ============================================
// OPTION 1: SENDGRID
// ============================================
export async function sendEmailViaSendGrid(
  name: string,
  email: string,
  message: string
) {
  const apiKey = process.env.SENDGRID_API_KEY
  if (!apiKey) {
    throw new Error('SENDGRID_API_KEY is not configured')
  }

  const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      personalizations: [
        {
          to: [{ email: 'hello@novatech.ai' }],
          subject: `New Contact Form Submission from ${name}`,
        },
      ],
      from: {
        email: process.env.FROM_EMAIL || 'noreply@novatech.ai',
        name: 'NovaTech',
      },
      replyTo: {
        email: email,
        name: name,
      },
      content: [
        {
          type: 'text/html',
          value: generateEmailHTML(name, email, message),
        },
      ],
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`SendGrid error: ${error}`)
  }
}

// ============================================
// OPTION 2: RESEND
// ============================================
export async function sendEmailViaResend(
  name: string,
  email: string,
  message: string
) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not configured')
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: process.env.FROM_EMAIL || 'onboarding@resend.dev',
      to: 'humzaarain51@gmail.com',
      subject: `New Contact Form Submission from ${name}`,
      html: generateEmailHTML(name, email, message),
      replyTo: email,
    }),
  })

  if (!response.ok) {
    let errorMsg = 'Unknown error'
    try {
      const errorData = await response.json()
      errorMsg = errorData.message || JSON.stringify(errorData)
    } catch {
      errorMsg = await response.text()
    }
    throw new Error(`Resend error: ${errorMsg}`)
  }
}

// ============================================
// OPTION 3: MAILGUN
// ============================================
export async function sendEmailViaMailgun(
  name: string,
  email: string,
  message: string
) {
  const apiKey = process.env.MAILGUN_API_KEY
  const domain = process.env.MAILGUN_DOMAIN
  if (!apiKey || !domain) {
    throw new Error('MAILGUN_API_KEY or MAILGUN_DOMAIN is not configured')
  }

  const formData = new FormData()
  formData.append('from', `NovaTech <${process.env.FROM_EMAIL || 'noreply@' + domain}>`)
  formData.append('to', 'hello@novatech.ai')
  formData.append('subject', `New Contact Form Submission from ${name}`)
  formData.append('html', generateEmailHTML(name, email, message))
  formData.append('h:Reply-To', email)

  const response = await fetch(`https://api.mailgun.net/v3/${domain}/messages`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${Buffer.from(`api:${apiKey}`).toString('base64')}`,
    },
    body: formData,
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Mailgun error: ${error}`)
  }
}

// ============================================
// OPTION 4: NODEMAILER (SMTP)
// ============================================
export async function sendEmailViaNodemailer(
  name: string,
  email: string,
  message: string
) {
  // Install: npm install nodemailer
  const nodemailer = require('nodemailer')

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_PORT === '465',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  })

  const result = await transporter.sendMail({
    from: `NovaTech <${process.env.FROM_EMAIL}>`,
    to: 'hello@novatech.ai',
    subject: `New Contact Form Submission from ${name}`,
    html: generateEmailHTML(name, email, message),
    replyTo: email,
  })

  return result
}

// ============================================
// OPTION 5: AWS SES
// ============================================
export async function sendEmailViaSES(
  name: string,
  email: string,
  message: string
) {
  // Install: npm install @aws-sdk/client-ses
  const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses')

  const client = new SESClient({ region: process.env.AWS_REGION || 'us-east-1' })

  const command = new SendEmailCommand({
    Source: process.env.FROM_EMAIL,
    Destination: {
      ToAddresses: ['hello@novatech.ai'],
    },
    Message: {
      Subject: {
        Data: `New Contact Form Submission from ${name}`,
        Charset: 'UTF-8',
      },
      Body: {
        Html: {
          Data: generateEmailHTML(name, email, message),
          Charset: 'UTF-8',
        },
      },
    },
    ReplyToAddresses: [email],
  })

  const result = await client.send(command)
  return result
}

// ============================================
// EMAIL HTML TEMPLATE
// ============================================
function generateEmailHTML(name: string, email: string, message: string): string {
  return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
      .container { max-width: 600px; margin: 0 auto; padding: 20px; }
      .header { background: linear-gradient(135deg, #2563eb 0%, #9333ea 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; }
      .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb; border-top: none; }
      .field { margin-bottom: 20px; }
      .label { font-weight: 600; color: #1f2937; margin-bottom: 5px; }
      .value { color: #6b7280; white-space: pre-wrap; word-wrap: break-word; }
      .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #9ca3af; font-size: 12px; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1 style="margin: 0;">New Contact Form Submission</h1>
        <p style="margin: 5px 0 0 0; opacity: 0.9;">From NovaTech Website</p>
      </div>
      <div class="content">
        <div class="field">
          <div class="label">Name</div>
          <div class="value">${escapeHtml(name)}</div>
        </div>
        <div class="field">
          <div class="label">Email</div>
          <div class="value"><a href="mailto:${escapeHtml(email)}" style="color: #2563eb; text-decoration: none;">${escapeHtml(email)}</a></div>
        </div>
        <div class="field">
          <div class="label">Message</div>
          <div class="value">${escapeHtml(message)}</div>
        </div>
        <div class="footer">
          <p>This message was sent via the NovaTech contact form. Reply to this email to contact the sender directly.</p>
        </div>
      </div>
    </div>
  </body>
</html>
  `
}

// ============================================
// UTILITY FUNCTIONS
// ============================================
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }
  return text.replace(/[&<>"']/g, (m) => map[m])
}

// ============================================
// CHOOSE YOUR SERVICE HERE
// ============================================
export async function sendEmail(name: string, email: string, message: string) {
  const service = process.env.EMAIL_SERVICE || 'sendgrid'

  switch (service) {
    case 'sendgrid':
      return sendEmailViaSendGrid(name, email, message)
    case 'resend':
      return sendEmailViaResend(name, email, message)
    case 'mailgun':
      return sendEmailViaMailgun(name, email, message)
    case 'nodemailer':
      return sendEmailViaNodemailer(name, email, message)
    case 'ses':
      return sendEmailViaSES(name, email, message)
    default:
      throw new Error(`Unknown email service: ${service}`)
  }
}
