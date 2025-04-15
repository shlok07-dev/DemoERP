"use client"

import { useState, useEffect } from "react"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { MoreVertical, ArrowLeft, Trash2, Check } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Define notification types
interface Notification {
  id: string
  title: string
  time: string
  day: string
  read: boolean
  category: string
}

interface DetailNotification {
  id: string
  date: string
  time: string
  content: string
  category: string
}

export default function NotificationsPage() {
  const { toast } = useToast()
  const [selectedView, setSelectedView] = useState<"list" | "detail">("list")
  const [selectedCategory, setSelectedCategory] = useState<string>("HR")
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>([])

  // State for notifications
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Your payment invoice request has been approved by Admin",
      time: "3min ago",
      day: "today",
      read: false,
      category: "Finance",
    },
    {
      id: "2",
      title: "Your payment invoice request has been approved by Admin",
      time: "10min ago",
      day: "today",
      read: false,
      category: "Finance",
    },
    {
      id: "3",
      title: "Your payment invoice request has been approved by Admin",
      time: "1hr ago",
      day: "today",
      read: false,
      category: "Finance",
    },
    {
      id: "4",
      title: "Your payment invoice request has been approved by Admin",
      time: "3hr ago",
      day: "today",
      read: true,
      category: "Finance",
    },
    {
      id: "5",
      title: "Your payment invoice request has been approved by Admin",
      time: "23hr ago",
      day: "yesterday",
      read: true,
      category: "Finance",
    },
    {
      id: "6",
      title: "Your payment invoice request has been approved by Admin",
      time: "24hr ago",
      day: "yesterday",
      read: true,
      category: "Finance",
    },
    {
      id: "7",
      title: "Your payment invoice request has been approved by Admin",
      time: "24hr ago",
      day: "yesterday",
      read: true,
      category: "Finance",
    },
  ])

  // State for detail notifications
  const [detailNotifications, setDetailNotifications] = useState<DetailNotification[]>([
    {
      id: "hr1",
      date: "Friday, Nov 11",
      time: "10:00am",
      content:
        "Lorem ipsum dolor sit amet consectetur. Aliquot nisl laoreet nunc enim dignissim pulvinar at enim nulla. Lorem eget ultricies est tellus enim proin et. Nunc enim dignissim pulvinar at enim nulla. Lorem eget ultricies est tellus enim proin id.",
      category: "HR",
    },
    {
      id: "hr2",
      date: "Friday, Nov 11",
      time: "",
      content:
        "Lorem ipsum dolor sit amet consectetur. Aliquot nisl laoreet nunc enim dignissim pulvinariam dignissim pulvinar at enim nulla. Lorem eget ultricies est tellus enim proin id.",
      category: "HR",
    },
    {
      id: "hr3",
      date: "Saturday, Nov 12",
      time: "01:20pm",
      content:
        "Lorem ipsum dolor sit amet consectetur. Aliquot nisl laoreet nunc enim dignissim pulvinar at enim nulla. Lorem eget ultricies est tellus enim proin et. Nunc enim dignissim pulvinar at enim nulla. Lorem eget ultricies est tellus enim proin id.",
      category: "HR",
    },
    {
      id: "hr4",
      date: "Saturday, Nov 12",
      time: "",
      content:
        "Lorem ipsum dolor sit amet consectetur. Aliquot nisl laoreet nunc enim dignissim pulvinariam dignissim pulvinar at enim nulla. Lorem eget ultricies est tellus enim proin id.",
      category: "HR",
    },
    {
      id: "hr5",
      date: "Sunday, Nov 13",
      time: "09:20am",
      content:
        "Lorem ipsum dolor sit amet consectetur. Aliquot nisl laoreet nunc enim dignissim pulvinar at enim nulla. Lorem eget ultricies est tellus enim proin et. Nunc enim dignissim pulvinar at enim nulla. Lorem eget ultricies est tellus enim proin id.",
      category: "HR",
    },
  ])

  // Calculate unread count
  const unreadCount = notifications.filter((n) => !n.read).length

  // Function to toggle select all notifications for a specific day
  const toggleSelectAll = (day: string) => {
    if (day === "today") {
      const todayIds = notifications.filter((n) => n.day === "today").map((n) => n.id)

      if (todayIds.every((id) => selectedNotifications.includes(id))) {
        setSelectedNotifications((prev) => prev.filter((id) => !todayIds.includes(id)))
      } else {
        setSelectedNotifications((prev) => [...prev, ...todayIds.filter((id) => !prev.includes(id))])
      }
    } else if (day === "yesterday") {
      const yesterdayIds = notifications.filter((n) => n.day === "yesterday").map((n) => n.id)

      if (yesterdayIds.every((id) => selectedNotifications.includes(id))) {
        setSelectedNotifications((prev) => prev.filter((id) => !yesterdayIds.includes(id)))
      } else {
        setSelectedNotifications((prev) => [...prev, ...yesterdayIds.filter((id) => !prev.includes(id))])
      }
    }
  }

  // Function to toggle select a single notification
  const toggleSelect = (id: string) => {
    if (selectedNotifications.includes(id)) {
      setSelectedNotifications((prev) => prev.filter((itemId) => itemId !== id))
    } else {
      setSelectedNotifications((prev) => [...prev, id])
    }
  }

  // Function to mark all notifications as read
  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({
        ...notification,
        read: true,
      })),
    )

    toast({
      title: "Success",
      description: "All notifications marked as read",
    })
  }

  // Function to mark selected notifications as read
  const markSelectedAsRead = () => {
    if (selectedNotifications.length === 0) {
      toast({
        title: "No notifications selected",
        description: "Please select at least one notification",
        variant: "destructive",
      })
      return
    }

    setNotifications((prev) =>
      prev.map((notification) => ({
        ...notification,
        read: selectedNotifications.includes(notification.id) ? true : notification.read,
      })),
    )

    toast({
      title: "Success",
      description: `${selectedNotifications.length} notification(s) marked as read`,
    })

    setSelectedNotifications([])
  }

  // Function to mark a single notification as read
  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => ({
        ...notification,
        read: notification.id === id ? true : notification.read,
      })),
    )
  }

  // Function to delete all notifications
  const deleteAll = () => {
    if (selectedView === "list") {
      setNotifications([])
      toast({
        title: "Success",
        description: "All notifications deleted",
      })
    } else {
      setDetailNotifications([])
      toast({
        title: "Success",
        description: "All HR notifications deleted",
      })
    }
  }

  // Function to delete selected notifications
  const deleteSelected = () => {
    if (selectedNotifications.length === 0) {
      toast({
        title: "No notifications selected",
        description: "Please select at least one notification",
        variant: "destructive",
      })
      return
    }

    setNotifications((prev) => prev.filter((notification) => !selectedNotifications.includes(notification.id)))

    toast({
      title: "Success",
      description: `${selectedNotifications.length} notification(s) deleted`,
    })

    setSelectedNotifications([])
  }

  // Function to delete a single notification
  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))

    toast({
      title: "Success",
      description: "Notification deleted",
    })
  }

  // Function to delete a detail notification
  const deleteDetailNotification = (id: string) => {
    setDetailNotifications((prev) => prev.filter((notification) => notification.id !== id))

    toast({
      title: "Success",
      description: "Notification deleted",
    })
  }

  // Reset selected notifications when view changes
  useEffect(() => {
    setSelectedNotifications([])
  }, [selectedView])

  return (
    <div>
      <PageHeader title="Notifications Screen" />

      <div className="p-6">
        {selectedView === "list" ? (
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold">Notifications {unreadCount > 0 && `(${unreadCount} unread)`}</h2>
                  <p className="text-sm text-muted-foreground">Read and delete notifications.</p>
                </div>
                <div className="flex gap-2">
                  {selectedNotifications.length > 0 ? (
                    <>
                      <Button onClick={markSelectedAsRead} className="bg-[#0089ff] hover:bg-[#248cd8]">
                        <Check className="h-4 w-4 mr-2" />
                        Mark Selected as Read
                      </Button>
                      <Button onClick={deleteSelected} variant="destructive">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Selected
                      </Button>
                    </>
                  ) : (
                    <Button onClick={markAllAsRead} className="bg-[#0089ff] hover:bg-[#248cd8]">
                      Mark All As Read
                    </Button>
                  )}
                </div>
              </div>

              {notifications.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No notifications to display</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {notifications.some((n) => n.day === "today") && (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium">Today</h3>
                        <div className="flex items-center">
                          <Checkbox
                            id="select-all-today"
                            checked={notifications
                              .filter((n) => n.day === "today")
                              .every((n) => selectedNotifications.includes(n.id))}
                            onCheckedChange={() => toggleSelectAll("today")}
                          />
                          <label htmlFor="select-all-today" className="ml-2 text-xs text-muted-foreground">
                            Select all
                          </label>
                        </div>
                      </div>

                      {notifications
                        .filter((notification) => notification.day === "today")
                        .map((notification) => (
                          <div key={notification.id} className="flex items-start py-4 border-b last:border-0">
                            <Checkbox
                              id={`select-${notification.id}`}
                              checked={selectedNotifications.includes(notification.id)}
                              onCheckedChange={() => toggleSelect(notification.id)}
                              className="mt-1 mr-3"
                            />
                            <div className="flex-1 flex gap-3">
                              <Avatar className="h-8 w-8 mt-1">
                                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Admin" />
                                <AvatarFallback>AD</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-start justify-between">
                                  <div>
                                    <p className="text-sm font-medium">{notification.title}</p>
                                    <p className="text-xs text-muted-foreground">{notification.time}</p>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    {!notification.read && <div className="w-2 h-2 rounded-full bg-[#0089ff]"></div>}
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                          <MoreVertical className="h-4 w-4" />
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end">
                                        {!notification.read && (
                                          <DropdownMenuItem onClick={() => markAsRead(notification.id)}>
                                            Mark as read
                                          </DropdownMenuItem>
                                        )}
                                        <DropdownMenuItem onClick={() => deleteNotification(notification.id)}>
                                          Delete
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}

                  {notifications.some((n) => n.day === "yesterday") && (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium">Yesterday 10th November, 2022</h3>
                        <div className="flex items-center">
                          <Checkbox
                            id="select-all-yesterday"
                            checked={notifications
                              .filter((n) => n.day === "yesterday")
                              .every((n) => selectedNotifications.includes(n.id))}
                            onCheckedChange={() => toggleSelectAll("yesterday")}
                          />
                          <label htmlFor="select-all-yesterday" className="ml-2 text-xs text-muted-foreground">
                            Select all
                          </label>
                        </div>
                      </div>

                      {notifications
                        .filter((notification) => notification.day === "yesterday")
                        .map((notification) => (
                          <div key={notification.id} className="flex items-start py-4 border-b last:border-0">
                            <Checkbox
                              id={`select-${notification.id}`}
                              checked={selectedNotifications.includes(notification.id)}
                              onCheckedChange={() => toggleSelect(notification.id)}
                              className="mt-1 mr-3"
                            />
                            <div className="flex-1 flex gap-3">
                              <Avatar className="h-8 w-8 mt-1">
                                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Admin" />
                                <AvatarFallback>AD</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-start justify-between">
                                  <div>
                                    <p className="text-sm font-medium">{notification.title}</p>
                                    <p className="text-xs text-muted-foreground">{notification.time}</p>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    {!notification.read && <div className="w-2 h-2 rounded-full bg-[#0089ff]"></div>}
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                          <MoreVertical className="h-4 w-4" />
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end">
                                        {!notification.read && (
                                          <DropdownMenuItem onClick={() => markAsRead(notification.id)}>
                                            Mark as read
                                          </DropdownMenuItem>
                                        )}
                                        <DropdownMenuItem onClick={() => deleteNotification(notification.id)}>
                                          Delete
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              )}

              <div className="flex justify-center mt-6">
                <Button variant="outline" onClick={() => setSelectedView("detail")} className="text-[#0089ff]">
                  View HR Notifications
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-6">
              <div className="flex items-center mb-6">
                <Button variant="ghost" size="sm" className="mr-2" onClick={() => setSelectedView("list")}>
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back
                </Button>
                <div className="flex-1">
                  <h2 className="text-xl font-bold">Notifications from HR</h2>
                  <p className="text-sm text-muted-foreground">Read and delete notifications.</p>
                </div>
                <Button onClick={deleteAll} className="bg-[#0089ff] hover:bg-[#248cd8]">
                  Delete All
                </Button>
              </div>

              {detailNotifications.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No HR notifications to display</p>
                </div>
              ) : (
                <div className="space-y-8">
                  {Array.from(new Set(detailNotifications.map((n) => n.date))).map((date) => (
                    <div key={date} className="space-y-4">
                      <h3 className="text-sm font-medium">{date}</h3>

                      {detailNotifications
                        .filter((notification) => notification.date === date)
                        .map((notification) => (
                          <div key={notification.id} className="relative border-l-4 border-[#0089ff] pl-4 py-2 group">
                            {notification.time && <p className="text-sm font-medium mb-1">{notification.time}</p>}
                            <p className="text-sm text-muted-foreground">{notification.content}</p>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => deleteDetailNotification(notification.id)}
                            >
                              <Trash2 className="h-4 w-4 text-muted-foreground hover:text-red-500" />
                            </Button>
                          </div>
                        ))}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        <div className="mt-8 text-center text-xs text-muted-foreground">
          Copyright © 2023 Rota Energy. All Rights Reserved
        </div>
      </div>
    </div>
  )
}
