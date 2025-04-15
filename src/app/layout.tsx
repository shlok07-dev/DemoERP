import type React from "react"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { Sidebar } from "@/components/sidebar"
import { AiAssistant } from "@/components/ai-assistant/ai-assistant"
import { MobileNav } from "@/components/mobile-nav"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Mini ERP System",
  description: "Enterprise Resource Planning System",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <div className="min-h-screen bg-background">
              {/* Sidebar for navigation */}
              <Sidebar />

              {/* Main content area */}
              <div className="md:pl-64">
                <div className="flex h-16 items-center px-4 border-b md:px-6">
                  <MobileNav />
                  <div className="ml-auto flex items-center space-x-4">
                    {/* You can add header elements here like notifications, user profile, etc. */}
                  </div>
                </div>
                <main className="p-4 md:p-6">{children}</main>
              </div>

              <AiAssistant />
            </div>
            <Toaster />
          </ThemeProvider>
      </body>
    </html>
  )
}
