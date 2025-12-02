"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { MessageCircle, Book, Video, Mail, Phone, Search, ExternalLink } from "lucide-react"

export default function HelpPage() {
  const faqs = [
    {
      question: "How do I add a new employee?",
      answer:
        "Navigate to the Employees section from the sidebar, click on 'Add Employee' button, and fill in the required details in the form. The employee will receive an email invitation to set up their account.",
    },
    {
      question: "How does the AI Interview module work?",
      answer:
        "The AI Interview module uses advanced NLP and computer vision to conduct automated preliminary screening. It analyzes communication skills, technical knowledge, confidence levels, and provides a comprehensive score with recommendations.",
    },
    {
      question: "Can I customize the attendance tracking methods?",
      answer:
        "Yes! You can enable or disable different attendance methods (Biometric, Face Recognition, Geo-Tracking, Geo-Fence) based on your organization's needs. Configure these settings in the Attendance module settings.",
    },
    {
      question: "How is payroll processing handled?",
      answer:
        "Payroll is processed through a multi-step workflow: Attendance sync, Manager approvals, Salary calculation, Compliance generation, and Disbursement. The system auto-calculates PF, ESI, TDS, and other statutory deductions.",
    },
    {
      question: "How do L&D certificates work?",
      answer:
        "Upon completing a course with 80% or higher score, employees receive a digitally verified certificate with a unique QR code and blockchain hash for verification. These certificates are tamper-proof and publicly verifiable.",
    },
  ]

  const resources = [
    { title: "Documentation", desc: "Comprehensive guides and tutorials", icon: Book, link: "#" },
    { title: "Video Tutorials", desc: "Step-by-step video walkthroughs", icon: Video, link: "#" },
    { title: "API Reference", desc: "Developer documentation", icon: ExternalLink, link: "#" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Help & Support</h1>
        <p className="text-muted-foreground">Get help with using Aver People platform</p>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-xl font-semibold text-foreground mb-2">How can we help you?</h2>
            <p className="text-muted-foreground mb-4">Search our knowledge base or browse FAQs below</p>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input placeholder="Search for help..." className="pl-10 h-12" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <div className="grid sm:grid-cols-3 gap-4">
        {resources.map((resource) => (
          <Card key={resource.title} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <resource.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{resource.title}</h3>
                  <p className="text-sm text-muted-foreground">{resource.desc}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* FAQs */}
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
          <CardDescription>Quick answers to common questions</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      {/* Contact Support */}
      <Card>
        <CardHeader>
          <CardTitle>Still need help?</CardTitle>
          <CardDescription>Our support team is here to assist you</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto py-4 flex-col gap-2 bg-transparent">
              <MessageCircle className="w-5 h-5" />
              <span>Live Chat</span>
              <span className="text-xs text-muted-foreground">Available 24/7</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2 bg-transparent">
              <Mail className="w-5 h-5" />
              <span>Email Support</span>
              <span className="text-xs text-muted-foreground">support@averpeople.com</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2 bg-transparent">
              <Phone className="w-5 h-5" />
              <span>Phone Support</span>
              <span className="text-xs text-muted-foreground">+1 (800) 123-4567</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
