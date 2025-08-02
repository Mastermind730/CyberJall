"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Badge } from "@/app/components/ui/badge"
import { Progress } from "@/app/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { TrendingUp, Shield, Clock, BookOpen, Calendar, Play, ExternalLink, Filter, Search } from "lucide-react"

const cyberHealthData = {
  overallScore: 85,
  categories: [
    { name: "Network Security", score: 92, status: "excellent" },
    { name: "Access Control", score: 88, status: "good" },
    { name: "Data Protection", score: 85, status: "good" },
    { name: "Email Security", score: 72, status: "needs-attention" },
    { name: "Endpoint Security", score: 90, status: "excellent" },
    { name: "Incident Response", score: 78, status: "fair" },
  ],
  improvements: [
    {
      title: "Enable Multi-Factor Authentication",
      description: "Implement MFA for all administrative accounts",
      priority: "high",
      impact: "+8 points",
    },
    {
      title: "Update Email Security Policies",
      description: "Strengthen email filtering and user training",
      priority: "medium",
      impact: "+5 points",
    },
    {
      title: "Enhance Incident Response Plan",
      description: "Regular drills and plan updates needed",
      priority: "medium",
      impact: "+4 points",
    },
  ],
}

const newsArticles = [
  {
    id: 1,
    title: "Major Healthcare Data Breach Affects 2.3M Patients",
    summary: "Ransomware attack on regional healthcare network exposes sensitive patient data",
    category: "Data Breach",
    industry: "Healthcare",
    severity: "high",
    publishedAt: "2024-01-08",
    readTime: "3 min",
  },
  {
    id: 2,
    title: "New AI-Powered Phishing Attacks Target Financial Sector",
    summary: "Sophisticated phishing campaigns using deepfake technology increase by 300%",
    category: "Threat Intelligence",
    industry: "Financial",
    severity: "medium",
    publishedAt: "2024-01-07",
    readTime: "4 min",
  },
  {
    id: 3,
    title: "Zero-Day Vulnerability Discovered in Popular VPN Software",
    summary: "Critical security flaw allows remote code execution, patch available",
    category: "Vulnerability",
    industry: "Technology",
    severity: "critical",
    publishedAt: "2024-01-06",
    readTime: "2 min",
  },
]

const caseStudies = [
  {
    id: 1,
    title: "Fintech Startup Prevents $2M Loss Through Proactive Security",
    industry: "Fintech",
    challenge: "Rapid growth exposed security gaps in payment processing",
    solution: "Comprehensive security audit and implementation of advanced monitoring",
    results: "Zero security incidents, 99.9% uptime, regulatory compliance achieved",
    readTime: "8 min",
  },
  {
    id: 2,
    title: "Healthcare Network Recovers from Ransomware in 48 Hours",
    industry: "Healthcare",
    challenge: "Ransomware attack encrypted critical patient data systems",
    solution: "Incident response team activation and backup restoration protocol",
    results: "Full system recovery, improved backup strategy, staff training program",
    readTime: "6 min",
  },
  {
    id: 3,
    title: "Manufacturing Giant Secures IoT Infrastructure",
    industry: "Manufacturing",
    challenge: "Unsecured IoT devices created network vulnerabilities",
    solution: "Network segmentation and IoT security framework implementation",
    results: "Reduced attack surface by 75%, improved operational visibility",
    readTime: "7 min",
  },
]

const webinars = [
  {
    id: 1,
    title: "Advanced Threat Detection in 2024",
    presenter: "Dr. Sarah Chen, CISO at CyberJall",
    scheduledAt: "2024-01-15T14:00:00",
    duration: 60,
    isLive: false,
    tags: ["Threat Detection", "AI Security", "SOC"],
    registrationUrl: "#",
  },
  {
    id: 2,
    title: "Zero Trust Architecture Implementation",
    presenter: "Michael Rodriguez, Security Architect",
    scheduledAt: "2024-01-22T15:00:00",
    duration: 45,
    isLive: false,
    tags: ["Zero Trust", "Network Security", "Architecture"],
    registrationUrl: "#",
  },
  {
    id: 3,
    title: "Incident Response Best Practices",
    presenter: "Jennifer Park, IR Team Lead",
    scheduledAt: "2024-01-29T13:00:00",
    duration: 90,
    isLive: false,
    tags: ["Incident Response", "Crisis Management", "Recovery"],
    registrationUrl: "#",
  },
]

export default function InsightsPage() {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-500/20 text-red-400"
      case "high":
        return "bg-orange-500/20 text-orange-400"
      case "medium":
        return "bg-yellow-500/20 text-yellow-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "text-green-400"
      case "good":
        return "text-blue-400"
      case "fair":
        return "text-yellow-400"
      case "needs-attention":
        return "text-orange-400"
      default:
        return "text-gray-400"
    }
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
            AI-driven assessment of your organization's security posture
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div className="text-center">
              <div className="text-5xl font-bold text-orange-500 mb-2">{cyberHealthData.overallScore}</div>
              <div className="text-sm text-gray-400">Overall Score</div>
              <Badge variant="secondary" className="bg-green-500/20 text-green-400 mt-2">
                Good Security Posture
              </Badge>
            </div>
            <div className="flex-1 ml-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cyberHealthData.categories.map((category, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">{category.name}</span>
                      <span className={getStatusColor(category.status)}>{category.score}/100</span>
                    </div>
                    <Progress value={category.score} className="h-2" />
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
          {cyberHealthData.improvements.map((improvement, index) => (
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
            {newsArticles.map((article) => (
              <Card key={article.id} className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-white text-lg leading-tight">{article.title}</CardTitle>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge variant="secondary" className={getSeverityColor(article.severity)}>
                          {article.severity}
                        </Badge>
                        <Badge variant="outline" className="border-gray-700 text-gray-300">
                          {article.industry}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 text-sm mb-4">{article.summary}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>{article.publishedAt}</span>
                      <span>{article.readTime} read</span>
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
                    <span className="text-xs text-gray-500">{study.readTime} read</span>
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
