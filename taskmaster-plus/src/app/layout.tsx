import type { Metadata } from "next";

import "./globals.css";
import { ListProvider } from "@/contexts/ListContext";

export const metadata: Metadata = {
  title: "TaskMaster+",
  description: "Master your tasks."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ListProvider>
        <body className="bg-white h-screen w-screen">{children}</body>
      </ListProvider>
    </html>
  );
}
