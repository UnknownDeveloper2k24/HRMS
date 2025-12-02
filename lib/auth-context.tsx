"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type UserRole = "admin" | "hr" | "manager" | "employee"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  avatar: string
  department: string
  designation: string
}

interface AuthContextType {
  user: User | null
  login: (user: User) => void
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch {
        localStorage.removeItem("user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = (userData: User) => {
    setUser(userData)
    localStorage.setItem("user", JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

// Role-based permissions configuration
export const rolePermissions: Record<UserRole, string[]> = {
  admin: [
    "/dashboard",
    "/dashboard/employees",
    "/dashboard/departments",
    "/dashboard/attendance",
    "/dashboard/leaves",
    "/dashboard/learning",
    "/dashboard/interviews",
    "/dashboard/payroll",
    "/dashboard/reports",
    "/dashboard/documents",
    "/dashboard/settings",
    "/dashboard/help",
  ],
  hr: [
    "/dashboard",
    "/dashboard/employees",
    "/dashboard/departments",
    "/dashboard/attendance",
    "/dashboard/leaves",
    "/dashboard/learning",
    "/dashboard/interviews",
    "/dashboard/payroll",
    "/dashboard/documents",
    "/dashboard/settings",
    "/dashboard/help",
  ],
  manager: [
    "/dashboard",
    "/dashboard/employees",
    "/dashboard/attendance",
    "/dashboard/leaves",
    "/dashboard/learning",
    "/dashboard/reports",
    "/dashboard/help",
  ],
  employee: [
    "/dashboard",
    "/dashboard/attendance",
    "/dashboard/leaves",
    "/dashboard/learning",
    "/dashboard/documents",
    "/dashboard/help",
  ],
}

// Menu labels per role (for showing limited scope)
export const roleMenuLabels: Record<UserRole, Record<string, string>> = {
  admin: {},
  hr: {},
  manager: {
    "/dashboard/employees": "My Team",
    "/dashboard/attendance": "Team Attendance",
    "/dashboard/leaves": "Team Leaves",
    "/dashboard/reports": "Team Reports",
  },
  employee: {
    "/dashboard/attendance": "My Attendance",
    "/dashboard/leaves": "My Leaves",
    "/dashboard/documents": "My Documents",
  },
}
