"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Play, CheckCircle } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background pt-20 pb-32">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Trusted by 500+ enterprises worldwide
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6">
            The Complete
            <span className="text-primary"> People </span>
            Management Platform
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Streamline HR, attendance, payroll, learning & development, and AI-powered interviews all in one intelligent
            platform built for the modern workforce.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/login">
              <Button size="lg" className="h-14 px-8 text-lg gap-2">
                Start Free Trial
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="h-14 px-8 text-lg gap-2 bg-transparent">
              <Play className="w-5 h-5" />
              Watch Demo
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            {["No credit card required", "14-day free trial", "Cancel anytime"].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none" />
          <div className="bg-card border rounded-xl shadow-2xl overflow-hidden max-w-5xl mx-auto">
            <div className="bg-muted/50 px-4 py-3 flex items-center gap-2 border-b">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-destructive/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-primary/60" />
              </div>
              <div className="flex-1 text-center text-sm text-muted-foreground">dashboard.averpeople.com</div>
            </div>
            <img src="/modern-hr-dashboard-with-charts-and-employee-data.jpg" alt="Aver People Dashboard Preview" className="w-full" />
          </div>
        </div>
      </div>
    </section>
  )
}
