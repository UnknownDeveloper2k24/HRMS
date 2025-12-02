"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, CheckCircle, XCircle, Plus, CalendarDays, Palmtree, Stethoscope, User } from "lucide-react"
import { leaveRequests } from "@/lib/dummy-data"

export default function LeavesPage() {
  const [activeTab, setActiveTab] = useState("requests")
  const [showApplyLeave, setShowApplyLeave] = useState(false)

  const stats = {
    pending: leaveRequests.filter((l) => l.status === "pending").length,
    approved: leaveRequests.filter((l) => l.status === "approved").length,
    rejected: 0,
    total: leaveRequests.length,
  }

  const leaveBalances = [
    { type: "Annual Leave", total: 21, used: 8, icon: Palmtree, color: "text-primary" },
    { type: "Sick Leave", total: 12, used: 3, icon: Stethoscope, color: "text-blue-500" },
    { type: "Personal Leave", total: 5, used: 2, icon: User, color: "text-purple-500" },
    { type: "Comp Off", total: 4, used: 1, icon: CalendarDays, color: "text-orange-500" },
  ]

  const statusColors: Record<string, string> = {
    pending: "bg-orange-500/10 text-orange-500",
    approved: "bg-primary/10 text-primary",
    rejected: "bg-destructive/10 text-destructive",
  }

  const statusIcons: Record<string, React.ReactNode> = {
    pending: <Clock className="w-4 h-4" />,
    approved: <CheckCircle className="w-4 h-4" />,
    rejected: <XCircle className="w-4 h-4" />,
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Leave Management</h1>
          <p className="text-muted-foreground">Manage leave requests and track balances</p>
        </div>
        <Button onClick={() => setShowApplyLeave(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Apply Leave
        </Button>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-3xl font-bold text-orange-500">{stats.pending}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-orange-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Approved</p>
                <p className="text-3xl font-bold text-primary">{stats.approved}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Rejected</p>
                <p className="text-3xl font-bold text-destructive">{stats.rejected}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                <XCircle className="w-5 h-5 text-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">On Leave Today</p>
                <p className="text-3xl font-bold text-foreground">8</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                <Calendar className="w-5 h-5 text-muted-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="requests">Leave Requests</TabsTrigger>
          <TabsTrigger value="balances">Leave Balances</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
        </TabsList>

        <TabsContent value="requests" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Leave Requests</CardTitle>
              <CardDescription>Review and manage employee leave applications</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Days</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leaveRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarFallback>{request.employeeName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{request.employeeName}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{request.type}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p>{request.startDate}</p>
                          <p className="text-muted-foreground">to {request.endDate}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">{request.days}</span>
                      </TableCell>
                      <TableCell className="max-w-[150px] truncate">{request.reason}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={statusColors[request.status]}>
                          {statusIcons[request.status]}
                          <span className="ml-1">{request.status}</span>
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {request.status === "pending" && (
                          <div className="flex items-center justify-end gap-1">
                            <Button variant="ghost" size="sm" className="text-primary">
                              <CheckCircle className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-destructive">
                              <XCircle className="w-4 h-4" />
                            </Button>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="balances" className="mt-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {leaveBalances.map((leave) => (
              <Card key={leave.type}>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-lg bg-muted flex items-center justify-center`}>
                      <leave.icon className={`w-5 h-5 ${leave.color}`} />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{leave.type}</p>
                      <p className="text-sm text-muted-foreground">{leave.total - leave.used} remaining</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Used</span>
                      <span className="font-medium">
                        {leave.used} / {leave.total}
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${(leave.used / leave.total) * 100}%` }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="calendar" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <div className="h-[400px] flex items-center justify-center bg-muted/50 rounded-lg">
                <div className="text-center">
                  <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">Calendar view coming soon</p>
                  <p className="text-sm text-muted-foreground">View team availability at a glance</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Apply Leave Dialog */}
      <Dialog open={showApplyLeave} onOpenChange={setShowApplyLeave}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Apply for Leave</DialogTitle>
            <DialogDescription>Submit a new leave request</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>Leave Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select leave type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="annual">Annual Leave</SelectItem>
                  <SelectItem value="sick">Sick Leave</SelectItem>
                  <SelectItem value="personal">Personal Leave</SelectItem>
                  <SelectItem value="compoff">Comp Off</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <Label>End Date</Label>
                <Input type="date" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Reason</Label>
              <Textarea placeholder="Enter reason for leave" />
            </div>
            <div className="flex gap-3 pt-4">
              <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setShowApplyLeave(false)}>
                Cancel
              </Button>
              <Button className="flex-1" onClick={() => setShowApplyLeave(false)}>
                Submit Request
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
