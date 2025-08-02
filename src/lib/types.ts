export interface User {
  id: string
  work_email: string
  company_name: string
  contact: string
  role: 'customer' | 'provider' | 'admin'
  profile?: Profile
  createdAt: Date
  updatedAt: Date
}

export interface Profile {
  id: string
  userId: string
  firstName?: string
  lastName?: string
  jobTitle?: string
  phone?: string
  avatar?: string
  twoFactorEnabled: boolean
  lastLogin?: Date
}

export interface Package {
  id: string
  name: string
  description: string
  status: 'active' | 'upcoming' | 'completed' | 'cancelled'
  startDate?: Date
  endDate?: Date
  userId: string
  providerId?: string
  provider?: Company
  services: string[]
  totalAmount: number
  reports: any[]
  summary?: string
  messages: Message[]
  createdAt: Date
  updatedAt: Date
}

export interface Company {
  id: string
  company_name: string
  logo: string
  overview: string
  year_founded: number
  headquarters_city: string
  headquarters_country: string
  industries_served: string[]
  services_offered: any
  website: string
}

export interface Message {
  id: string
  content: string
  senderId: string
  packageId: string
  isFromProvider: boolean
  attachments: string[]
  createdAt: Date
  updatedAt: Date
}

export interface Invoice {
  id: string
  invoiceNumber: string
  userId: string
  amount: number
  paidAmount: number
  status: 'pending' | 'paid' | 'overdue' | 'cancelled'
  dueDate: Date
  description: string
  items: any[]
  createdAt: Date
  updatedAt: Date
}

export interface SupportTicket {
  id: string
  ticketNumber: string
  title: string
  description: string
  status: 'open' | 'in_progress' | 'resolved' | 'closed'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  userId: string
  assignedTo?: string
  responses: any[]
  attachments: string[]
  createdAt: Date
  updatedAt: Date
}

export interface CyberHealthScore {
  id: string
  userId: string
  score: number
  lastAssessment: Date
  improvements: any[]
  riskFactors: any[]
  recommendations: any[]
  createdAt: Date
  updatedAt: Date
}

export interface NewsArticle {
  id: string
  title: string
  content: string
  summary: string
  category: string
  industry: string[]
  severity?: 'low' | 'medium' | 'high' | 'critical'
  imageUrl?: string
  sourceUrl?: string
  publishedAt: Date
  createdAt: Date
  updatedAt: Date
}

export interface CaseStudy {
  id: string
  title: string
  industry: string
  challenge: string
  solution: string
  results: string
  imageUrl?: string
  tags: string[]
  createdAt: Date
  updatedAt: Date
}

export interface Webinar {
  id: string
  title: string
  description: string
  presenter: string
  scheduledAt: Date
  duration: number
  registrationUrl?: string
  recordingUrl?: string
  isLive: boolean
  tags: string[]
  createdAt: Date
  updatedAt: Date
}
