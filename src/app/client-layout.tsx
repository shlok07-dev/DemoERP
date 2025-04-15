"use client"

import { usePathname } from "next/navigation"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { Sidebar } from "@/components/sidebar"
import { AiAssistant } from "@/components/ai-assistant/ai-assistant"
import { MobileNav } from "@/components/mobile-nav"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const hideLayout = pathname === "/login"

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
        
      <div className="min-h-screen bg-background">
        {!hideLayout && <Sidebar />}
        <div className={!hideLayout ? "md:pl-64" : ""}>
          {!hideLayout && (
            <div className="flex h-16 items-center px-4 border-b md:px-6">
              <MobileNav />
              <div className="ml-auto flex items-center space-x-4" />
            </div>
          )}
          <main className={hideLayout ? "" : "p-4 md:p-6"}>{children}</main>
        </div>
        {!hideLayout && <AiAssistant />}
      </div>
      <Toaster />
    </ThemeProvider>
  )
}
