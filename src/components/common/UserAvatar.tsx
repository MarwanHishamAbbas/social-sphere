"use client";

import { Menu, Avatar } from "@mantine/core";
import { Loader2, LogOut } from "lucide-react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { useState } from "react";

function UserAvatar({ session }: { session: Session }) {
  const [loading, setLoading] = useState<boolean>(false);
  const signOutHandler = async () => {
    setLoading(true);
    try {
      await signOut();
    } catch (error) {
      throw new Error("Error Signing Out");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Avatar
          radius="xl"
          className="cursor-pointer"
          size="lg"
          src={session.user?.image}
        />
      </Menu.Target>

      <Menu.Dropdown bg={"dark"} className="border-none ">
        <Menu.Label pb={0} className="text-white">
          {session.user?.name}
        </Menu.Label>
        <Menu.Label pb={10}>{session.user?.email}</Menu.Label>
        <Menu.Divider />
        <Menu.Item
          onClick={signOutHandler}
          className="transition-all hover:bg-dark-50"
          icon={
            loading ? (
              <Loader2 className="animate-spin text-dark-50" />
            ) : (
              <LogOut />
            )
          }
          color="red"
        >
          Sign Out
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export default UserAvatar;
