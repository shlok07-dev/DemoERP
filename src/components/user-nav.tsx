"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/components/ui/use-toast"
import { User, Settings, LogOut, HelpCircle } from "lucide-react"

interface UserData {
  id: string
  name: string
  email: string
  role: string
}

export function UserNav() {
  const [user, setUser] = useState<UserData | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Get user from localStorage
    try {
      const storedUser = localStorage.getItem("user")
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      } else {
        // For demo purposes, set a default user
        const defaultUser = {
          id: "1",
          name: "Otor John",
          email: "admin@example.com",
          role: "Admin",
        }
        localStorage.setItem("user", JSON.stringify(defaultUser))
        setUser(defaultUser)
      }
    } catch (error) {
      console.error("Error loading user data:", error)
    }
  }, [])

  const handleLogout = () => {
    try {
      // Clear user data
      localStorage.removeItem("user")

      // Clear auth cookie
      document.cookie = "auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"

      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      })

      // Redirect to login page
      router.push("/login")
    } catch (error) {
      console.error("Error during logout:", error)
      toast({
        title: "Error",
        description: "An error occurred during logout. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Get initials for avatar
  const getInitials = (name: string) => {
    if (!name) return "U"
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  if (!user) {
    return (
      <Avatar className="h-8 w-8">
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#0089ff] focus:ring-offset-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt={user.name} />
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start text-sm">
            <span className="font-medium">{user.name}</span>
            <span className="text-xs text-gray-500">{user.role}</span>
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/profile" className="flex items-center">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/settings" className="flex items-center">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/help" className="flex items-center">
            <HelpCircle className="mr-2 h-4 w-4" />
            <span>Help</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="text-red-600 flex items-center">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
