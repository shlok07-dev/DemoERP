"use client"

import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { PageHeader } from "@/components/page-header"
import { SettingsCard } from "@/components/settings/settings-card"
import { Separator } from "@/components/ui/separator"
import { Save, Bell, Mail, Smartphone, Loader2 } from "lucide-react"

export default function NotificationsSettingsPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  // Mock notification settings
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,

    // Email notifications
    emailStaffUpdates: true,
    emailPayrollProcessing: true,
    emailMemoNotifications: true,
    emailCircularNotifications: true,
    emailMaintenanceAlerts: false,
    emailInventoryAlerts: true,
    emailProcurementUpdates: true,

    // Push notifications
    pushStaffUpdates: false,
    pushPayrollProcessing: true,
    pushMemoNotifications: true,
    pushCircularNotifications: true,
    pushMaintenanceAlerts: true,
    pushInventoryAlerts: false,
    pushProcurementUpdates: true,

    // SMS notifications
    smsStaffUpdates: false,
    smsPayrollProcessing: false,
    smsMemoNotifications: false,
    smsCircularNotifications: false,
    smsMaintenanceAlerts: false,
    smsInventoryAlerts: false,
    smsProcurementUpdates: false,
  })

  const handleSwitchChange = (field: string) => {
    setSettings((prev) => ({
      ...prev,
      [field]: !prev[field as keyof typeof prev],
    }))
  }

  const handleSaveSettings = async () => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsLoading(false)
    toast({
      title: "Notification settings saved",
      description: "Your notification preferences have been updated successfully.",
    })
  }

  return (
    <div className="container py-6 md:py-8 max-w-7xl mx-auto">
      <PageHeader heading="Notification Settings" description="Manage how you receive notifications from the system" />

      <div className="space-y-6">
        <SettingsCard title="Notification Channels" description="Choose how you want to receive notifications">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                </div>
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
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="push-notifications">Push Notifications</Label>
                </div>
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
                <div className="flex items-center gap-2">
                  <Smartphone className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="sms-notifications">SMS Notifications</Label>
                </div>
                <p className="text-sm text-muted-foreground">
                  Receive notifications via SMS (standard rates may apply)
                </p>
              </div>
              <Switch
                id="sms-notifications"
                checked={settings.smsNotifications}
                onCheckedChange={() => handleSwitchChange("smsNotifications")}
              />
            </div>
          </div>
        </SettingsCard>

        <SettingsCard
          title="Email Notification Preferences"
          description="Choose which notifications you want to receive via email"
          footer={
            <Button onClick={handleSaveSettings} disabled={isLoading || !settings.emailNotifications}>
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
              <Label
                htmlFor="email-staff-updates"
                className={!settings.emailNotifications ? "text-muted-foreground" : ""}
              >
                Staff Updates
              </Label>
              <Switch
                id="email-staff-updates"
                checked={settings.emailStaffUpdates}
                onCheckedChange={() => handleSwitchChange("emailStaffUpdates")}
                disabled={!settings.emailNotifications}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label
                htmlFor="email-payroll-processing"
                className={!settings.emailNotifications ? "text-muted-foreground" : ""}
              >
                Payroll Processing
              </Label>
              <Switch
                id="email-payroll-processing"
                checked={settings.emailPayrollProcessing}
                onCheckedChange={() => handleSwitchChange("emailPayrollProcessing")}
                disabled={!settings.emailNotifications}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label
                htmlFor="email-memo-notifications"
                className={!settings.emailNotifications ? "text-muted-foreground" : ""}
              >
                Memo Notifications
              </Label>
              <Switch
                id="email-memo-notifications"
                checked={settings.emailMemoNotifications}
                onCheckedChange={() => handleSwitchChange("emailMemoNotifications")}
                disabled={!settings.emailNotifications}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label
                htmlFor="email-circular-notifications"
                className={!settings.emailNotifications ? "text-muted-foreground" : ""}
              >
                Circular Notifications
              </Label>
              <Switch
                id="email-circular-notifications"
                checked={settings.emailCircularNotifications}
                onCheckedChange={() => handleSwitchChange("emailCircularNotifications")}
                disabled={!settings.emailNotifications}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label
                htmlFor="email-maintenance-alerts"
                className={!settings.emailNotifications ? "text-muted-foreground" : ""}
              >
                Maintenance Alerts
              </Label>
              <Switch
                id="email-maintenance-alerts"
                checked={settings.emailMaintenanceAlerts}
                onCheckedChange={() => handleSwitchChange("emailMaintenanceAlerts")}
                disabled={!settings.emailNotifications}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label
                htmlFor="email-inventory-alerts"
                className={!settings.emailNotifications ? "text-muted-foreground" : ""}
              >
                Inventory Alerts
              </Label>
              <Switch
                id="email-inventory-alerts"
                checked={settings.emailInventoryAlerts}
                onCheckedChange={() => handleSwitchChange("emailInventoryAlerts")}
                disabled={!settings.emailNotifications}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label
                htmlFor="email-procurement-updates"
                className={!settings.emailNotifications ? "text-muted-foreground" : ""}
              >
                Procurement Updates
              </Label>
              <Switch
                id="email-procurement-updates"
                checked={settings.emailProcurementUpdates}
                onCheckedChange={() => handleSwitchChange("emailProcurementUpdates")}
                disabled={!settings.emailNotifications}
              />
            </div>
          </div>
        </SettingsCard>

        <SettingsCard
          title="Push Notification Preferences"
          description="Choose which notifications you want to receive as push notifications"
          footer={
            <Button onClick={handleSaveSettings} disabled={isLoading || !settings.pushNotifications}>
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
              <Label
                htmlFor="push-staff-updates"
                className={!settings.pushNotifications ? "text-muted-foreground" : ""}
              >
                Staff Updates
              </Label>
              <Switch
                id="push-staff-updates"
                checked={settings.pushStaffUpdates}
                onCheckedChange={() => handleSwitchChange("pushStaffUpdates")}
                disabled={!settings.pushNotifications}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label
                htmlFor="push-payroll-processing"
                className={!settings.pushNotifications ? "text-muted-foreground" : ""}
              >
                Payroll Processing
              </Label>
              <Switch
                id="push-payroll-processing"
                checked={settings.pushPayrollProcessing}
                onCheckedChange={() => handleSwitchChange("pushPayrollProcessing")}
                disabled={!settings.pushNotifications}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label
                htmlFor="push-memo-notifications"
                className={!settings.pushNotifications ? "text-muted-foreground" : ""}
              >
                Memo Notifications
              </Label>
              <Switch
                id="push-memo-notifications"
                checked={settings.pushMemoNotifications}
                onCheckedChange={() => handleSwitchChange("pushMemoNotifications")}
                disabled={!settings.pushNotifications}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label
                htmlFor="push-circular-notifications"
                className={!settings.pushNotifications ? "text-muted-foreground" : ""}
              >
                Circular Notifications
              </Label>
              <Switch
                id="push-circular-notifications"
                checked={settings.pushCircularNotifications}
                onCheckedChange={() => handleSwitchChange("pushCircularNotifications")}
                disabled={!settings.pushNotifications}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label
                htmlFor="push-maintenance-alerts"
                className={!settings.pushNotifications ? "text-muted-foreground" : ""}
              >
                Maintenance Alerts
              </Label>
              <Switch
                id="push-maintenance-alerts"
                checked={settings.pushMaintenanceAlerts}
                onCheckedChange={() => handleSwitchChange("pushMaintenanceAlerts")}
                disabled={!settings.pushNotifications}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label
                htmlFor="push-inventory-alerts"
                className={!settings.pushNotifications ? "text-muted-foreground" : ""}
              >
                Inventory Alerts
              </Label>
              <Switch
                id="push-inventory-alerts"
                checked={settings.pushInventoryAlerts}
                onCheckedChange={() => handleSwitchChange("pushInventoryAlerts")}
                disabled={!settings.pushNotifications}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label
                htmlFor="push-procurement-updates"
                className={!settings.pushNotifications ? "text-muted-foreground" : ""}
              >
                Procurement Updates
              </Label>
              <Switch
                id="push-procurement-updates"
                checked={settings.pushProcurementUpdates}
                onCheckedChange={() => handleSwitchChange("pushProcurementUpdates")}
                disabled={!settings.pushNotifications}
              />
            </div>
          </div>
        </SettingsCard>

        <SettingsCard
          title="SMS Notification Preferences"
          description="Choose which notifications you want to receive via SMS"
          footer={
            <Button onClick={handleSaveSettings} disabled={isLoading || !settings.smsNotifications}>
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
              <Label htmlFor="sms-staff-updates" className={!settings.smsNotifications ? "text-muted-foreground" : ""}>
                Staff Updates
              </Label>
              <Switch
                id="sms-staff-updates"
                checked={settings.smsStaffUpdates}
                onCheckedChange={() => handleSwitchChange("smsStaffUpdates")}
                disabled={!settings.smsNotifications}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label
                htmlFor="sms-payroll-processing"
                className={!settings.smsNotifications ? "text-muted-foreground" : ""}
              >
                Payroll Processing
              </Label>
              <Switch
                id="sms-payroll-processing"
                checked={settings.smsPayrollProcessing}
                onCheckedChange={() => handleSwitchChange("smsPayrollProcessing")}
                disabled={!settings.smsNotifications}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label
                htmlFor="sms-memo-notifications"
                className={!settings.smsNotifications ? "text-muted-foreground" : ""}
              >
                Memo Notifications
              </Label>
              <Switch
                id="sms-memo-notifications"
                checked={settings.smsMemoNotifications}
                onCheckedChange={() => handleSwitchChange("smsMemoNotifications")}
                disabled={!settings.smsNotifications}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label
                htmlFor="sms-circular-notifications"
                className={!settings.smsNotifications ? "text-muted-foreground" : ""}
              >
                Circular Notifications
              </Label>
              <Switch
                id="sms-circular-notifications"
                checked={settings.smsCircularNotifications}
                onCheckedChange={() => handleSwitchChange("smsCircularNotifications")}
                disabled={!settings.smsNotifications}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label
                htmlFor="sms-maintenance-alerts"
                className={!settings.smsNotifications ? "text-muted-foreground" : ""}
              >
                Maintenance Alerts
              </Label>
              <Switch
                id="sms-maintenance-alerts"
                checked={settings.smsMaintenanceAlerts}
                onCheckedChange={() => handleSwitchChange("smsMaintenanceAlerts")}
                disabled={!settings.smsNotifications}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label
                htmlFor="sms-inventory-alerts"
                className={!settings.smsNotifications ? "text-muted-foreground" : ""}
              >
                Inventory Alerts
              </Label>
              <Switch
                id="sms-inventory-alerts"
                checked={settings.smsInventoryAlerts}
                onCheckedChange={() => handleSwitchChange("smsInventoryAlerts")}
                disabled={!settings.smsNotifications}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label
                htmlFor="sms-procurement-updates"
                className={!settings.smsNotifications ? "text-muted-foreground" : ""}
              >
                Procurement Updates
              </Label>
              <Switch
                id="sms-procurement-updates"
                checked={settings.smsProcurementUpdates}
                onCheckedChange={() => handleSwitchChange("smsProcurementUpdates")}
                disabled={!settings.smsNotifications}
              />
            </div>
          </div>
        </SettingsCard>
      </div>
    </div>
  )
}
