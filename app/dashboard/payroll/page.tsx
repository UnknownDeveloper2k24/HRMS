"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Wallet,
  DollarSign,
  TrendingUp,
  FileText,
  Download,
  CheckCircle,
  Clock,
  AlertCircle,
  Calculator,
  Building2,
  CreditCard,
  Receipt,
  ArrowUpRight,
  ArrowDownRight,
  Lock,
  Eye,
  Send,
  Filter,
  RefreshCw,
  FileSpreadsheet,
} from "lucide-react"
import { payrollData, reimbursements } from "@/lib/dummy-data"

export default function PayrollPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedPayslip, setSelectedPayslip] = useState<(typeof payrollData)[0] | null>(null)
  const [showRunPayroll, setShowRunPayroll] = useState(false)

  const stats = {
    totalPayroll: 245680,
    processed: 142,
    pending: 14,
    onHold: 3,
  }

  const complianceItems = [
    { name: "PF ECR File", status: "generated", date: "Dec 1, 2024" },
    { name: "ESIC Challan", status: "pending", date: "Due Dec 5" },
    { name: "PT Returns", status: "generated", date: "Dec 1, 2024" },
    { name: "TDS Filing", status: "pending", date: "Due Dec 7" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Payroll Management</h1>
          <p className="text-muted-foreground">Process salaries, manage compliance, and generate reports</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button onClick={() => setShowRunPayroll(true)}>
            <Calculator className="w-4 h-4 mr-2" />
            Run Payroll
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Payroll</p>
                <p className="text-3xl font-bold text-primary">${stats.totalPayroll.toLocaleString()}</p>
                <div className="flex items-center gap-1 mt-1 text-xs text-primary">
                  <ArrowUpRight className="w-3 h-3" />
                  +5.2% from last month
                </div>
              </div>
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Processed</p>
                <p className="text-3xl font-bold text-foreground">{stats.processed}</p>
                <p className="text-xs text-muted-foreground mt-1">employees paid</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-3xl font-bold text-foreground">{stats.pending}</p>
                <p className="text-xs text-muted-foreground mt-1">awaiting approval</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">On Hold</p>
                <p className="text-3xl font-bold text-foreground">{stats.onHold}</p>
                <p className="text-xs text-muted-foreground mt-1">requires attention</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payroll Progress */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-foreground">December 2024 Payroll Progress</h3>
              <p className="text-sm text-muted-foreground">Current payroll cycle status</p>
            </div>
            <Badge variant="secondary" className="bg-orange-500/10 text-orange-500">
              In Progress
            </Badge>
          </div>
          <Progress value={72} className="h-3 mb-3" />
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">72% Complete</span>
            <span className="font-medium text-foreground">Due: Dec 5, 2024</span>
          </div>
          <div className="grid sm:grid-cols-4 gap-4 mt-6">
            {[
              { step: "Attendance Sync", status: "complete" },
              { step: "Approvals", status: "complete" },
              { step: "Processing", status: "current" },
              { step: "Disbursement", status: "pending" },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    item.status === "complete"
                      ? "bg-primary text-primary-foreground"
                      : item.status === "current"
                        ? "bg-orange-500 text-white"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {item.status === "complete" ? <CheckCircle className="w-4 h-4" /> : idx + 1}
                </div>
                <span
                  className={`text-sm ${item.status === "current" ? "font-medium text-foreground" : "text-muted-foreground"}`}
                >
                  {item.step}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Salary Register</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="reimbursements">Reimbursements</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Salary Register - December 2024</CardTitle>
                  <CardDescription>Complete breakdown of employee salaries</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <FileSpreadsheet className="w-4 h-4 mr-2" />
                    Export Excel
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead className="text-right">Gross</TableHead>
                      <TableHead className="text-right">Deductions</TableHead>
                      <TableHead className="text-right">Net Salary</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payrollData.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9">
                              <AvatarImage
                                src={`/.jpg?height=36&width=36&query=${record.employeeName}`}
                              />
                              <AvatarFallback>{record.employeeName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-foreground">{record.employeeName}</p>
                              <p className="text-xs text-muted-foreground">
                                ID: EMP-{record.employeeId.padStart(4, "0")}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{record.department}</Badge>
                        </TableCell>
                        <TableCell className="text-right font-medium">${record.grossSalary.toLocaleString()}</TableCell>
                        <TableCell className="text-right text-destructive">
                          -${record.totalDeductions.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right font-bold text-primary">
                          ${record.netSalary.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="secondary"
                            className={
                              record.status === "paid"
                                ? "bg-primary/10 text-primary"
                                : "bg-orange-500/10 text-orange-500"
                            }
                          >
                            {record.status === "paid" ? (
                              <CheckCircle className="w-3 h-3 mr-1" />
                            ) : (
                              <Clock className="w-3 h-3 mr-1" />
                            )}
                            {record.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" onClick={() => setSelectedPayslip(record)}>
                            <Eye className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="mt-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Statutory Compliance</CardTitle>
                <CardDescription>Required filings and submissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {complianceItems.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            item.status === "generated" ? "bg-primary/10" : "bg-orange-500/10"
                          }`}
                        >
                          <FileText
                            className={`w-5 h-5 ${item.status === "generated" ? "text-primary" : "text-orange-500"}`}
                          />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{item.name}</p>
                          <p className="text-sm text-muted-foreground">{item.date}</p>
                        </div>
                      </div>
                      <Badge
                        variant="secondary"
                        className={
                          item.status === "generated"
                            ? "bg-primary/10 text-primary"
                            : "bg-orange-500/10 text-orange-500"
                        }
                      >
                        {item.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common payroll operations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: FileText, label: "Generate PF ECR" },
                    { icon: Receipt, label: "ESIC Challan" },
                    { icon: CreditCard, label: "Bank Transfer File" },
                    { icon: FileSpreadsheet, label: "Form 16" },
                    { icon: Building2, label: "PT Returns" },
                    { icon: Calculator, label: "TDS Calculator" },
                  ].map((action, idx) => (
                    <Button key={idx} variant="outline" className="h-auto py-4 flex-col gap-2 bg-transparent">
                      <action.icon className="w-5 h-5" />
                      <span className="text-xs">{action.label}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reimbursements" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Reimbursement Requests</CardTitle>
                  <CardDescription>Pending and processed expense claims</CardDescription>
                </div>
                <Button size="sm">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Sync Claims
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reimbursements.map((claim) => (
                    <TableRow key={claim.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{claim.employeeName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{claim.employeeName}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{claim.type}</Badge>
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate">{claim.description}</TableCell>
                      <TableCell>{claim.date}</TableCell>
                      <TableCell className="text-right font-medium">${claim.amount}</TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={
                            claim.status === "approved"
                              ? "bg-primary/10 text-primary"
                              : "bg-orange-500/10 text-orange-500"
                          }
                        >
                          {claim.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {claim.status === "pending" && (
                          <div className="flex items-center justify-end gap-1">
                            <Button variant="ghost" size="sm" className="text-primary">
                              <CheckCircle className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-destructive">
                              <AlertCircle className="w-4 h-4" />
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

        <TabsContent value="reports" className="mt-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: "Salary Register", desc: "Complete salary breakdown by month", icon: FileSpreadsheet },
              { title: "Cost Center Report", desc: "Department-wise salary distribution", icon: Building2 },
              { title: "Variance Report", desc: "Month-over-month salary changes", icon: TrendingUp },
              { title: "Tax Report", desc: "Employee-wise TDS summary", icon: Receipt },
              { title: "PF Summary", desc: "Provident fund contributions", icon: Wallet },
              { title: "Bank Statement", desc: "Salary transfer records", icon: CreditCard },
            ].map((report, idx) => (
              <Card key={idx} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <report.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{report.title}</h3>
                      <p className="text-sm text-muted-foreground">{report.desc}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      <Eye className="w-4 h-4 mr-1" />
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
      </Tabs>

      {/* Payslip Detail Dialog */}
      <Dialog open={!!selectedPayslip} onOpenChange={() => setSelectedPayslip(null)}>
        <DialogContent className="max-w-2xl">
          {selectedPayslip && (
            <>
              <DialogHeader>
                <DialogTitle>Payslip - {selectedPayslip.month}</DialogTitle>
                <DialogDescription>
                  {selectedPayslip.employeeName} | {selectedPayslip.department}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                <div className="grid grid-cols-2 gap-6">
                  {/* Earnings */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <ArrowUpRight className="w-4 h-4 text-primary" />
                      Earnings
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Basic Salary</span>
                        <span className="font-medium">${selectedPayslip.basicSalary.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">HRA</span>
                        <span className="font-medium">${selectedPayslip.hra.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Transport Allowance</span>
                        <span className="font-medium">${selectedPayslip.transportAllowance.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Medical Allowance</span>
                        <span className="font-medium">${selectedPayslip.medicalAllowance.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Special Allowance</span>
                        <span className="font-medium">${selectedPayslip.specialAllowance.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t font-semibold">
                        <span>Gross Salary</span>
                        <span className="text-primary">${selectedPayslip.grossSalary.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Deductions */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <ArrowDownRight className="w-4 h-4 text-destructive" />
                      Deductions
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Provident Fund</span>
                        <span className="font-medium text-destructive">-${selectedPayslip.pf.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Income Tax</span>
                        <span className="font-medium text-destructive">-${selectedPayslip.tax.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Professional Tax</span>
                        <span className="font-medium text-destructive">
                          -${selectedPayslip.professionalTax.toLocaleString()}
                        </span>
                      </div>
                      {selectedPayslip.esi > 0 && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">ESI</span>
                          <span className="font-medium text-destructive">-${selectedPayslip.esi.toLocaleString()}</span>
                        </div>
                      )}
                      <div className="flex justify-between pt-2 border-t font-semibold">
                        <span>Total Deductions</span>
                        <span className="text-destructive">-${selectedPayslip.totalDeductions.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Net Salary */}
                <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Net Salary</p>
                      <p className="text-3xl font-bold text-primary">${selectedPayslip.netSalary.toLocaleString()}</p>
                    </div>
                    <Badge
                      variant="secondary"
                      className={
                        selectedPayslip.status === "paid"
                          ? "bg-primary/10 text-primary"
                          : "bg-orange-500/10 text-orange-500"
                      }
                    >
                      {selectedPayslip.status === "paid" ? "Paid" : "Pending"}
                    </Badge>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1 bg-transparent">
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    <Send className="w-4 h-4 mr-2" />
                    Email Payslip
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Run Payroll Dialog */}
      <Dialog open={showRunPayroll} onOpenChange={setShowRunPayroll}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Run Payroll</DialogTitle>
            <DialogDescription>Process salary for the selected period</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>Pay Period</Label>
              <Select defaultValue="dec-2024">
                <SelectTrigger>
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dec-2024">December 2024</SelectItem>
                  <SelectItem value="jan-2025">January 2025</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Department</Label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="p-4 bg-muted rounded-lg space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Employees to process</span>
                <span className="font-medium">156</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Estimated total</span>
                <span className="font-medium text-primary">$245,680</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Lock className="w-4 h-4" />
              Requires dual approval before disbursement
            </div>
            <div className="flex gap-3 pt-4">
              <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setShowRunPayroll(false)}>
                Cancel
              </Button>
              <Button className="flex-1" onClick={() => setShowRunPayroll(false)}>
                <Calculator className="w-4 h-4 mr-2" />
                Process Payroll
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
