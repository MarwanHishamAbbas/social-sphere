import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { ImageIcon, Paperclip, MapPin, Smile } from "lucide-react";
import Image from "next/image";
import { CustomButton } from "../common";

const CreatePostForm = async ({}) => {
  const session = await getServerSession(authOptions);
  return (
    <form className="bg-dark-50 p-5 md:p-8 rounded-md">
      <div className="flex items-center gap-5 mb-10">
        <Image
          src={session?.user?.image || ""}
          height={50}
          width={50}
          alt="User Image"
          className="rounded-full"
        />
        <input
          className="bg-dark-0 w-full p-3 md:p-4  rounded-full "
          placeholder="What's in your mind?"
          type="text"
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex gap-3 text-dark-0">
          <ImageIcon />
          <Paperclip />
          <MapPin />
          <Smile />
        </div>
        <CustomButton>Create Post</CustomButton>
      </div>
    </form>
  );
};

export default CreatePostForm;
