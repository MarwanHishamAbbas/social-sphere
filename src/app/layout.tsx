import { Metadata } from "next";
import "./globals.css";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SocialSphere - The Ultimate Social Networking Web App",
  description:
    "SocialSphere is a user-friendly social media web application that enables individuals to network and connect with like-minded people worldwide. With a range of features, including personal profiles, messaging, groups, and events, SocialSphere provides an all-in-one platform for building relationships and promoting your brand or business. Join SocialSphere today and join the global community of social networkers.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={montserrat.className}>{children}</body>
    </html>
  );
}
