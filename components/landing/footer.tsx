"use client"

import { Logo } from "@/components/logo"
import Link from "next/link"
import { Linkedin, Twitter, Youtube, Mail } from "lucide-react"

const footerLinks = {
  Product: ["Features", "Pricing", "Integrations", "API Docs", "Changelog"],
  Modules: ["HRMS", "Attendance", "L&D", "AI Interview", "Payroll"],
  Company: ["About Us", "Careers", "Blog", "Press", "Partners"],
  Support: ["Help Center", "Documentation", "Contact", "Status", "Security"],
}

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-12 mb-12">
          <div className="lg:col-span-2">
            <Logo className="mb-4" />
            <p className="text-muted-foreground mb-6 max-w-sm">
              The complete people management platform for modern enterprises. Streamline HR, attendance, payroll, and
              more.
            </p>
            <div className="flex items-center gap-4">
              {[Linkedin, Twitter, Youtube, Mail].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-foreground mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2025 Aver People. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-primary">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-primary">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
