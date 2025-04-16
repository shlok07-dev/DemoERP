"use client"

import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import { StatCard } from "@/components/stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, IndianRupee , Users, FileText } from "lucide-react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Line, Bar, Pie } from "react-chartjs-2"

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend)

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState("monthly")

  // Revenue data for charts
  const revenueData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "2023",
        data: [65, 59, 80, 81, 56, 55, 40, 45, 60, 70, 75, 80],
        borderColor: "#0089ff",
        backgroundColor: "rgba(0, 137, 255, 0.2)",
        tension: 0.3,
      },
      {
        label: "2022",
        data: [40, 45, 60, 70, 45, 50, 35, 40, 55, 65, 70, 75],
        borderColor: "#a601ff",
        backgroundColor: "rgba(166, 1, 255, 0.2)",
        tension: 0.3,
      },
    ],
  }

  // Department data for bar chart
  const departmentData = {
    labels: ["HR", "Finance", "Operations", "IT", "Marketing", "Sales"],
    datasets: [
      {
        label: "Staff Count",
        data: [12, 19, 35, 25, 15, 30],
        backgroundColor: [
          "rgba(0, 137, 255, 0.7)",
          "rgba(166, 1, 255, 0.7)",
          "rgba(16, 161, 66, 0.7)",
          "rgba(253, 204, 28, 0.7)",
          "rgba(237, 50, 55, 0.7)",
          "rgba(36, 140, 216, 0.7)",
        ],
      },
    ],
  }

  // Project status data for pie chart
  const projectStatusData = {
    labels: ["Completed", "In Progress", "Pending", "Delayed"],
    datasets: [
      {
        data: [35, 45, 15, 5],
        backgroundColor: [
          "rgba(16, 161, 66, 0.7)",
          "rgba(0, 137, 255, 0.7)",
          "rgba(253, 204, 28, 0.7)",
          "rgba(237, 50, 55, 0.7)",
        ],
        borderColor: ["rgba(16, 161, 66, 1)", "rgba(0, 137, 255, 1)", "rgba(253, 204, 28, 1)", "rgba(237, 50, 55, 1)"],
        borderWidth: 1,
      },
    ],
  }

  // Chart options
  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  }

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right" as const,
      },
    },
  }

  // Sample data for recent activities
  const recentActivities = [
    {
      id: 1,
      activity: "New staff member added",
      user: "John Doe",
      department: "HR",
      timestamp: "2023-11-20T10:30:00",
    },
    {
      id: 2,
      activity: "Payroll processed",
      user: "Jane Smith",
      department: "Finance",
      timestamp: "2023-11-19T15:45:00",
    },
    {
      id: 3,
      activity: "Procurement request approved",
      user: "Michael Johnson",
      department: "Operations",
      timestamp: "2023-11-18T09:15:00",
    },
    {
      id: 4,
      activity: "New circular published",
      user: "Sarah Williams",
      department: "HR",
      timestamp: "2023-11-17T14:20:00",
    },
    {
      id: 5,
      activity: "Maintenance scheduled",
      user: "Robert Brown",
      department: "Facilities",
      timestamp: "2023-11-16T11:10:00",
    },
  ]

  return (
    <div className="flex-1 space-y-6 p-6 md:p-8">
      <PageHeader
        title="Executive Dashboard"
        subtitle="Welcome to your comprehensive ERP system overview. Monitor key metrics and make data-driven decisions."
      />

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-muted/60 p-1">
          <TabsTrigger value="overview" className="text-sm">
            Business Overview
          </TabsTrigger>
          <TabsTrigger value="analytics" className="text-sm">
            Performance Analytics
          </TabsTrigger>
          <TabsTrigger value="reports" className="text-sm">
            Financial Reports
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Total Revenue"
              value="45,231.89 ₹"
              description="Monthly revenue"
              icon={IndianRupee}
              trend={{ value: "20.1%", positive: true }}
            />
            <StatCard
              title="Staff"
              value="2,350"
              description="Total employees"
              icon={Users}
              iconColor="text-[#10a142]"
              iconBgColor="bg-[#e6f9ef]"
              trend={{ value: "10.1%", positive: true }}
            />
            <StatCard
              title="Active Projects"
              value="12"
              description="Current projects"
              icon={Activity}
              iconColor="text-[#ed3237]"
              iconBgColor="bg-[#fdecec]"
              trend={{ value: "5.0%", positive: false }}
            />
            <StatCard
              title="Documents"
              value="132"
              description="Total documents"
              icon={FileText}
              iconColor="text-[#ffb700]"
              iconBgColor="bg-[#fff8e6]"
              trend={{ value: "12.2%", positive: true }}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Revenue Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <Line options={lineOptions} data={revenueData} />
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-4">
                      <div className="rounded-full p-2 bg-blue-100">
                        <Activity className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{activity.activity}</p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <span>{activity.user}</span>
                          <span className="mx-1">•</span>
                          <span>{activity.department}</span>
                          <span className="mx-1">•</span>
                          <span>{new Date(activity.timestamp).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Staff by Department</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <Bar options={barOptions} data={departmentData} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Project Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <Pie options={pieOptions} data={projectStatusData} />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <Line
                  options={lineOptions}
                  data={{
                    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                    datasets: [
                      {
                        label: "Revenue",
                        data: [65, 59, 80, 81, 56, 55, 40, 45, 60, 70, 75, 80],
                        borderColor: "#0089ff",
                        backgroundColor: "rgba(0, 137, 255, 0.2)",
                        tension: 0.3,
                        yAxisID: "y",
                      },
                      {
                        label: "Expenses",
                        data: [40, 45, 60, 70, 45, 50, 35, 40, 55, 65, 70, 75],
                        borderColor: "#ed3237",
                        backgroundColor: "rgba(237, 50, 55, 0.2)",
                        tension: 0.3,
                        yAxisID: "y",
                      },
                      {
                        label: "Profit",
                        data: [25, 14, 20, 11, 11, 5, 5, 5, 5, 5, 5, 5],
                        borderColor: "#10a142",
                        backgroundColor: "rgba(16, 161, 66, 0.2)",
                        tension: 0.3,
                        yAxisID: "y",
                      },
                    ],
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Financial Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <Bar
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: "top" as const,
                      },
                    },
                    scales: {
                      x: {
                        stacked: true,
                      },
                      y: {
                        stacked: true,
                      },
                    },
                  }}
                  data={{
                    labels: ["Q1", "Q2", "Q3", "Q4"],
                    datasets: [
                      {
                        label: "Revenue",
                        data: [204, 192, 145, 225],
                        backgroundColor: "rgba(0, 137, 255, 0.7)",
                      },
                      {
                        label: "Expenses",
                        data: [150, 140, 135, 180],
                        backgroundColor: "rgba(237, 50, 55, 0.7)",
                      },
                      {
                        label: "Profit",
                        data: [54, 52, 10, 45],
                        backgroundColor: "rgba(16, 161, 66, 0.7)",
                      },
                    ],
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
