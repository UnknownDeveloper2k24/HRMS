"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Video,
  Calendar,
  Play,
  CheckCircle,
  Clock,
  Brain,
  MessageSquare,
  TrendingUp,
  AlertCircle,
  Plus,
  Eye,
  FileText,
  ThumbsUp,
  ThumbsDown,
  Mic,
  Camera,
  Shield,
} from "lucide-react"
import { interviews } from "@/lib/dummy-data"

export default function InterviewsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [selectedInterview, setSelectedInterview] = useState<(typeof interviews)[0] | null>(null)
  const [showNewInterview, setShowNewInterview] = useState(false)

  const stats = {
    total: interviews.length,
    completed: interviews.filter((i) => i.status === "completed").length,
    scheduled: interviews.filter((i) => i.status === "scheduled").length,
    inProgress: interviews.filter((i) => i.status === "in-progress").length,
  }

  const statusColors: Record<string, string> = {
    completed: "bg-primary/10 text-primary",
    scheduled: "bg-blue-500/10 text-blue-500",
    "in-progress": "bg-orange-500/10 text-orange-500",
  }

  const statusIcons: Record<string, React.ReactNode> = {
    completed: <CheckCircle className="w-4 h-4" />,
    scheduled: <Calendar className="w-4 h-4" />,
    "in-progress": <Play className="w-4 h-4" />,
  }

  const getRecommendationColor = (rec: string | null) => {
    if (!rec) return ""
    if (rec === "Strong Hire") return "bg-primary/10 text-primary border-primary/20"
    if (rec === "Consider") return "bg-orange-500/10 text-orange-500 border-orange-500/20"
    return "bg-destructive/10 text-destructive border-destructive/20"
  }

  const filteredInterviews = activeTab === "all" ? interviews : interviews.filter((i) => i.status === activeTab)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">AI Interview Module</h1>
          <p className="text-muted-foreground">Automated candidate screening with AI-powered evaluation</p>
        </div>
        <Button onClick={() => setShowNewInterview(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Schedule Interview
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Interviews</p>
                <p className="text-3xl font-bold text-foreground">{stats.total}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Video className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-3xl font-bold text-foreground">{stats.completed}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Scheduled</p>
                <p className="text-3xl font-bold text-foreground">{stats.scheduled}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">In Progress</p>
                <p className="text-3xl font-bold text-foreground">{stats.inProgress}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center">
                <Play className="w-6 h-6 text-orange-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Features Overview */}
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-6">
            {[
              { icon: Camera, label: "Liveness Detection", desc: "Real-time facial verification" },
              { icon: Mic, label: "Voice Analysis", desc: "Tone & confidence scoring" },
              { icon: Brain, label: "NLP Evaluation", desc: "Response quality analysis" },
              { icon: Shield, label: "Anti-Fraud", desc: "Cheating prevention system" },
            ].map((feature) => (
              <div key={feature.label} className="flex items-center gap-3 flex-1 min-w-[200px]">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">{feature.label}</p>
                  <p className="text-xs text-muted-foreground">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Interviews</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <div className="grid md:grid-cols-2 gap-4">
            {filteredInterviews.map((interview) => (
              <Card
                key={interview.id}
                className="hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedInterview(interview)}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="w-14 h-14">
                      <AvatarImage
                        src={`/.jpg?height=56&width=56&query=${interview.candidateName} professional headshot`}
                      />
                      <AvatarFallback className="text-lg">
                        {interview.candidateName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-foreground">{interview.candidateName}</h3>
                          <p className="text-sm text-muted-foreground">{interview.position}</p>
                        </div>
                        <Badge variant="secondary" className={statusColors[interview.status]}>
                          {statusIcons[interview.status]}
                          <span className="ml-1 capitalize">{interview.status.replace("-", " ")}</span>
                        </Badge>
                      </div>

                      <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {interview.scheduledDate}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {interview.scheduledTime}
                        </div>
                      </div>

                      {interview.status === "completed" && interview.aiScore && (
                        <div className="mt-4 space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">AI Score</span>
                            <span className="font-bold text-primary">{interview.aiScore}/100</span>
                          </div>
                          <Progress value={interview.aiScore} className="h-2" />
                          <div className="flex items-center justify-between mt-2">
                            <Badge variant="outline" className={getRecommendationColor(interview.recommendation)}>
                              {interview.recommendation}
                            </Badge>
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4 mr-1" />
                              View Report
                            </Button>
                          </div>
                        </div>
                      )}

                      {interview.status === "scheduled" && (
                        <div className="mt-4 flex gap-2">
                          <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                            Reschedule
                          </Button>
                          <Button size="sm" className="flex-1">
                            Send Reminder
                          </Button>
                        </div>
                      )}

                      {interview.status === "in-progress" && (
                        <div className="mt-4">
                          <div className="flex items-center gap-2 text-orange-500">
                            <span className="relative flex h-3 w-3">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
                            </span>
                            <span className="text-sm font-medium">Interview in progress...</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Interview Detail Dialog */}
      <Dialog
        open={!!selectedInterview && selectedInterview.status === "completed"}
        onOpenChange={() => setSelectedInterview(null)}
      >
        <DialogContent className="max-w-3xl">
          {selectedInterview && selectedInterview.status === "completed" && (
            <>
              <DialogHeader>
                <DialogTitle>AI Interview Report</DialogTitle>
                <DialogDescription>
                  Detailed analysis for {selectedInterview.candidateName} - {selectedInterview.position}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Overall Score */}
                <div className="flex items-center gap-6 p-4 bg-muted/50 rounded-lg">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary">{selectedInterview.aiScore}</div>
                    <div className="text-sm text-muted-foreground">Overall Score</div>
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2">
                        <MessageSquare className="w-4 h-4" />
                        Communication
                      </span>
                      <span className="font-medium">{selectedInterview.communicationScore}%</span>
                    </div>
                    <Progress value={selectedInterview.communicationScore || 0} className="h-2" />

                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2">
                        <Brain className="w-4 h-4" />
                        Technical
                      </span>
                      <span className="font-medium">{selectedInterview.technicalScore}%</span>
                    </div>
                    <Progress value={selectedInterview.technicalScore || 0} className="h-2" />

                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" />
                        Confidence
                      </span>
                      <span className="font-medium">{selectedInterview.confidenceScore}%</span>
                    </div>
                    <Progress value={selectedInterview.confidenceScore || 0} className="h-2" />
                  </div>
                </div>

                {/* Strengths & Concerns */}
                <div className="grid md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm flex items-center gap-2 text-primary">
                        <ThumbsUp className="w-4 h-4" />
                        Strengths Identified
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
                          Strong technical knowledge in required skills
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
                          Clear and articulate communication
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
                          Demonstrated problem-solving abilities
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm flex items-center gap-2 text-orange-500">
                        <ThumbsDown className="w-4 h-4" />
                        Areas of Concern
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5" />
                          Limited experience with cloud technologies
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5" />
                          Could improve on behavioral responses
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                {/* Recommendation */}
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">AI Recommendation</p>
                    <p className="text-sm text-muted-foreground">Based on comprehensive analysis</p>
                  </div>
                  <Badge className={`text-base px-4 py-2 ${getRecommendationColor(selectedInterview.recommendation)}`}>
                    {selectedInterview.recommendation}
                  </Badge>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1 bg-transparent">
                    <FileText className="w-4 h-4 mr-2" />
                    Download Report
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    Request Manual Review
                  </Button>
                  <Button className="flex-1">Schedule Next Round</Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* New Interview Dialog */}
      <Dialog open={showNewInterview} onOpenChange={setShowNewInterview}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Schedule AI Interview</DialogTitle>
            <DialogDescription>Set up an automated interview for a candidate</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>Candidate Name</Label>
              <Input placeholder="Enter candidate name" />
            </div>
            <div className="space-y-2">
              <Label>Email Address</Label>
              <Input type="email" placeholder="candidate@email.com" />
            </div>
            <div className="space-y-2">
              <Label>Position</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="frontend">Frontend Developer</SelectItem>
                  <SelectItem value="backend">Backend Developer</SelectItem>
                  <SelectItem value="fullstack">Full Stack Developer</SelectItem>
                  <SelectItem value="pm">Product Manager</SelectItem>
                  <SelectItem value="designer">UI/UX Designer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Date</Label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <Label>Time</Label>
                <Input type="time" />
              </div>
            </div>
            <div className="flex gap-3 pt-4">
              <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setShowNewInterview(false)}>
                Cancel
              </Button>
              <Button className="flex-1" onClick={() => setShowNewInterview(false)}>
                Schedule Interview
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
