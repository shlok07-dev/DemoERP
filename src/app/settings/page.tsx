"use client"

import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PageHeader } from "@/components/page-header"
import { SettingsCard } from "@/components/settings/settings-card"
import { Separator } from "@/components/ui/separator"
import { Save, Moon, Sun, Laptop, Globe, Loader2, Eye, EyeOff, LogOut } from "lucide-react"

export default function SettingsPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("general")

  // Mock settings data
  const [settings, setSettings] = useState({
    theme: "system",
    language: "english",
    timezone: "utc-5",
    autoSave: true,
    compactMode: false,
    highContrastMode: false,
    emailNotifications: true,
    pushNotifications: true,
    marketingEmails: false,
    updateNotifications: true,
    sessionTimeout: "30",
    twoFactorAuth: false,
    loginAlerts: true,
    dataSharing: "minimal",
  })

  const handleSwitchChange = (field: string) => {
    setSettings((prev) => ({
      ...prev,
      [field]: !prev[field as keyof typeof prev],
    }))
  }

  const handleSelectChange = (field: string, value: string) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSaveSettings = async () => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsLoading(false)
    toast({
      title: "Settings saved",
      description: "Your settings have been updated successfully.",
    })
  }

  return (
    <div className="container py-6 md:py-8 max-w-7xl mx-auto">
      <PageHeader heading="Settings" description="Manage your account settings and preferences" />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 mb-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security & Privacy</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <SettingsCard title="Appearance" description="Customize how the ERP system looks on your device">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="theme">Theme</Label>
                <Select value={settings.theme} onValueChange={(value) => handleSelectChange("theme", value)}>
                  <SelectTrigger id="theme" className="w-full md:w-[240px]">
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">
                      <div className="flex items-center gap-2">
                        <Sun className="h-4 w-4" />
                        <span>Light</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="dark">
                      <div className="flex items-center gap-2">
                        <Moon className="h-4 w-4" />
                        <span>Dark</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="system">
                      <div className="flex items-center gap-2">
                        <Laptop className="h-4 w-4" />
                        <span>System</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="compact-mode">Compact Mode</Label>
                  <p className="text-sm text-muted-foreground">Use a more compact view to fit more content on screen</p>
                </div>
                <Switch
                  id="compact-mode"
                  checked={settings.compactMode}
                  onCheckedChange={() => handleSwitchChange("compactMode")}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="high-contrast">High Contrast</Label>
                  <p className="text-sm text-muted-foreground">Increase contrast for better visibility</p>
                </div>
                <Switch
                  id="high-contrast"
                  checked={settings.highContrastMode}
                  onCheckedChange={() => handleSwitchChange("highContrastMode")}
                />
              </div>
            </div>
          </SettingsCard>

          <SettingsCard title="Language & Region" description="Set your language and regional preferences">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select value={settings.language} onValueChange={(value) => handleSelectChange("language", value)}>
                  <SelectTrigger id="language" className="w-full md:w-[240px]">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        <span>English</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="spanish">
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        <span>Spanish</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="french">
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        <span>French</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="german">
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        <span>German</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select value={settings.timezone} onValueChange={(value) => handleSelectChange("timezone", value)}>
                  <SelectTrigger id="timezone" className="w-full md:w-[240px]">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="utc-8">UTC-8 (Pacific Time)</SelectItem>
                    <SelectItem value="utc-5">UTC-5 (Eastern Time)</SelectItem>
                    <SelectItem value="utc+0">UTC+0 (Greenwich Mean Time)</SelectItem>
                    <SelectItem value="utc+1">UTC+1 (Central European Time)</SelectItem>
                    <SelectItem value="utc+8">UTC+8 (China Standard Time)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </SettingsCard>

          <SettingsCard
            title="Auto-Save"
            description="Configure auto-save settings for forms and documents"
            footer={
              <Button onClick={handleSaveSettings} disabled={isLoading}>
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
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="auto-save">Enable Auto-Save</Label>
                <p className="text-sm text-muted-foreground">Automatically save your work every few minutes</p>
              </div>
              <Switch
                id="auto-save"
                checked={settings.autoSave}
                onCheckedChange={() => handleSwitchChange("autoSave")}
              />
            </div>
          </SettingsCard>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <SettingsCard title="Email Notifications" description="Configure which email notifications you receive">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                </div>
                <Switch
                  id="email-notifications"
                  checked={settings.emailNotifications}
                  onCheckedChange={() => handleSwitchChange("emailNotifications")}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="marketing-emails">Marketing Emails</Label>
                  <p className="text-sm text-muted-foreground">Receive marketing and promotional emails</p>
                </div>
                <Switch
                  id="marketing-emails"
                  checked={settings.marketingEmails}
                  onCheckedChange={() => handleSwitchChange("marketingEmails")}
                />
              </div>
            </div>
          </SettingsCard>

          <SettingsCard
            title="System Notifications"
            description="Configure system and push notifications"
            footer={
              <Button onClick={handleSaveSettings} disabled={isLoading}>
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
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="push-notifications">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive push notifications in your browser</p>
                </div>
                <Switch
                  id="push-notifications"
                  checked={settings.pushNotifications}
                  onCheckedChange={() => handleSwitchChange("pushNotifications")}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="update-notifications">System Updates</Label>
                  <p className="text-sm text-muted-foreground">Get notified about system updates and maintenance</p>
                </div>
                <Switch
                  id="update-notifications"
                  checked={settings.updateNotifications}
                  onCheckedChange={() => handleSwitchChange("updateNotifications")}
                />
              </div>
            </div>
          </SettingsCard>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <SettingsCard title="Account Security" description="Configure security settings for your account">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="session-timeout">Session Timeout</Label>
                <Select
                  value={settings.sessionTimeout}
                  onValueChange={(value) => handleSelectChange("sessionTimeout", value)}
                >
                  <SelectTrigger id="session-timeout" className="w-full md:w-[240px]">
                    <SelectValue placeholder="Select timeout" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="120">2 hours</SelectItem>
                    <SelectItem value="240">4 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                </div>
                <Switch
                  id="two-factor"
                  checked={settings.twoFactorAuth}
                  onCheckedChange={() => handleSwitchChange("twoFactorAuth")}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="login-alerts">Login Alerts</Label>
                  <p className="text-sm text-muted-foreground">Get notified when someone logs into your account</p>
                </div>
                <Switch
                  id="login-alerts"
                  checked={settings.loginAlerts}
                  onCheckedChange={() => handleSwitchChange("loginAlerts")}
                />
              </div>
            </div>
          </SettingsCard>

          <SettingsCard
            title="Privacy"
            description="Manage your privacy settings and data sharing preferences"
            footer={
              <Button onClick={handleSaveSettings} disabled={isLoading}>
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
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="data-sharing">Data Sharing</Label>
                <Select
                  value={settings.dataSharing}
                  onValueChange={(value) => handleSelectChange("dataSharing", value)}
                >
                  <SelectTrigger id="data-sharing" className="w-full md:w-[240px]">
                    <SelectValue placeholder="Select data sharing level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">
                      <div className="flex items-center gap-2">
                        <EyeOff className="h-4 w-4" />
                        <span>None</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="minimal">
                      <div className="flex items-center gap-2">
                        <Eye className="h-4 w-4" />
                        <span>Minimal</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="full">
                      <div className="flex items-center gap-2">
                        <Eye className="h-4 w-4" />
                        <span>Full</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">
                  Controls how much data is shared for analytics and improvements
                </p>
              </div>
            </div>
          </SettingsCard>

          <SettingsCard title="Danger Zone" description="Irreversible and destructive actions">
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-medium">Sign out from all devices</h4>
                  <p className="text-sm text-muted-foreground">
                    This will sign you out from all devices except this one
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out All Devices
                </Button>
              </div>

              <Separator />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-medium text-destructive">Delete Account</h4>
                  <p className="text-sm text-muted-foreground">
                    Permanently delete your account and all associated data
                  </p>
                </div>
                <Button variant="destructive" size="sm">
                  Delete Account
                </Button>
              </div>
            </div>
          </SettingsCard>
        </TabsContent>
      </Tabs>
    </div>
  )
}
