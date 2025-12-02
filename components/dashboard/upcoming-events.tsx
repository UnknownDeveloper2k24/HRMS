"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, Users, Video, Cake, Award } from "lucide-react"

const events = [
  {
    id: 1,
    title: "AI Interview - Maria Garcia",
    time: "10:00 AM",
    date: "Today",
    type: "interview",
    icon: Video,
  },
  {
    id: 2,
    title: "Team Meeting - Engineering",
    time: "2:00 PM",
    date: "Today",
    type: "meeting",
    icon: Users,
  },
  {
    id: 3,
    title: "Birthday - David Kim",
    time: "All Day",
    date: "Tomorrow",
    type: "birthday",
    icon: Cake,
  },
  {
    id: 4,
    title: "Training: Data Analytics",
    time: "11:00 AM",
    date: "Dec 5",
    type: "training",
    icon: Award,
  },
]

const typeColors: Record<string, string> = {
  interview: "bg-purple-500",
  meeting: "bg-blue-500",
  birthday: "bg-pink-500",
  training: "bg-primary",
}

export function UpcomingEvents() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Upcoming Events</CardTitle>
        <Calendar className="w-5 h-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map((event) => (
            <div key={event.id} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
              <div className={`w-10 h-10 rounded-lg ${typeColors[event.type]} flex items-center justify-center`}>
                <event.icon className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground truncate">{event.title}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  <span>{event.time}</span>
                  <span>•</span>
                  <span>{event.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
