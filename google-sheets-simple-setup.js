/**
 * SIMPLE GOOGLE SHEETS RSVP BACKEND
 * 
 * SETUP INSTRUCTIONS:
 * 1. Create Google Sheet: https://sheets.google.com
 * 2. Copy Sheet ID from URL
 * 3. Replace SHEET_ID below with your actual ID
 * 4. Go to Google Apps Script: https://script.google.com
 * 5. Create new project, paste this code
 * 6. Click RUN button to authorize (stay in browser)
 * 7. Deploy as Web App (Execute as: Me, Access: Anyone)
 * 8. Copy Web App URL to your website
 */

// REPLACE THIS WITH YOUR GOOGLE SHEET ID
const SHEET_ID = 'PASTE_YOUR_SHEET_ID_HERE';

function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Open the spreadsheet
    const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
    
    // Add headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, 8).setValues([[
        'Name', 'Email', 'Company', 'Role', 'Attending', 'Message', 'Timestamp', 'Email Sent'
      ]]);
    }
    
    // Add the RSVP data
    const timestamp = new Date().toISOString();
    sheet.appendRow([
      data.name || '',
      data.email || '',
      data.company || '',
      data.role || '',
      data.attend || 'no',
      data.message || '',
      timestamp,
      false // Email sent status
    ]);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        status: 'success',
        message: 'RSVP saved successfully',
        timestamp: timestamp
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        status: 'error',
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  try {
    // Fetch all RSVP data for admin dashboard
    const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
    const data = sheet.getDataRange().getValues();
    
    if (data.length <= 1) {
      return ContentService
        .createTextOutput(JSON.stringify([]))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Convert to JSON format
    const headers = data[0];
    const rsvps = data.slice(1).map(row => {
      const rsvp = {};
      headers.forEach((header, index) => {
        rsvp[header.toLowerCase().replace(' ', '_')] = row[index];
      });
      return rsvp;
    });
    
    return ContentService
      .createTextOutput(JSON.stringify(rsvps))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function - run this to authorize permissions
function testAuthorization() {
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID);
    Logger.log('Authorization successful! Sheet name: ' + sheet.getName());
    return 'Success';
  } catch (error) {
    Logger.log('Authorization failed: ' + error.toString());
    return 'Error: ' + error.toString();
  }
}