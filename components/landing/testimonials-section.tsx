"use client"

import { Card } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    quote:
      "Aver People transformed how we manage our 500+ workforce. The AI interview module alone saved us 200+ hours monthly.",
    author: "Priya Sharma",
    role: "CHRO, TechCorp India",
    avatar: "/indian-business-woman.png",
    rating: 5,
  },
  {
    quote:
      "The geo-fencing and face recognition attendance has eliminated buddy punching completely. ROI achieved in 3 months.",
    author: "Marcus Johnson",
    role: "VP Operations, GlobalRetail",
    avatar: "/african-american-executive-man.jpg",
    rating: 5,
  },
  {
    quote: "L&D gamification increased our course completion rates by 300%. Employees actually enjoy training now.",
    author: "Elena Rodriguez",
    role: "L&D Director, Innovate Inc",
    avatar: "/latina-business-woman.png",
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Loved by HR Leaders Worldwide</h2>
          <p className="text-lg text-muted-foreground">See what industry leaders say about Aver People</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.author} className="p-8">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-foreground mb-6 text-lg">&ldquo;{testimonial.quote}&rdquo;</p>
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-foreground">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
