"use client"

import { Users, Clock, GraduationCap, Video, Wallet, Shield } from "lucide-react"

const features = [
  {
    icon: Users,
    title: "Core HRMS",
    description:
      "Complete employee lifecycle management from onboarding to offboarding with document vault and compliance tracking.",
  },
  {
    icon: Clock,
    title: "Smart Attendance",
    description: "Biometric, face recognition, geo-tracking, and geo-fencing with real-time fraud detection.",
  },
  {
    icon: GraduationCap,
    title: "L&D with Gamification",
    description: "Interactive training with points, badges, leaderboards, and blockchain-verified certificates.",
  },
  {
    icon: Video,
    title: "AI Interview",
    description: "Automated candidate screening with NLP analysis, sentiment detection, and intelligent scoring.",
  },
  {
    icon: Wallet,
    title: "Payroll Management",
    description: "Automated salary processing, statutory compliance, tax calculations, and seamless disbursement.",
  },
  {
    icon: Shield,
    title: "Compliance & Security",
    description: "Built-in PF, ESI, PT compliance with enterprise-grade security and audit trails.",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Everything You Need to Manage Your People
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Six powerful modules designed to work seamlessly together, giving you complete visibility and control over
            your workforce.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-card p-8 rounded-xl border hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
