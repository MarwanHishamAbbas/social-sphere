import { Metadata } from "next";
import "@/styles/globals.css";
import { Montserrat } from "next/font/google";
import Header from "@/components/common/Header";
import Provider from "@/components/providers/Provider";

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
    <Provider>
      <html lang="en" className="bg-dark-100 text-white">
        <body className={montserrat.className}>
          {/* @ts-expect-error Server Component */}
          <Header />
          <main className="mt-32 md:w-1/2 container mx-auto px-2 md:px-0">
            {children}
          </main>
        </body>
      </html>
    </Provider>
  );
}
