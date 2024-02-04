// These styles apply to every route in the application
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@/providers/theme-provider";

export default function App({ Component, pageProps }: AppProps) {
  return <>
  <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        ></ThemeProvider>
  <Component {...pageProps} />
  </ThemeProvider>
        </>
}
