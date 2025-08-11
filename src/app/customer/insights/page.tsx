/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Badge } from "@/app/components/ui/badge"
import { Progress } from "@/app/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import {
  TrendingUp,
  Shield,
  Clock,
  BookOpen,
  Calendar,
  Play,
  ExternalLink,
  Filter,
  Search,
  Loader2,
  Info,
} from "lucide-react"
import { useState } from "react"

export default function InsightsPage() {
  // Dummy data for cyber health
  const cyberHealth = {
    score: 82,
    improvements: [
      {
        title: "Endpoint Protection",
        priority: "high",
        impact: "High Impact",
        description: "Upgrade endpoint protection to latest version to mitigate new threats"
      },
      {
        title: "Employee Training",
        priority: "medium",
        impact: "Medium Impact",
        description: "Conduct quarterly security awareness training for all employees"
      },
      {
        title: "Backup Strategy",
        priority: "low",
        impact: "Low Impact",
        description: "Implement 3-2-1 backup strategy for critical systems"
      }
    ]
  }

  // Dummy news articles
  const articles = [
    {
      id: "1",
      title: "New Ransomware Targeting Financial Sector",
      severity: "high",
      industry: ["Finance"],
      summary: "A new strain of ransomware has been identified targeting financial institutions globally.",
      publishedAt: "2023-06-15"
    },
    {
      id: "2",
      title: "Critical Vulnerability in Popular CMS Platform",
      severity: "critical",
      industry: ["Technology"],
      summary: "Security researchers have discovered a zero-day vulnerability affecting millions of websites.",
      publishedAt: "2023-06-10"
    }
  ]

  // Dummy case studies
  const caseStudies = [
    {
      id: "1",
      title: "Financial Institution Phishing Defense",
      industry: "Finance",
      challenge: "High volume of sophisticated phishing attacks targeting employees",
      solution: "Implemented AI-powered email filtering and employee training program",
      results: "Reduced successful phishing attempts by 92% in 6 months"
    },
    {
      id: "2",
      title: "Manufacturing Ransomware Recovery",
      industry: "Manufacturing",
      challenge: "Production halted by ransomware attack",
      solution: "Deployed endpoint detection and response (EDR) across all systems",
      results: "Restored operations within 48 hours with no data loss"
    }
  ]

  // Dummy webinars
  const webinars = [
    {
      id: "1",
      title: "Zero Trust Architecture Implementation",
      presenter: "Jane Smith, CISO",
      scheduledAt: "2023-07-15T14:00:00",
      duration: 60,
      tags: ["Zero Trust", "Architecture"]
    },
    {
      id: "2",
      title: "Cloud Security Best Practices",
      presenter: "John Doe, Cloud Security Expert",
      scheduledAt: "2023-07-20T10:00:00",
      duration: 45,
      tags: ["Cloud", "Security"]
    }
  ]

  const [newsFilterCategory, setNewsFilterCategory] = useState<string | undefined>(undefined)
  const [caseStudyFilterIndustry, setCaseStudyFilterIndustry] = useState<string | undefined>(undefined)

  const getSeverityColor = (severity: string | undefined) => {
    switch (severity) {
      case "critical":
        return "bg-red-500/20 text-red-400"
      case "high":
        return "bg-orange-500/20 text-orange-400"
      case "medium":
        return "bg-yellow-500/20 text-yellow-400"
      case "low":
        return "bg-green-500/20 text-green-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  const getStatusColor = (score: number) => {
    if (score >= 90) return "text-green-400"
    if (score >= 70) return "text-blue-400"
    if (score >= 50) return "text-yellow-400"
    return "text-orange-400"
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500/20 text-red-400"
      case "medium":
        return "bg-yellow-500/20 text-yellow-400"
      case "low":
        return "bg-green-500/20 text-green-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">CyberJall Insights</h1>
          <p className="text-gray-400">Your cybersecurity intelligence dashboard</p>
        </div>
      </div>

      {/* Cyber Health Score */}
      <Card className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Shield className="mr-2 h-6 w-6 text-orange-500" />
            Cyber Health Score
          </CardTitle>
          <CardDescription className="text-gray-300">
            AI-driven assessment of your organization&apos;s security posture
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div className="text-center">
              <div className="text-5xl font-bold text-orange-500 mb-2">{cyberHealth.score}</div>
              <div className="text-sm text-gray-400">Overall Score</div>
              <Badge variant="secondary" className="bg-green-500/20 text-green-400 mt-2">
                Good Security Posture
              </Badge>
            </div>
            <div className="flex-1 ml-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cyberHealth.improvements.slice(0, 4).map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">{item.title.split(":")[0]}</span>
                      <span className={getStatusColor(cyberHealth.score)}>{cyberHealth.score}%</span>
                    </div>
                    <Progress value={cyberHealth.score} className="h-2" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Improvement Suggestions */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <TrendingUp className="mr-2 h-5 w-5 text-orange-500" />
            Improvement Suggestions
          </CardTitle>
          <CardDescription className="text-gray-400">
            Tailored recommendations to enhance your security score
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {cyberHealth.improvements.map((improvement, index) => (
            <div key={index} className="flex items-start space-x-4 p-4 bg-gray-800 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className="text-white font-medium">{improvement.title}</h4>
                  <Badge variant="secondary" className={getPriorityColor(improvement.priority)}>
                    {improvement.priority}
                  </Badge>
                  <Badge variant="outline" className="border-green-500/30 text-green-400">
                    {improvement.impact}
                  </Badge>
                </div>
                <p className="text-gray-400 text-sm">{improvement.description}</p>
              </div>
              <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                Implement
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <Tabs defaultValue="news" className="space-y-4">
        <TabsList className="bg-gray-900 border border-gray-800">
          <TabsTrigger value="news" className="data-[state=active]:bg-orange-500">
            Threat & News Feed
          </TabsTrigger>
          <TabsTrigger value="case-studies" className="data-[state=active]:bg-orange-500">
            Industry Case Studies
          </TabsTrigger>
          <TabsTrigger value="webinars" className="data-[state=active]:bg-orange-500">
            Webinars & Events
          </TabsTrigger>
        </TabsList>

        <TabsContent value="news" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Latest Security News</h3>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="border-gray-700 bg-transparent">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
              <Button variant="outline" size="sm" className="border-gray-700 bg-transparent">
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {articles.map((article) => (
              <Card
                key={article.id}
                className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-colors"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-white text-lg leading-tight">{article.title}</CardTitle>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge variant="secondary" className={getSeverityColor(article.severity)}>
                          {article.severity}
                        </Badge>
                        {article.industry && article.industry.length > 0 && (
                          <Badge variant="outline" className="border-gray-700 text-gray-300">
                            {article.industry[0]}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 text-sm mb-4">{article.summary}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                      <span>3 min read</span>
                    </div>
                    <Button size="sm" variant="outline" className="border-gray-700 bg-transparent">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Read More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="case-studies" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Industry Case Studies</h3>
            <Button variant="outline" size="sm" className="border-gray-700 bg-transparent">
              <Filter className="mr-2 h-4 w-4" />
              Filter by Industry
            </Button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {caseStudies.map((study) => (
              <Card key={study.id} className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-colors">
                <CardHeader>
                  <CardTitle className="text-white text-lg leading-tight">{study.title}</CardTitle>
                  <Badge variant="outline" className="border-gray-700 text-gray-300 w-fit">
                    {study.industry}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h5 className="text-sm font-medium text-gray-300 mb-1">Challenge</h5>
                    <p className="text-xs text-gray-400">{study.challenge}</p>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-300 mb-1">Solution</h5>
                    <p className="text-xs text-gray-400">{study.solution}</p>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-300 mb-1">Results</h5>
                    <p className="text-xs text-gray-400">{study.results}</p>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-gray-500">7 min read</span>
                    <Button size="sm" variant="outline" className="border-gray-700 bg-transparent">
                      <BookOpen className="mr-2 h-4 w-4" />
                      Read Case Study
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="webinars" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Upcoming Webinars & Events</h3>
            <Button className="bg-orange-500 hover:bg-orange-600">
              <Calendar className="mr-2 h-4 w-4" />
              View Calendar
            </Button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {webinars.map((webinar) => (
              <Card key={webinar.id} className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white text-lg leading-tight">{webinar.title}</CardTitle>
                  <CardDescription className="text-gray-400">{webinar.presenter}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(webinar.scheduledAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{webinar.duration} min</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {webinar.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="border-gray-700 text-gray-300">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button className="w-full bg-orange-500 hover:bg-orange-600">
                    <Play className="mr-2 h-4 w-4" />
                    Register Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}