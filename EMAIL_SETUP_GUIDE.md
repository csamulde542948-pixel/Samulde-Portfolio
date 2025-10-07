# EmailJS Setup Guide for Automatic RSVP Confirmation Emails

This guide will help you set up automatic email sending for your **Startup Hackathon** RSVP form using EmailJS (free service, no server required).

## 📋 What You'll Need
- An email account (Gmail, Outlook, etc.)
- 5-10 minutes to set up
- The event.html file (already configured, just needs your credentials)

---

## 🚀 Step-by-Step Setup

### Step 1: Create EmailJS Account

1. Go to **[EmailJS](https://www.emailjs.com/)**
2. Click **"Sign Up Free"**
3. Register using your email or Google account
4. Verify your email address

---

### Step 2: Add Email Service

1. Once logged in, go to **"Email Services"** in the left sidebar
2. Click **"Add New Service"**
3. Choose your email provider:
   - **Gmail** (recommended for personal use)
   - **Outlook**
   - **Yahoo**
   - Or any other supported service
4. Click **"Connect Account"** and authorize EmailJS
5. Give your service a name (e.g., "Hackathon RSVP Service")
6. Click **"Create Service"**
7. **COPY the Service ID** (looks like: `service_abc123`) - you'll need this!

---

### Step 3: Create Email Template

1. Go to **"Email Templates"** in the left sidebar
2. Click **"Create New Template"**
3. **Delete the default content** and paste this template:

#### Email Template HTML:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background: #f5f5f5; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; }
        .content { padding: 30px 20px; }
        .info-box { background: #f8f9fa; border-left: 4px solid #667eea; padding: 20px; margin: 20px 0; }
        .info-box h3 { margin-top: 0; color: #667eea; }
        .info-item { margin: 12px 0; }
        .info-item strong { color: #667eea; display: inline-block; min-width: 120px; }
        .schedule { background: #ffffff; border: 1px solid #e0e0e0; padding: 20px; margin: 20px 0; border-radius: 8px; }
        .schedule-day { margin: 15px 0; padding-bottom: 15px; border-bottom: 1px solid #e0e0e0; }
        .schedule-day:last-child { border-bottom: none; }
        .schedule-day h4 { color: #667eea; margin: 0 0 10px 0; }
        .highlight { background: #fff3cd; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #ffc107; }
        .footer { background: #2c3e50; color: white; padding: 25px 20px; text-align: center; }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header with Image Background -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto; max-width: 800px;">
            <tr>
                <td style="
                    height: 200px; 
                    background: linear-gradient(135deg, rgba(97, 94, 255, 0.2) 0%, rgba(153, 98, 255, 0.3) 100%), 
                                url('https://i.postimg.cc/wTwpLr4Z/6295209.png') center/cover;
                    background-size: cover;
                    background-position: center;
                    color: white; 
                    text-align: center;
                    vertical-align: middle;
                    padding: 20px;
                ">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                            <td style="text-align: center; padding-bottom: 15px;">
                                <div style="
                                    background: rgba(255, 255, 255, 0.25);
                                    border: 2px solid rgba(255, 255, 255, 0.4);
                                    padding: 10px 24px;
                                    border-radius: 30px;
                                    font-size: 13px;
                                    font-weight: 700;
                                    letter-spacing: 1.5px;
                                    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
                                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
                                    color: white;
                                    display: inline-block;
                                ">✓ REGISTRATION CONFIRMED</div>
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align: center; padding-bottom: 8px;">
                                <h1 style="
                                    margin: 0; 
                                    font-size: 36px; 
                                    text-shadow: 2px 4px 12px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 0, 0, 0.3);
                                    font-weight: 800;
                                    letter-spacing: 1px;
                                    color: white;
                                ">{{event_name}}</h1>
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align: center;">
                                <p style="
                                    margin: 0; 
                                    font-size: 17px; 
                                    text-shadow: 1px 2px 8px rgba(0, 0, 0, 0.5), 0 0 15px rgba(0, 0, 0, 0.3);
                                    font-weight: 500;
                                    letter-spacing: 0.5px;
                                    color: white;
                                ">November 15-17, 2025 | Innovation Hub, Davao City</p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
        
        <!-- Main Content -->
        <div class="content">
            <p>Dear <strong>{{to_name}}</strong>,</p>
            
            <p>Thank you for registering for the <strong>{{event_name}}</strong>! We're thrilled to have you join us for this exciting event.</p>
            
            <!-- Event Details -->
            <div class="info-box">
                <h3>Event Details</h3>
                <div class="info-item"><strong>Date:</strong> {{event_date}}</div>
                <div class="info-item"><strong>Time:</strong> {{event_time}}</div>
                <div class="info-item"><strong>Location:</strong> {{event_location}}</div>
                <div class="info-item"><strong>Address:</strong> {{event_address}}</div>
            </div>
            
            <!-- Your Registration -->
            <div class="info-box">
                <h3>Your Registration</h3>
                <div class="info-item"><strong>Name:</strong> {{user_name}}</div>
                <div class="info-item"><strong>Email:</strong> {{user_email}}</div>
                <div class="info-item"><strong>Company:</strong> {{user_company}}</div>
                <div class="info-item"><strong>Role:</strong> {{user_role}}</div>
            </div>
            
            <!-- What to Expect -->
            <h3 style="color: #667eea;">What to Expect</h3>
            <ul style="line-height: 1.8;">
                <li><strong>48-Hour Coding Sprint</strong> - Build innovative prototypes from scratch using cutting-edge technologies</li>
                <li><strong>Expert Mentorship</strong> - Get guidance from experienced developers, designers, and startup founders</li>
                <li><strong>Tech Workshops</strong> - Hands-on sessions covering APIs, cloud platforms, and development tools</li>
                <li><strong>Team Collaboration</strong> - Work with talented developers, designers, and entrepreneurs (teams of 1-5)</li>
                <li><strong>Prizes & Opportunities</strong> - Compete for cash prizes, startup resources, and investor pitch opportunities</li>
            </ul>
            
            <!-- Schedule Overview -->
            <div class="schedule">
                <h3 style="color: #667eea; margin-top: 0;">Schedule Overview</h3>
                
                <div class="schedule-day">
                    <h4>Day 1 - November 15, 2025</h4>
                    <p>6:00 PM - Registration & Team Formation<br>
                    7:00 PM - Opening Ceremony & Theme Reveal<br>
                    8:00 PM - Hacking Begins!</p>
                </div>
                
                <div class="schedule-day">
                    <h4>Day 2 - November 16, 2025</h4>
                    <p>9:00 AM - Breakfast & Tech Workshops<br>
                    3:00 PM - Final Sprint & Mentor Check-ins</p>
                </div>
                
                <div class="schedule-day">
                    <h4>Day 3 - November 17, 2025</h4>
                    <p>9:00 AM - Hacking Ends & Submissions<br>
                    10:00 AM - Project Presentations<br>
                    1:00 PM - Awards Ceremony</p>
                </div>
            </div>
            
            <!-- Important Reminders -->
            <div class="highlight">
                <h3 style="margin-top: 0;">Important Reminders</h3>
                <ul style="margin: 10px 0;">
                    <li>Bring your laptop, chargers, and any necessary development equipment</li>
                    <li>Teams can have 1-5 members (solo participation welcome, team formation help available)</li>
                    <li>All skill levels welcome - from beginners to expert developers</li>
                    <li>Internet, power outlets, and workspace will be provided</li>
                    <li>Meals, snacks, and refreshments provided throughout the 48 hours</li>
                    <li>Free parking available at the venue</li>
                    <li>Sleeping area available (bring sleeping bags if staying overnight)</li>
                </ul>
            </div>
            
            <p style="margin-top: 30px;">If you have any questions or need to update your registration, please don't hesitate to contact us.</p>
            
            <p><strong>See you at the hackathon!</strong></p>
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <p style="margin: 0 0 10px 0;"><strong>{{organizer_name}}</strong></p>
            <p style="margin: 5px 0;">Event Organizer | Frontend Developer & Graphic Designer</p>
            <p style="margin: 5px 0;">Email: {{organizer_email}}</p>
            <p style="margin: 5px 0;">Phone: {{organizer_phone}}</p>
            <p style="margin-top: 20px; font-size: 12px; opacity: 0.8;">
                © 2025 {{organizer_name}}. All rights reserved.
            </p>
        </div>
    </div>
</body>
</html>
```

4. Configure the template settings:
   - **To Email**: `{{to_email}}`
   - **From Name**: Your name or "Startup Hackathon Team"
   - **From Email**: Leave default or customize
   - **Subject**: `Confirmation: {{event_name}} - {{event_date}}`
   - **Reply To**: Your email (caesarsamulde@gmail.com)

5. Click **"Save"**
6. **COPY the Template ID** (looks like: `template_xyz789`) - you'll need this!

---

### Step 4: Get Your Public Key

1. Go to **"Account"** in the left sidebar
2. Scroll down to **"API Keys"** section
3. **COPY your Public Key** (looks like: `abcdef123456789`) - you'll need this!

---

### Step 5: Update event.html

Now you need to add your credentials to the `event.html` file.

1. Open **`d:\port\event.html`** in your code editor
2. Find these lines (around line 510-520):

```javascript
// IMPORTANT: Replace 'YOUR_PUBLIC_KEY' with your actual EmailJS public key
emailjs.init('YOUR_PUBLIC_KEY');
```

Replace `'YOUR_PUBLIC_KEY'` with your actual public key:
```javascript
emailjs.init('abcdef123456789'); // Use your actual key
```

3. Find these lines (around line 560-565):

```javascript
const serviceID = 'YOUR_SERVICE_ID';
const templateID = 'YOUR_TEMPLATE_ID';
```

Replace with your actual IDs:
```javascript
const serviceID = 'service_abc123'; // Use your actual service ID
const templateID = 'template_xyz789'; // Use your actual template ID
```

4. **Save the file**

---

## ✅ Testing

1. Open `event.html` in your browser
2. Fill out the RSVP form with your own email
3. Select **"Yes, I'll be there!"** for attendance
4. Click **"Submit RSVP"**
5. You should see: "Your RSVP has been recorded. A confirmation email has been sent..."
6. Check your email inbox (and spam folder) for the confirmation email

---

## 🎯 How It Works

When someone submits the RSVP form:

1. ✅ Form validates the data
2. ✅ Checks for duplicate emails
3. ✅ Saves RSVP to localStorage
4. ✅ **Automatically sends confirmation email** (only if they selected "Yes" to attend)
5. ✅ Shows success message with email confirmation
6. ✅ Resets the form

---

## 📊 EmailJS Free Plan Limits

- **200 emails/month** (free tier)
- More than enough for most events
- If you need more, upgrade plans start at $7/month for 1,000 emails

---

## 🔧 Troubleshooting

### Email not sending?

1. **Check browser console** (F12) for error messages
2. **Verify all 3 credentials** are correct:
   - Public Key
   - Service ID
   - Template ID
3. **Check EmailJS dashboard** for delivery status
4. **Try with a different email** (some providers block automated emails)
5. **Check spam folder**

### Common Issues:

**Error: "Public Key is invalid"**
- Double-check you copied the Public Key correctly from EmailJS Account page

**Error: "Service/Template not found"**
- Make sure Service ID and Template ID are correct
- Check that the service is connected and active

**Email arrives but variables are empty**
- Check that template variable names match exactly (case-sensitive)
- Template uses: `{{to_name}}`, `{{to_email}}`, etc.

---

## 🎨 Customization

### Change Email Content

Edit the email template in EmailJS dashboard:
1. Go to Email Templates
2. Click on your template
3. Edit the content
4. Save changes (no code changes needed!)

### Change Event Details

Edit `event.html` around line 575-585:
```javascript
const emailParams = {
    event_name: 'Startup Hackathon',
    event_date: 'November 15-17, 2025',
    event_time: '48 Hours (Nov 15 6PM - Nov 17 2PM)',
    event_location: 'Innovation Hub, Davao City',
    event_address: 'Innovation Hub Building, J.P. Laurel Ave, Davao City, 8000',
    // ... customize these values
};
```

---

## 🔐 Security Notes

- Your EmailJS Public Key is safe to use in client-side code
- EmailJS rate-limits requests to prevent abuse
- Keep your EmailJS account password secure
- Monitor your EmailJS dashboard for unusual activity

---

## 📞 Need Help?

- **EmailJS Documentation**: https://www.emailjs.com/docs/
- **EmailJS Support**: https://www.emailjs.com/support/
- **Your Portfolio Contact**: caesarsamulde@gmail.com

---

## ✨ Next Steps

After setup is complete:
1. Test with multiple email addresses
2. Check that all template variables populate correctly
3. Test on mobile devices
4. Share the event page with real attendees!

---

**Setup Complete! 🎉**

Your RSVP form will now automatically send beautiful confirmation emails to all attendees.
