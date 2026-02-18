import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
import path from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: '*',
    allowedHeaders: ['Content-Type', 'Authorization', 'ngrok-skip-browser-warning'],
    methods: ['GET', 'POST', 'OPTIONS']
}));
app.use(express.json());

// Log all requests
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Database Connection Pool (PostgreSQL/Supabase)
const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false // Required for Supabase/Neon/Render
    }
});

// Test DB Connection
const testDbConnection = async () => {
    try {
        const client = await pool.connect();
        console.log('✅ Connected to PostgreSQL Database (Supabase)');
        client.release();
    } catch (error) {
        console.error('❌ Database connection failed:', error.message);
    }
};


// Get location from IP using ip-api.com (free tier: 45 requests/minute)
async function getLocationFromIP(ip) {
    try {
        // For localhost/development, use a default location
        if (ip === '::1' || ip === '127.0.0.1' || ip.startsWith('192.168.') || ip.startsWith('10.')) {
            return {
                ip: ip,
                city: 'Local Development',
                region: 'Local',
                country: 'Local',
                country_code: 'LC',
                latitude: 0,
                longitude: 0,
                timezone: 'UTC',
                isp: 'Local Network'
            };
        }

        // Use ip-api.com (no key required, http endpoint for free tier)
        const response = await axios.get(`http://ip-api.com/json/${ip}`, {
            timeout: 5000
        });

        // ip-api returns status: 'fail' on error
        if (response.data.status === 'fail') {
            throw new Error(response.data.message || 'IP Lookup Failed');
        }

        return {
            ip: response.data.query,
            city: response.data.city,
            region: response.data.regionName, // ip-api uses 'regionName' for full state name
            country: response.data.country,
            country_code: response.data.countryCode,
            latitude: response.data.lat,
            longitude: response.data.lon,
            timezone: response.data.timezone,
            isp: response.data.isp
        };
    } catch (error) {
        console.error('Error fetching location:', error.message);
        return {
            ip: ip,
            city: 'Unknown',
            region: 'Unknown',
            country: 'Unknown',
            country_code: 'XX',
            latitude: 0,
            longitude: 0,
            timezone: 'UTC',
            isp: 'Unknown'
        };
    }
}

// Root route - Dev Server Status
app.get('/', (req, res) => {
    res.send(`
        <div style="font-family: system-ui, -apple-system, sans-serif; padding: 40px; max-width: 600px; margin: 0 auto;">
            <div style="background: #f0fdf4; border: 1px solid #bbf7d0; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <h1 style="color: #166534; margin: 0 0 10px 0;">🚀 Portfolio Dev Server</h1>
                <p style="color: #15803d; margin: 0;"><strong>Status:</strong> Online & Listening (PostgreSQL/Supabase)</p>
            </div>
            
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 20px; border-radius: 8px;">
                <h3 style="color: #334155; margin-top: 0;">Available Endpoints:</h3>
                <ul style="color: #475569; font-family: monospace; font-size: 14px; line-height: 1.6;">
                    <li>POST /api/visitors <span style="color: #64748b">(Visitor Tracking)</span></li>
                    <li>GET  /api/stats         <span style="color: #64748b">(Dashboard Stats)</span></li>
                    <li>GET  /api/health        <span style="color: #64748b">(Health Check)</span></li>
                </ul>
                <p style="margin-top: 15px; font-size: 13px; color: #64748b;">
                    Server running on port ${PORT}<br>
                    Time: ${new Date().toISOString()}
                </p>
            </div>
        </div>
    `);
});

// Helpful message for GET requests to the tracking endpoint
app.get('/api/visitors', (req, res) => {
    res.status(405).json({
        success: false,
        message: 'This endpoint expects a POST request with visitor data.',
        hint: 'Use the frontend application to send tracking data to this endpoint.'
    });
});

