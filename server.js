const express = require('express');
const http = require('http');
const { WebSocketServer } = require('ws');
const path = require('path');

const app = express();
const server = http.createServer(app);

// ─── VULN: No Clickjacking protection (no X-Frame-Options / CSP frame-ancestors) ───
// ─── VULN: Wildcard CORS (4.11.7) ───
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── VULN: CORS - sensitive endpoint with no origin check (4.11.7) ───
app.get('/api/user', (req, res) => {
  res.json({
    username: 'admin',
    email: 'admin@vulnerable-lab.local',
    role: 'administrator',
    secret: 'S3CR3T_T0K3N_12345'
  });
});

// ─── VULN: XSSI - sensitive data served as executable JS (4.11.13) ───
app.get('/api/data.js', (req, res) => {
  res.setHeader('Content-Type', 'application/javascript');
  res.send(`var sensitiveData = {
    users: [
      { id: 1, name: "admin", token: "abc123secret" },
      { id: 2, name: "user",  token: "def456secret" }
    ]
  };`);
});

// ─── VULN: Reflected param for resource manipulation (4.11.6) ───
app.get('/api/image', (req, res) => {
  const url = req.query.url || 'https://via.placeholder.com/200';
  res.json({ imageUrl: url });
});

// ─── WebSocket server - echoes everything without validation (4.11.10) ───
const wss = new WebSocketServer({ server });
wss.on('connection', (ws) => {
  console.log('[WS] New connection');
  ws.send(JSON.stringify({ type: 'welcome', message: 'Connected to vulnerable WebSocket server' }));

  ws.on('message', (data) => {
    const msg = data.toString();
    console.log('[WS] Received:', msg);
    // VULN: Echoes raw data back — no sanitization
    wss.clients.forEach(client => {
      if (client.readyState === 1) {
        client.send(msg);
      }
    });
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`\n  ╔═══════════════════════════════════════════════════╗`);
  console.log(`  ║  Vulnerable Web Testing Lab                      ║`);
  console.log(`  ║  OWASP WSTG 4.11 – Client-Side Vulnerabilities  ║`);
  console.log(`  ║                                                   ║`);
  console.log(`  ║  >> http://localhost:${PORT}                        ║`);
  console.log(`  ║                                                   ║`);
  console.log(`  ║  ⚠  FOR EDUCATIONAL USE ONLY                     ║`);
  console.log(`  ╚═══════════════════════════════════════════════════╝\n`);
});
