# Vulnerable Web Testing Lab

Lab didattico per testare le vulnerabilità client-side elencate in **OWASP WSTG 4.11**.

> ⚠️ **Solo per uso educativo.** Non esporre in rete.

## Requisiti

- Node.js ≥ 16

## Avvio

```bash
npm install
npm start        # http://localhost:3000
```

## Vulnerabilità incluse

| #       | Categoria                    | Trigger rapido |
|---------|------------------------------|----------------|
| 4.11.1  | DOM-Based XSS                | `?name=<img src=x onerror=alert(1)>` |
| 4.11.2  | JavaScript Execution         | Digita `alert(1)` nel campo eval |
| 4.11.3  | HTML Injection               | Inserisci `<h1>INJECTED</h1>` nel textarea |
| 4.11.4  | Client-side URL Redirect     | `?redirect=https://evil.example.com` |
| 4.11.5  | CSS Injection                | `?color=red;} *{display:none}{color:green` |
| 4.11.6  | Resource Manipulation        | `?img=https://evil.example.com/fake.png` |
| 4.11.7  | CORS                         | Clicca "Fetch /api/user" |
| 4.11.8  | Cross Site Flashing          | Info storica (Flash EOL) |
| 4.11.9  | Clickjacking                 | Nessun `X-Frame-Options` / `frame-ancestors` |
| 4.11.10 | WebSockets                   | Invia `<img src=x onerror=alert(1)>` via WS |
| 4.11.11 | Web Messaging                | Console: `postMessage('<b>XSS</b>','*')` |
| 4.11.12 | Browser Storage              | Salva e leggi dati sensibili in chiaro |
| 4.11.13 | XSSI                        | Carica `/api/data.js` |

## Struttura

```
server.js          Express + WebSocket server (CORS *, no frame protection)
public/
  index.html       Pagina unica con tutte le sezioni
  style.css        Stili
```
