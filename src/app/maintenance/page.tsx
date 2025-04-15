"use client"

import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { ArrowUp } from "lucide-react"
import Link from "next/link"

export default function MaintenancePage() {
  const [currentMonth, setCurrentMonth] = useState("November 2022")
  const [selectedDate, setSelectedDate] = useState(18)

  // Calendar data for November 2022
  const calendarDays = [
    { day: "S", date: null },
    { day: "M", date: null },
    { day: "T", date: null },
    { day: "W", date: null },
    { day: "T", date: null },
    { day: "F", date: null },
    { day: "S", date: null },
    { day: null, date: 29, prevMonth: true },
    { day: null, date: 30, prevMonth: true },
    { day: null, date: 1 },
    { day: null, date: 2 },
    { day: null, date: 3 },
    { day: null, date: 4 },
    { day: null, date: 5 },
    { day: null, date: 6 },
    { day: null, date: 7 },
    { day: null, date: 8 },
    { day: null, date: 9 },
    { day: null, date: 10 },
    { day: null, date: 11 },
    { day: null, date: 12 },
    { day: null, date: 13 },
    { day: null, date: 14 },
    { day: null, date: 15 },
    { day: null, date: 16 },
    { day: null, date: 17 },
    { day: null, date: 18, hasEvent: true },
    { day: null, date: 19 },
    { day: null, date: 20 },
    { day: null, date: 21, hasEvent: true },
    { day: null, date: 22 },
    { day: null, date: 23, hasEvent: true },
    { day: null, date: 24 },
    { day: null, date: 25 },
    { day: null, date: 26 },
    { day: null, date: 27 },
    { day: null, date: 28 },
    { day: null, date: 29 },
    { day: null, date: 30 },
    { day: null, date: 1, nextMonth: true },
    { day: null, date: 2, nextMonth: true },
    { day: null, date: 3, nextMonth: true },
  ]

  const scheduledMaintenance = [
    {
      id: 1,
      date: "18th November, 2022",
      title: "Scheduled maintenance for service of 3 unit of AC",
    },
    {
      id: 2,
      date: "18th November, 2022",
      title: "Scheduled maintenance for service of 3 unit of AC",
    },
  ]

  return (
    <div>
      <PageHeader title="Maintenance" />

      <div className="p-6">
        <div className="mb-2">
          <p className="text-sm text-muted-foreground">View and create schedule for maintenance</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-3xl font-bold">25</p>
                <p className="text-sm text-muted-foreground">Scheduled maintenance</p>
                <div className="flex items-center mt-2">
                  <ArrowUp className="h-4 w-4 text-[#10a142] mr-1" />
                  <span className="text-xs text-[#10a142]">2 more than last quarter</span>
                </div>
              </div>
              <div className="p-2 rounded-full bg-[#e8f5ff]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M10.5 3.75H13.5"
                    stroke="#0089ff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 20.25C16.5563 20.25 20.25 16.5563 20.25 12C20.25 7.44365 16.5563 3.75 12 3.75C7.44365 3.75 3.75 7.44365 3.75 12C3.75 16.5563 7.44365 20.25 12 20.25Z"
                    stroke="#0089ff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 7.5V12L15 15"
                    stroke="#0089ff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-3xl font-bold">25</p>
                <p className="text-sm text-muted-foreground">Completed maintenance</p>
                <div className="flex items-center mt-2">
                  <ArrowUp className="h-4 w-4 text-[#10a142] mr-1" />
                  <span className="text-xs text-[#10a142]">2 more than last quarter</span>
                </div>
              </div>
              <div className="p-2 rounded-full bg-[#ecfff2]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M10.5 3.75H13.5"
                    stroke="#10a142"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 20.25C16.5563 20.25 20.25 16.5563 20.25 12C20.25 7.44365 16.5563 3.75 12 3.75C7.44365 3.75 3.75 7.44365 3.75 12C3.75 16.5563 7.44365 20.25 12 20.25Z"
                    stroke="#10a142"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 7.5V12L15 15"
                    stroke="#10a142"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-3xl font-bold">25</p>
                <p className="text-sm text-muted-foreground">Pending maintenance</p>
                <div className="flex items-center mt-2">
                  <ArrowUp className="h-4 w-4 text-[#10a142] mr-1" />
                  <span className="text-xs text-[#10a142]">2 more than last quarter</span>
                </div>
              </div>
              <div className="p-2 rounded-full bg-[#fff8df]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M10.5 3.75H13.5"
                    stroke="#fdcc1c"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 20.25C16.5563 20.25 20.25 16.5563 20.25 12C20.25 7.44365 16.5563 3.75 12 3.75C7.44365 3.75 3.75 7.44365 3.75 12C3.75 16.5563 7.44365 20.25 12 20.25Z"
                    stroke="#fdcc1c"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 7.5V12L15 15"
                    stroke="#fdcc1c"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-3xl font-bold">25</p>
                <p className="text-sm text-muted-foreground">Overdue maintenance</p>
                <div className="flex items-center mt-2">
                  <ArrowUp className="h-4 w-4 text-[#10a142] mr-1" />
                  <span className="text-xs text-[#10a142]">2 more than last quarter</span>
                </div>
              </div>
              <div className="p-2 rounded-full bg-[#ffe4e4]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M10.5 3.75H13.5"
                    stroke="#ed3237"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 20.25C16.5563 20.25 20.25 16.5563 20.25 12C20.25 7.44365 16.5563 3.75 12 3.75C7.44365 3.75 3.75 7.44365 3.75 12C3.75 16.5563 7.44365 20.25 12 20.25Z"
                    stroke="#ed3237"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 7.5V12L15 15"
                    stroke="#ed3237"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Schedule a Maintenance</h2>
          <Link href="/maintenance/schedule">
            <Button className="bg-[#0089ff] hover:bg-[#248cd8]">Schedule Maintenance</Button>
          </Link>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-6">Scheduled Maintenance</h2>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/2 bg-[#f8f9fd] rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <button className="text-gray-500">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M15 18L9 12L15 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <h3 className="text-lg font-medium">{currentMonth}</h3>
                <button className="text-gray-500">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M9 18L15 12L9 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-7 gap-2 mb-2">
                {calendarDays.slice(0, 7).map((day, index) => (
                  <div key={index} className="text-center font-medium">
                    {day.day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-2">
                {calendarDays.slice(7).map((day, index) => (
                  <button
                    key={index}
                    className={`h-10 w-10 rounded-full flex items-center justify-center text-sm ${
                      day.prevMonth || day.nextMonth
                        ? "text-gray-400"
                        : day.date === selectedDate
                          ? "bg-[#0089ff] text-white"
                          : day.hasEvent
                            ? "border-2 border-[#0089ff] text-[#0089ff]"
                            : ""
                    }`}
                    onClick={() => day.date && setSelectedDate(day.date)}
                  >
                    {day.date}
                  </button>
                ))}
              </div>
            </div>

            <div className="w-full md:w-1/2">
              {scheduledMaintenance.map((item) => (
                <div key={item.id} className="mb-6">
                  <p className="text-sm text-gray-500 mb-1">{item.date}</p>
                  <p className="font-medium mb-2">
                    {item.id}. {item.title}
                  </p>
                  <Link href={`/maintenance/${item.id}`}>
                    <Button variant="outline" className="text-[#0089ff] border-[#0089ff]">
                      View
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-muted-foreground">
          Copyright © 2022 Relia Energy. All Rights Reserved
        </div>
      </div>
    </div>
  )
}
