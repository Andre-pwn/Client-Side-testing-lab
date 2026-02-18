# Vulnerable Web Testing Lab

Educational lab to test client-side vulnerabilities listed in **OWASP WSTG 4.11**.

> ⚠️ **For educational use only.** Do not expose on the network.

## Requirements

- Node.js ≥ 16

## Getting Started

```bash
npm install
npm start        # http://localhost:3000
```

## Included Vulnerabilities

| #       | Category                     | Quick Trigger |
|---------|------------------------------|---------------|
| 4.11.1  | DOM-Based XSS                | `?name=<img src=x onerror=alert(1)>` |
| 4.11.2  | JavaScript Execution         | Type `alert(1)` in the eval field |
| 4.11.3  | HTML Injection               | Insert `<h1>INJECTED</h1>` in the textarea |
| 4.11.4  | Client-side URL Redirect     | `?redirect=https://evil.example.com` |
| 4.11.5  | CSS Injection                | `?color=red;} *{display:none}{color:green` |
| 4.11.6  | Resource Manipulation        | `?img=https://evil.example.com/fake.png` |
| 4.11.7  | CORS                         | Click "Fetch /api/user" |
| 4.11.8  | Cross Site Flashing          | Historical info (Flash EOL) |
| 4.11.9  | Clickjacking                 | No `X-Frame-Options` / `frame-ancestors` |
| 4.11.10 | WebSockets                   | Send `<img src=x onerror=alert(1)>` via WS |
| 4.11.11 | Web Messaging                | Console: `postMessage('<b>XSS</b>','*')` |
| 4.11.12 | Browser Storage              | Save and read sensitive data in plaintext |
| 4.11.13 | XSSI                         | Load `/api/data.js` |

## Structure

```
server.js          Express + WebSocket server (CORS *, no frame protection)
public/
  index.html       Single page with all sections
  style.css        Styles
```
