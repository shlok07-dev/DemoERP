"use client"

import { useState } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function NotificationBadge() {
  const [notificationCount, setNotificationCount] = useState(3)
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New memo created",
      description: "A new memo has been created by Fatima Mohammed",
      time: "5 minutes ago",
      read: false,
    },
    {
      id: 2,
      title: "Training request approved",
      description: "Your training request has been approved",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      title: "New staff added",
      description: "A new staff member has been added to your department",
      time: "3 hours ago",
      read: false,
    },
  ])

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
    setNotificationCount(Math.max(0, notificationCount - 1))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, read: true })))
    setNotificationCount(0)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {notificationCount > 0 && (
            <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-red-600 text-[10px] font-medium text-white flex items-center justify-center">
              {notificationCount}
            </span>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notifications</span>
          {notificationCount > 0 && (
            <Button variant="ghost" size="sm" className="h-auto p-0 text-xs text-blue-600" onClick={markAllAsRead}>
              Mark all as read
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.length === 0 ? (
          <div className="py-4 text-center text-sm text-gray-500">No notifications</div>
        ) : (
          notifications.map((notification) => (
            <DropdownMenuItem
              key={notification.id}
              className="flex flex-col items-start p-3 cursor-pointer"
              onClick={() => markAsRead(notification.id)}
            >
              <div className="flex items-center w-full">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{notification.title}</span>
                    {!notification.read && <span className="h-2 w-2 rounded-full bg-blue-600" />}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{notification.description}</p>
                  <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                </div>
              </div>
            </DropdownMenuItem>
          ))
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="h-10 justify-center text-sm font-medium">View all notifications</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
