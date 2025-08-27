// app/(basic)/layout.tsx
"use client";

import Navbar from '@/components/Navbar/Navbar';
import { store } from '@/redux/store';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Provider, useDispatch } from 'react-redux';
import { initializeAuth } from "@/redux/features/auth/authSlice";

// Create the AuthInitializer as a separate client component
function AuthInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();

  useEffect(() => {
    // Initialize auth state from localStorage
    dispatch(initializeAuth());
  }, [dispatch]);

  return <>{children}</>;
}

export default function BasicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathName = usePathname();
  
  return (
    <html lang="en" data-theme="light">
      <body className={""}>
        <Provider store={store}>
          <AuthInitializer>
            {(pathName === '/login') || (pathName === '/register') ? null : (
              <nav>
                <Navbar />
              </nav>
            )}
            <main>
              {children}
            </main>
            <Toaster position='top-right' />
          </AuthInitializer>
        </Provider>
      </body>
    </html>
  );
}