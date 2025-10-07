# 🗄️ SQLite Database Backend Setup

## Why SQLite + Cloudflare Workers?

✅ **Real Database**: Proper SQL database, not just storage  
✅ **Free Tier**: Cloudflare Workers free plan (100k requests/day)  
✅ **No Authorization**: No complex Google OAuth  
✅ **Fast**: Edge computing, millisecond responses  
✅ **Reliable**: Enterprise-grade infrastructure  
✅ **Cross-Device**: True cloud database  

## Setup Steps

### 1. Create Cloudflare Account
- Go to: https://cloudflare.com
- Sign up for free account
- Verify email

### 2. Setup Cloudflare Workers
```bash
# Install Wrangler CLI
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Create new Worker project
wrangler init rsvp-backend
cd rsvp-backend
```

### 3. Enable D1 Database (SQLite)
```bash
# Create D1 database
wrangler d1 create rsvp-database

# Add to wrangler.toml
[[d1_databases]]
binding = "DB"
database_name = "rsvp-database"
database_id = "your-database-id-here"
```

### 4. Deploy Database Schema
```sql
-- Create RSVP table
CREATE TABLE rsvps (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT,
    role TEXT,
    attending TEXT NOT NULL,
    message TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    email_sent BOOLEAN DEFAULT FALSE
);

-- Create index for faster queries
CREATE INDEX idx_email ON rsvps(email);
CREATE INDEX idx_created_at ON rsvps(created_at);
```

### 5. Worker Code (API Endpoints)
```javascript
// Complete API with CORS support
export default {
  async fetch(request, env, ctx) {
    // Handle CORS
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);
    
    if (url.pathname === '/api/rsvp' && request.method === 'POST') {
      return handleRSVPSubmission(request, env, corsHeaders);
    }
    
    if (url.pathname === '/api/rsvps' && request.method === 'GET') {
      return handleGetRSVPs(request, env, corsHeaders);
    }
    
    return new Response('Not found', { status: 404, headers: corsHeaders });
  },
};

async function handleRSVPSubmission(request, env, corsHeaders) {
  try {
    const data = await request.json();
    
    // Insert into SQLite database
    const result = await env.DB.prepare(`
      INSERT INTO rsvps (name, email, company, role, attending, message)
      VALUES (?, ?, ?, ?, ?, ?)
    `).bind(
      data.name,
      data.email,
      data.company || null,
      data.role || null,
      data.attend,
      data.message || null
    ).run();

    return new Response(JSON.stringify({
      success: true,
      id: result.meta.last_row_id,
      message: 'RSVP saved successfully'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}

async function handleGetRSVPs(request, env, corsHeaders) {
  try {
    const result = await env.DB.prepare(`
      SELECT id, name, email, company, role, attending, message, 
             created_at, email_sent
      FROM rsvps 
      ORDER BY created_at DESC
    `).all();

    return new Response(JSON.stringify({
      success: true,
      data: result.results
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}
```

### 6. Deploy Worker
```bash
# Deploy to Cloudflare
wrangler publish

# Your API will be available at:
# https://rsvp-backend.your-subdomain.workers.dev
```

## API Endpoints

### Submit RSVP
```
POST https://rsvp-backend.your-subdomain.workers.dev/api/rsvp
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "company": "Tech Corp",
  "role": "Developer",
  "attend": "yes",
  "message": "Looking forward to it!"
}
```

### Get All RSVPs
```
GET https://rsvp-backend.your-subdomain.workers.dev/api/rsvps
```

## Integration with Your Website

### Update Event Form
```javascript
// Replace in event.html
const API_BASE_URL = 'https://rsvp-backend.your-subdomain.workers.dev';

async function submitRSVP(formData) {
  const response = await fetch(`${API_BASE_URL}/api/rsvp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData)
  });
  
  return await response.json();
}
```

### Update Admin Dashboard
```javascript
// Replace in admin dashboard
async function loadRSVPs() {
  const response = await fetch(`${API_BASE_URL}/api/rsvps`);
  const result = await response.json();
  
  if (result.success) {
    allRsvps = result.data;
    updateStats();
    renderTable();
  }
}
```

## Benefits of SQLite + Cloudflare

- **Real Database**: SQL queries, relationships, indexes
- **Global CDN**: Fast response times worldwide  
- **Auto-scaling**: Handles traffic spikes automatically
- **Free Tier**: 100,000 requests/day free
- **No Maintenance**: Managed infrastructure
- **ACID Compliant**: Data integrity guaranteed

## Next Steps

1. Set up Cloudflare account
2. Deploy the Worker with D1 database
3. Update your website forms to use the API
4. Test cross-device functionality

This gives you enterprise-grade database functionality for free!