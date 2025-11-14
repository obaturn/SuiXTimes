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
    console.log('Ensuring storage directory exists...');
    await ensureStorageDir();
    console.log('Storage directory ensured. Writing to file:', DISCUSSIONS_FILE);
    await fs.writeFile(DISCUSSIONS_FILE, JSON.stringify(discussions, null, 2));
    console.log('File write successful');
  } catch (error) {
    console.error('Error writing discussions to file:', error);
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
    console.log('Discussion creation request received');
    const body = await request.json();
    const { title, content, category, authorAddress } = body;

    console.log('Request body:', { title: title?.substring(0, 50), content: content?.substring(0, 50), category, authorAddress });

    if (!title || !content || !authorAddress) {
      console.error('Missing required fields:', { title: !!title, content: !!content, authorAddress: !!authorAddress });
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Read existing discussions
    console.log('Reading existing discussions...');
    const discussions = await readDiscussions();
    console.log('Current discussions count:', discussions.length);

    // Generate numeric ID
    const newId = Date.now(); // Use timestamp as numeric ID
    console.log('Generated new ID:', newId);

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
    console.log('Added new discussion to array, new count:', discussions.length);

    // Save to file
    console.log('Attempting to write discussions to file...');
    await writeDiscussions(discussions);
    console.log('Successfully wrote discussions to file');

    return NextResponse.json({
      success: true,
      data: newDiscussion
    });
  } catch (error) {
    console.error('Error in discussion creation:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create discussion' },
      { status: 500 }
    );
  }
}