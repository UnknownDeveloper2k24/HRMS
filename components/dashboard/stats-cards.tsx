"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Users, UserCheck, UserX, FileCheck, TrendingUp, TrendingDown } from "lucide-react"
import { dashboardStats } from "@/lib/dummy-data"

const stats = [
  {
    label: "Total Employees",
    value: dashboardStats.totalEmployees,
    change: "+12",
    trend: "up",
    icon: Users,
    color: "bg-blue-500",
  },
  {
    label: "Present Today",
    value: dashboardStats.presentToday,
    change: "91%",
    trend: "up",
    icon: UserCheck,
    color: "bg-primary",
  },
  {
    label: "On Leave",
    value: dashboardStats.onLeave,
    change: "-2",
    trend: "down",
    icon: UserX,
    color: "bg-orange-500",
  },
  {
    label: "Pending Approvals",
    value: dashboardStats.pendingApprovals,
    change: "+5",
    trend: "up",
    icon: FileCheck,
    color: "bg-purple-500",
  },
]

export function StatsCards() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                <div className="flex items-center gap-1 mt-2">
                  {stat.trend === "up" ? (
                    <TrendingUp className="w-4 h-4 text-primary" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-orange-500" />
                  )}
                  <span className={`text-sm font-medium ${stat.trend === "up" ? "text-primary" : "text-orange-500"}`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-muted-foreground">vs last month</span>
                </div>
              </div>
              <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
