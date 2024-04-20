// These styles apply to every route in the application
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@/providers/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import ModalProvider from "@/components/global/modal-provider";
import { Toaster } from "@/components/ui/toaster";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div suppressHydrationWarning>
      <ClerkProvider
        {...pageProps}
        // publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ModalProvider>
            <Component {...pageProps} />
            <Toaster />
          </ModalProvider>
        </ThemeProvider>
      </ClerkProvider>
    </div>
  );
}
