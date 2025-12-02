"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Logo, LogoIcon } from "@/components/logo"
import { cn } from "@/lib/utils"
import { useAuth, rolePermissions, roleMenuLabels, type UserRole } from "@/lib/auth-context"
import {
  LayoutDashboard,
  Users,
  Clock,
  GraduationCap,
  Video,
  Wallet,
  FileText,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Building2,
  Calendar,
  BarChart3,
  Shield,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const allMenuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard", badge: null },
  { icon: Users, label: "Employees", href: "/dashboard/employees", badge: null },
  { icon: Building2, label: "Departments", href: "/dashboard/departments", badge: null },
  { icon: Clock, label: "Attendance", href: "/dashboard/attendance", badge: "3" },
  { icon: Calendar, label: "Leave Management", href: "/dashboard/leaves", badge: "5" },
  { icon: GraduationCap, label: "L&D", href: "/dashboard/learning", badge: null },
  { icon: Video, label: "AI Interview", href: "/dashboard/interviews", badge: "2" },
  { icon: Wallet, label: "Payroll", href: "/dashboard/payroll", badge: null },
  { icon: BarChart3, label: "Reports", href: "/dashboard/reports", badge: null },
  { icon: FileText, label: "Documents", href: "/dashboard/documents", badge: null },
]

const allBottomItems = [
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
  { icon: HelpCircle, label: "Help & Support", href: "/dashboard/help" },
]

const roleBadgeColors: Record<UserRole, string> = {
  admin: "bg-red-100 text-red-700 border-red-200",
  hr: "bg-blue-100 text-blue-700 border-blue-200",
  manager: "bg-amber-100 text-amber-700 border-amber-200",
  employee: "bg-emerald-100 text-emerald-700 border-emerald-200",
}

const roleLabels: Record<UserRole, string> = {
  admin: "Admin",
  hr: "HR Manager",
  manager: "Manager",
  employee: "Employee",
}

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuth()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const userRole = user?.role || "employee"
  const allowedPaths = rolePermissions[userRole] || []
  const customLabels = roleMenuLabels[userRole] || {}

  const menuItems = allMenuItems.filter((item) => allowedPaths.includes(item.href))
  const bottomItems = allBottomItems.filter((item) => allowedPaths.includes(item.href))

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  if (!mounted) {
    return null
  }

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300 z-40",
        collapsed ? "w-20" : "w-64",
      )}
    >
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
        {collapsed ? <LogoIcon /> : <Logo />}
        <Button variant="ghost" size="icon" className="hidden lg:flex" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>
      </div>

      {!collapsed && user && (
        <div className="px-4 py-3 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center overflow-hidden">
              {user.avatar ? (
                <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-sm font-medium">{user.name.charAt(0)}</span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user.name}</p>
              <div
                className={cn(
                  "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs border mt-1",
                  roleBadgeColors[userRole],
                )}
              >
                <Shield className="w-3 h-3" />
                {roleLabels[userRole]}
              </div>
            </div>
          </div>
        </div>
      )}

      {collapsed && user && (
        <div className="px-3 py-3 border-b border-sidebar-border flex justify-center">
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center overflow-hidden relative">
            {user.avatar ? (
              <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-sm font-medium">{user.name.charAt(0)}</span>
            )}
            <div
              className={cn(
                "absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-sidebar flex items-center justify-center",
                roleBadgeColors[userRole],
              )}
            >
              <Shield className="w-2 h-2" />
            </div>
          </div>
        </div>
      )}

      {/* Main Menu */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-3">
          {menuItems.map((item) => {
            const isActive = pathname === item.href
            const displayLabel = customLabels[item.href] || item.label
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors relative",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-primary"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
                  )}
                >
                  <item.icon className={cn("w-5 h-5 flex-shrink-0", isActive && "text-sidebar-primary")} />
                  {!collapsed && (
                    <>
                      <span className="flex-1">{displayLabel}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </>
                  )}
                  {collapsed && item.badge && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-[10px] rounded-full flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Bottom Menu */}
      <div className="border-t border-sidebar-border py-4">
        <ul className="space-y-1 px-3">
          {bottomItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-primary"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
                  )}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              </li>
            )
          })}
          <li>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-destructive/70 hover:bg-destructive/10 hover:text-destructive transition-colors"
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span>Logout</span>}
            </button>
          </li>
        </ul>
      </div>
    </aside>
  )
}
