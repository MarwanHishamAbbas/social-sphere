import AllPosts from "@/components/post/AllPosts";
import CreatePostForm from "@/components/post/CreatePostForm";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <main className="flex flex-col gap-16">
      {session && <CreatePostForm image={session.user?.image || ""} />}
      {/* @ts-expect-error Server Component */}
      <AllPosts />
    </main>
  );
}
