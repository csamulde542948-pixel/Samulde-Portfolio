// Google Apps Script - RSVP Backend
// Deploy this as a Web App in Google Apps Script

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = getOrCreateSheet();
    
    // Add RSVP data to sheet
    const row = [
      new Date().toISOString(),
      data.name,
      data.email,
      data.company || '',
      data.role || '',
      data.attend,
      data.message || '',
      data.emailSent || false,
      data.emailSentAt || ''
    ];
    
    sheet.appendRow(row);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'success',
        message: 'RSVP recorded successfully'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  try {
    const sheet = getOrCreateSheet();
    const data = sheet.getDataRange().getValues();
    
    if (data.length <= 1) {
      return ContentService
        .createTextOutput(JSON.stringify([]))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Convert to JSON format (skip header row)
    const rsvps = data.slice(1).map(row => ({
      timestamp: row[0],
      name: row[1],
      email: row[2],
      company: row[3],
      role: row[4],
      attend: row[5],
      message: row[6],
      emailSent: row[7],
      emailSentAt: row[8]
    }));
    
    return ContentService
      .createTextOutput(JSON.stringify(rsvps))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getOrCreateSheet() {
  const spreadsheetId = '1ABC123_YOUR_SPREADSHEET_ID_HERE'; // Replace with your spreadsheet ID
  const sheetName = 'RSVPs';
  
  try {
    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    let sheet = spreadsheet.getSheetByName(sheetName);
    
    if (!sheet) {
      sheet = spreadsheet.insertSheet(sheetName);
      // Add headers
      sheet.getRange(1, 1, 1, 9).setValues([[
        'Timestamp', 'Name', 'Email', 'Company', 'Role', 'Attending', 'Message', 'Email Sent', 'Email Sent At'
      ]]);
    }
    
    return sheet;
  } catch (error) {
    throw new Error('Could not access spreadsheet: ' + error.toString());
  }
}

// Test function
function testConnection() {
  const sheet = getOrCreateSheet();
  console.log('Sheet connection successful');
  return 'Connected to: ' + sheet.getName();
}