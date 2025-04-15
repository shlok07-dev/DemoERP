"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { PageHeader } from "@/components/page-header"
import { SectionHeader } from "@/components/section-header"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Search,
  FileText,
  Video,
  MessageSquare,
  ChevronRight,
  Loader2,
  Send,
  PlayCircle,
  BookOpen,
  Mail,
  Phone,
  Clock,
} from "lucide-react"

export default function HelpPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("documentation")
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  // Mock documentation categories
  const documentationCategories = [
    {
      title: "Getting Started",
      icon: BookOpen,
      description: "Learn the basics of the ERP system",
      articles: [
        { title: "System Overview", url: "#overview" },
        { title: "User Roles and Permissions", url: "#roles" },
        { title: "Navigation Guide", url: "#navigation" },
        { title: "Dashboard Explained", url: "#dashboard" },
      ],
    },
    {
      title: "Staff Management",
      icon: FileText,
      description: "Managing staff records and information",
      articles: [
        { title: "Adding New Staff", url: "#add-staff" },
        { title: "Staff Profiles", url: "#staff-profiles" },
        { title: "Departments and Roles", url: "#departments" },
        { title: "Staff Reports", url: "#staff-reports" },
      ],
    },
    {
      title: "Payroll",
      icon: FileText,
      description: "Payroll processing and management",
      articles: [
        { title: "Salary Definitions", url: "#salary-definitions" },
        { title: "Tax Configurations", url: "#tax-config" },
        { title: "Generating Payslips", url: "#payslips" },
        { title: "Payroll Reports", url: "#payroll-reports" },
      ],
    },
    {
      title: "Video Tutorials",
      icon: Video,
      description: "Step-by-step video guides",
      articles: [
        { title: "ERP System Overview", url: "#video-overview" },
        { title: "Staff Management Tutorial", url: "#video-staff" },
        { title: "Payroll Processing", url: "#video-payroll" },
        { title: "Reporting Features", url: "#video-reports" },
      ],
    },
  ]

  // Mock FAQs
  const faqs = [
    {
      question: "How do I reset my password?",
      answer:
        "You can reset your password by clicking on the 'Forgot Password' link on the login page. Follow the instructions sent to your email to create a new password.",
    },
    {
      question: "How do I add a new staff member?",
      answer:
        "Navigate to the Staff Management module, click on 'Add Staff', and fill out the required information in the form. Once completed, click 'Save' to add the new staff member to the system.",
    },
    {
      question: "How do I generate payroll for a specific period?",
      answer:
        "Go to the Payroll module, select 'Generate Payroll', choose the desired pay period, select the employees to include, and click 'Generate'. The system will calculate the payroll based on the defined salary structures and deductions.",
    },
    {
      question: "Can I export reports to Excel or PDF?",
      answer:
        "Yes, most reports in the system can be exported to Excel or PDF. Look for the export button (usually represented by a download icon) at the top of the report view, click it, and select your preferred format.",
    },
    {
      question: "How do I create a new circular?",
      answer:
        "Navigate to the Circulars module, click on 'Create Circular', fill out the form with the circular details, select the recipients, and click 'Publish'. The circular will be distributed to the selected recipients.",
    },
    {
      question: "How do I track inventory items?",
      answer:
        "Go to the Stocks and Inventory module, where you can view all inventory items. You can filter by category, location, or status. Click on any item to view its detailed history and current status.",
    },
    {
      question: "How do I schedule maintenance for equipment?",
      answer:
        "Navigate to the Maintenance module, select 'Schedule', choose the equipment that needs maintenance, set the date and time, assign personnel, and save the schedule. The system will send notifications to relevant staff.",
    },
    {
      question: "How do I create a procurement request?",
      answer:
        "Go to the Procurements module, click 'Create Request', fill out the procurement details including items, quantities, and justification, select approvers, and submit the request for approval.",
    },
  ]

  // Mock video tutorials
  const videoTutorials = [
    {
      title: "Getting Started with the ERP System",
      duration: "5:32",
      thumbnail: "/placeholder.svg?height=120&width=220",
      url: "#video1",
    },
    {
      title: "Managing Staff Records",
      duration: "8:15",
      thumbnail: "/placeholder.svg?height=120&width=220",
      url: "#video2",
    },
    {
      title: "Payroll Processing Guide",
      duration: "12:47",
      thumbnail: "/placeholder.svg?height=120&width=220",
      url: "#video3",
    },
    {
      title: "Inventory Management",
      duration: "7:23",
      thumbnail: "/placeholder.svg?height=120&width=220",
      url: "#video4",
    },
    {
      title: "Creating and Managing Circulars",
      duration: "6:10",
      thumbnail: "/placeholder.svg?height=120&width=220",
      url: "#video5",
    },
    {
      title: "Procurement Workflow",
      duration: "9:58",
      thumbnail: "/placeholder.svg?height=120&width=220",
      url: "#video6",
    },
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    setIsLoading(true)

    // Simulate search API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Search results",
        description: `Found results for "${searchQuery}"`,
      })
    }, 1000)
  }

  const handleContactFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setContactForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Message sent",
        description: "Your message has been sent to our support team. We'll get back to you soon.",
      })
      setContactForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
    }, 1000)
  }

  return (
    <div className="container py-6 md:py-8 max-w-7xl mx-auto">
      <PageHeader heading="Help & Support" description="Find answers, tutorials, and support for the ERP system" />

      <div className="mb-8">
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search for help articles, tutorials, and FAQs..."
            className="pl-10 h-12"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button
            type="submit"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-10"
            disabled={isLoading || !searchQuery.trim()}
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Search"}
          </Button>
        </form>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 mb-6">
          <TabsTrigger value="documentation">Documentation</TabsTrigger>
          <TabsTrigger value="faqs">FAQs</TabsTrigger>
          <TabsTrigger value="contact">Contact Support</TabsTrigger>
        </TabsList>

        <TabsContent value="documentation" className="space-y-6">
          <SectionHeader title="Documentation" description="Browse through our comprehensive documentation" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {documentationCategories.map((category, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-4">
                    <div className="rounded-md bg-primary/10 p-2">
                      <category.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle>{category.title}</CardTitle>
                      <CardDescription>{category.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-0 pt-0">
                  <ul className="space-y-2">
                    {category.articles.map((article, articleIndex) => (
                      <li key={articleIndex}>
                        <Link
                          href={article.url}
                          className="flex items-center justify-between rounded-md p-2 text-sm hover:bg-muted"
                        >
                          <span>{article.title}</span>
                          <ChevronRight className="h-4 w-4" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="pt-4">
                  <Link
                    href={`#view-all-${category.title.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-sm text-primary hover:underline"
                  >
                    View all {category.title} articles
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>

          <SectionHeader title="Video Tutorials" description="Learn through our step-by-step video guides" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videoTutorials.map((video, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="relative">
                  <img
                    src={video.thumbnail || "/placeholder.svg"}
                    alt={video.title}
                    className="w-full h-[120px] object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity">
                    <PlayCircle className="h-12 w-12 text-white" />
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                </div>
                <CardContent className="p-4">
                  <Link href={video.url} className="font-medium hover:text-primary">
                    {video.title}
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="faqs" className="space-y-6">
          <SectionHeader
            title="Frequently Asked Questions"
            description="Find answers to common questions about the ERP system"
          />

          <Card>
            <CardContent className="pt-6">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`faq-${index}`}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          <div className="bg-muted rounded-lg p-6 text-center">
            <h3 className="text-lg font-medium mb-2">Can't find what you're looking for?</h3>
            <p className="text-muted-foreground mb-4">
              Our support team is ready to help you with any questions you may have.
            </p>
            <Button onClick={() => setActiveTab("contact")}>
              <MessageSquare className="mr-2 h-4 w-4" />
              Contact Support
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="contact" className="space-y-6">
          <SectionHeader title="Contact Support" description="Get in touch with our support team for assistance" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Send us a message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={contactForm.name}
                          onChange={handleContactFormChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={contactForm.email}
                          onChange={handleContactFormChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={contactForm.subject}
                        onChange={handleContactFormChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <textarea
                        id="message"
                        name="message"
                        value={contactForm.message}
                        onChange={handleContactFormChange}
                        required
                        className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-backgroun  w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div>
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
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
