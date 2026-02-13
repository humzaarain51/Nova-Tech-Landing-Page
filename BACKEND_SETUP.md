# NovaTech Backend Integration Guide

This guide will help you set up your backend to make the contact form fully functional.

## ✅ What's Already Done

1. **Contact Info Links**
   - ✓ Email: Click to open default email client (mailto)
   - ✓ Phone: Click to dial (tel)
   - ✓ Address: Click to open Google Maps
   - ✓ Visual feedback on hover with animations

2. **Contact Form Frontend**
   - ✓ Form validation
   - ✓ Loading state with spinner
   - ✓ Success/error messages
   - ✓ Form reset after submission

3. **API Endpoint**
   - ✓ `/app/api/contact/route.ts` created
   - ✓ Data validation
   - ✓ Error handling

## 🔧 What You Need to Do

### Step 1: Choose an Email Service

Pick ONE of these services to send emails:

#### Option A: SendGrid (Recommended - Free tier available)
1. Sign up at https://sendgrid.com
2. Create an API key
3. Add to environment variables:
   ```
   SENDGRID_API_KEY=your_api_key_here
   FROM_EMAIL=noreply@novatech.ai
   ```

#### Option B: Resend (Great for Next.js)
1. Sign up at https://resend.com
2. Create an API key
3. Add to environment variables:
   ```
   RESEND_API_KEY=your_api_key_here
   FROM_EMAIL=onboarding@resend.dev
   ```

#### Option C: Nodemailer (Self-hosted)
1. Set up SMTP credentials from your email provider
2. Add to environment variables:
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your_email@gmail.com
   SMTP_PASSWORD=your_app_password
   FROM_EMAIL=your_email@gmail.com
   ```

#### Option D: Mailgun
1. Sign up at https://mailgun.com
2. Create an API key
3. Add to environment variables:
   ```
   MAILGUN_API_KEY=your_api_key_here
   MAILGUN_DOMAIN=your_domain
   FROM_EMAIL=noreply@yourdomain.com
   ```

### Step 2: Update the Email Sending Function

Edit `/app/api/contact/route.ts` and implement one of these:

#### SendGrid Implementation
```typescript
async function sendEmail(name: string, email: string, message: string) {
  const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: 'hello@novatech.ai' }] }],
      from: { email: process.env.FROM_EMAIL },
      subject: `New Contact Form Submission from ${name}`,
      content: [{ 
        type: 'text/html', 
        value: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        ` 
      }],
      replyTo: { email },
    }),
  })

  if (!response.ok) {
    throw new Error('Failed to send email')
  }
}
```

#### Resend Implementation
```typescript
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

async function sendEmail(name: string, email: string, message: string) {
  await resend.emails.send({
    from: process.env.FROM_EMAIL!,
    to: 'hello@novatech.ai',
    subject: `New Contact Form Submission from ${name}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `,
    replyTo: email,
  })
}
```

#### Nodemailer Implementation
```typescript
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_PORT === '465',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
})

async function sendEmail(name: string, email: string, message: string) {
  await transporter.sendMail({
    from: process.env.FROM_EMAIL,
    to: 'hello@novatech.ai',
    subject: `New Contact Form Submission from ${name}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `,
    replyTo: email,
  })
}
```

### Step 3: Add Database Support (Optional but Recommended)

Store contact submissions in a database:

#### Using Supabase
1. Create a table:
```sql
CREATE TABLE contact_submissions (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMP DEFAULT NOW()
);
```

2. Add environment variable:
```
DATABASE_URL=your_supabase_connection_string
```

3. Update the API route:
```typescript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
)

// In the POST handler, after sending email:
await supabase
  .from('contact_submissions')
  .insert({ name, email, message, status: 'new' })
```

### Step 4: Environment Variables Setup

1. **In Vercel Dashboard** (if deployed):
   - Go to Project Settings → Environment Variables
   - Add your email service keys

2. **Local Development**:
   - Create a `.env.local` file:
   ```
   SENDGRID_API_KEY=your_key_here
   FROM_EMAIL=noreply@novatech.ai
   ```

3. **In v0 Project**:
   - Click "Vars" in the left sidebar
   - Add your environment variables there

### Step 5: Test Your Setup

1. **Local Testing**:
```bash
npm run dev
# Visit http://localhost:3000
# Fill and submit the contact form
# Check console for logs
```

2. **Deployed Testing**:
```bash
npm run build
npm start
# Or deploy to Vercel
```

## 📊 Email Service Comparison

| Service | Price | Setup | Support | Best For |
|---------|-------|-------|---------|----------|
| SendGrid | Free tier + paid | Easy | Excellent | Production apps |
| Resend | Pay as you go | Very Easy | Great | Next.js apps |
| Nodemailer | Free | Medium | Community | Self-hosted SMTP |
| Mailgun | Free tier + paid | Easy | Good | Enterprise apps |

## 🔒 Security Checklist

- ✓ Input validation (already done)
- [ ] Rate limiting (add to prevent spam)
- [ ] CORS headers (if needed)
- [ ] Environment variables protected
- [ ] Email obfuscation (consider hiding real email)

## 🚀 Optional Enhancements

### Add Rate Limiting
```typescript
// Install: npm install @upstash/ratelimit
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '1 h'),
})

// In POST handler:
const { success } = await ratelimit.limit(request.ip!)
if (!success) return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
```

### Add CAPTCHA Protection
```typescript
// Use Google reCAPTCHA v3 or hCaptcha
// Verify in the API route before sending email
```

### Add Email Templates
```typescript
// Create reusable email templates in /emails
// Use react-email or mjml for professional templates
```

### Add Webhook Notifications
```typescript
// Send webhook to Slack/Discord when form submitted
// Notify team in real-time
```

## 📝 Troubleshooting

### Form not submitting
- Check browser console for errors
- Verify API endpoint is accessible
- Check environment variables are set

### Emails not sending
- Verify API key is correct
- Check email service dashboard for failures
- Look at server logs for detailed errors

### CORS errors
- Add proper CORS headers in API route
- Verify domain is allowed

## 🎉 You're All Set!

Once you:
1. Choose an email service
2. Add API keys to environment variables
3. Implement the email sending function
4. Test locally and in production

Your contact form will be fully functional! Users can:
- ✅ Click email to send message
- ✅ Click phone to dial
- ✅ Click address to view map
- ✅ Submit contact form and get response

Need help? Check the email service documentation or ask in their support chat.
