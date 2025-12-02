"use client"

import { StatsCards } from "@/components/dashboard/stats-cards"
import { AttendanceChart } from "@/components/dashboard/attendance-chart"
import { RecentActivities } from "@/components/dashboard/recent-activities"
import { DepartmentDistribution } from "@/components/dashboard/department-distribution"
import { UpcomingEvents } from "@/components/dashboard/upcoming-events"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here&apos;s what&apos;s happening today.</p>
      </div>

      <StatsCards />

      <div className="grid lg:grid-cols-2 gap-6">
        <AttendanceChart />
        <DepartmentDistribution />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <RecentActivities />
        <UpcomingEvents />
      </div>
    </div>
  )
}
