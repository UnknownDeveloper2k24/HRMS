"use client"

const stats = [
  { value: "500+", label: "Enterprise Clients" },
  { value: "2M+", label: "Employees Managed" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "40%", label: "Time Saved on HR Tasks" },
]

export function StatsSection() {
  return (
    <section className="py-20 bg-foreground text-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-background/70">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
