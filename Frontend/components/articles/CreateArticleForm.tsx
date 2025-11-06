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

  const form = useForm<z.infer<typeof formSchema>>({

    resolver: zodResolver(formSchema),

    defaultValues: {

      title: "",

      category: undefined,

      imageUrl: "",

      content: "",

    },

  });



  function onSubmit(values: z.infer<typeof formSchema>) {

    console.log("New article submitted:", values);

    toast.success("Article submitted successfully!");

    onFinished();

  }



  return (

    <div className="relative">

      <button

        type="button"

        onClick={onCancel}

        className="absolute top-0 right-0 mt-2 mr-2 text-gray-500 hover:text-gray-700"

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

      <Form {...form}>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

          <FormField

            control={form.control}

            name="title"

            render={({ field }) => (

              <FormItem>

                <FormLabel>Article Title</FormLabel>

                <FormControl>

                  <Input placeholder="Enter a catchy title" {...field} />

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

                  <FormLabel>Category</FormLabel>

                  <Select

                    onValueChange={field.onChange}

                    defaultValue={field.value}

                  >

                    <FormControl>

                      <SelectTrigger>

                        <SelectValue placeholder="Select a category" />

                      </SelectTrigger>

                    </FormControl>

                    <SelectContent>

                      <SelectItem value="DeFi">DeFi</SelectItem>

                      <SelectItem value="NFTs">NFTs</SelectItem>

                      <SelectItem value="Gaming">Gaming</SelectItem>

                      <SelectItem value="Tutorial">Tutorial</SelectItem>

                      <SelectItem value="General">General</SelectItem>

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

                  <FormLabel>Image URL (Optional)</FormLabel>

                  <FormControl>

                    <Input

                      placeholder="https://example.com/image.png"

                      {...field}

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

                <FormLabel>Content</FormLabel>

                <FormControl>

                  <Textarea

                    placeholder="Write your article content here..."

                    className="resize-y min-h-[200px]"

                    {...field}

                  />

                </FormControl>

                <FormMessage />

              </FormItem>

            )}

          />

          <div className="flex justify-end">

            <Button type="submit">Submit Article</Button>

          </div>

        </form>

      </Form>

    </div>

  );

}
