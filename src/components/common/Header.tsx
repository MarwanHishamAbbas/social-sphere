import Image from "next/image";
import SignInButton from "./SignInButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import UserAvatar from "./UserAvatar";

const Header = async ({}) => {
  const session = await getServerSession(authOptions);
  return (
    <header className="fixed top-0 left-0 right-0 h-20 bg-dark-50 flex items-center px-2 md:px-0">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Image
            className="md:hidden"
            src="/logo.svg"
            alt="Logo"
            width={45}
            height={45}
            priority
            quality={100}
          />
          <Image
            className="hidden md:block"
            src="/brand.svg"
            alt="Brand"
            width={200}
            height={200}
            priority
            quality={100}
          />
        </div>
        {session ? <UserAvatar session={session} /> : <SignInButton />}
      </div>
    </header>
  );
};

export default Header;
