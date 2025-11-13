import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

export function useSocket() {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // Initialize socket connection to Next.js API route
    const socketUrl = process.env.NODE_ENV === 'production'
      ? window.location.origin
      : 'http://localhost:3000';

    socketRef.current = io(socketUrl, {
      transports: ['websocket', 'polling'],
      forceNew: true,
      timeout: 20000,
    });

    const socket = socketRef.current;

    socket.on('connect', () => {
      // Connected successfully
    });

    socket.on('connect_error', (error) => {
      // Connection error occurred
    });

    socket.on('disconnect', (reason) => {
      // Disconnected
    });

    // Cleanup on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  const joinDiscussion = (discussionId: number) => {
    if (socketRef.current) {
      socketRef.current.emit('join-discussion', discussionId);
    }
  };

  const emitNewDiscussion = (discussion: any) => {
    if (socketRef.current) {
      socketRef.current.emit('new-discussion', discussion);
    }
  };

  const emitNewReply = (discussionId: number, reply: any) => {
    if (socketRef.current) {
      socketRef.current.emit('new-reply', { discussionId, reply });
    }
  };

  const onDiscussionCreated = (callback: (discussion: any) => void) => {
    if (socketRef.current) {
      socketRef.current.on('discussion-created', callback);
    }
  };

  const onReplyAdded = (callback: (reply: any) => void) => {
    if (socketRef.current) {
      socketRef.current.on('reply-added', callback);
    }
  };

  return {
    socket: socketRef.current,
    joinDiscussion,
    emitNewDiscussion,
    emitNewReply,
    onDiscussionCreated,
    onReplyAdded,
  };
}