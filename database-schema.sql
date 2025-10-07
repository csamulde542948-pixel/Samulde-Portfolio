-- SQLite Database Schema for RSVP System
-- Run this to create the database structure

-- Create RSVPs table
CREATE TABLE IF NOT EXISTS rsvps (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT,
    role TEXT,
    attending TEXT NOT NULL CHECK (attending IN ('yes', 'no')),
    message TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    email_sent BOOLEAN DEFAULT FALSE,
    email_sent_at DATETIME NULL
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_rsvp_email ON rsvps(email);
CREATE INDEX IF NOT EXISTS idx_rsvp_created_at ON rsvps(created_at);
CREATE INDEX IF NOT EXISTS idx_rsvp_attending ON rsvps(attending);

-- Optional: Create a view for admin dashboard
CREATE VIEW IF NOT EXISTS rsvp_summary AS
SELECT 
    COUNT(*) as total_rsvps,
    SUM(CASE WHEN attending = 'yes' THEN 1 ELSE 0 END) as attending_count,
    SUM(CASE WHEN attending = 'no' THEN 1 ELSE 0 END) as not_attending_count,
    SUM(CASE WHEN created_at > datetime('now', '-1 day') THEN 1 ELSE 0 END) as recent_24h,
    SUM(CASE WHEN email_sent = 1 AND attending = 'yes' THEN 1 ELSE 0 END) as emails_sent_count
FROM rsvps;