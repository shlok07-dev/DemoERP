"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { logoutUser } from "@/lib/auth-service"
import { useToast } from "@/components/ui/use-toast"

interface LogoutButtonProps {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
}

export function LogoutButton({ variant = "ghost", size = "default" }: LogoutButtonProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const handleLogout = async () => {
    setLoading(true)

    try {
      // Call logout function
      logoutUser()

      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      })

      // Redirect to login page
      setTimeout(() => {
        router.push("/login")
      }, 1000)
    } catch (error) {
      console.error("Logout error:", error)
      toast({
        title: "Error",
        description: "An error occurred during logout.",
        variant: "destructive",
      })
      setLoading(false)
    }
  }

  return (
    <Button variant={variant} size={size} onClick={handleLogout} disabled={loading}>
      <LogOut className="mr-2 h-4 w-4" />
      <span>{loading ? "Logging out..." : "Logout"}</span>
    </Button>
  )
}
