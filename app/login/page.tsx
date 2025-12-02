"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, EyeOff, ArrowRight, CheckCircle, Shield } from "lucide-react"
import Link from "next/link"
import { dummyUsers } from "@/lib/dummy-data"
import { useAuth } from "@/lib/auth-context"

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const user = Object.values(dummyUsers).find((u) => u.email === email && u.password === password)

    if (user) {
      login({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role as "admin" | "hr" | "manager" | "employee",
        avatar: user.avatar,
        department: user.department,
        designation: user.designation,
      })
      router.push("/dashboard")
    } else {
      setError("Invalid email or password")
    }
    setLoading(false)
  }

  const demoLogins = [
    {
      role: "Admin",
      email: "admin@averpeople.com",
      password: "admin123",
      description: "Full access to all modules",
      color: "border-red-200 bg-red-50 hover:bg-red-100",
    },
    {
      role: "HR Manager",
      email: "hr@averpeople.com",
      password: "hr123",
      description: "HR, Attendance, Payroll, Interviews",
      color: "border-blue-200 bg-blue-50 hover:bg-blue-100",
    },
    {
      role: "Manager",
      email: "manager@averpeople.com",
      password: "manager123",
      description: "Team view, Attendance, Leaves, L&D",
      color: "border-amber-200 bg-amber-50 hover:bg-amber-100",
    },
    {
      role: "Employee",
      email: "employee@averpeople.com",
      password: "employee123",
      description: "Personal data, Attendance, L&D",
      color: "border-emerald-200 bg-emerald-50 hover:bg-emerald-100",
    },
  ]

  const quickLogin = (email: string, password: string) => {
    setEmail(email)
    setPassword(password)
  }

  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-foreground text-background p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent" />
        <div className="relative">
          <Link href="/">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">A</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg leading-tight text-background">Aver</span>
                <span className="text-xs text-background/70 -mt-0.5">People</span>
              </div>
            </div>
          </Link>
        </div>

        <div className="relative">
          <h1 className="text-4xl font-bold mb-6">
            Welcome to the Future of
            <span className="text-primary"> People Management</span>
          </h1>
          <p className="text-background/70 text-lg mb-8">
            Streamline HR, track attendance, manage payroll, and empower your workforce with AI-powered tools.
          </p>

          <div className="space-y-4">
            {["Complete HRMS Solution", "AI-Powered Analytics", "Enterprise Security"].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative text-sm text-background/50">© 2025 Aver People. All rights reserved.</div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8">
            <Link href="/">
              <Logo />
            </Link>
          </div>

          <Card className="border-0 shadow-xl">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl">Sign in to your account</CardTitle>
              <CardDescription>Enter your credentials to access the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="demo" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="demo">Demo Access</TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {error && <p className="text-sm text-destructive">{error}</p>}

                    <div className="flex items-center justify-between text-sm">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-muted-foreground">Remember me</span>
                      </label>
                      <Link href="#" className="text-primary hover:underline">
                        Forgot password?
                      </Link>
                    </div>

                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? "Signing in..." : "Sign In"}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="demo">
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground text-center mb-4">
                      Select a role to see different access levels
                    </p>
                    {demoLogins.map((demo) => (
                      <button
                        key={demo.role}
                        onClick={() => quickLogin(demo.email, demo.password)}
                        className={`w-full p-4 border rounded-lg text-left transition-colors group ${demo.color}`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <Shield className="w-4 h-4" />
                              <span className="font-medium text-foreground">{demo.role}</span>
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">{demo.description}</div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                        </div>
                      </button>
                    ))}
                    <p className="text-xs text-muted-foreground text-center mt-4">
                      After selecting a role, switch to &ldquo;Login&rdquo; tab and click Sign In
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Don&apos;t have an account?{" "}
            <Link href="#" className="text-primary hover:underline font-medium">
              Contact Sales
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
