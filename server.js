const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// Properly handle exit signals
const exitHandler = (code) => {
  if (typeof code !== 'number') {
    // Convert string signals like 'SIGINT' to a numeric code
    code = 0;
  }
  process.exit(code);
};

// Handle various termination signals
process.on('SIGINT', () => exitHandler(0));
process.on('SIGTERM', () => exitHandler(0));
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  exitHandler(1);
});

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});
