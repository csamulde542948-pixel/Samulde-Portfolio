# Contact Form EmailJS Setup Guide

This guide will help you set up the contact form on your portf5. Click **"Save"**
6. **COPY the Template ID** (looks like: `template_abc123`) - you'll need this!

---

### Step 1B:3. Find these lines (around line 390-395):

```javascript
const emailConfig = {
    pk: 'abcdef123456789', // Your actual public key
    sid: 'c2VydmljZV9vMDk4Mms0', // Your encoded service ID
    ctid: 'dGVtcGxhdGVfOHpwM201Yw==', // Your encoded notification template ID
    artid: 'WU9VUl9BVVRPX1JFUExZX1RFTVBMQVRFX0lE' // Replace with your encoded auto-reply template ID
};
```

**Update the template IDs:**
- `ctid`: Base64 encode your notification template ID (the one that sends to you)
- `artid`: Base64 encode your auto-reply template ID (the receipt email to sender)

**Example encoding:**
- `template_8zp3m5c` → `dGVtcGxhdGVfOHpwM201Yw==`
- `template_def456` → `dGVtcGxhdGVfZGVmNDU2` (encode your actual auto-reply template ID)-Reply Template (Receipt Email)

Now create a second template for the automatic receipt email that gets sent to people who contact you:

1. Click **"Create New Template"** again
2. **Delete the default content** and paste this auto-reply template:

