"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const activities = [
  {
    id: 1,
    user: "Michael Chen",
    avatar: "/thoughtful-asian-man.png",
    action: "completed training",
    target: "Leadership Excellence Program",
    time: "10 minutes ago",
    type: "training",
  },
  {
    id: 2,
    user: "Emily Davis",
    avatar: "/confident-business-woman.png",
    action: "submitted leave request",
    target: "5 days vacation",
    time: "30 minutes ago",
    type: "leave",
  },
  {
    id: 3,
    user: "HR System",
    avatar: "/robot-avatar.png",
    action: "processed payroll",
    target: "November 2024",
    time: "1 hour ago",
    type: "payroll",
  },
  {
    id: 4,
    user: "John Smith",
    avatar: "/candidate-man.jpg",
    action: "completed AI interview",
    target: "Senior Developer position",
    time: "2 hours ago",
    type: "interview",
  },
  {
    id: 5,
    user: "Amanda Martinez",
    avatar: "/stylish-woman.png",
    action: "earned badge",
    target: "Quick Learner",
    time: "3 hours ago",
    type: "achievement",
  },
]

const typeColors: Record<string, string> = {
  training: "bg-primary/10 text-primary",
  leave: "bg-orange-500/10 text-orange-500",
  payroll: "bg-blue-500/10 text-blue-500",
  interview: "bg-purple-500/10 text-purple-500",
  achievement: "bg-yellow-500/10 text-yellow-600",
}

export function RecentActivities() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4">
              <Avatar className="w-10 h-10">
                <AvatarImage src={activity.avatar || "/placeholder.svg"} />
                <AvatarFallback>{activity.user.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm">
                  <span className="font-medium text-foreground">{activity.user}</span>
                  <span className="text-muted-foreground"> {activity.action} </span>
                  <span className="font-medium text-foreground">{activity.target}</span>
                </p>
                <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
              </div>
              <Badge variant="secondary" className={typeColors[activity.type]}>
                {activity.type}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
