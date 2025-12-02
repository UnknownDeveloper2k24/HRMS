"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Fingerprint,
  Scan,
  MapPin,
  Navigation,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Calendar,
  Download,
  Filter,
  RefreshCw,
} from "lucide-react"
import { attendanceRecords, geoFenceLocations } from "@/lib/dummy-data"

export default function AttendancePage() {
  const [activeTab, setActiveTab] = useState("today")

  const attendanceTypes = [
    { id: "biometric", label: "Biometric", icon: Fingerprint, count: 45, color: "bg-blue-500" },
    { id: "face", label: "Face Recognition", icon: Scan, count: 32, color: "bg-primary" },
    { id: "geo-tracking", label: "Geo-Tracking", icon: MapPin, count: 28, color: "bg-purple-500" },
    { id: "geo-fence", label: "Geo-Fence", icon: Navigation, count: 51, color: "bg-orange-500" },
  ]

  const statusIcons: Record<string, React.ReactNode> = {
    present: <CheckCircle className="w-4 h-4 text-primary" />,
    late: <AlertCircle className="w-4 h-4 text-orange-500" />,
    absent: <XCircle className="w-4 h-4 text-destructive" />,
    "on-leave": <Calendar className="w-4 h-4 text-blue-500" />,
  }

  const statusColors: Record<string, string> = {
    present: "bg-primary/10 text-primary",
    late: "bg-orange-500/10 text-orange-500",
    absent: "bg-destructive/10 text-destructive",
    "on-leave": "bg-blue-500/10 text-blue-500",
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Attendance Management</h1>
          <p className="text-muted-foreground">Track and manage employee attendance across all methods</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Sync Devices
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Attendance Type Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {attendanceTypes.map((type) => (
          <Card key={type.id} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{type.label}</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{type.count}</p>
                  <p className="text-xs text-muted-foreground mt-1">employees today</p>
                </div>
                <div className={`w-12 h-12 rounded-lg ${type.color} flex items-center justify-center`}>
                  <type.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="today">Today&apos;s Attendance</TabsTrigger>
          <TabsTrigger value="geo-fence">Geo-Fence Zones</TabsTrigger>
          <TabsTrigger value="alerts">Alerts & Flags</TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Today&apos;s Attendance Log</CardTitle>
                  <CardDescription>Real-time attendance status for December 2, 2024</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Check In</TableHead>
                    <TableHead>Check Out</TableHead>
                    <TableHead>Work Hours</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendanceRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage
                              src={`/.jpg?height=40&width=40&query=${record.employeeName}`}
                            />
                            <AvatarFallback>{record.employeeName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{record.employeeName}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {record.checkIn ? (
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            {record.checkIn}
                          </div>
                        ) : (
                          <span className="text-muted-foreground">--</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {record.checkOut ? (
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            {record.checkOut}
                          </div>
                        ) : (
                          <span className="text-muted-foreground">--</span>
                        )}
                      </TableCell>
                      <TableCell>{record.workHours > 0 ? `${record.workHours.toFixed(2)} hrs` : "--"}</TableCell>
                      <TableCell>
                        {record.type && (
                          <Badge variant="outline" className="capitalize">
                            {record.type}
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {statusIcons[record.status]}
                          <Badge variant="secondary" className={statusColors[record.status]}>
                            {record.status}
                          </Badge>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="geo-fence" className="mt-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Configured Geo-Fence Zones</CardTitle>
                <CardDescription>Approved attendance locations with radius settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {geoFenceLocations.map((location) => (
                    <div key={location.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Navigation className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{location.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline">{location.radius}m radius</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Zone Map</CardTitle>
                <CardDescription>Visual representation of geo-fence zones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <img
                    src="/location-map.png"
                    alt="Geo-fence map"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="alerts" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Alerts</CardTitle>
              <CardDescription>Flagged entries requiring HR attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { type: "GPS Spoof Attempt", employee: "Unknown Device", time: "09:15 AM", severity: "high" },
                  { type: "Outside Geo-Fence", employee: "James Wilson", time: "09:32 AM", severity: "medium" },
                  { type: "Biometric Mismatch", employee: "Device #12", time: "10:45 AM", severity: "high" },
                  { type: "Late Check-In", employee: "3 Employees", time: "09:30 AM", severity: "low" },
                ].map((alert, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          alert.severity === "high"
                            ? "bg-destructive/10"
                            : alert.severity === "medium"
                              ? "bg-orange-500/10"
                              : "bg-yellow-500/10"
                        }`}
                      >
                        <AlertCircle
                          className={`w-5 h-5 ${
                            alert.severity === "high"
                              ? "text-destructive"
                              : alert.severity === "medium"
                                ? "text-orange-500"
                                : "text-yellow-600"
                          }`}
                        />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{alert.type}</p>
                        <p className="text-sm text-muted-foreground">
                          {alert.employee} • {alert.time}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Review
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
