"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { PageHeader } from "@/components/page-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, MessageSquare } from "lucide-react"

export default function FAQsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  // Mock FAQs by category
  const faqCategories = {
    general: [
      {
        question: "How do I reset my password?",
        answer:
          "You can reset your password by clicking on the 'Forgot Password' link on the login page. Follow the instructions sent to your email to create a new password.",
      },
      {
        question: "How do I update my profile information?",
        answer:
          "Navigate to the Profile page by clicking on your profile picture in the top right corner and selecting 'Profile'. From there, you can edit your personal information, contact details, and other profile settings.",
      },
      {
        question: "Can I change my username or email address?",
        answer:
          "You can change your email address in your Profile settings. However, your username (employee ID) is assigned by the system administrator and cannot be changed by users.",
      },
      {
        question: "How do I navigate between different modules?",
        answer:
          "You can use the sidebar navigation menu on the left side of the screen to switch between different modules such as Staff Management, Payroll, Memo, etc. On mobile devices, you can access the menu by tapping the menu icon in the top left corner.",
      },
    ],
    staff: [
      {
        question: "How do I add a new staff member?",
        answer:
          "Navigate to the Staff Management module, click on 'Add Staff', and fill out the required information in the form. Once completed, click 'Save' to add the new staff member to the system.",
      },
      {
        question: "How do I edit staff information?",
        answer:
          "Go to the Staff Management module, find the staff member you want to edit, click on their name to view their profile, then click the 'Edit' button to modify their information.",
      },
      {
        question: "Can I import multiple staff records at once?",
        answer:
          "Yes, you can import multiple staff records using a CSV file. Go to the Staff Management module, click on 'Import Staff', download the template, fill it with your data, and upload it back to the system.",
      },
      {
        question: "How do I deactivate a staff account?",
        answer:
          "To deactivate a staff account, go to the Staff Management module, find the staff member, view their profile, and click on the 'Deactivate Account' button. This will suspend their access to the system without deleting their records.",
      },
    ],
    payroll: [
      {
        question: "How do I generate payroll for a specific period?",
        answer:
          "Go to the Payroll module, select 'Generate Payroll', choose the desired pay period, select the employees to include, and click 'Generate'. The system will calculate the payroll based on the defined salary structures and deductions.",
      },
      {
        question: "How do I create a new salary definition?",
        answer:
          "Navigate to the Payroll module, click on 'Create Salary Definition', fill out the form with the necessary details such as basic salary, allowances, and deductions, then click 'Save' to create the new salary definition.",
      },
      {
        question: "How do I set up tax definitions?",
        answer:
          "Go to the Payroll module, select 'Create Tax Definition', define the tax brackets, rates, and any applicable exemptions or deductions, then save the configuration. These definitions will be used when calculating payroll taxes.",
      },
      {
        question: "Can I generate individual payslips?",
        answer:
          "Yes, you can generate individual payslips by going to the Payroll module, selecting 'Create Payslip', choosing the employee, specifying the pay period, and clicking 'Generate'. You can then view, download, or email the payslip to the employee.",
      },
    ],
    documents: [
      {
        question: "How do I create a new circular?",
        answer:
          "Navigate to the Circulars module, click on 'Create Circular', fill out the form with the circular details, select the recipients, and click 'Publish'. The circular will be distributed to the selected recipients.",
      },
      {
        question: "How do I create and send a memo?",
        answer:
          "Go to the Memo module, click on 'Create Memo', fill out the memo form with the subject, content, and recipients, then click 'Send'. The memo will be delivered to the selected recipients and stored in the system for future reference.",
      },
      {
        question: "Can I attach files to memos and circulars?",
        answer:
          "Yes, you can attach files to both memos and circulars. When creating a memo or circular, look for the 'Attachments' section where you can upload files. Supported file types include PDF, DOC, DOCX, XLS, XLSX, and image formats.",
      },
      {
        question: "How do I search for specific documents?",
        answer:
          "You can search for documents using the search bar at the top of each module page. Enter keywords related to the document you're looking for, and the system will display matching results. You can also use filters to narrow down your search by date, type, or status.",
      },
    ],
    inventory: [
      {
        question: "How do I track inventory items?",
        answer:
          "Go to the Stocks and Inventory module, where you can view all inventory items. You can filter by category, location, or status. Click on any item to view its detailed history and current status.",
      },
      {
        question: "How do I update inventory quantities?",
        answer:
          "Navigate to the Stocks and Inventory module, select 'Update Inventory', choose the items you want to update, enter the new quantities or adjustments, provide a reason for the update, and click 'Save' to record the changes.",
      },
      {
        question: "Can I set up low stock alerts?",
        answer:
          "Yes, you can set up low stock alerts by going to the Stocks and Inventory module, selecting 'Settings', then 'Alerts'. From there, you can define minimum stock levels for each item and configure notification preferences when stock falls below these levels.",
      },
      {
        question: "How do I generate inventory reports?",
        answer:
          "In the Stocks and Inventory module, click on 'Reports', select the type of report you want to generate (e.g., Stock Level, Movement History, Valuation), specify the parameters and date range, then click 'Generate Report'. You can view the report online or export it to Excel or PDF.",
      },
    ],
    maintenance: [
      {
        question: "How do I schedule maintenance for equipment?",
        answer:
          "Navigate to the Maintenance module, select 'Schedule', choose the equipment that needs maintenance, set the date and time, assign personnel, and save the schedule. The system will send notifications to relevant staff.",
      },
      {
        question: "How do I report a maintenance issue?",
        answer:
          "Go to the Maintenance module, click on 'Report Issue', fill out the form with details about the problem, location, priority level, and any relevant attachments, then submit the report. The maintenance team will be notified of the new issue.",
      },
      {
        question: "How do I track maintenance history?",
        answer:
          "In the Maintenance module, select the equipment or asset you want to check, then click on the 'History' tab. This will display a chronological record of all maintenance activities, including scheduled maintenance, repairs, and issues reported for that item.",
      },
      {
        question: "Can I set up recurring maintenance schedules?",
        answer:
          "Yes, when creating a maintenance schedule, check the 'Recurring' option and specify the frequency (daily, weekly, monthly, etc.). The system will automatically create future maintenance tasks based on this schedule.",
      },
    ],
    procurement: [
      {
        question: "How do I create a procurement request?",
        answer:
          "Go to the Procurements module, click 'Create Request', fill out the procurement details including items, quantities, and justification, select approvers, and submit the request for approval.",
      },
      {
        question: "How do I track the status of a procurement request?",
        answer:
          "Navigate to the Procurements module, where you'll see a list of all procurement requests. Each request will show its current status (Draft, Pending Approval, Approved, Rejected, In Progress, Completed). Click on any request to view detailed information and track its progress.",
      },
      {
        question: "How do I approve or reject a procurement request?",
        answer:
          "If you're designated as an approver, you'll receive a notification when a request requires your approval. Go to the Procurements module, find the request in the 'Pending Approval' section, review the details, and click either 'Approve' or 'Reject'. You can also add comments explaining your decision.",
      },
      {
        question: "Can I edit a procurement request after submission?",
        answer:
          "You can edit a procurement request only if it's still in 'Draft' status or if it has been returned for revision. Once a request has been submitted for approval or approved, you cannot edit it directly. Instead, you would need to cancel the request and create a new one.",
      },
    ],
  }

  // Combine all FAQs for the "All" tab
  const allFaqs = Object.values(faqCategories).flat()

  // Filter FAQs based on search query
  const filterFaqs = (faqs: typeof allFaqs) => {
    if (!searchQuery.trim()) return faqs

    const query = searchQuery.toLowerCase()
    return faqs.filter((faq) => faq.question.toLowerCase().includes(query) || faq.answer.toLowerCase().includes(query))
  }

  // Get FAQs based on active tab
  const getActiveFaqs = () => {
    switch (activeTab) {
      case "general":
        return filterFaqs(faqCategories.general)
      case "staff":
        return filterFaqs(faqCategories.staff)
      case "payroll":
        return filterFaqs(faqCategories.payroll)
      case "documents":
        return filterFaqs(faqCategories.documents)
      case "inventory":
        return filterFaqs(faqCategories.inventory)
      case "maintenance":
        return filterFaqs(faqCategories.maintenance)
      case "procurement":
        return filterFaqs(faqCategories.procurement)
      default:
        return filterFaqs(allFaqs)
    }
  }

  const activeFaqs = getActiveFaqs()

  return (
    <div className="container py-6 md:py-8 max-w-7xl mx-auto">
      <PageHeader
        heading="Frequently Asked Questions"
        description="Find answers to common questions about the ERP system"
      />

      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search for answers..."
            className="pl-10 h-12"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="flex flex-wrap h-auto p-1 mb-6">
          <TabsTrigger value="all" className="flex-grow">
            All
          </TabsTrigger>
          <TabsTrigger value="general" className="flex-grow">
            General
          </TabsTrigger>
          <TabsTrigger value="staff" className="flex-grow">
            Staff
          </TabsTrigger>
          <TabsTrigger value="payroll" className="flex-grow">
            Payroll
          </TabsTrigger>
          <TabsTrigger value="documents" className="flex-grow">
            Documents
          </TabsTrigger>
          <TabsTrigger value="inventory" className="flex-grow">
            Inventory
          </TabsTrigger>
          <TabsTrigger value="maintenance" className="flex-grow">
            Maintenance
          </TabsTrigger>
          <TabsTrigger value="procurement" className="flex-grow">
            Procurement
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              {activeFaqs.length > 0 ? (
                <Accordion type="single" collapsible className="w-full">
                  {activeFaqs.map((faq, index) => (
                    <AccordionItem key={index} value={`faq-${index}`}>
                      <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground">{faq.answer}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">No FAQs found matching your search criteria.</p>
                  <Button onClick={() => setSearchQuery("")} variant="outline">
                    Clear Search
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="bg-muted rounded-lg p-6 text-center">
            <h3 className="text-lg font-medium mb-2">Can't find what you're looking for?</h3>
            <p className="text-muted-foreground mb-4">
              Our support team is ready to help you with any questions you may have.
            </p>
            <Link href="/help/contact">
              <Button>
                <MessageSquare className="mr-2 h-4 w-4" />
                Contact Support
              </Button>
            </Link>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
