import { allPosts } from "content-collections";
import type { Metadata } from "next";
import Image from "next/image";
import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { env } from "~/env";

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
  const blog = allPosts.find((post) => post._meta.path === params.slug);
  if (!blog) return null;
  return {
    title: blog.title,
    description: blog.description,
    openGraph: {
      type: "article",
      url: `${env.VERCEL_ENV === "production" ? "https://res-publica.dev" : "http://localhost:3000"}${blog.image}`,
    },
  } as Metadata;
};

const BlogPage = ({ params }: { params: { slug: string } }) => {
  const blog = allPosts.find((post) => post._meta.path === params.slug);
  if (!blog) return null;
  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      <div className="relative w-full h-96 border rounded-lg overflow-hidden">
        <Image src={blog.image} alt={blog.title} className="object-cover" layout="fill" />
      </div>
      <div className="flex flex-col">
        <h1 className="text-5xl font-bold tracking-tight">{blog?.title}</h1>
        <p className="text-muted-foreground text-xl">{blog?.description}</p>
      </div>
      <Markdown remarkPlugins={[remarkGfm]} className="prose dark:prose-invert mt-4 prose-lg max-w-none">
        {blog?.content}
      </Markdown>
    </div>
  );
};

export default BlogPage;
