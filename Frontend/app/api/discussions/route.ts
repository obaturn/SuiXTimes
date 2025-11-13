import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// Web3-compatible file-based storage (no external databases)
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

// GET - Fetch all discussions
export async function GET(request: NextRequest) {
  try {
    const discussions = await readDiscussions();

    // Sort by timestamp (newest first)
    const sortedDiscussions = discussions.sort((a: any, b: any) =>
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    return NextResponse.json({
      success: true,
      data: sortedDiscussions
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch discussions' },
      { status: 500 }
    );
  }
}

// POST - Create new discussion
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, content, category, authorAddress } = body;

    if (!title || !content || !authorAddress) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Read existing discussions
    const discussions = await readDiscussions();

    // Generate numeric ID
    const newId = Date.now(); // Use timestamp as numeric ID

    const newDiscussion = {
      id: newId,
      title,
      author: `User ${authorAddress.slice(-4)}`, // Display friendly name
      authorAddress,
      replies: 0,
      views: 0,
      category: category || 'General',
      content,
      replies_list: [],
      timestamp: new Date().toISOString(),
      lastActivity: new Date().toISOString()
    };

    // Add to discussions array
    discussions.push(newDiscussion);

    // Save to file
    await writeDiscussions(discussions);

    return NextResponse.json({
      success: true,
      data: newDiscussion
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create discussion' },
      { status: 500 }
    );
  }
}