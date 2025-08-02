"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Textarea } from "@/app/components/ui/textarea"
import { Badge } from "@/app/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog"
import { MessageSquare, Phone, Mail, Plus, Search, Filter, Send, Paperclip, Bot, User } from "lucide-react"

const tickets = [
  {
    id: "TKT-2024-001",
    title: "Unable to access penetration test reports",
    status: "open",
    priority: "high",
    category: "Technical",
    createdAt: "2024-01-08",
    lastUpdate: "2024-01-08",
    assignedTo: "Sarah Johnson",
  },
  {
    id: "TKT-2024-002",
    title: "Request for additional security assessment",
    status: "in_progress",
    priority: "medium",
    category: "Service Request",
    createdAt: "2024-01-05",
    lastUpdate: "2024-01-07",
    assignedTo: "Mike Chen",
  },
  {
    id: "TKT-2024-003",
    title: "Billing inquiry for invoice INV-2024-002",
    status: "resolved",
    priority: "low",
    category: "Billing",
    createdAt: "2024-01-03",
    lastUpdate: "2024-01-04",
    assignedTo: "Lisa Rodriguez",
  },
]

const chatMessages = [
  {
    id: 1,
    sender: "bot",
    message: "Hello! I'm CyberJall AI Assistant. How can I help you today?",
    timestamp: "10:30 AM",
  },
  {
    id: 2,
    sender: "user",
    message: "I need help understanding my cyber health score",
    timestamp: "10:31 AM",
  },
  {
    id: 3,
    sender: "bot",
    message:
      "I'd be happy to help explain your cyber health score! Your current score is 85/100, which indicates a good security posture. Would you like me to break down the individual components?",
    timestamp: "10:31 AM",
  },
]

