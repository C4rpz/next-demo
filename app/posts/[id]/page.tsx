import { Suspense } from "react";
import { Metadata } from "next";

import { Code } from "@/components/code";
import { Row } from "@/components/row";

import { getPost } from "@/lib/actions";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <Suspense fallback={<div>Loading post...</div>}>
      <Post id={id} />
    </Suspense>
  );
}

async function Post({ id }: { id: string }) {
  const post = await getPost(id);

  if (!post) {
    return <div>Post not found</div>;
  }
  return (
    <Row>
      <div className="flex flex-col gap-4">
        <h1>{post.title}</h1>
        <p>{post.content}</p>
      </div>
      <div>
        <Code path="/app/posts/[id]/page.tsx" />
        <Code path="/lib/actions.ts" sub={[38, 43]} />
        <Code path="/app/posts/[id]/opengraph-image.tsx" />
      </div>
    </Row>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  const post = await getPost(id);

  return {
    title: post?.title,
  };
}
