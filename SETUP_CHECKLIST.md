# Quick Setup Checklist - NovaTech Contact Backend

Follow these steps to make your contact section fully functional.

## ✅ Phase 1: Frontend Ready (Already Done)

- [x] Email link (click to open mail)
- [x] Phone link (click to dial)
- [x] Address link (click to open map)
- [x] Contact form with validation
- [x] Loading states and error handling
- [x] API endpoint created at `/api/contact`

## 🔧 Phase 2: Choose Email Service (DO THIS FIRST)

Choose ONE option below:

### Option 1: SendGrid (Recommended)
- [ ] Sign up: https://sendgrid.com (free tier available)
- [ ] Create API key in Settings → API Keys
- [ ] Copy your API key
- [ ] Add to environment variables:
  ```
  EMAIL_SERVICE=sendgrid
  SENDGRID_API_KEY=your_key_here
  FROM_EMAIL=noreply@novatech.ai
  ```

### Option 2: Resend (Best for Next.js)
- [ ] Sign up: https://resend.com
- [ ] Create API key
- [ ] Copy your API key
- [ ] Add to environment variables:
  ```
  EMAIL_SERVICE=resend
  RESEND_API_KEY=your_key_here
  FROM_EMAIL=onboarding@resend.dev
  ```

### Option 3: Mailgun
- [ ] Sign up: https://mailgun.com
- [ ] Get API key
- [ ] Get your domain
- [ ] Add to environment variables:
  ```
  EMAIL_SERVICE=mailgun
  MAILGUN_API_KEY=your_key_here
  MAILGUN_DOMAIN=your_domain
  FROM_EMAIL=noreply@yourdomain.com
  ```

### Option 4: Nodemailer (Gmail/SMTP)
- [ ] Use Gmail or your email provider
- [ ] Create App Password (Gmail) or get SMTP credentials
- [ ] Add to environment variables:
  ```
  EMAIL_SERVICE=nodemailer
  SMTP_HOST=smtp.gmail.com
  SMTP_PORT=587
  SMTP_USER=your_email@gmail.com
  SMTP_PASSWORD=your_app_password
  FROM_EMAIL=your_email@gmail.com
  ```

### Option 5: AWS SES
- [ ] Set up AWS account
- [ ] Create SES credentials
- [ ] Verify email addresses
- [ ] Add to environment variables:
  ```
  EMAIL_SERVICE=ses
  AWS_REGION=us-east-1
  AWS_ACCESS_KEY_ID=your_key
  AWS_SECRET_ACCESS_KEY=your_secret
  FROM_EMAIL=your_verified_email@example.com
  ```

## 🌍 Phase 3: Set Environment Variables

### In v0 Project (Easiest)
1. Click **"Vars"** in left sidebar
2. Click **"+ New variable"**
3. Add each variable:
   - Key: `EMAIL_SERVICE`
   - Value: `sendgrid` (or your choice)
4. Add more variables for your API keys

### In Vercel Dashboard (If Deployed)
1. Go to Project Settings
2. Click Environment Variables
3. Add all your keys
4. Redeploy project

### For Local Testing
1. Create `.env.local` file in project root
2. Add your variables:
   ```
   EMAIL_SERVICE=sendgrid
   SENDGRID_API_KEY=SG.xxx
   FROM_EMAIL=noreply@novatech.ai
   ```

## 📦 Phase 4: Install Dependencies (If Needed)

Most options don't need extra packages, but some do:

```bash
# For Nodemailer
npm install nodemailer

# For AWS SES
npm install @aws-sdk/client-ses

# For Resend (optional, can use fetch)
npm install resend
```

## 🧪 Phase 5: Test Your Setup

### Test Locally
```bash
# Start dev server
npm run dev

# Visit http://localhost:3000

# Scroll to Contact section

# Fill in form:
# - Name: Your Name
# - Email: your@email.com
# - Message: This is a test message from my new contact form

# Click "Send Message"

# You should see success message ✓

# Check your email at hello@novatech.ai (should receive message)
```

### Test in Production
```bash
# Build and deploy
npm run build
npm start

# Or deploy to Vercel:
# git push (if connected to GitHub)
# Vercel will auto-deploy
```

## ✨ Phase 6: Verify Everything Works

Test these features:

- [ ] Click email icon → Opens mail client (mailto:hello@novatech.ai)
- [ ] Click phone icon → Opens dialer (tel:+15551234567)
- [ ] Click address icon → Opens Google Maps
- [ ] Fill contact form → Get success message
- [ ] Receive email at hello@novatech.ai with submission
- [ ] Form clears after submission
- [ ] Error message shows for invalid email

## 🎯 What Success Looks Like

When everything works:

```
User fills contact form → 
Clicks Send Message → 
Form shows loading spinner ↻ → 
Success message appears ✓ → 
Email arrives in inbox with all details → 
Form clears automatically
```

## 🆘 Troubleshooting

### Form not submitting
1. Check browser console (F12) for errors
2. Check API endpoint exists: `/api/contact/route.ts`
3. Verify environment variables are set
4. Try in incognito mode (clear cache)

### Not receiving emails
1. Check API key is correct
2. Check FROM_EMAIL is set
3. Check email service dashboard for errors
4. Look at server logs for detailed error
5. Verify email isn't going to spam

### "API key not configured"
1. You haven't set EMAIL_SERVICE in environment variables
2. Add it in v0 Vars or environment variables
3. Restart dev server after adding

### CORS or network errors
1. Make sure you're not blocking requests
2. Check browser console for exact error
3. Verify API endpoint is accessible

## 📞 Support Resources

- **SendGrid Help**: https://sendgrid.com/docs/
- **Resend Help**: https://resend.com/docs
- **Mailgun Help**: https://documentation.mailgun.com/
- **Nodemailer Help**: https://nodemailer.com/
- **AWS SES Help**: https://docs.aws.amazon.com/ses/

## 🎉 Complete! 

Once you complete all phases:

1. ✅ Contact form is fully functional
2. ✅ Emails are sent automatically
3. ✅ Links work (phone, email, map)
4. ✅ Professional user experience
5. ✅ Production-ready

---

**Questions?** Check BACKEND_SETUP.md for detailed information on each service.

**Need a quick test?** Use curl:
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "This is a test message"
  }'
```

Expected response:
```json
{
  "success": true,
  "message": "Message sent successfully! We will get back to you soon."
}
```
