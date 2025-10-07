// Cloudflare Worker with SQLite D1 Database for RSVP System
export default {
  async fetch(request, env, ctx) {
    // CORS headers for cross-origin requests
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // Handle preflight OPTIONS request
    if (request.method === 'OPTIONS') {
      return new Response(null, { 
        status: 200,
        headers: corsHeaders 
      });
    }

    const url = new URL(request.url);
    
    // Route: POST /api/rsvp - Submit new RSVP
    if (url.pathname === '/api/rsvp' && request.method === 'POST') {
      return handleRSVPSubmission(request, env, corsHeaders);
    }
    
    // Route: GET /api/rsvps - Get all RSVPs for admin
    if (url.pathname === '/api/rsvps' && request.method === 'GET') {
      return handleGetRSVPs(request, env, corsHeaders);
    }
    
    // Route: GET /api/stats - Get RSVP statistics
    if (url.pathname === '/api/stats' && request.method === 'GET') {
      return handleGetStats(request, env, corsHeaders);
    }
    
    // Route: DELETE /api/rsvp/:id - Delete single RSVP by ID
    const deleteRsvpMatch = url.pathname.match(/^\/api\/rsvp\/(\d+)$/);
    if (deleteRsvpMatch && request.method === 'DELETE') {
      const id = deleteRsvpMatch[1];
      return handleDeleteRSVP(id, env, corsHeaders);
    }
    
    // Route: DELETE /api/rsvps - Delete all RSVPs (admin only)
    if (url.pathname === '/api/rsvps' && request.method === 'DELETE') {
      return handleDeleteAllRSVPs(request, env, corsHeaders);
    }
    
    return new Response('API endpoint not found', { 
      status: 404, 
      headers: corsHeaders 
    });
  },
};

// Handle RSVP form submission
async function handleRSVPSubmission(request, env, corsHeaders) {
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.name || !data.email || !data.attend) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Missing required fields: name, email, attend'
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Insert RSVP into SQLite database
    const result = await env.DB.prepare(`
      INSERT INTO rsvps (name, email, company, role, attending, message, created_at)
      VALUES (?, ?, ?, ?, ?, ?, datetime('now'))
    `).bind(
      data.name.trim(),
      data.email.trim().toLowerCase(),
      data.company?.trim() || null,
      data.role?.trim() || null,
      data.attend,
      data.message?.trim() || null
    ).run();

    // Return success response
    return new Response(JSON.stringify({
      success: true,
      id: result.meta.last_row_id,
      message: 'RSVP saved successfully',
      timestamp: new Date().toISOString()
    }), {
      status: 201,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('RSVP submission error:', error);
    
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to save RSVP',
      details: error.message
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}

// Get all RSVPs for admin dashboard
async function handleGetRSVPs(request, env, corsHeaders) {
  try {
    const result = await env.DB.prepare(`
      SELECT 
        id,
        name,
        email,
        company,
        role,
        attending,
        message,
        created_at as timestamp,
        email_sent
      FROM rsvps 
      ORDER BY created_at DESC
    `).all();

    return new Response(JSON.stringify({
      success: true,
      data: result.results,
      count: result.results.length
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Get RSVPs error:', error);
    
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to retrieve RSVPs',
      details: error.message
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}

// Get RSVP statistics for admin dashboard
async function handleGetStats(request, env, corsHeaders) {
  try {
    const stats = await env.DB.prepare(`
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN attending = 'yes' THEN 1 ELSE 0 END) as attending,
        SUM(CASE WHEN attending = 'no' THEN 1 ELSE 0 END) as not_attending,
        SUM(CASE WHEN created_at > datetime('now', '-1 day') THEN 1 ELSE 0 END) as recent_24h,
        SUM(CASE WHEN email_sent = 1 AND attending = 'yes' THEN 1 ELSE 0 END) as emails_sent
      FROM rsvps
    `).first();

    return new Response(JSON.stringify({
      success: true,
      stats: stats
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Get stats error:', error);
    
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to retrieve statistics',
      details: error.message
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}

// Delete single RSVP by ID
async function handleDeleteRSVP(id, env, corsHeaders) {
  try {
    // Convert ID to integer
    const rsvpId = parseInt(id, 10);
    if (isNaN(rsvpId)) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Invalid RSVP ID'
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    // First check if RSVP exists
    const existing = await env.DB.prepare('SELECT id, name, email FROM rsvps WHERE id = ?').bind(rsvpId).first();
    
    if (!existing) {
      return new Response(JSON.stringify({
        success: false,
        error: 'RSVP not found'
      }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Delete the RSVP
    const result = await env.DB.prepare('DELETE FROM rsvps WHERE id = ?').bind(rsvpId).run();
    
    // Check if deletion was successful
    console.log('Delete operation result:', result);
    
    return new Response(JSON.stringify({
      success: true,
      message: `RSVP for ${existing.name} (${existing.email}) deleted successfully`,
      deletedId: rsvpId,
      changes: result.changes || 0
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Delete RSVP error:', error);
    
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to delete RSVP',
      details: error.message
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}

// Delete all RSVPs (admin function)
async function handleDeleteAllRSVPs(request, env, corsHeaders) {
  try {
    // Get confirmation from request body or query parameter
    const url = new URL(request.url);
    const confirm = url.searchParams.get('confirm');
    
    if (confirm !== 'true') {
      return new Response(JSON.stringify({
        success: false,
        error: 'Confirmation required. Add ?confirm=true to delete all RSVPs.'
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Count RSVPs before deletion
    const countResult = await env.DB.prepare('SELECT COUNT(*) as count FROM rsvps').first();
    const totalCount = countResult.count;

    // Delete all RSVPs
    const result = await env.DB.prepare('DELETE FROM rsvps').run();
    
    return new Response(JSON.stringify({
      success: true,
      message: `All ${totalCount} RSVPs deleted successfully`,
      deletedCount: result.changes
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Delete all RSVPs error:', error);
    
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to delete all RSVPs',
      details: error.message
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}