#### Auto-Reply Template HTML:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background: #f5f5f5; }
        .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px 20px; text-align: center; }
        .header h1 { margin: 0; font-size: 24px; }
        .content { padding: 30px; }
        .info-box { background: #f8f9fa; border-left: 4px solid #667eea; padding: 15px; margin: 15px 0; border-radius: 5px; }
        .highlight { background: #e8f5e8; border: 1px solid #28a745; padding: 15px; margin: 15px 0; border-radius: 5px; }
        .contact-info { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 15px 0; border-radius: 5px; }
        .footer { background: #2c3e50; color: white; padding: 20px; text-align: center; font-size: 14px; }
        .button { display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 10px 0; }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <h1>✅ Message Received!</h1>
            <p style="margin: 5px 0 0 0; opacity: 0.9;">Thank you for reaching out</p>
        </div>
        
        <!-- Main Content -->
        <div class="content">
            <p>Hi <strong>{{to_name}}</strong>,</p>
            
            <div class="highlight">
                <h3 style="margin-top: 0; color: #28a745;">📧 Your message has been successfully received!</h3>
                <p style="margin: 10px 0 0 0;">I've received your message about "<strong>{{sender_subject}}</strong>" and will get back to you as soon as possible.</p>
            </div>
            
            <p>Here's what happens next:</p>
            <ul>
                <li>✅ <strong>Message Delivered</strong> - Your message has been sent to my inbox</li>
                <li>⏱️ <strong>Response Time</strong> - I typically respond within {{response_time}}</li>
                <li>📱 <strong>Priority Review</strong> - All messages are personally reviewed</li>
                <li>💬 <strong>Direct Reply</strong> - I'll respond directly to {{to_email}}</li>
            </ul>
            
            <!-- Contact Info -->
            <div class="contact-info">
                <h3 style="margin-top: 0; color: #856404;">📞 Need Immediate Assistance?</h3>
                <p style="margin: 5px 0;"><strong>Email:</strong> {{my_email}}</p>
                <p style="margin: 5px 0;"><strong>Phone:</strong> {{my_phone}}</p>
                <p style="margin: 5px 0;"><strong>Response Time:</strong> {{response_time}}</p>
            </div>
            
            <div class="info-box">
                <h3 style="margin-top: 0; color: #667eea;">About Me</h3>
                <p style="margin: 5px 0;">I'm {{my_name}}, a {{my_title}} passionate about creating innovative digital solutions. I look forward to discussing your project and exploring how we can work together!</p>
            </div>
            
            <p style="text-align: center; margin: 30px 0;">
                <a href="mailto:{{my_email}}" class="button">📧 Send Another Message</a>
            </p>
            
            <p style="color: #666; font-size: 14px; margin-top: 30px;">
                <em>This is an automatic confirmation email. Please do not reply to this message. I will respond directly to your original email ({{to_email}}) within the specified timeframe.</em>
            </p>
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <p style="margin: 0;"><strong>{{my_name}}</strong></p>
            <p style="margin: 5px 0 0 0; opacity: 0.8;">{{my_title}} | Portfolio Contact Confirmation</p>
            <p style="margin: 5px 0 0 0; opacity: 0.8;">© 2025 All rights reserved</p>
        </div>
    </div>
</body>
</html>
```

3. **Configure Auto-Reply Template Settings:**
   - **Template Name**: `Portfolio Auto-Reply` (or any name you prefer)
   - **To Email**: `{{to_email}}` (sender's email address)
   - **From Name**: `Caesar Ian Samulde` (your name)
   - **From Email**: Leave default
   - **Subject**: `✅ Message Received - I'll respond within {{response_time}}`
   - **Reply To**: `{{my_email}}` (your email for direct contact)

4. Click **"Save"**
5. **COPY the Template ID** (looks like: `template_def456`) - you'll need this too!

---

### Step 2: Update index.html with Your Credentialsage (`index.html`) to send emails directly to you using EmailJS.

## 📋 Prerequisites

You should already have:
- ✅ EmailJS account (created for the hackathon RSVP system)
- ✅ Email service connected in EmailJS
- ✅ EmailJS Public Key

If you don't have these yet, follow **Steps 1-2 and Step 4** from the `EMAIL_SETUP_GUIDE.md` file first.

---

## 🚀 Quick Setup (3 Steps)

### Step 1: Create Contact Form Email Template

1. Go to **[EmailJS Dashboard](https://dashboard.emailjs.com/)** and log in
2. Click **"Email Templates"** in the left sidebar
3. Click **"Create New Template"**
4. **Delete the default content** and paste this template:

#### Contact Form Template HTML:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background: #f5f5f5; }
        .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px 20px; text-align: center; }
        .header h1 { margin: 0; font-size: 24px; }
        .content { padding: 30px; }
        .info-box { background: #f8f9fa; border-left: 4px solid #667eea; padding: 15px; margin: 15px 0; }
        .info-item { margin: 10px 0; }
        .info-item strong { color: #667eea; display: inline-block; min-width: 100px; }
        .message-box { background: #ffffff; border: 1px solid #e0e0e0; padding: 20px; margin: 20px 0; border-radius: 5px; white-space: pre-wrap; }
        .footer { background: #2c3e50; color: white; padding: 20px; text-align: center; font-size: 14px; }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <h1>📧 New Contact Form Message</h1>
            <p style="margin: 5px 0 0 0; opacity: 0.9;">You have received a new message from your portfolio website</p>
        </div>
        
        <!-- Main Content -->
        <div class="content">
            <p>Hi {{to_name}},</p>
            
            <p>Someone has sent you a message through your portfolio contact form:</p>
            
            <!-- Sender Information -->
            <div class="info-box">
                <h3 style="margin-top: 0; color: #667eea;">Sender Information</h3>
                <div class="info-item"><strong>Name:</strong> {{from_name}}</div>
                <div class="info-item"><strong>Email:</strong> <a href="mailto:{{from_email}}" style="color: #667eea;">{{from_email}}</a></div>
                <div class="info-item"><strong>Subject:</strong> {{subject}}</div>
            </div>
            
            <!-- Message Content -->
            <h3 style="color: #667eea;">Message:</h3>
            <div class="message-box">{{message}}</div>
            
            <p style="margin-top: 20px;">
                <a href="mailto:{{from_email}}?subject=Re: {{subject}}" 
                   style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px;">
                    Reply to {{from_name}}
                </a>
            </p>
            
            <p style="color: #666; font-size: 14px; margin-top: 30px;">
                <em>This email was sent from your portfolio contact form at caesarsamulde.com</em>
            </p>
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <p style="margin: 0;">Portfolio Contact Form Notification</p>
            <p style="margin: 5px 0 0 0; opacity: 0.8;">© 2025 Caesar Ian Samulde</p>
        </div>
    </div>
</body>
</html>
```

5. **Configure Template Settings:**
   - **Template Name**: `Portfolio Contact Form` (or any name you prefer)
   - **To Email**: `{{to_email}}` (your email where you'll receive messages)
   - **From Name**: `Portfolio Contact Form`
   - **From Email**: Leave default
   - **Subject**: `New Contact Message: {{subject}}`
   - **Reply To**: `{{from_email}}` (sender's email, so you can reply directly)

6. Click **"Save"**
7. **COPY the Template ID** (looks like: `template_abc123`) - you'll need this!

---

### Step 2: Update index.html with Your Credentials

1. Open **`d:\port\index.html`** in your code editor
2. Find this line (around line 360-365):

```javascript
// IMPORTANT: Replace 'YOUR_PUBLIC_KEY' with your actual EmailJS public key
emailjs.init('YOUR_PUBLIC_KEY');
```

Replace `'YOUR_PUBLIC_KEY'` with your actual EmailJS public key:
```javascript
emailjs.init('abcdef123456789'); // Use your actual public key from EmailJS Account page
```

3. Find these lines (around line 400):

```javascript
// IMPORTANT: Replace 'YOUR_SERVICE_ID' and 'YOUR_CONTACT_TEMPLATE_ID' with your actual IDs
emailjs.send('YOUR_SERVICE_ID', 'YOUR_CONTACT_TEMPLATE_ID', formData)
```

Replace with your actual IDs:
```javascript
emailjs.send('service_abc123', 'template_xyz789', formData)
// Use your actual Service ID and the new Contact Template ID you just created
```

4. **Save the file**

---

### Step 3: Test the Contact Form

1. Open `index.html` in your browser
2. Scroll down to the **"Get In Touch"** section
3. Fill out the contact form:
   - **Your Name**: Test User
   - **Your Email**: your-test-email@example.com
   - **Subject**: Test Message
   - **Message**: This is a test message from my portfolio contact form
4. Click **"Send Message"**
5. You should see a success message
6. Check your email inbox (caesarsamulde@gmail.com) for the contact form notification

---

## 🎯 How It Works

When someone fills out your contact form:

1. ✅ Form validates all required fields
2. ✅ Submit button shows loading spinner
3. ✅ **Two emails are sent simultaneously:**
   - **📧 Notification to you** (caesarsamulde@gmail.com) with their message
   - **📬 Auto-reply receipt to sender** confirming you received their message
4. ✅ Success message shows status of both emails
5. ✅ Form is reset after successful submission
6. ✅ **You receive** a beautifully formatted email with:
   - Sender's name and email
   - Message subject
   - Full message content
   - Direct reply button
7. ✅ **Sender receives** an automatic confirmation email with:
   - Confirmation their message was received
   - Expected response timeframe (24-48 hours)
   - Your contact information
   - Professional branded design

---

## 📊 Email Format Preview

When you receive a contact form message, it will look like this:

```
Subject: New Contact Message: [Subject from form]

Email Body:
┌─────────────────────────────────────┐
│  📧 New Contact Form Message        │
│  You have received a new message    │
│  from your portfolio website        │
├─────────────────────────────────────┤
│  Sender Information:                │
│  Name: John Doe                     │
│  Email: john@example.com            │
│  Subject: Project Inquiry           │
│                                     │
│  Message:                           │
│  [Full message content here]        │
│                                     │
│  [Reply to John Doe] Button         │
└─────────────────────────────────────┘
```

---

## 🔧 Customization

### Change Your Email Address

If you want messages sent to a different email, update this line in `index.html` (around line 395):

```javascript
to_email: 'your-new-email@example.com'  // Change this
```

### Change Email Template Design

Edit the template in your EmailJS dashboard:
1. Go to Email Templates
2. Click on your "Portfolio Contact Form" template
3. Edit the HTML content
4. Save (no code changes needed!)

### Add More Form Fields

To add fields like "Phone Number" or "Company":

1. Add the input in `index.html`:
```html
<div class="mb-3">
    <input type="tel" class="form-control" id="contactPhone" name="phone" placeholder="Phone Number">
</div>
```

2. Add to the formData object in JavaScript:
```javascript
const formData = {
    from_name: document.getElementById('contactName').value,
    from_email: document.getElementById('contactEmail').value,
    subject: document.getElementById('contactSubject').value,
    message: document.getElementById('contactMessage').value,
    phone: document.getElementById('contactPhone').value,  // Add this
    to_name: 'Caesar Ian Samulde',
    to_email: 'caesarsamulde@gmail.com'
};
```

3. Add to the email template in EmailJS:
```html
<div class="info-item"><strong>Phone:</strong> {{phone}}</div>
```

---

## 🛡️ Security & Limits

- **EmailJS Free Plan**: 200 emails/month
- **Rate Limiting**: EmailJS automatically prevents spam
- **Client-Side Only**: No server required, works from static hosting
- **Public Key Safe**: Your EmailJS public key is safe to use in client-side code
- **No Spam Risk**: EmailJS has built-in anti-abuse protection

---

## 🔧 Troubleshooting

### Message not sending?

1. **Check browser console** (F12) for errors
2. **Verify all credentials** are correct:
   - Public Key (from Account page)
   - Service ID (from Email Services page)
   - Template ID (from Email Templates page)
3. **Check EmailJS dashboard** for delivery status
4. **Test with different email** (some providers have strict filters)
5. **Check spam folder**

### Common Errors:

**"Public key is invalid"**
- Verify you copied the correct public key from the Account page
- Make sure there are no extra spaces

**"Service not found"**
- Check that your Service ID is correct
- Ensure the email service is connected and active in EmailJS dashboard

**"Template not found"**
- Verify the Template ID matches the one you created
- Check that the template is saved and published

**Form submits but no email received**
- Check EmailJS dashboard → History to see if email was sent
- Check spam/junk folder
- Verify `to_email` is correct in the code
- Make sure template has `{{to_email}}` in the "To Email" field

---

## 💡 Tips

1. **Test Regularly**: Send a test message to yourself before sharing the portfolio
2. **Monitor Usage**: Check your EmailJS dashboard to track monthly email usage
3. **Backup Contact Info**: Always display your email address on the page (you already do this!)
4. **Quick Replies**: Use the "Reply" button in the notification email for faster responses
5. **Save Messages**: Consider setting up email filters/labels for contact form messages

---

## 📞 Support

- **EmailJS Documentation**: https://www.emailjs.com/docs/
- **EmailJS Support**: https://www.emailjs.com/support/
- **Portfolio Contact**: caesarsamulde@gmail.com

---

## ✅ Configuration Checklist

Before going live, make sure:

- [ ] EmailJS account created and verified
- [ ] Email service connected and active
- [ ] Contact form template created and saved
- [ ] Public Key added to `index.html`
- [ ] Service ID added to `index.html`
- [ ] Contact Template ID added to `index.html`
- [ ] Test message sent successfully
- [ ] Email received in your inbox
- [ ] Reply functionality tested

---

**Setup Complete! 🎉**

Your portfolio contact form is now fully functional and will send emails directly to caesarsamulde@gmail.com whenever someone reaches out!
