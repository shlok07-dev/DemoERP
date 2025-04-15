"use client"

import type React from "react"

import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PageHeader } from "@/components/page-header"
import { SettingsCard } from "@/components/settings/settings-card"
import { Separator } from "@/components/ui/separator"
import { Save, Shield, Smartphone, Key, Eye, EyeOff, Loader2, LogOut, AlertTriangle } from "lucide-react"

export default function SecuritySettingsPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  // Mock security settings
  const [settings, setSettings] = useState({
    twoFactorAuth: false,
    loginAlerts: true,
    sessionTimeout: "30",
    passwordExpiry: "90",
    deviceManagement: true,
    ipRestriction: false,
    dataEncryption: true,
  })

  // Mock password form
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
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

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSaveSettings = async () => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsLoading(false)
    toast({
      title: "Security settings saved",
      description: "Your security settings have been updated successfully.",
    })
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Validate passwords
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setIsLoading(false)
      toast({
        title: "Passwords do not match",
        description: "Your new password and confirmation password do not match.",
        variant: "destructive",
      })
      return
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsLoading(false)
    toast({
      title: "Password updated",
      description: "Your password has been updated successfully.",
    })

    // Reset form
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
  }

  return (
    <div className="container py-6 md:py-8 max-w-7xl mx-auto">
      <PageHeader heading="Security Settings" description="Manage your account security and privacy settings" />

      <div className="space-y-6">
        <SettingsCard title="Password Management" description="Update your password to keep your account secure">
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  name="currentPassword"
                  type={showPassword ? "text" : "password"}
                  value={passwordForm.currentPassword}
                  onChange={handlePasswordChange}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={handlePasswordChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={handlePasswordChange}
                  required
                />
              </div>
            </div>

            <div className="pt-2">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Key className="mr-2 h-4 w-4" />
                    Update Password
                  </>
                )}
              </Button>
            </div>
          </form>
        </SettingsCard>

        <SettingsCard
          title="Two-Factor Authentication"
          description="Add an extra layer of security to your account"
          footer={
            settings.twoFactorAuth ? (
              <Button variant="outline" onClick={() => handleSwitchChange("twoFactorAuth")}>
                Disable Two-Factor Authentication
              </Button>
            ) : (
              <Button onClick={() => handleSwitchChange("twoFactorAuth")}>Enable Two-Factor Authentication</Button>
            )
          }
        >
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <Smartphone className="h-4 w-4 text-muted-foreground" />
                <Label htmlFor="two-factor-auth">Two-Factor Authentication</Label>
              </div>
              <p className="text-sm text-muted-foreground">Protect your account with an additional security layer</p>
            </div>
            <Switch
              id="two-factor-auth"
              checked={settings.twoFactorAuth}
              onCheckedChange={() => handleSwitchChange("twoFactorAuth")}
            />
          </div>

          {settings.twoFactorAuth && (
            <div className="mt-4 rounded-md bg-muted p-4">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium">Two-Factor Authentication is enabled</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Your account is protected with an additional layer of security. You will need to enter a
                    verification code from your authenticator app when signing in.
                  </p>
                </div>
              </div>
            </div>
          )}
        </SettingsCard>

        <SettingsCard
          title="Session Management"
          description="Configure session timeout and security settings"
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
              <p className="text-xs text-muted-foreground mt-1">
                Your session will automatically expire after this period of inactivity
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password-expiry">Password Expiry</Label>
              <Select
                value={settings.passwordExpiry}
                onValueChange={(value) => handleSelectChange("passwordExpiry", value)}
              >
                <SelectTrigger id="password-expiry" className="w-full md:w-[240px]">
                  <SelectValue placeholder="Select expiry period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 days</SelectItem>
                  <SelectItem value="60">60 days</SelectItem>
                  <SelectItem value="90">90 days</SelectItem>
                  <SelectItem value="180">180 days</SelectItem>
                  <SelectItem value="never">Never</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-1">
                You will be prompted to change your password after this period
              </p>
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
          title="Advanced Security"
          description="Configure advanced security settings for your account"
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
                <Label htmlFor="device-management">Device Management</Label>
                <p className="text-sm text-muted-foreground">
                  Track and manage devices that have access to your account
                </p>
              </div>
              <Switch
                id="device-management"
                checked={settings.deviceManagement}
                onCheckedChange={() => handleSwitchChange("deviceManagement")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="ip-restriction">IP Restriction</Label>
                <p className="text-sm text-muted-foreground">
                  Restrict access to your account from specific IP addresses
                </p>
              </div>
              <Switch
                id="ip-restriction"
                checked={settings.ipRestriction}
                onCheckedChange={() => handleSwitchChange("ipRestriction")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="data-encryption">Data Encryption</Label>
                <p className="text-sm text-muted-foreground">Enable end-to-end encryption for sensitive data</p>
              </div>
              <Switch
                id="data-encryption"
                checked={settings.dataEncryption}
                onCheckedChange={() => handleSwitchChange("dataEncryption")}
              />
            </div>
          </div>
        </SettingsCard>

        <SettingsCard title="Active Sessions" description="Manage your active sessions across devices">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="rounded-md bg-primary/10 p-2">
                  <Shield className="h-5 w-5 text-primary" />
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

            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="rounded-md bg-muted p-2">
                  <Shield className="h-5 w-5 text-muted-foreground" />
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

            <Separator />

            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="rounded-md bg-muted p-2">
                  <Shield className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium">Desktop App</p>
                  <p className="text-xs text-muted-foreground">macOS • Desktop • San Francisco, USA</p>
                  <p className="text-xs text-muted-foreground mt-1">Started 3 days ago</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="text-xs">
                Log Out
              </Button>
            </div>
          </div>

          <div className="mt-6">
            <Button variant="outline" className="w-full">
              <LogOut className="mr-2 h-4 w-4" />
              Log Out From All Devices
            </Button>
          </div>
        </SettingsCard>

        <SettingsCard title="Danger Zone" description="Irreversible and destructive actions">
          <div className="rounded-md border border-destructive/50 p-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-destructive">Delete Account</h4>
                  <p className="text-sm text-muted-foreground">
                    Permanently delete your account and all associated data. This action cannot be undone.
                  </p>
                </div>
              </div>
              <Button variant="destructive" size="sm">
                Delete Account
              </Button>
            </div>
          </div>
        </SettingsCard>
      </div>
    </div>
  )
}
