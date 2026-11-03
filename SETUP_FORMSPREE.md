# Setup Instructions for Contact Form

Your contact form has been updated to send emails to **contact@vanteagency.dev**

## To activate the contact form:

1. Go to https://formspree.io/
2. Sign up for a free account
3. Create a new form
4. Set the receiving email to: **contact@vanteagency.dev**
5. Copy your form endpoint (it will look like: `https://formspree.io/f/xxxxxxxx`)
6. Replace the endpoint in `src/components/Contact.tsx` line 18:
   - Current: `https://formspree.io/f/xanyqdjb`
   - Replace with: Your new endpoint

Then rebuild:
```bash
npm run build
```

And update public_html folder again.

## Alternative: Use EmailJS

If you prefer EmailJS instead:
1. Sign up at https://www.emailjs.com/
2. Create an email service
3. Create an email template
4. Get your Service ID, Template ID, and Public Key
5. Install EmailJS: `npm install @emailjs/browser`
6. Update the Contact component to use EmailJS

Both services have free tiers that work perfectly for contact forms.
