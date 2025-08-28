import "./globals.css";
import BasicLayout from "./BasicLayout";
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Nexus',
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <BasicLayout>{children}</BasicLayout>
  );
}