export default function SupportPage() {
  const [newMessage, setNewMessage] = useState("")
  const [selectedTicket, setSelectedTicket] = useState<any>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-red-500/20 text-red-400"
      case "in_progress":
        return "bg-yellow-500/20 text-yellow-400"
      case "resolved":
        return "bg-green-500/20 text-green-400"
      case "closed":
        return "bg-gray-500/20 text-gray-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
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

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Handle sending message
      setNewMessage("")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Help & Support</h1>
          <p className="text-gray-400">Get assistance from our support team</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-colors cursor-pointer">
          <CardContent className="p-6 text-center">
            <MessageSquare className="h-12 w-12 text-orange-500 mx-auto mb-4" />
            <h3 className="text-white font-semibold mb-2">Live Chat</h3>
            <p className="text-gray-400 text-sm mb-4">
              Get instant help from our AI assistant or connect with a human agent
            </p>
            <Button className="w-full bg-orange-500 hover:bg-orange-600">Start Chat</Button>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-colors cursor-pointer">
          <CardContent className="p-6 text-center">
            <Phone className="h-12 w-12 text-orange-500 mx-auto mb-4" />
            <h3 className="text-white font-semibold mb-2">Phone Support</h3>
            <p className="text-gray-400 text-sm mb-4">Speak directly with our support team for urgent issues</p>
            <Button variant="outline" className="w-full border-gray-700 bg-transparent">
              Call Now
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-colors cursor-pointer">
          <CardContent className="p-6 text-center">
            <Mail className="h-12 w-12 text-orange-500 mx-auto mb-4" />
            <h3 className="text-white font-semibold mb-2">Email Support</h3>
            <p className="text-gray-400 text-sm mb-4">Send us a detailed message and we'll get back to you soon</p>
            <Button variant="outline" className="w-full border-gray-700 bg-transparent">
              Send Email
            </Button>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="tickets" className="space-y-4">
        <TabsList className="bg-gray-900 border border-gray-800">
          <TabsTrigger value="tickets" className="data-[state=active]:bg-orange-500">
            Support Tickets
          </TabsTrigger>
          <TabsTrigger value="chat" className="data-[state=active]:bg-orange-500">
            Live Chat
          </TabsTrigger>
          <TabsTrigger value="new-ticket" className="data-[state=active]:bg-orange-500">
            Create Ticket
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tickets" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Your Support Tickets</h3>
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

          <div className="space-y-4">
            {tickets.map((ticket) => (
              <Card key={ticket.id} className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-white font-medium">{ticket.title}</h4>
                        <Badge variant="secondary" className={getStatusColor(ticket.status)}>
                          {ticket.status.replace("_", " ")}
                        </Badge>
                        <Badge variant="secondary" className={getPriorityColor(ticket.priority)}>
                          {ticket.priority}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                        <span>#{ticket.id}</span>
                        <span>{ticket.category}</span>
                        <span>Created: {ticket.createdAt}</span>
                        <span>Updated: {ticket.lastUpdate}</span>
                      </div>
                      <p className="text-sm text-gray-400">Assigned to: {ticket.assignedTo}</p>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-gray-700 bg-transparent"
                          onClick={() => setSelectedTicket(ticket)}
                        >
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-gray-900 border-gray-800 max-w-2xl">
                        <DialogHeader>
                          <DialogTitle className="text-white">{ticket.title}</DialogTitle>
                          <DialogDescription className="text-gray-400">
                            Ticket #{ticket.id} • {ticket.category}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="flex items-center space-x-4">
                            <Badge variant="secondary" className={getStatusColor(ticket.status)}>
                              {ticket.status.replace("_", " ")}
                            </Badge>
                            <Badge variant="secondary" className={getPriorityColor(ticket.priority)}>
                              {ticket.priority} priority
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-gray-400">Created:</span>
                              <span className="text-white ml-2">{ticket.createdAt}</span>
                            </div>
                            <div>
                              <span className="text-gray-400">Last Update:</span>
                              <span className="text-white ml-2">{ticket.lastUpdate}</span>
                            </div>
                            <div>
                              <span className="text-gray-400">Assigned to:</span>
                              <span className="text-white ml-2">{ticket.assignedTo}</span>
                            </div>
                            <div>
                              <span className="text-gray-400">Category:</span>
                              <span className="text-white ml-2">{ticket.category}</span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <h4 className="text-white font-medium">Ticket History</h4>
                            <div className="space-y-2 max-h-60 overflow-y-auto">
                              <div className="p-3 bg-gray-800 rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-sm font-medium text-white">You</span>
                                  <span className="text-xs text-gray-400">{ticket.createdAt}</span>
                                </div>
                                <p className="text-sm text-gray-300">
                                  Initial ticket description and details about the issue...
                                </p>
                              </div>
                              <div className="p-3 bg-gray-800 rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-sm font-medium text-white">{ticket.assignedTo}</span>
                                  <span className="text-xs text-gray-400">{ticket.lastUpdate}</span>
                                </div>
                                <p className="text-sm text-gray-300">
                                  Thank you for contacting support. We're looking into this issue...
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="response" className="text-gray-300">
                              Add Response
                            </Label>
                            <Textarea
                              id="response"
                              placeholder="Type your response here..."
                              className="bg-gray-800 border-gray-700 text-white"
                            />
                          </div>
                          <div className="flex space-x-2">
                            <Button className="bg-orange-500 hover:bg-orange-600">
                              <Send className="mr-2 h-4 w-4" />
                              Send Response
                            </Button>
                            <Button variant="outline" className="border-gray-700 bg-transparent">
                              <Paperclip className="mr-2 h-4 w-4" />
                              Attach File
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="chat" className="space-y-4">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <MessageSquare className="mr-2 h-5 w-5 text-orange-500" />
                Live Chat Support
              </CardTitle>
              <CardDescription className="text-gray-400">
                Chat with our AI assistant or request human support
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Chat Messages */}
                <div className="h-96 overflow-y-auto space-y-4 p-4 bg-gray-800 rounded-lg">
                  {chatMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`flex items-start space-x-2 max-w-xs lg:max-w-md ${message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${message.sender === "user" ? "bg-orange-500" : "bg-gray-700"}`}
                        >
                          {message.sender === "user" ? (
                            <User className="h-4 w-4 text-white" />
                          ) : (
                            <Bot className="h-4 w-4 text-white" />
                          )}
                        </div>
                        <div
                          className={`p-3 rounded-lg ${message.sender === "user" ? "bg-orange-500 text-white" : "bg-gray-700 text-gray-100"}`}
                        >
                          <p className="text-sm">{message.message}</p>
                          <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chat Input */}
                <div className="flex space-x-2">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="bg-gray-800 border-gray-700 text-white"
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  />
                  <Button onClick={handleSendMessage} className="bg-orange-500 hover:bg-orange-600">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex justify-center">
                  <Button variant="outline" size="sm" className="border-gray-700 bg-transparent">
                    Request Human Agent
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="new-ticket" className="space-y-4">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Plus className="mr-2 h-5 w-5 text-orange-500" />
                Create New Support Ticket
              </CardTitle>
              <CardDescription className="text-gray-400">
                Submit a detailed support request for our team to review
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-gray-300">
                    Category
                  </Label>
                  <Select>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="technical">Technical Issue</SelectItem>
                      <SelectItem value="billing">Billing Inquiry</SelectItem>
                      <SelectItem value="service">Service Request</SelectItem>
                      <SelectItem value="general">General Question</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority" className="text-gray-300">
                    Priority
                  </Label>
                  <Select>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="title" className="text-gray-300">
                  Subject
                </Label>
                <Input
                  id="title"
                  placeholder="Brief description of your issue"
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description" className="text-gray-300">
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Please provide detailed information about your issue, including steps to reproduce if applicable..."
                  className="bg-gray-800 border-gray-700 text-white min-h-32"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-300">Attachments</Label>
                <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center">
                  <Paperclip className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-400 text-sm">Drag and drop files here, or click to browse</p>
                  <Button variant="outline" size="sm" className="mt-2 border-gray-700 bg-transparent">
                    Choose Files
                  </Button>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button className="bg-orange-500 hover:bg-orange-600">Submit Ticket</Button>
                <Button variant="outline" className="border-gray-700 bg-transparent">
                  Save as Draft
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
