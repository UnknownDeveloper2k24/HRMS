"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart3,
  PieChart,
  TrendingUp,
  Download,
  Calendar,
  Users,
  Clock,
  Wallet,
  FileText,
  ArrowUpRight,
  Filter,
} from "lucide-react"

export default function ReportsPage() {
  const reports = [
    { title: "Employee Headcount Report", category: "HR", lastGenerated: "Dec 1, 2024", icon: Users },
    { title: "Attendance Summary", category: "Attendance", lastGenerated: "Dec 2, 2024", icon: Clock },
    { title: "Payroll Cost Analysis", category: "Payroll", lastGenerated: "Nov 30, 2024", icon: Wallet },
    { title: "Training Completion Report", category: "L&D", lastGenerated: "Nov 28, 2024", icon: BarChart3 },
    { title: "Leave Utilization Report", category: "HR", lastGenerated: "Dec 1, 2024", icon: Calendar },
    { title: "Department Performance", category: "Analytics", lastGenerated: "Nov 25, 2024", icon: TrendingUp },
  ]

  const quickStats = [
    { label: "Reports Generated", value: "156", trend: "+12%", icon: FileText },
    { label: "Active Dashboards", value: "8", trend: "+2", icon: PieChart },
    { label: "Scheduled Reports", value: "12", trend: "Monthly", icon: Calendar },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Reports & Analytics</h1>
          <p className="text-muted-foreground">Generate insights and track organizational metrics</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button>
            <FileText className="w-4 h-4 mr-2" />
            New Report
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid sm:grid-cols-3 gap-4">
        {quickStats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-primary flex items-center gap-1 mt-1">
                    <ArrowUpRight className="w-3 h-3" />
                    {stat.trend}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Reports</TabsTrigger>
          <TabsTrigger value="hr">HR</TabsTrigger>
          <TabsTrigger value="payroll">Payroll</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reports.map((report, idx) => (
              <Card key={idx} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <report.icon className="w-5 h-5 text-primary" />
                    </div>
                    <Badge variant="outline">{report.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="font-semibold text-foreground mb-1">{report.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">Last generated: {report.lastGenerated}</p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      View
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      <Download className="w-4 h-4 mr-1" />
                      Export
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {["hr", "payroll", "attendance", "analytics"].map((tab) => (
          <TabsContent key={tab} value={tab} className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {reports
                .filter((r) => r.category.toLowerCase() === tab || tab === "analytics")
                .map((report, idx) => (
                  <Card key={idx} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <report.icon className="w-5 h-5 text-primary" />
                        </div>
                        <Badge variant="outline">{report.category}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <h3 className="font-semibold text-foreground mb-1">{report.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">Last generated: {report.lastGenerated}</p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                          View
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                          <Download className="w-4 h-4 mr-1" />
                          Export
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Analytics Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Analytics Dashboard Preview</CardTitle>
          <CardDescription>Quick overview of key metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="h-[200px] bg-muted/50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Headcount Trends Chart</p>
              </div>
            </div>
            <div className="h-[200px] bg-muted/50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <PieChart className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Department Distribution</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
