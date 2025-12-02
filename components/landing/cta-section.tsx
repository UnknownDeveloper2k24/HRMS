"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar } from "lucide-react"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="bg-foreground text-background rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent" />
          <div className="relative">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Transform Your
              <span className="text-primary"> People Operations?</span>
            </h2>
            <p className="text-background/70 text-lg md:text-xl max-w-2xl mx-auto mb-10">
              Join 500+ enterprises that trust Aver People for their complete HR management needs.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/login">
                <Button
                  size="lg"
                  className="h-14 px-8 text-lg gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Start Free Trial
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="h-14 px-8 text-lg gap-2 border-background/30 text-background bg-transparent hover:bg-background/10"
              >
                <Calendar className="w-5 h-5" />
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
