"use client"

import type React from "react"

import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PageHeader } from "@/components/page-header"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Send, Mail, Phone, Clock, MessageSquare, HelpCircle, FileQuestion, AlertCircle, Loader2 } from "lucide-react"

export default function ContactSupportPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  // Mock contact form
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    department: "",
    category: "",
    subject: "",
    message: "",
    priority: "medium",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setContactForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (field: string, value: string) => {
    setContactForm((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsLoading(false)
    toast({
      title: "Support request submitted",
      description: "Your message has been sent to our support team. We'll get back to you soon.",
    })

    // Reset form
    setContactForm({
      name: "",
      email: "",
      department: "",
      category: "",
      subject: "",
      message: "",
      priority: "medium",
    })
  }

  return (
    <div className="container py-6 md:py-8 max-w-7xl mx-auto">
      <PageHeader heading="Contact Support" description="Get in touch with our support team for assistance" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Submit a Support Request</CardTitle>
              <CardDescription>Fill out the form below with details about your issue or question</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={contactForm.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={contactForm.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email address"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Select
                      value={contactForm.department}
                      onValueChange={(value) => handleSelectChange("department", value)}
                    >
                      <SelectTrigger id="department">
                        <SelectValue placeholder="Select your department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hr">Human Resources</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="it">IT</SelectItem>
                        <SelectItem value="operations">Operations</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="sales">Sales</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Issue Category</Label>
                    <Select
                      value={contactForm.category}
                      onValueChange={(value) => handleSelectChange("category", value)}
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select issue category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technical">Technical Issue</SelectItem>
                        <SelectItem value="account">Account Access</SelectItem>
                        <SelectItem value="billing">Billing Question</SelectItem>
                        <SelectItem value="feature">Feature Request</SelectItem>
                        <SelectItem value="bug">Bug Report</SelectItem>
                        <SelectItem value="question">General Question</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={contactForm.subject}
                    onChange={handleInputChange}
                    placeholder="Brief description of your issue"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <textarea
                    id="message"
                    name="message"
                    value={contactForm.message}
                    onChange={handleInputChange}
                    placeholder="Please provide as much detail as possible about your issue or question"
                    required
                    className="flex min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">Priority Level</Label>
                  <Select value={contactForm.priority} onValueChange={(value) => handleSelectChange("priority", value)}>
                    <SelectTrigger id="priority">
                      <SelectValue placeholder="Select priority level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low - General question or feedback</SelectItem>
                      <SelectItem value="medium">Medium - Issue affecting work but has workaround</SelectItem>
                      <SelectItem value="high">High - Serious issue affecting productivity</SelectItem>
                      <SelectItem value="critical">Critical - System down or inaccessible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="pt-4">
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Submit Support Request
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Other ways to get in touch with our support team</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium">Email Support</h4>
                  <p className="text-sm text-muted-foreground">support@uiuxotor-erp.com</p>
                  <p className="text-xs text-muted-foreground mt-1">We typically respond within 24 hours</p>
                </div>
              </div>

              <Separator />

              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium">Phone Support</h4>
                  <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                  <p className="text-xs text-muted-foreground mt-1">Monday to Friday, 9am to 5pm EST</p>
                </div>
              </div>

              <Separator />

              <div className="flex items-start gap-3">
                <MessageSquare className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium">Live Chat</h4>
                  <p className="text-sm text-muted-foreground">Available on the dashboard</p>
                  <p className="text-xs text-muted-foreground mt-1">Chat with our support team in real-time</p>
                </div>
              </div>

              <Separator />

              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium">Support Hours</h4>
                  <p className="text-sm text-muted-foreground">Monday to Friday: 9am - 5pm EST</p>
                  <p className="text-sm text-muted-foreground">Saturday: 10am - 2pm EST</p>
                  <p className="text-sm text-muted-foreground">Sunday: Closed</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Support Resources</CardTitle>
              <CardDescription>Helpful resources for common issues</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <HelpCircle className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium">Knowledge Base</h4>
                  <p className="text-sm text-muted-foreground">Browse our comprehensive documentation and tutorials</p>
                  <Button variant="link" className="p-0 h-auto text-sm mt-1">
                    View Knowledge Base
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="flex items-start gap-3">
                <FileQuestion className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium">FAQs</h4>
                  <p className="text-sm text-muted-foreground">Find answers to frequently asked questions</p>
                  <Button variant="link" className="p-0 h-auto text-sm mt-1">
                    View FAQs
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium">System Status</h4>
                  <p className="text-sm text-muted-foreground">Check the current status of our services</p>
                  <Button variant="link" className="p-0 h-auto text-sm mt-1">
                    View System Status
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
