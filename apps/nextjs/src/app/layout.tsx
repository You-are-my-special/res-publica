import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata, Viewport } from "next";
import { Tranquiluxe } from "uvcanvas";

import { cn } from "@acme/ui";
import { ThemeProvider } from "@acme/ui/theme";
import { Toaster } from "@acme/ui/toast";

import { TRPCReactProvider } from "~/trpc/react";

import "~/app/globals.css";

import { env } from "~/env";
import { getBaseUrl } from "~/lib/utils";
import Footer from "./_components/footer";
import Navbar from "./_components/navbar";

export const metadata: Metadata = {
  metadataBase: new URL(env.VERCEL_ENV === "production" ? "https://res-publica.dev" : "http://localhost:3000"),
  title: "Res Publica - Dev",
  description: "A space where you see Github issues and repositories in a different light",
  openGraph: {
    title: "Res Publica - Dev",
    description: "A space where you see Github issues and repositories in a different light",
    url: "https://res-publica.dev",
    siteName: "Res Publica - Dev",
    images: [
      {
        url: `${getBaseUrl()}/images/og.webp`, // Must be an absolute URL
        width: 800,
        height: 600,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@andrewdorobantu",
    creator: "@andrewdorobantu",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(" bg-background font-sans text-foreground antialiased", GeistSans.variable, GeistMono.variable)}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <TRPCReactProvider>
            <main className="mx-auto max-w-6xl px-4">
              <Navbar />
              {props.children}
              <Footer />
            </main>
          </TRPCReactProvider>

          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
