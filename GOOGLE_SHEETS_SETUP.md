# 🚀 Google Sheets Backend Setup Guide

## Step 1: Create Google Spreadsheet

1. **Go to**: https://sheets.google.com
2. **Create new spreadsheet**: "Event RSVPs"
3. **Copy the Spreadsheet ID** from URL:
   ```
   https://docs.google.com/spreadsheets/d/1ABC123_YOUR_ID_HERE/edit
                                      ^^^^^^^^^^^^^^^^^^^
   ```

## Step 2: Setup Google Apps Script

1. **Go to**: https://script.google.com
2. **New Project** → Name it "RSVP Backend"
3. **Delete default code** and paste the code from `google-apps-script.js`
4. **Replace Spreadsheet ID**: 
   ```javascript
   const spreadsheetId = 'YOUR_ACTUAL_SPREADSHEET_ID_HERE';
   ```
5. **Save the project** (Ctrl+S)

## Step 3: Deploy as Web App

1. **Click "Deploy"** → "New Deployment"
2. **Type**: Web app
3. **Execute as**: Me
4. **Who has access**: Anyone
5. **Deploy** and copy the Web App URL

## Step 4: Update Your Website

Replace the Web App URL in your event.html:
```javascript
const GOOGLE_SCRIPT_URL = 'YOUR_WEB_APP_URL_HERE';
```

## Step 5: Test

1. Submit an RSVP from any device
2. Check your Google Sheet - data should appear
3. Check admin dashboard - should fetch from Google Sheets

## Benefits

✅ **Cross-Device**: Data stored in Google Sheets (cloud)  
✅ **Real-Time**: Instant sync across all devices  
✅ **Backup**: Data safely stored in Google Drive  
✅ **Scalable**: Can handle thousands of RSVPs  
✅ **Accessible**: View/export data directly from Google Sheets

## Security

- Web App URL is public but only accepts RSVP data
- Spreadsheet remains private to you
- No sensitive data exposed