"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Bot, X, Send, Maximize, Minimize, Loader2, Sparkles, PanelRightOpen } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type Message = {
  role: "user" | "assistant" | "system"
  content: string
  timestamp: Date
}

type SuggestionCategory = {
  name: string
  suggestions: string[]
}

export function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "system",
      content: "Welcome to the ERP AI Assistant! I'm here to help you navigate and use the system efficiently.",
      timestamp: new Date(),
    },
    {
      role: "assistant",
      content: "Hello! I'm your AI assistant. How can I help you with the ERP system today?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Suggested questions by category
  const suggestionCategories: SuggestionCategory[] = [
    {
      name: "General",
      suggestions: [
        "How do I navigate the dashboard?",
        "Where can I find my notifications?",
        "How do I log out of the system?",
      ],
    },
    {
      name: "Staff",
      suggestions: [
        "How do I add a new staff member?",
        "Where can I view staff analytics?",
        "How do I generate staff reports?",
      ],
    },
    {
      name: "Finance",
      suggestions: [
        "How do I create a payment voucher?",
        "Where can I view the office budget?",
        "How do I generate payroll?",
      ],
    },
    {
      name: "Inventory",
      suggestions: [
        "How do I add new inventory items?",
        "Where can I view stock levels?",
        "How do I update inventory quantities?",
      ],
    },
  ]

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }, [isOpen, isMinimized])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)
    setShowSuggestions(false)

    // Simulate AI response
    setTimeout(() => {
      let response = ""

      // Pattern matching for demo purposes
      if (input.toLowerCase().includes("payroll")) {
        response =
          "The payroll module allows you to manage salary structures, generate payslips, and process payments. You can access it from the sidebar menu or by navigating to the Payroll section. Would you like to know how to generate a new payslip?"
      } else if (input.toLowerCase().includes("staff") || input.toLowerCase().includes("employee")) {
        response =
          "The staff management module helps you manage employee records, track performance, and handle HR-related tasks. You can add new staff, update existing records, and generate reports. To add a new staff member, click on 'Staff Management' in the sidebar, then click the 'Add Staff' button."
      } else if (input.toLowerCase().includes("report")) {
        response =
          "You can generate various reports from different modules. Most sections have a 'Reports' tab that provides detailed analytics and exportable data. For example, in Staff Management, you can generate staff reports by department, role, or status."
      } else if (input.toLowerCase().includes("inventory") || input.toLowerCase().includes("stock")) {
        response =
          "The Stocks and Inventory module helps you track all company assets and consumables. You can view current stock levels, add new items, update quantities, and generate inventory reports. To add a new inventory item, go to 'Stocks and Inventory' in the sidebar and click 'Add New Item'."
      } else if (input.toLowerCase().includes("budget")) {
        response =
          "The Office Budget module allows you to create and manage budgets for different departments and projects. You can track expenses, monitor budget utilization, and generate budget reports. To create a new budget, go to 'Office Budget' in the sidebar and click 'Create Budget'."
      } else if (input.toLowerCase().includes("payment") || input.toLowerCase().includes("voucher")) {
        response =
          "The Payment Voucher module helps you create and manage payment requests. You can create new vouchers, track approval status, and generate payment reports. To create a new payment voucher, go to 'Payment Voucher' in the sidebar and click 'Create Voucher'."
      } else if (input.toLowerCase().includes("dashboard")) {
        response =
          "The Dashboard provides an overview of key metrics and activities across the ERP system. You can view recent notifications, upcoming tasks, and important statistics. To access the dashboard, click on 'Dashboard' in the sidebar or navigate to the home page."
      } else if (input.toLowerCase().includes("help") || input.toLowerCase().includes("support")) {
        response =
          "I'm here to help! You can ask me about any feature in the ERP system, and I'll guide you through it. For more detailed documentation, check the Help & Support section in the sidebar. You can also contact the support team through the Contact Support page."
      } else if (input.toLowerCase().includes("logout") || input.toLowerCase().includes("sign out")) {
        response =
          "To log out of the system, click on your profile picture in the top-right corner of the screen, then select 'Logout' from the dropdown menu. This will securely end your session."
      } else if (input.toLowerCase().includes("notification")) {
        response =
          "You can view your notifications by clicking on the bell icon in the top navigation bar. You can also access all notifications by clicking on 'Notifications' in the sidebar. Notifications include system alerts, task assignments, approval requests, and more."
      } else {
        response =
          "I understand you're asking about " +
          input +
          ". Could you provide more details so I can assist you better? You can ask about specific modules like Payroll, Staff Management, Inventory, etc., or use one of the suggested questions below."
      }

      const assistantMessage: Message = {
        role: "assistant",
        content: response,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1500)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion)
    inputRef.current?.focus()
  }

  const toggleOpen = () => {
    setIsOpen(!isOpen)
    setIsMinimized(false)
  }

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  const toggleSuggestions = () => {
    setShowSuggestions(!showSuggestions)
  }

  const clearChat = () => {
    setMessages([
      {
        role: "system",
        content: "Chat history cleared. How can I help you today?",
        timestamp: new Date(),
      },
    ])
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={toggleOpen}
                className="h-12 w-12 rounded-full bg-primary hover:bg-primary/90 shadow-lg"
                aria-label="Open AI Assistant"
              >
                <Bot className="h-6 w-6" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Open AI Assistant</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <Card
          className={`w-80 md:w-96 shadow-xl transition-all duration-300 ${
            isMinimized ? "h-14" : "h-[500px] max-h-[80vh]"
          }`}
        >
          <CardHeader className="p-3 border-b flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-md font-medium flex items-center">
              <Bot className="h-5 w-5 mr-2 text-primary" />
              {isMinimized ? "AI Assistant" : "ERP AI Assistant"}
            </CardTitle>
            <div className="flex items-center space-x-1">
              {!isMinimized && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleSuggestions}
                    className="h-8 w-8 p-0"
                    aria-label={showSuggestions ? "Hide suggestions" : "Show suggestions"}
                  >
                    <PanelRightOpen className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={clearChat}
                    className="h-8 w-8 p-0"
                    aria-label="Clear chat"
                  >
                    <Sparkles className="h-4 w-4" />
                  </Button>
                </>
              )}
              <Button variant="ghost" size="icon" onClick={toggleMinimize} className="h-8 w-8 p-0">
                {isMinimized ? <Maximize className="h-4 w-4" /> : <Minimize className="h-4 w-4" />}
              </Button>
              <Button variant="ghost" size="icon" onClick={toggleOpen} className="h-8 w-8 p-0">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          {!isMinimized && (
            <>
              <CardContent className="p-0 flex h-[380px]">
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={`flex ${
                          message.role === "user"
                            ? "justify-end"
                            : message.role === "system"
                              ? "justify-center"
                              : "justify-start"
                        }`}
                      >
                        {message.role === "system" ? (
                          <div className="max-w-[90%] text-center">
                            <p className="text-xs text-muted-foreground">{message.content}</p>
                          </div>
                        ) : (
                          <div
                            className={`max-w-[80%] rounded-lg p-3 ${
                              message.role === "user"
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                            <p className="text-xs mt-1 opacity-70">
                              {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="max-w-[80%] rounded-lg p-3 bg-muted">
                          <div className="flex items-center space-x-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <p className="text-sm">Thinking...</p>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                {showSuggestions && (
                  <div className="w-64 border-l h-full overflow-hidden">
                    <ScrollArea className="h-full p-3">
                      <div className="space-y-4">
                        {suggestionCategories.map((category) => (
                          <div key={category.name} className="space-y-2">
                            <h3 className="text-sm font-medium text-muted-foreground">{category.name}</h3>
                            <div className="space-y-1">
                              {category.suggestions.map((suggestion) => (
                                <Button
                                  key={suggestion}
                                  variant="ghost"
                                  className="w-full justify-start h-auto py-1.5 px-2 text-xs"
                                  onClick={() => handleSuggestionClick(suggestion)}
                                >
                                  {suggestion}
                                </Button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                )}
              </CardContent>

              <CardFooter className="p-3 pt-0 border-t">
                <form onSubmit={handleSendMessage} className="flex w-full space-x-2">
                  <Input
                    ref={inputRef}
                    placeholder="Type your question..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1"
                    disabled={isLoading}
                  />
                  <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </CardFooter>
            </>
          )}
        </Card>
      )}
    </div>
  )
}
