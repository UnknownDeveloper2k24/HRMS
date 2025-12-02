"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Trophy, Star, Award, BookOpen, Play, Clock, TrendingUp, Medal, CheckCircle, Lock, Zap } from "lucide-react"
import { courses, leaderboard, badges, certificates } from "@/lib/dummy-data"

export default function LearningPage() {
  const [activeTab, setActiveTab] = useState("courses")

  const userStats = {
    points: 1820,
    level: "Intermediate",
    streak: 12,
    completedCourses: 5,
    badges: 7,
    rank: 5,
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Learning & Development</h1>
          <p className="text-muted-foreground">Develop skills and track your progress</p>
        </div>
        <Button>
          <BookOpen className="w-4 h-4 mr-2" />
          Browse All Courses
        </Button>
      </div>

      {/* User Progress Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Points</p>
                <p className="text-3xl font-bold text-primary">{userStats.points}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Zap className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Current Level</p>
                <p className="text-2xl font-bold text-foreground">{userStats.level}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Learning Streak</p>
                <p className="text-2xl font-bold text-foreground">{userStats.streak} days 🔥</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center">
                <Trophy className="w-6 h-6 text-orange-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Leaderboard Rank</p>
                <p className="text-2xl font-bold text-foreground">#{userStats.rank}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center">
                <Medal className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="courses">My Courses</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          <TabsTrigger value="badges">Badges</TabsTrigger>
          <TabsTrigger value="certificates">Certificates</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="mt-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video relative">
                  <img
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  {course.progress === 100 && (
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-primary text-primary-foreground">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Completed
                      </Badge>
                    </div>
                  )}
                </div>
                <CardContent className="pt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">{course.category}</Badge>
                    <Badge variant="secondary">{course.level}</Badge>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{course.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{course.description}</p>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {course.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      {course.modules} modules
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                      {course.rating}
                    </div>
                  </div>

                  {course.progress > 0 && course.progress < 100 && (
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-primary">{course.points} pts</span>
                    </div>
                    <Button size="sm">
                      {course.progress === 0 ? (
                        <>
                          <Play className="w-4 h-4 mr-1" />
                          Start
                        </>
                      ) : course.progress === 100 ? (
                        "Review"
                      ) : (
                        "Continue"
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="leaderboard" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Performers This Month</CardTitle>
              <CardDescription>Rankings are refreshed daily at midnight</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leaderboard.map((user, idx) => (
                  <div
                    key={user.rank}
                    className={`flex items-center gap-4 p-4 rounded-lg ${
                      idx < 3 ? "bg-primary/5 border border-primary/10" : "bg-muted/50"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                        idx === 0
                          ? "bg-yellow-500 text-yellow-950"
                          : idx === 1
                            ? "bg-gray-300 text-gray-700"
                            : idx === 2
                              ? "bg-orange-400 text-orange-950"
                              : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {user.rank}
                    </div>
                    <Avatar>
                      <AvatarImage src={user.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{user.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {user.level} • {user.badges} badges
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">{user.points.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">points</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="badges" className="mt-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {badges.map((badge) => (
              <Card key={badge.id} className={badge.earned ? "" : "opacity-60"}>
                <CardContent className="pt-6 text-center">
                  <div
                    className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center text-4xl mb-4 ${
                      badge.earned ? "bg-primary/10" : "bg-muted"
                    }`}
                  >
                    {badge.earned ? badge.icon : <Lock className="w-8 h-8 text-muted-foreground" />}
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{badge.name}</h3>
                  <p className="text-sm text-muted-foreground">{badge.description}</p>
                  {badge.earned && (
                    <Badge variant="secondary" className="mt-3 bg-primary/10 text-primary">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Earned
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="certificates" className="mt-6">
          <div className="grid md:grid-cols-2 gap-6">
            {certificates.map((cert) => (
              <Card key={cert.id} className="overflow-hidden">
                <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6 border-b">
                  <div className="flex items-center justify-between mb-4">
                    <Award className="w-12 h-12 text-primary" />
                    <Badge variant="outline">Verified</Badge>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-1">{cert.courseName}</h3>
                  <p className="text-muted-foreground">Awarded to {cert.employeeName}</p>
                </div>
                <CardContent className="pt-4">
                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div>
                      <p className="text-muted-foreground">Issue Date</p>
                      <p className="font-medium">{new Date(cert.issueDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Valid Until</p>
                      <p className="font-medium">{new Date(cert.validUntil).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Score</p>
                      <p className="font-medium">{cert.score}%</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Certificate ID</p>
                      <p className="font-medium text-xs">{cert.id}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      View Certificate
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      Download PDF
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
