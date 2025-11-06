"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { CreateArticleForm } from "@/components/articles/CreateArticleForm";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const NewArticlePage = () => {
  const router = useRouter();

  const handleFormFinished = () => {
    // After the form is submitted successfully, redirect back to the articles list
    router.push("/dashboard/news");
  };

  return (
    <div className="space-y-8">
      <Card className="bg-slate-800/60 border-slate-700/50">
        <CardHeader>
          <CardTitle>Create a New Article</CardTitle>
          <CardDescription>
            Share your thoughts and insights with the community. Your article will be visible to everyone.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CreateArticleForm onFinished={handleFormFinished} />
        </CardContent>
      </Card>
    </div>
  );
};

export default NewArticlePage;
