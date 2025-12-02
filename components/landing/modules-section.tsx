"use client"

import { Badge } from "@/components/ui/badge"
import {
  Fingerprint,
  Scan,
  MapPin,
  Navigation,
  Trophy,
  Award,
  BookOpen,
  TrendingUp,
  Mic,
  Brain,
  BarChart,
  FileText,
  Calculator,
  Receipt,
  FileSpreadsheet,
  CreditCard,
} from "lucide-react"

const modules = [
  {
    title: "Attendance Module",
    description: "Multi-modal attendance tracking for every scenario",
    features: [
      { icon: Fingerprint, name: "Biometric Integration", desc: "Real-time sync with 60-second intervals" },
      { icon: Scan, name: "Face Recognition", desc: "Liveness detection with anti-spoofing" },
      { icon: MapPin, name: "Geo-Tracking", desc: "Passive location monitoring for field staff" },
      { icon: Navigation, name: "Geo-Fencing", desc: "Define allowed zones with VPN detection" },
    ],
    color: "bg-blue-500",
  },
  {
    title: "L&D Platform",
    description: "Gamified learning experience for skill development",
    features: [
      { icon: BookOpen, name: "Course Management", desc: "Auto-generated modules & assessments" },
      { icon: Trophy, name: "Gamification", desc: "Points, badges & level progression" },
      { icon: TrendingUp, name: "Leaderboards", desc: "Daily refreshed rankings" },
      { icon: Award, name: "Digital Certificates", desc: "QR-verified blockchain credentials" },
    ],
    color: "bg-primary",
  },
  {
    title: "AI Interview",
    description: "Intelligent candidate screening automation",
    features: [
      { icon: Mic, name: "Voice Analysis", desc: "Confidence & communication scoring" },
      { icon: Brain, name: "NLP Evaluation", desc: "Domain knowledge assessment" },
      { icon: BarChart, name: "AI Scoring", desc: "0-100 comprehensive scorecard" },
      { icon: FileText, name: "Smart Reports", desc: "Strengths, risks & recommendations" },
    ],
    color: "bg-purple-500",
  },
  {
    title: "Payroll Module",
    description: "End-to-end salary processing & compliance",
    features: [
      { icon: Calculator, name: "Auto Calculation", desc: "CTC breakup with tax optimization" },
      { icon: Receipt, name: "Statutory Compliance", desc: "PF, ESI, PT auto-generated" },
      { icon: FileSpreadsheet, name: "Payslips", desc: "Digital watermarked payslips" },
      { icon: CreditCard, name: "Bank Integration", desc: "NEFT/IMPS/RTGS disbursement" },
    ],
    color: "bg-orange-500",
  },
]

export function ModulesSection() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Platform Modules
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Deep Dive Into Each Module</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Each module is designed following enterprise SOPs and best practices
          </p>
        </div>

        <div className="space-y-8">
          {modules.map((module, idx) => (
            <div
              key={module.title}
              className={`bg-card border rounded-2xl p-8 ${idx % 2 === 1 ? "lg:flex-row-reverse" : ""} lg:flex lg:items-center lg:gap-12`}
            >
              <div className="lg:w-1/2 mb-8 lg:mb-0">
                <h3 className="text-2xl font-bold text-foreground mb-3">{module.title}</h3>
                <p className="text-muted-foreground mb-6">{module.description}</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {module.features.map((feature) => (
                    <div key={feature.name} className="flex items-start gap-3">
                      <div
                        className={`w-10 h-10 rounded-lg ${module.color}/10 flex items-center justify-center flex-shrink-0`}
                      >
                        <feature.icon
                          className={`w-5 h-5`}
                          style={{
                            color: module.color.replace("bg-", "").includes("primary") ? "var(--primary)" : undefined,
                          }}
                        />
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{feature.name}</div>
                        <div className="text-sm text-muted-foreground">{feature.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:w-1/2">
                <div className="bg-muted rounded-xl overflow-hidden">
                  <img
                    src={`/.jpg?height=400&width=600&query=${module.title.toLowerCase().replace(" ", "-")}-interface`}
                    alt={module.title}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
