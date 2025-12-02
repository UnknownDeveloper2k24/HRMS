"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

const data = [
  { day: "Mon", present: 145, absent: 8, late: 3 },
  { day: "Tue", present: 148, absent: 5, late: 3 },
  { day: "Wed", present: 142, absent: 10, late: 4 },
  { day: "Thu", present: 150, absent: 4, late: 2 },
  { day: "Fri", present: 138, absent: 12, late: 6 },
  { day: "Sat", present: 45, absent: 2, late: 1 },
]

export function AttendanceChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Attendance Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="day" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Bar dataKey="present" name="Present" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="absent" name="Absent" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="late" name="Late" fill="hsl(var(--chart-4))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