// Track visitor endpoint
app.post('/api/visitors', async (req, res) => {
    try {
        // Get IP address from request
        const ip = req.headers['x-forwarded-for']?.split(',')[0] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress;

        const { page, referrer, userAgent, deviceInfo, pageTitle, advancedTracking } = req.body;

        // Get location data
        const locationData = await getLocationFromIP(ip);

        // Prepare visitor data
        const visitor = {
            id: Date.now().toString(),
            timestamp: new Date(),
            ...locationData,
            page: page || '/',
            pageTitle: pageTitle || 'Unknown',
            referrer: referrer || 'direct',
            userAgent: userAgent || req.headers['user-agent'] || 'Unknown',
            deviceType: deviceInfo?.deviceType || 'unknown',
            os: deviceInfo?.os || 'unknown',
            browser: deviceInfo?.browser || 'unknown',
            screenResolution: deviceInfo?.screenResolution || 'unknown',
            viewportSize: deviceInfo?.viewportSize || 'unknown',
            language: deviceInfo?.language || 'unknown',
            colorDepth: deviceInfo?.colorDepth || 0,
            pixelRatio: deviceInfo?.pixelRatio || 1,
            cookiesEnabled: deviceInfo?.cookiesEnabled || false,
            doNotTrack: deviceInfo?.doNotTrack || false,
            advancedTracking: advancedTracking ? JSON.stringify(advancedTracking) : null
        };

        const query = `
            INSERT INTO visitors (
                id, timestamp, ip, city, region, country, country_code, 
                latitude, longitude, timezone, isp, page, pageTitle, 
                referrer, userAgent, deviceType, os, browser, 
                screenResolution, viewportSize, language, colorDepth, 
                pixelRatio, cookiesEnabled, doNotTrack, advancedTracking
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26)
        `;

        const values = [
            visitor.id, visitor.timestamp, visitor.ip, visitor.city, visitor.region, visitor.country, visitor.country_code,
            visitor.latitude, visitor.longitude, visitor.timezone, visitor.isp, visitor.page, visitor.pageTitle,
            visitor.referrer, visitor.userAgent, visitor.deviceType, visitor.os, visitor.browser,
            visitor.screenResolution, visitor.viewportSize, visitor.language, visitor.colorDepth,
            visitor.pixelRatio, visitor.cookiesEnabled, visitor.doNotTrack, visitor.advancedTracking
        ];

        await pool.query(query, values);

        console.log(`📍 New visitor from ${visitor.city}, ${visitor.country} | ${visitor.deviceType} | ${visitor.browser}`);

        res.json({
            success: true,
            message: 'Visitor tracked successfully',
            location: {
                city: visitor.city,
                country: visitor.country
            }
        });
    } catch (error) {
        console.error('Error tracking visitor:', error);
        res.status(500).json({
            success: false,
            message: 'Error tracking visitor',
            error: error.message
        });
    }
});

// Helper function for aggregated stats
async function getStatCounts(column) {
    // Note: Parameterized identifiers are tricky in core SQL. 
    // Since 'column' is internal and not from user input in this specific usage, strictly speaking it's "okay" for this specific file,
    // but typically we'd map it.
    // For now, ensuring we simply query.
    const result = await pool.query(`SELECT ${column}, COUNT(*) as count FROM visitors GROUP BY ${column}`);
    return result.rows.reduce((acc, row) => {
        acc[row[column] || 'Unknown'] = row.count;
        return acc;
    }, {});
}

// Get visitor statistics
app.get('/api/stats', async (req, res) => {
    try {
        // Total visitors
        const totalResult = await pool.query('SELECT COUNT(*) as total FROM visitors');
        const total = totalResult.rows[0].total;

        // Aggregated stats (parallel for performance)
        const [countries, cities, browsers, devices, operatingSystems] = await Promise.all([
            getStatCounts('country'),
            getStatCounts('city'),
            getStatCounts('browser'),
            getStatCounts('deviceType'),
            getStatCounts('os')
        ]);

        // Recent visitors
        const recentResult = await pool.query('SELECT id, timestamp, city, country, page, deviceType, browser FROM visitors ORDER BY timestamp DESC LIMIT 50');
        const recentVisitors = recentResult.rows;

        res.json({
            success: true,
            stats: {
                total,
                countries,
                cities,
                browsers,
                devices,
                operatingSystems,
                recentVisitors
            }
        });
    } catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching statistics'
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Initialize and start server
async function startServer() {
    await testDbConnection();

    app.listen(PORT, () => {
        console.log(`🚀 Portfolio backend running on port ${PORT}`);
        console.log(`📊 Visitor tracking active (PostgreSQL)`);
        console.log(`🌍 Using ip-api.com for geolocation`);
    });
}

startServer();
