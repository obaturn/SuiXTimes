import { NextRequest } from 'next/server';
import { Server as ServerIO } from 'socket.io';
import { Server as NetServer } from 'http';

// Global variable to store the Socket.IO server instance
let io: ServerIO | undefined;

export async function GET(request: NextRequest) {
  // This endpoint is just for initializing Socket.IO
  // The actual WebSocket connections happen via the Socket.IO client

  const res = new Response('Socket.IO endpoint', {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
    },
  });

  return res;
}

// Initialize Socket.IO server
export function initSocketIO(server: NetServer) {
  if (io) return io;

  console.log('🔌 Initializing Socket.IO server...');

  io = new ServerIO(server, {
    path: '/api/socket',
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      allowedHeaders: ["*"]
    },
    transports: ['websocket', 'polling']
  });

  console.log('✅ Socket.IO server initialized');

  // Socket.IO connection handling
  io.on('connection', (socket) => {
    console.log('🔗 New client connected:', socket.id);

    // Join discussion room
    socket.on('join-discussion', (discussionId: number) => {
      socket.join(`discussion-${discussionId}`);
      console.log(`📱 Client ${socket.id} joined discussion ${discussionId}`);
    });

    // Handle new discussion
    socket.on('new-discussion', (discussion: any) => {
      console.log('💬 New discussion broadcast:', discussion.title);
      io!.emit('discussion-created', discussion);
    });

    // Handle new reply
    socket.on('new-reply', (data: any) => {
      console.log('💭 New reply broadcast in discussion:', data.discussionId);
      io!.to(`discussion-${data.discussionId}`).emit('reply-added', data.reply);
    });

    // Handle disconnect
    socket.on('disconnect', (reason) => {
      console.log('🔌 Client disconnected:', socket.id, 'Reason:', reason);
    });

    // Handle connection errors
    socket.on('connect_error', (error) => {
      console.error('🔴 Socket connection error:', error);
    });
  });

  return io;
}

export function getSocketIO() {
  return io;
}