import { Card, CardDescription, CardHeader, CardTitle } from "@acme/ui/card";
import { allPosts } from "content-collections";
import Image from "next/image";
import Link from "next/link";
const Posts = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col py-4">
        <h1 className="text-4xl font-semibold">Blogs</h1>
        <p className="text-muted-foreground">See what we do</p>
      </div>
      <div className="grid grid-cols-4">
        {allPosts.map((post) => (
          <Link key={post._meta.path} href={`/blog/${post._meta.path}`}>
            <Card className="overflow-hidden hover:bg-accent">
              <Image src={post.image} alt={post.title} className="w-full h-[72]" width={300} height={200} />

              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>{post.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default Posts;
