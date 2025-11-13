"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useWalrus } from "@/hooks/use-walrus";
import { useCurrentAccount, useSignAndExecuteTransaction, useSuiClient } from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { useState } from "react";

const formSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  category: z.string({ required_error: "Please select a category." }),
  imageUrl: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
  content: z.string().min(20, {
    message: "Content must be at least 20 characters.",
  }),
});

interface CreateArticleFormProps {

  onFinished: () => void;

  onCancel: () => void;

}



export function CreateArticleForm({ onFinished, onCancel }: CreateArticleFormProps) {
  const { getWalrusClient } = useWalrus();
  const account = useCurrentAccount();
  const { mutateAsync: signAndExecute } = useSignAndExecuteTransaction();
  const suiClient = useSuiClient();

  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState<'form' | 'register' | 'upload' | 'certify' | 'create'>('form');
  const [walrusFlow, setWalrusFlow] = useState<any>(null);
  const [formData, setFormData] = useState<z.infer<typeof formSchema> | null>(null);
  const [registerDigest, setRegisterDigest] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      category: undefined,
      imageUrl: "",
      content: "",
    },
  });

  const startWalrusFlow = async (values: z.infer<typeof formSchema>) => {
    console.log("startWalrusFlow called", { account: !!account, values });

    if (!account) {
      toast.error("Please connect your wallet first");
      return;
    }

    setIsProcessing(true);
    setFormData(values);

    try {
      console.log("Getting Walrus client...");
      const client = getWalrusClient();
      console.log("Walrus client obtained:", !!client);

      // Convert content to Uint8Array for Walrus
      const encoder = new TextEncoder();
      const data = encoder.encode(values.content);

      console.log("Storing blob on Walrus...");

      // For now, fall back to localStorage approach until Walrus signing is properly configured
      const placeholderBlobId = `suihub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      // Store the actual content locally for testing
      if (typeof window !== 'undefined') {
        localStorage.setItem(`article_content_${placeholderBlobId}`, values.content);
        console.log("Stored content locally for blobId:", placeholderBlobId);
      }

      setFormData(values);
      setCurrentStep('create');

      // Automatically proceed to create the article
      await createArticle(placeholderBlobId, values);
      console.log("Article creation completed");

      setIsProcessing(false);

    } catch (error) {
      console.error("Error in Walrus flow:", error);
      toast.error(`Failed to store on Walrus: ${(error as Error).message || 'Unknown error'}`);
      setIsProcessing(false);
      setCurrentStep('form');
    }
  };

  const handleRegister = async () => {
    console.log("handleRegister called", { walrusFlow: !!walrusFlow, account: !!account });

    if (!walrusFlow) {
      toast.error("Walrus flow not initialized. Please try submitting the form again.");
      return;
    }

    if (!account) {
      toast.error("Wallet not connected. Please connect your wallet first.");
      return;
    }

    try {
      setIsProcessing(true);
      console.log("Starting registration process...");

      // Step 2: Register the blob
      const registerTx = walrusFlow.register({
        epochs: 1,
        owner: account.address,
        deletable: true,
      });

      console.log("Register transaction created:", registerTx);

      const registerResult = await signAndExecute({ transaction: registerTx });
      console.log("Register result:", registerResult);

      setRegisterDigest(registerResult.digest);
      setCurrentStep('upload');

      toast.success("Blob registered successfully! Click 'Upload' to continue.");

    } catch (error) {
      console.error("Error registering blob:", error);
      toast.error(`Failed to register blob: ${(error as Error).message || 'Unknown error'}`);
      setIsProcessing(false); // Reset processing state on error
    }
  };

  const handleUpload = async () => {
    if (!walrusFlow || !registerDigest) return;

    try {
      setIsProcessing(true);

      // Step 3: Upload to Walrus nodes
      await walrusFlow.upload({ digest: registerDigest });
      setCurrentStep('certify');

      toast.success("Content uploaded to Walrus. Click 'Certify' to continue.");

    } catch (error) {
      console.error("Error uploading to Walrus:", error);
      toast.error("Failed to upload content");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCertify = async () => {
    if (!walrusFlow) return;

    try {
      setIsProcessing(true);

      // Step 4: Certify the blob
      const certifyTx = walrusFlow.certify();
      await signAndExecute({ transaction: certifyTx });

      // Step 5: Get the blobId and create article
      const files = await walrusFlow.listFiles();
      const blobId = files[0].blobId;

      await createArticle(blobId);

    } catch (error) {
      console.error("Error certifying blob:", error);
      toast.error("Failed to certify content");
    } finally {
      setIsProcessing(false);
    }
  };

  const createArticle = async (blobId: string, articleData?: z.infer<typeof formSchema>) => {
    console.log("createArticle called with blobId:", blobId);
    const dataToUse = articleData || formData;
    if (!dataToUse) {
      console.log("No formData available");
      return;
    }

    // Add timeout to prevent infinite loading
    const timeout = setTimeout(() => {
      console.error("Transaction timeout - taking too long");
      toast.error("Transaction timed out. Please try again.");
      setIsProcessing(false);
      setCurrentStep('form');
    }, 30000); // 30 second timeout

    try {
      console.log("Creating transaction...");
      console.log("Package ID:", process.env.NEXT_PUBLIC_PACKAGE_ID);
      console.log("Form data:", dataToUse);

      // Create transaction to call create_article on-chain
      const tx = new Transaction();

      tx.moveCall({
        package: process.env.NEXT_PUBLIC_PACKAGE_ID!,
        module: 'article_moderation',
        function: 'create_article',
        arguments: [
          tx.pure.string(dataToUse.title),
          tx.pure.string(blobId),
          tx.pure.string(dataToUse.category),
          tx.pure.string(dataToUse.imageUrl || ''),
        ],
      });

      console.log("Transaction created, executing...");
      console.log("Transaction object:", tx);

      // Execute the transaction
      const result = await signAndExecute({ transaction: tx });

      clearTimeout(timeout); // Clear timeout on success
      console.log("Article created successfully:", result);
      toast.success("Article created successfully!");
      onFinished();

    } catch (error) {
      clearTimeout(timeout); // Clear timeout on error
      console.error("Error creating article:", error);

      // More detailed error logging
      if (error && typeof error === 'object') {
        console.error("Error details:", {
          message: (error as any).message,
          code: (error as any).code,
          data: (error as any).data,
          stack: (error as any).stack
        });
      }

      toast.error(`Failed to create article: ${(error as Error).message || 'Unknown error'}`);
      setIsProcessing(false);
      setCurrentStep('form');
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await startWalrusFlow(values);
  }



  return (
    <div className="relative">
      <button
        type="button"
        onClick={onCancel}
        className="absolute top-0 right-0 mt-2 mr-2 text-gray-500 hover:text-gray-700"
        disabled={isProcessing}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {currentStep === 'form' && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Article Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter a catchy title"
                      className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400"
                      {...field}
                      disabled={isProcessing}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isProcessing}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-slate-700 border-slate-600">
                        <SelectItem value="DeFi" className="text-white hover:bg-slate-600">DeFi</SelectItem>
                        <SelectItem value="NFTs" className="text-white hover:bg-slate-600">NFTs</SelectItem>
                        <SelectItem value="Gaming" className="text-white hover:bg-slate-600">Gaming</SelectItem>
                        <SelectItem value="Tutorial" className="text-white hover:bg-slate-600">Tutorial</SelectItem>
                        <SelectItem value="General" className="text-white hover:bg-slate-600">General</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Image URL (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://example.com/image.png"
                        className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400"
                        {...field}
                        disabled={isProcessing}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write your article content here..."
                      className="resize-y min-h-[200px] bg-slate-700 border-slate-600 text-white placeholder:text-gray-400"
                      {...field}
                      disabled={isProcessing}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button type="submit" disabled={isProcessing} className="bg-blue-600 hover:bg-blue-700">
                {isProcessing ? "Preparing..." : "Submit Article (4-Step Process)"}
              </Button>
            </div>
          </form>
        </Form>
      )}

      {currentStep === 'register' && (
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2 text-white">Step 2: Register Content</h3>
            <p className="text-gray-300 mb-4">
              Your content is ready! Click below to register it on the Sui blockchain. Your wallet will ask for approval.
            </p>
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 mb-4">
              <p className="text-yellow-300 text-sm">
                💰 <strong>Gas Fee Required:</strong> This transaction costs a small amount of SUI to store your content permanently.
              </p>
            </div>
            <Button onClick={handleRegister} disabled={isProcessing} className="bg-blue-600 hover:bg-blue-700">
              {isProcessing ? "Registering..." : "Register Content (Wallet Approval Required)"}
            </Button>
          </div>
        </div>
      )}

      {currentStep === 'upload' && (
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2 text-white">Step 3: Upload to Walrus</h3>
            <p className="text-gray-300 mb-4">
              Registration successful! Now uploading your content to Walrus decentralized storage.
            </p>
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 mb-4">
              <p className="text-green-300 text-sm">
                🔄 <strong>Automatic Process:</strong> No wallet approval needed for this step.
              </p>
            </div>
            <Button onClick={handleUpload} disabled={isProcessing} className="bg-blue-600 hover:bg-blue-700">
              {isProcessing ? "Uploading..." : "Upload Content"}
            </Button>
          </div>
        </div>
      )}

      {currentStep === 'certify' && (
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2 text-white">Step 4: Certify & Publish</h3>
            <p className="text-gray-300 mb-4">
              Content uploaded successfully! Final step: certify your article on the blockchain to make it visible to everyone.
            </p>
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 mb-4">
              <p className="text-yellow-300 text-sm">
                📝 <strong>Final Approval:</strong> Confirm in your wallet to publish your article.
              </p>
            </div>
            <Button onClick={handleCertify} disabled={isProcessing} className="bg-blue-600 hover:bg-blue-700">
              {isProcessing ? "Certifying..." : "Certify & Create Article"}
            </Button>
          </div>
        </div>
      )}

      {currentStep === 'create' && (
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2 text-white">Creating Article...</h3>
            <p className="text-gray-300 mb-4">
              Publishing your article on the Sui blockchain.
            </p>
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 mb-4">
              <p className="text-blue-300 text-sm">
                🔄 <strong>Blockchain Transaction:</strong> Your wallet will ask for approval to create the article.
              </p>
            </div>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          </div>
        </div>
      )}
    </div>
  );

}
