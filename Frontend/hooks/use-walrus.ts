import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';
import { walrus } from '@mysten/walrus';
import type { Keypair } from '@mysten/sui/cryptography';

export function useWalrus() {
  // Initialize Sui client extended with Walrus
  const client = new SuiClient({
    url: getFullnodeUrl('testnet'),
    network: 'testnet', // Required for Walrus to work correctly
  }).$extend(walrus());

  const storeBlob = async (content: string, signer: Keypair, epochs: number = 1): Promise<string> => {
    try {
      console.log('Storing content on Walrus:', content.substring(0, 50) + '...');

      // Convert string to Uint8Array for Walrus
      const encoder = new TextEncoder();
      const data = encoder.encode(content);

      // Store the blob and get the blob ID
      const result = await client.walrus.writeBlob({
        blob: data,
        epochs,
        deletable: true,
        signer,
      });

      console.log('Successfully stored on Walrus with blob ID:', result.blobId);

      return result.blobId;
    } catch (error) {
      console.error('Failed to store on Walrus:', error);
      throw error;
    }
  };

  const readBlob = async (blobId: string): Promise<string> => {
    try {
      console.log('Reading from Walrus:', blobId);

      // Check if this is a placeholder blobId (for testing) - try localStorage first
      if (blobId.startsWith('suihub_') && typeof window !== 'undefined') {
        let storedContent = localStorage.getItem(`article_content_${blobId}`);
        if (storedContent) {
          console.log('Found content in localStorage for blobId:', blobId);
          return storedContent;
        }

        // If exact key not found, search for any suihub content (fallback for key mismatches)
        console.log('Exact key not found, searching for any suihub content...');
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && key.startsWith('article_content_suihub_')) {
            storedContent = localStorage.getItem(key);
            if (storedContent) {
              console.log('Found suihub content with different key:', key);
              return storedContent;
            }
          }
        }

        console.log('No localStorage content found for suihub blobId - this article was created with placeholder storage');
        return `Content not available.\n\nThis article was created during testing phase and stored locally. To make articles visible to everyone, they need to be stored on Walrus decentralized storage.\n\nBlobId: ${blobId}`;
      }

      // Try to retrieve from real Walrus (for real blobIds)
      console.log('Fetching from Walrus network...');
      const data = await client.walrus.readBlob({ blobId });

      // Convert Uint8Array back to string
      const decoder = new TextDecoder();
      const content = decoder.decode(data);

      console.log('Successfully retrieved content from Walrus');

      return content;
    } catch (error) {
      console.error('Failed to read from Walrus:', error);

      // For real blobIds, show proper error
      if (!blobId.startsWith('suihub_')) {
        return `Content not available.\n\nBlobId: ${blobId}\n\nFailed to load content from Walrus. This could be due to:\n- Content expired (Walrus epochs ended)\n- Network issues\n- Invalid blobId\n\nError: ${(error as Error).message}`;
      }

      // Fallback for placeholder blobIds - try localStorage again
      if (blobId.startsWith('suihub_') && typeof window !== 'undefined') {
        let storedContent = localStorage.getItem(`article_content_${blobId}`);
        if (storedContent) {
          console.log('Using localStorage fallback for blobId:', blobId);
          return storedContent;
        }

        // Search for any suihub content again
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && key.startsWith('article_content_suihub_')) {
            storedContent = localStorage.getItem(key);
            if (storedContent) {
              console.log('Found suihub content in catch block:', key);
              return storedContent;
            }
          }
        }
      }

      // Final fallback
      return `Content not available.\n\nBlobId: ${blobId}\n\nThis content could not be loaded. In a production system, this would be stored on Walrus decentralized storage.`;
    }
  };

  const getWalrusClient = () => client;

  return {
    storeBlob,
    readBlob,
    getWalrusClient,
  };
}