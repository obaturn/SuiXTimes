import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// Web3-compatible file-based storage (same as main discussions route)
const STORAGE_DIR = path.join(process.cwd(), 'storage');
const DISCUSSIONS_FILE = path.join(STORAGE_DIR, 'discussions.json');

// Ensure storage directory exists
async function ensureStorageDir() {
  try {
    await fs.mkdir(STORAGE_DIR, { recursive: true });
  } catch (error) {
    // Directory already exists
  }
}

// Read discussions from file
async function readDiscussions() {
  try {
    await ensureStorageDir();
    const data = await fs.readFile(DISCUSSIONS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    // File doesn't exist or is empty, return empty array
    return [];
  }
}

// Write discussions to file
async function writeDiscussions(discussions: any[]) {
  try {
    await ensureStorageDir();
    await fs.writeFile(DISCUSSIONS_FILE, JSON.stringify(discussions, null, 2));
  } catch (error) {
    throw new Error('Failed to save discussions');
  }
}

// POST - Add reply to discussion
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const discussionId = params.id;
    const body = await request.json();
    const { content, authorAddress } = body;

    if (!content || !authorAddress) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Read all discussions
    const discussions = await readDiscussions();

    // Find the discussion by ID
    const discussionIndex = discussions.findIndex((d: any) => d.id === discussionId);
    if (discussionIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Discussion not found' },
        { status: 404 }
      );
    }

    const newReply = {
      id: Date.now(), // Numeric ID
      author: `User ${authorAddress.slice(-4)}`, // Display friendly name
      authorAddress,
      content,
      timestamp: new Date().toISOString()
    };

    // Add reply to discussion and update metadata
    discussions[discussionIndex].replies_list = discussions[discussionIndex].replies_list || [];
    discussions[discussionIndex].replies_list.push(newReply);
    discussions[discussionIndex].replies = (discussions[discussionIndex].replies || 0) + 1;
    discussions[discussionIndex].lastActivity = new Date().toISOString();

    // Save updated discussions
    await writeDiscussions(discussions);

    return NextResponse.json({
      success: true,
      data: newReply
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to add reply' },
      { status: 500 }
    );
  }
}

// GET - Fetch replies for a discussion
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const discussionId = params.id;

    // Read all discussions
    const discussions = await readDiscussions();

    // Find the discussion by ID
    const discussion = discussions.find((d: any) => d.id === discussionId);

    if (!discussion) {
      return NextResponse.json(
        { success: false, error: 'Discussion not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: discussion.replies_list || []
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch replies' },
      { status: 500 }
    );
  }
}