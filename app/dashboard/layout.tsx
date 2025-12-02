"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { useAuth, rolePermissions } from "@/lib/auth-context"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const { user, isLoading } = useAuth()
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    if (isLoading) return

    if (!user) {
      router.push("/login")
      return
    }

    const allowedPaths = rolePermissions[user.role] || []
    const hasAccess = allowedPaths.some((path) => pathname === path || pathname.startsWith(path + "/"))

    if (!hasAccess) {
      // Redirect to dashboard if trying to access unauthorized route
      router.push("/dashboard")
      return
    }

    setAuthorized(true)
  }, [user, isLoading, pathname, router])

  // Show loading state while checking auth
  if (isLoading || !authorized) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <Sidebar />
      <div className="lg:pl-64 pl-20">
        <Header />
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
