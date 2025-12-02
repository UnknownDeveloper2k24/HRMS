"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  FileText,
  Upload,
  Search,
  FolderOpen,
  Download,
  Eye,
  Trash2,
  MoreHorizontal,
  File,
  FileImage,
  FileSpreadsheet,
  Shield,
  Clock,
  Filter,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function DocumentsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const documents = [
    {
      id: "1",
      name: "Employee Handbook 2024",
      type: "PDF",
      category: "Policies",
      size: "2.4 MB",
      uploadedBy: "HR Admin",
      date: "Nov 15, 2024",
      icon: FileText,
    },
    {
      id: "2",
      name: "Leave Policy",
      type: "PDF",
      category: "Policies",
      size: "856 KB",
      uploadedBy: "HR Admin",
      date: "Oct 20, 2024",
      icon: FileText,
    },
    {
      id: "3",
      name: "Org Chart Q4 2024",
      type: "PNG",
      category: "Organization",
      size: "1.2 MB",
      uploadedBy: "Sarah Johnson",
      date: "Dec 1, 2024",
      icon: FileImage,
    },
    {
      id: "4",
      name: "Salary Structure Template",
      type: "XLSX",
      category: "Payroll",
      size: "456 KB",
      uploadedBy: "Finance Team",
      date: "Nov 28, 2024",
      icon: FileSpreadsheet,
    },
    {
      id: "5",
      name: "Code of Conduct",
      type: "PDF",
      category: "Compliance",
      size: "1.8 MB",
      uploadedBy: "Legal Team",
      date: "Sep 10, 2024",
      icon: Shield,
    },
    {
      id: "6",
      name: "Benefits Overview",
      type: "PDF",
      category: "HR",
      size: "3.2 MB",
      uploadedBy: "HR Admin",
      date: "Nov 1, 2024",
      icon: FileText,
    },
  ]

  const folders = [
    { name: "Policies", count: 12, icon: FolderOpen },
    { name: "Templates", count: 8, icon: FolderOpen },
    { name: "Compliance", count: 5, icon: Shield },
    { name: "Payroll", count: 15, icon: FileSpreadsheet },
  ]

  const filteredDocuments = documents.filter(
    (doc) =>
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Document Vault</h1>
          <p className="text-muted-foreground">Secure storage for all organizational documents</p>
        </div>
        <Button>
          <Upload className="w-4 h-4 mr-2" />
          Upload Document
        </Button>
      </div>

      {/* Quick Folders */}
      <div className="grid sm:grid-cols-4 gap-4">
        {folders.map((folder) => (
          <Card key={folder.name} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <folder.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{folder.name}</p>
                  <p className="text-sm text-muted-foreground">{folder.count} files</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="all">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">All Documents</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="shared">Shared with Me</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search documents..."
                className="pl-10 w-[250px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <TabsContent value="all" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Uploaded By</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDocuments.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded bg-muted flex items-center justify-center">
                            <doc.icon className="w-4 h-4 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{doc.name}</p>
                            <p className="text-xs text-muted-foreground">{doc.type}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{doc.category}</Badge>
                      </TableCell>
                      <TableCell>{doc.size}</TableCell>
                      <TableCell>{doc.uploadedBy}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {doc.date}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="w-4 h-4 mr-2" />
                              Preview
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recent" className="mt-6">
          <Card>
            <CardContent className="pt-6 text-center py-12">
              <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">Recent documents will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shared" className="mt-6">
          <Card>
            <CardContent className="pt-6 text-center py-12">
              <File className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">Shared documents will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
