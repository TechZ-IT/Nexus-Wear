import Navbar from "@/components/Navbar/Navbar";
import "./globals.css";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body
        className={""}
      >
        <nav>
          <Navbar></Navbar>
        </nav>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
