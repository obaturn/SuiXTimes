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
        const storedContent = localStorage.getItem(`article_content_${blobId}`);
        if (storedContent) {
          console.log('Found content in localStorage for blobId:', blobId);
          return storedContent;
        }
        console.log('No localStorage content found, using fallback for blobId:', blobId);
      }

      // Try to retrieve from real Walrus
      const data = await client.walrus.readBlob({ blobId });

      // Convert Uint8Array back to string
      const decoder = new TextDecoder();
      const content = decoder.decode(data);

      console.log('Successfully retrieved content from Walrus');

      return content;
    } catch (error) {
      console.error('Failed to read from Walrus:', error);

      // Fallback for placeholder blobIds - try localStorage again
      if (blobId.startsWith('suihub_') && typeof window !== 'undefined') {
        const storedContent = localStorage.getItem(`article_content_${blobId}`);
        if (storedContent) {
          console.log('Using localStorage fallback for blobId:', blobId);
          return storedContent;
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