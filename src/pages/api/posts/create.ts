import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { Post } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ message: "Please Sign in to create post" });
    }
    const title: string = req.body.title;
    //Check title
    if (title.length > 300) {
      return res.status(403).json({ message: "Please write a shorter post" });
    }

    if (!title.length) {
      return res
        .status(403)
        .json({ message: "Please write something before we can post it." });
    }
    // Get User
    const prismaUser = await db.user.findUnique({
      where: {
        email: session?.user?.email as string,
      },
    });

    // Create Post
    try {
      const result = await db.post.create({
        data: {
          title: title,
          userId: prismaUser?.id,
        } as Post,
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(403).json({ err: "Error has occured creating the post" });
    }
  }
}
