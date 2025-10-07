# Private Admin Dashboard

## 🔐 Secure RSVP Management

This is the private admin dashboard for managing event RSVPs. 

### Features:
- **Password Protected**: Secure authentication system
- **RSVP Management**: View, filter, and export all event registrations
- **Email Templates**: Generate and send confirmation emails
- **Statistics Dashboard**: Real-time analytics and reporting
- **Data Export**: Download RSVP data as CSV

### Security:
- Private repository (only accessible to authorized users)
- Session-based authentication with auto-logout
- Brute force protection with account lockout
- No sensitive data exposed in public repositories

### Access:
- **Main Portfolio**: https://caesariansamulde.dev
- **Event Page**: https://caesariansamulde.dev/event.html
- **Admin Dashboard**: https://admin.caesariansamulde.dev (this page)

---

**⚠️ Private Repository**: This admin dashboard is hosted in a private GitHub repository for security purposes. Only authorized personnel can access the source code and deployment settings.

**Current Password**: `admin2024!` (Change this in the source code for production use)

## Setup Instructions

1. **Repository**: Create private GitHub repository named `admin-dashboard`
2. **Deploy**: Enable GitHub Pages from this private repository
3. **Domain**: Configure `admin.caesariansamulde.dev` DNS to point to this deployment
4. **Security**: Change the admin password in the source code
5. **Access**: Only the repository owner can access and modify this dashboard

## Data Synchronization

RSVP data is stored in browser localStorage. For the admin dashboard to show data:

1. **Same Browser**: Access from the same browser where RSVPs are submitted
2. **Same Domain**: Or implement cross-domain data sharing if needed
3. **Data Backup**: Regular CSV exports recommended for data backup

---

*Last updated: October 2025*