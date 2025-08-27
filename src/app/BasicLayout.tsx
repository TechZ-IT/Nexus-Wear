"use client"
import Navbar from '@/components/Navbar/Navbar'
import { usePathname } from 'next/navigation';
import React from 'react'

export default function BasicLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const pathName = usePathname();
    console.log("pathName", pathName)
    return (
        <html lang="en" data-theme="light">
            <body
                className={""}
            >
                {(pathName === '/login') || (pathName === '/register') ? '' : <nav>
                    <Navbar></Navbar>
                </nav>
                }
                <main>
                    {children}
                </main>
            </body>
        </html>
    )
}
