"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { Badge } from "@/app/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import {
  HelpCircle,
  MessageCircle,
  Book,
  Video,
  Mail,
  Phone,
  Clock,
  Send,
  Search,
  ExternalLink,
  FileText,
  Users,
  Lightbulb,
  AlertTriangle,
  CheckCircle,
  ChevronRight,
} from "lucide-react";

interface SupportTicket {
  id: string;
  subject: string;
  status: "open" | "in_progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high" | "urgent";
  category: string;
  createdAt: string;
  lastUpdate: string;
}

export default function ProviderSupport() {
  const [activeTab, setActiveTab] = useState("help");
  const [newTicket, setNewTicket] = useState({
    subject: "",
    category: "",
    priority: "medium",
    description: "",
  });
  const [searchQuery, setSearchQuery] = useState("");

  const supportTickets: SupportTicket[] = [
    {
      id: "T-2024-001",
      subject: "Unable to upload company logo",
      status: "in_progress",
      priority: "medium",
      category: "Technical",
      createdAt: "2024-01-15",
      lastUpdate: "2024-01-16",
    },
    {
      id: "T-2024-002",
      subject: "Payment processing issue",
      status: "resolved",
      priority: "high",
      category: "Billing",
      createdAt: "2024-01-10",
      lastUpdate: "2024-01-12",
    },
  ];

  const faqItems = [
    {
      category: "Getting Started",
      questions: [
        {
          question: "How do I create my company profile?",
          answer:
            "Navigate to your dashboard and click 'Create Company Profile'. Fill in all required information including company details, services offered, and certifications.",
        },
        {
          question: "How do I respond to business opportunities?",
          answer:
            "Go to the Business Opportunities section, review the requirements, and click 'Respond' to submit your proposal with timeline and pricing.",
        },
        {
          question: "What information should I include in my profile?",
          answer:
            "Include your company overview, certifications, past projects, team size, geographic coverage, and industry specializations.",
        },
      ],
    },
    {
      category: "Business Opportunities",
      questions: [
        {
          question: "How are business opportunities matched to providers?",
          answer:
            "Opportunities are matched based on your industry expertise, geographic coverage, company size preferences, and available services.",
        },
        {
          question: "What happens after I submit a proposal?",
          answer:
            "Clients review all proposals and may request additional information. You'll be notified of any updates or if your proposal is selected.",
        },
        {
          question: "Can I edit my proposal after submission?",
          answer:
            "Proposals can be edited within 24 hours of submission, unless the client has already started the review process.",
        },
      ],
    },
    {
      category: "Billing & Payments",
      questions: [
        {
          question: "How do I get paid for completed projects?",
          answer:
            "Payments are processed through our secure platform. Funds are typically released within 5-7 business days after project completion and client approval.",
        },
        {
          question: "What are the platform fees?",
          answer:
            "We charge a competitive 8% platform fee on completed projects, which includes payment processing, dispute resolution, and platform maintenance.",
        },
        {
          question: "How do I update my payment information?",
          answer:
            "Go to Settings > Payment Methods to add or update your bank account details and tax information.",
        },
      ],
    },
  ];

  const resources = [
    {
      title: "Provider Onboarding Guide",
      description: "Complete guide to setting up your provider account",
      type: "guide",
      icon: Book,
      link: "#",
    },
    {
      title: "How to Write Winning Proposals",
      description: "Best practices for responding to business opportunities",
      type: "video",
      icon: Video,
      link: "#",
    },
    {
      title: "Platform API Documentation",
      description: "Technical documentation for platform integrations",
      type: "documentation",
      icon: FileText,
      link: "#",
    },
    {
      title: "Community Forum",
      description: "Connect with other cybersecurity providers",
      type: "community",
      icon: Users,
      link: "#",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-blue-500/20 text-blue-400";
      case "in_progress":
        return "bg-yellow-500/20 text-yellow-400";
      case "resolved":
        return "bg-green-500/20 text-green-400";
      case "closed":
        return "bg-gray-500/20 text-gray-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-500/20 text-red-400";
      case "high":
        return "bg-orange-500/20 text-orange-400";
      case "medium":
        return "bg-yellow-500/20 text-yellow-400";
      case "low":
        return "bg-green-500/20 text-green-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  const handleSubmitTicket = () => {
    console.log("Submitting ticket:", newTicket);
    // Here you would make an API call to create the ticket
    setNewTicket({
      subject: "",
      category: "",
      priority: "medium",
      description: "",
    });
  };

  const filteredFAQ = faqItems
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (item) =>
          item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.answer.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((category) => category.questions.length > 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Help & Support</h1>
          <p className="text-gray-400">
            Get help with your account and find answers to common questions
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={activeTab === "help" ? "default" : "outline"}
            onClick={() => setActiveTab("help")}
            className={
              activeTab === "help"
                ? "bg-orange-500 hover:bg-orange-600"
                : "border-gray-600 text-gray-300 hover:bg-gray-800"
            }
          >
            <HelpCircle className="h-4 w-4 mr-2" />
            Help Center
          </Button>
          <Button
            variant={activeTab === "contact" ? "default" : "outline"}
            onClick={() => setActiveTab("contact")}
            className={
              activeTab === "contact"
                ? "bg-orange-500 hover:bg-orange-600"
                : "border-gray-600 text-gray-300 hover:bg-gray-800"
            }
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Contact Support
          </Button>
        </div>
      </div>

      {activeTab === "help" && (
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {resources.map((resource, index) => (
              <Card
                key={index}
                className="bg-gray-900 border-gray-800 hover:border-orange-500/30 transition-colors cursor-pointer"
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <resource.icon className="h-6 w-6 text-orange-500" />
                    <div>
                      <h4 className="text-white font-medium text-sm">
                        {resource.title}
                      </h4>
                      <Badge
                        variant="secondary"
                        className="bg-gray-800 text-gray-300 text-xs"
                      >
                        {resource.type}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-gray-400 text-xs mb-3">
                    {resource.description}
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full border-gray-600 text-gray-300 hover:bg-gray-800"
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Open
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* FAQ Search */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Search className="mr-2 h-5 w-5" />
                Search Help Articles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search for help articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-700 text-white"
                />
              </div>
            </CardContent>
          </Card>

          {/* FAQ */}
          <div className="space-y-6">
            {filteredFAQ.map((category, categoryIndex) => (
              <Card key={categoryIndex} className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">
                    {category.category}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {category.questions.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="border-b border-gray-800 last:border-b-0 pb-4 last:pb-0"
                    >
                      <button className="w-full text-left">
                        <div className="flex items-center justify-between">
                          <h4 className="text-white font-medium mb-2">
                            {item.question}
                          </h4>
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        </div>
                      </button>
                      <p className="text-gray-400 text-sm">{item.answer}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === "contact" && (
        <div className="space-y-6">
          {/* Contact Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6 text-center">
                <Mail className="h-8 w-8 text-orange-500 mx-auto mb-3" />
                <h3 className="text-white font-medium mb-2">Email Support</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Get help via email within 24 hours
                </p>
                <Button
                  variant="outline"
                  className="w-full border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  support@cyberjall.com
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6 text-center">
                <MessageCircle className="h-8 w-8 text-blue-500 mx-auto mb-3" />
                <h3 className="text-white font-medium mb-2">Live Chat</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Chat with our support team in real-time
                </p>
                <Button className="w-full bg-blue-500 hover:bg-blue-600">
                  Start Chat
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6 text-center">
                <Phone className="h-8 w-8 text-green-500 mx-auto mb-3" />
                <h3 className="text-white font-medium mb-2">Phone Support</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Call us during business hours
                </p>
                <Button
                  variant="outline"
                  className="w-full border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  +1 (555) 123-4567
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Support Hours */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                Support Hours
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-white font-medium mb-2">
                    Live Chat & Phone
                  </h4>
                  <div className="space-y-1 text-sm">
                    <p className="text-gray-300">
                      Monday - Friday: 9:00 AM - 6:00 PM EST
                    </p>
                    <p className="text-gray-300">
                      Saturday: 10:00 AM - 4:00 PM EST
                    </p>
                    <p className="text-gray-300">Sunday: Closed</p>
                  </div>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-2">Email Support</h4>
                  <div className="space-y-1 text-sm">
                    <p className="text-gray-300">
                      24/7 - We respond within 24 hours
                    </p>
                    <p className="text-gray-300">
                      Priority support for urgent issues
                    </p>
                    <p className="text-gray-300">
                      Average response time: 4 hours
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Create Support Ticket */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">
                Create Support Ticket
              </CardTitle>
              <CardDescription className="text-gray-400">
                Submit a detailed support request for technical assistance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">
                    Subject
                  </label>
                  <Input
                    placeholder="Brief description of your issue"
                    value={newTicket.subject}
                    onChange={(e) =>
                      setNewTicket({ ...newTicket, subject: e.target.value })
                    }
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">
                    Category
                  </label>
                  <Select
                    value={newTicket.category}
                    onValueChange={(value) =>
                      setNewTicket({ ...newTicket, category: value })
                    }
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technical">Technical Issue</SelectItem>
                      <SelectItem value="billing">
                        Billing & Payments
                      </SelectItem>
                      <SelectItem value="account">
                        Account Management
                      </SelectItem>
                      <SelectItem value="feature">Feature Request</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">
                  Priority
                </label>
                <Select
                  value={newTicket.priority}
                  onValueChange={(value) =>
                    setNewTicket({ ...newTicket, priority: value })
                  }
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">
                  Description
                </label>
                <Textarea
                  placeholder="Please provide detailed information about your issue, including steps to reproduce if applicable..."
                  value={newTicket.description}
                  onChange={(e) =>
                    setNewTicket({ ...newTicket, description: e.target.value })
                  }
                  className="bg-gray-800 border-gray-700 text-white min-h-32"
                />
              </div>

              <Button
                onClick={handleSubmitTicket}
                className="bg-orange-500 hover:bg-orange-600"
              >
                <Send className="h-4 w-4 mr-2" />
                Submit Ticket
              </Button>
            </CardContent>
          </Card>

          {/* My Support Tickets */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">My Support Tickets</CardTitle>
              <CardDescription className="text-gray-400">
                Track the status of your support requests
              </CardDescription>
            </CardHeader>
            <CardContent>
              {supportTickets.length > 0 ? (
                <div className="space-y-4">
                  {supportTickets.map((ticket) => (
                    <div
                      key={ticket.id}
                      className="p-4 bg-gray-800/50 rounded-lg flex items-center justify-between"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-white font-medium">
                            {ticket.subject}
                          </h4>
                          <Badge
                            variant="secondary"
                            className={getStatusColor(ticket.status)}
                          >
                            {ticket.status.replace("_", " ")}
                          </Badge>
                          <Badge
                            variant="secondary"
                            className={getPriorityColor(ticket.priority)}
                          >
                            {ticket.priority}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <span>#{ticket.id}</span>
                          <span>{ticket.category}</span>
                          <span>Created: {ticket.createdAt}</span>
                          <span>Updated: {ticket.lastUpdate}</span>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-600 text-gray-300 hover:bg-gray-800"
                      >
                        View Details
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <MessageCircle className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-300 mb-2">
                    No Support Tickets
                  </h3>
                  <p className="text-gray-500">
                    You haven't submitted any support tickets yet.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
