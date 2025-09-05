// app/(basic)/layout.tsx
"use client";
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/redux/store';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Provider, useDispatch } from 'react-redux';
import { initializeAuth } from "@/redux/features/auth/authSlice";
import Navbar from '@/components/Navbar/Navbar';
import { Footer } from '@/components/Footer/Footer';

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
      <body >
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <AuthInitializer>
              {(pathName === '/login') || (pathName === '/register') || (pathName === '/dashboard') ? null : (
                <nav>
                  <Navbar />
                </nav>
              )}
              <main className='md:px-5 px-3'>
                {children}
              </main>
              {(pathName === '/login') || (pathName === '/register') || (pathName === '/dashboard') ? null : (
                <nav>
                  <Footer></Footer>
                </nav>
              )}
              <Toaster position='top-right' />
            </AuthInitializer>
          </PersistGate>
        </Provider>
      </body>
    </html >
  );
}