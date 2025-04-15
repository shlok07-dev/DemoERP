"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { PageHeader } from "@/components/page-header"
import { SettingsCard } from "@/components/settings/settings-card"
import { Camera, Loader2, Save, User } from "lucide-react"

export default function ProfilePage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("personal")

  // Mock user data
  const [userData, setUserData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    jobTitle: "HR Manager",
    department: "Human Resources",
    employeeId: "EMP-2023-001",
    joinDate: "2023-01-15",
    role: "Admin",
    bio: "Experienced HR professional with over 10 years in talent acquisition and employee relations.",
  })

  // Mock activity data
  const recentActivity = [
    { id: 1, action: "Updated profile picture", date: "Today, 10:30 AM" },
    { id: 2, action: "Changed password", date: "Yesterday, 2:15 PM" },
    { id: 3, action: "Updated contact information", date: "May 15, 2023" },
    { id: 4, action: "Logged in from new device", date: "May 10, 2023" },
    { id: 5, action: "Enabled two-factor authentication", date: "May 5, 2023" },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsLoading(false)
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    })
  }

  const handleProfilePictureUpload = () => {
    // In a real app, this would trigger a file input
    toast({
      title: "Profile picture updated",
      description: "Your profile picture has been updated successfully.",
    })
  }

  return (
    <div className="container py-6 md:py-8 max-w-7xl mx-auto">
      <PageHeader heading="My Profile" description="View and manage your personal information" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile sidebar */}
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                  <div className="h-24 w-24 rounded-full overflow-hidden bg-muted">
                    <Image
                      src="/placeholder.svg?height=96&width=96"
                      alt="Profile"
                      width={96}
                      height={96}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute bottom-0 right-0 h-8 w-8 rounded-full"
                    onClick={handleProfilePictureUpload}
                  >
                    <Camera className="h-4 w-4" />
                    <span className="sr-only">Upload profile picture</span>
                  </Button>
                </div>
                <h3 className="text-lg font-medium">
                  {userData.firstName} {userData.lastName}
                </h3>
                <p className="text-sm text-muted-foreground">{userData.jobTitle}</p>
                <p className="text-sm text-muted-foreground">{userData.department}</p>

                <div className="w-full mt-6">
                  <div className="flex justify-between py-2 border-t">
                    <span className="text-sm text-muted-foreground">Employee ID</span>
                    <span className="text-sm font-medium">{userData.employeeId}</span>
                  </div>
                  <div className="flex justify-between py-2 border-t">
                    <span className="text-sm text-muted-foreground">Join Date</span>
                    <span className="text-sm font-medium">{userData.joinDate}</span>
                  </div>
                  <div className="flex justify-between py-2 border-t">
                    <span className="text-sm text-muted-foreground">Role</span>
                    <span className="text-sm font-medium">{userData.role}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-0">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex justify-between py-3 px-6 border-t">
                    <div>
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main content */}
        <div className="md:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="personal">Personal Information</TabsTrigger>
              <TabsTrigger value="security">Security & Access</TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-6">
              <form onSubmit={handleSubmit}>
                <SettingsCard
                  title="Personal Information"
                  description="Update your personal information"
                  footer={
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  }
                >
                  <div className="grid gap-4 py-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={userData.firstName}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" name="lastName" value={userData.lastName} onChange={handleInputChange} />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={userData.email}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" name="phone" value={userData.phone} onChange={handleInputChange} />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="jobTitle">Job Title</Label>
                        <Input id="jobTitle" name="jobTitle" value={userData.jobTitle} onChange={handleInputChange} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="department">Department</Label>
                        <Input
                          id="department"
                          name="department"
                          value={userData.department}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <textarea
                        id="bio"
                        name="bio"
                        value={userData.bio}
                        onChange={handleInputChange}
                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                  </div>
                </SettingsCard>
              </form>
            </TabsContent>

            <TabsContent value="security" className="space-y-6">
              <SettingsCard
                title="Change Password"
                description="Update your password to keep your account secure"
                footer={
                  <Button>
                    <Save className="mr-2 h-4 w-4" />
                    Update Password
                  </Button>
                }
              >
                <div className="grid gap-4 py-2">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input id="confirmPassword" type="password" />
                    </div>
                  </div>
                </div>
              </SettingsCard>

              <SettingsCard
                title="Two-Factor Authentication"
                description="Add an extra layer of security to your account"
                footer={<Button variant="outline">Enable Two-Factor Authentication</Button>}
              >
                <div className="flex items-center justify-between py-2">
                  <div>
                    <h4 className="text-sm font-medium">Two-Factor Authentication</h4>
                    <p className="text-sm text-muted-foreground">
                      Protect your account with an additional security layer
                    </p>
                  </div>
                  <div className="text-sm font-medium text-destructive">Not Enabled</div>
                </div>
              </SettingsCard>

              <SettingsCard title="Active Sessions" description="Manage your active sessions across devices">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="rounded-md bg-primary/10 p-2">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Current Session</p>
                        <p className="text-xs text-muted-foreground">Windows • Chrome • New York, USA</p>
                        <p className="text-xs text-muted-foreground mt-1">Started 2 hours ago</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-xs">
                      Current
                    </Button>
                  </div>
                  <Separator />
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="rounded-md bg-muted p-2">
                        <User className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Mobile App</p>
                        <p className="text-xs text-muted-foreground">iOS • Native App • New York, USA</p>
                        <p className="text-xs text-muted-foreground mt-1">Started 1 day ago</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="text-xs">
                      Log Out
                    </Button>
                  </div>
                </div>
              </SettingsCard>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
