const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { Server } = require('socket.io');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.PORT || 3000;

// Initialize Next.js
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  // Create HTTP server
  const httpServer = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  // Initialize Socket.IO
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      allowedHeaders: ["*"]
    },
    transports: ['websocket', 'polling'],
    path: '/socket.io'
  });

  // Socket.IO connection handling
  io.on('connection', (socket) => {
    // Join discussion room
    socket.on('join-discussion', (discussionId) => {
      socket.join(`discussion-${discussionId}`);
    });

    // Handle new discussion
    socket.on('new-discussion', (discussion) => {
      io.emit('discussion-created', discussion);
    });

    // Handle new reply
    socket.on('new-reply', (data) => {
      io.to(`discussion-${data.discussionId}`).emit('reply-added', data.reply);
    });

    // Handle disconnect
    socket.on('disconnect', (reason) => {
      // Client disconnected
    });
  });

  // Make io accessible globally
  global.io = io;

  // Start server
  httpServer.listen(port, (err) => {
    if (err) throw err;
    console.log(`Server running on http://localhost:${port}`);
  });
}).catch((err) => {
  console.error('❌ Failed to prepare Next.js app:', err);
  process.exit(1);
});