import CreatePostForm from "@/components/post/CreatePostForm";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
export default async function Home() {
  const session = await getServerSession(authOptions);
  return <>{session && <CreatePostForm image={session.user?.image || ""} />}</>;
}
