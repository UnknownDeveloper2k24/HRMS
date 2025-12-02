"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Building2, Users, DollarSign, TrendingUp, Plus, MoreHorizontal, Edit, Trash2, Eye } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { departments } from "@/lib/dummy-data"

export default function DepartmentsPage() {
  const [showAddDept, setShowAddDept] = useState(false)
  const [selectedDept, setSelectedDept] = useState<(typeof departments)[0] | null>(null)

  const totalEmployees = departments.reduce((sum, d) => sum + d.headCount, 0)
  const totalBudget = departments.reduce((sum, d) => sum + d.budget, 0)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Departments</h1>
          <p className="text-muted-foreground">Manage organizational structure and departmental data</p>
        </div>
        <Button onClick={() => setShowAddDept(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Department
        </Button>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Departments</p>
                <p className="text-3xl font-bold text-foreground">{departments.length}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Employees</p>
                <p className="text-3xl font-bold text-foreground">{totalEmployees}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Budget</p>
                <p className="text-3xl font-bold text-foreground">${(totalBudget / 1000000).toFixed(1)}M</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Departments Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {departments.map((dept) => (
          <Card key={dept.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{dept.name}</CardTitle>
                    <CardDescription>{dept.headCount} employees</CardDescription>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setSelectedDept(dept)}>
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Budget Utilization</span>
                    <span className="font-medium">72%</span>
                  </div>
                  <Progress value={72} className="h-2" />
                </div>
                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="text-center">
                    <p className="text-lg font-bold text-foreground">${(dept.budget / 1000).toFixed(0)}K</p>
                    <p className="text-xs text-muted-foreground">Budget</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-foreground">{dept.headCount}</p>
                    <p className="text-xs text-muted-foreground">Headcount</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-primary flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      +12%
                    </p>
                    <p className="text-xs text-muted-foreground">Growth</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Department Dialog */}
      <Dialog open={showAddDept} onOpenChange={setShowAddDept}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Department</DialogTitle>
            <DialogDescription>Create a new department in your organization</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>Department Name</Label>
              <Input placeholder="e.g., Product Development" />
            </div>
            <div className="space-y-2">
              <Label>Department Head</Label>
              <Input placeholder="Select department head" />
            </div>
            <div className="space-y-2">
              <Label>Annual Budget</Label>
              <Input type="number" placeholder="Enter budget amount" />
            </div>
            <div className="flex gap-3 pt-4">
              <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setShowAddDept(false)}>
                Cancel
              </Button>
              <Button className="flex-1" onClick={() => setShowAddDept(false)}>
                Create Department
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Department Details Dialog */}
      <Dialog open={!!selectedDept} onOpenChange={() => setSelectedDept(null)}>
        <DialogContent>
          {selectedDept && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedDept.name}</DialogTitle>
                <DialogDescription>Department overview and statistics</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-muted/50 rounded-lg text-center">
                    <p className="text-2xl font-bold text-foreground">{selectedDept.headCount}</p>
                    <p className="text-sm text-muted-foreground">Employees</p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg text-center">
                    <p className="text-2xl font-bold text-primary">${(selectedDept.budget / 1000).toFixed(0)}K</p>
                    <p className="text-sm text-muted-foreground">Budget</p>
                  </div>
                </div>
                <Button className="w-full">View All Employees</Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
