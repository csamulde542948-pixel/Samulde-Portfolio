# 🚀 SIMPLE Google Sheets Setup (No Email Issues)

## Quick Setup Steps:

### 1. Create Google Sheet
- Go to: https://sheets.google.com
- Create new spreadsheet: "Event RSVPs"
- Copy Spreadsheet ID from URL:
  ```
  https://docs.google.com/spreadsheets/d/1ABC123DEF456GHI789/edit
                                        ^^^^^^^^^^^^^^^^^^^
  Copy this part only
  ```

### 2. Setup Apps Script
- Go to: https://script.google.com
- Click "New Project"
- Delete default code
- Copy & paste code from `google-sheets-simple-setup.js`
- Replace `PASTE_YOUR_SHEET_ID_HERE` with your actual Sheet ID
- **Save** (Ctrl+S)

### 3. Authorize (NO EMAIL NEEDED)
- Select function: `testAuthorization`
- Click **RUN** button (▶️)
- **Grant permissions** in browser popup
- Should see "Authorization successful!" in logs

### 4. Deploy as Web App
- Click **Deploy** → **New Deployment**
- Type: **Web app**
- Execute as: **Me**
- Who has access: **Anyone**
- Click **Deploy**
- **Copy the Web App URL**

### 5. Update Website
Replace in your event.html:
```javascript
const GOOGLE_SCRIPT_URL = 'PASTE_YOUR_WEB_APP_URL_HERE';
```

## ✅ Benefits of This Setup:

- **No Email Issues**: Authorization happens in browser only
- **Simple**: One file, clear instructions
- **Cross-Device**: Works from any device/browser
- **Real-Time**: Instant sync to Google Sheets
- **Backup**: Data safely stored in Google Drive

## 🧪 Testing:

1. Submit RSVP from any device
2. Check Google Sheet → Should see new row
3. Check admin dashboard → Should load from Google Sheets

---

**Note**: This bypasses the email authorization issue by using direct browser-based authorization.