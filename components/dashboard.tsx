"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts"
import { Search, Plus, AlertCircle, Clock, CheckCircle, Users, TrendingUp, Eye, Edit, BarChart3 } from "lucide-react"

interface Ticket {
  id: string
  createdAt: string
  requester: string
  department: string
  category: string
  subcategory: string
  priority: "P1" | "P2" | "P3" | "P4"
  status: "New" | "In Progress" | "On Hold" | "Resolved" | "Closed" | "Reopened"
  assignedAgent: string
  description: string
  slaTarget: number
  timeToResolve: number | null
  slaBreached: boolean
  csatScore: number | null
  resolution?: string
  lastUpdated?: string
}

const initialTickets: Ticket[] = [
  {
    id: "INC-20241201-0001",
    createdAt: "2024-12-01T09:15:00Z",
    requester: "John Smith",
    department: "Finance",
    category: "Hardware",
    subcategory: "Laptop",
    priority: "P2",
    status: "In Progress",
    assignedAgent: "Sarah Johnson",
    description:
      "Laptop screen flickering intermittently during presentations. Issue started yesterday morning and is affecting productivity.",
    slaTarget: 8,
    timeToResolve: 6.5,
    slaBreached: false,
    csatScore: null,
    lastUpdated: "2024-12-01T15:30:00Z",
  },
  {
    id: "INC-20241201-0002",
    createdAt: "2024-12-01T10:30:00Z",
    requester: "Emily Davis",
    department: "HR",
    category: "Software",
    subcategory: "Email",
    priority: "P1",
    status: "Resolved",
    assignedAgent: "Mike Chen",
    description: "Unable to send emails - critical business impact. All outgoing emails are stuck in outbox.",
    slaTarget: 4,
    timeToResolve: 3.2,
    slaBreached: false,
    csatScore: 5,
    resolution: "Outlook profile was corrupted. Recreated profile and restored email settings. Issue resolved.",
    lastUpdated: "2024-12-01T13:45:00Z",
  },
  {
    id: "INC-20241201-0003",
    createdAt: "2024-12-01T14:20:00Z",
    requester: "Robert Wilson",
    department: "Sales",
    category: "Network",
    subcategory: "Wi-Fi",
    priority: "P3",
    status: "New",
    assignedAgent: "Lisa Park",
    description:
      "Wi-Fi shows connected but no internet access. Can connect to local network resources but cannot browse web.",
    slaTarget: 24,
    timeToResolve: null,
    slaBreached: false,
    csatScore: null,
    lastUpdated: "2024-12-01T14:20:00Z",
  },
  {
    id: "INC-20241130-0045",
    createdAt: "2024-11-30T16:45:00Z",
    requester: "Maria Garcia",
    department: "Marketing",
    category: "Access",
    subcategory: "Password Reset",
    priority: "P4",
    status: "Closed",
    assignedAgent: "David Kim",
    description:
      "Account locked after multiple failed login attempts. User forgot password after returning from vacation.",
    slaTarget: 72,
    timeToResolve: 25.5,
    slaBreached: true,
    csatScore: 3,
    resolution: "Password reset completed and account unlocked. User educated on password policy.",
    lastUpdated: "2024-12-01T10:15:00Z",
  },
  {
    id: "INC-20241201-0004",
    createdAt: "2024-12-01T11:00:00Z",
    requester: "Alex Thompson",
    department: "IT",
    category: "Hardware",
    subcategory: "Printer",
    priority: "P3",
    status: "On Hold",
    assignedAgent: "Sarah Johnson",
    description:
      "Printer not responding to print jobs. Print spooler service appears to be running but jobs queue indefinitely.",
    slaTarget: 24,
    timeToResolve: null,
    slaBreached: false,
    csatScore: null,
    lastUpdated: "2024-12-01T16:20:00Z",
  },
  {
    id: "INC-20241201-0005",
    createdAt: "2024-12-01T08:30:00Z",
    requester: "Jennifer Lee",
    department: "Operations",
    category: "Software",
    subcategory: "Application",
    priority: "P2",
    status: "In Progress",
    assignedAgent: "Mike Chen",
    description:
      "CRM application crashes when trying to generate monthly reports. Error occurs consistently with large datasets.",
    slaTarget: 8,
    timeToResolve: null,
    slaBreached: false,
    csatScore: null,
    lastUpdated: "2024-12-01T14:45:00Z",
  },
]

// Sample data matching the specification requirements
const kpiDataOriginal = {
  totalTickets: 124,
  openTickets: 45,
  slaCompliance: 87.5,
  avgTimeToAcknowledge: 1.2,
  avgTimeToResolve: 18.4,
  reopenRate: 8.3,
  avgCSAT: 4.2,
}

const categoryDataOriginal = [
  { name: "Hardware", value: 35, color: "hsl(var(--chart-1))" },
  { name: "Software", value: 28, color: "hsl(var(--chart-2))" },
  { name: "Network", value: 22, color: "hsl(var(--chart-3))" },
  { name: "Access", value: 15, color: "hsl(var(--chart-4))" },
]

const trendData = [
  { week: "Week 1", new: 25, resolved: 22 },
  { week: "Week 2", new: 32, resolved: 28 },
  { week: "Week 3", new: 28, resolved: 31 },
  { week: "Week 4", new: 35, resolved: 33 },
]

const priorityColors = {
  P1: "bg-destructive text-destructive-foreground",
  P2: "bg-orange-500 text-white",
  P3: "bg-yellow-500 text-black",
  P4: "bg-green-500 text-white",
}

const statusColors = {
  New: "bg-blue-500 text-white",
  "In Progress": "bg-yellow-500 text-black",
  "On Hold": "bg-orange-500 text-white",
  Resolved: "bg-green-500 text-white",
  Closed: "bg-gray-500 text-white",
  Reopened: "bg-red-500 text-white",
}

export function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets)
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)
  const [isNewTicketOpen, setIsNewTicketOpen] = useState(false)
  const [isTicketDetailOpen, setIsTicketDetailOpen] = useState(false)
  const [newTicketForm, setNewTicketForm] = useState({
    requester: "",
    department: "",
    category: "",
    subcategory: "",
    priority: "P3" as const,
    description: "",
  })

  const [activeView, setActiveView] = useState("dashboard")
  const [selectedKPI, setSelectedKPI] = useState<string | null>(null)
  const [isKPIDetailOpen, setIsKPIDetailOpen] = useState(false)

  const kpiData = {
    totalTickets: tickets.length,
    openTickets: tickets.filter((t) => !["Resolved", "Closed"].includes(t.status)).length,
    slaCompliance: Math.round((tickets.filter((t) => !t.slaBreached).length / tickets.length) * 100 * 10) / 10,
    avgTimeToAcknowledge: 1.2,
    avgTimeToResolve:
      Math.round(
        (tickets.filter((t) => t.timeToResolve).reduce((acc, t) => acc + (t.timeToResolve || 0), 0) /
          tickets.filter((t) => t.timeToResolve).length) *
          10,
      ) / 10,
    reopenRate: 8.3,
    avgCSAT: 4.2,
  }

  const categoryData = [
    { name: "Hardware", value: tickets.filter((t) => t.category === "Hardware").length, color: "hsl(var(--chart-1))" },
    { name: "Software", value: tickets.filter((t) => t.category === "Software").length, color: "hsl(var(--chart-2))" },
    { name: "Network", value: tickets.filter((t) => t.category === "Network").length, color: "hsl(var(--chart-3))" },
    { name: "Access", value: tickets.filter((t) => t.category === "Access").length, color: "hsl(var(--chart-4))" },
  ]

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.requester.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter
    const matchesPriority = priorityFilter === "all" || ticket.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  const handleCreateTicket = () => {
    const newTicket: Ticket = {
      id: `INC-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${String(tickets.length + 1).padStart(4, "0")}`,
      createdAt: new Date().toISOString(),
      requester: newTicketForm.requester,
      department: newTicketForm.department,
      category: newTicketForm.category,
      subcategory: newTicketForm.subcategory,
      priority: newTicketForm.priority,
      status: "New",
      assignedAgent: "Auto-Assigned",
      description: newTicketForm.description,
      slaTarget:
        newTicketForm.priority === "P1"
          ? 4
          : newTicketForm.priority === "P2"
            ? 8
            : newTicketForm.priority === "P3"
              ? 24
              : 72,
      timeToResolve: null,
      slaBreached: false,
      csatScore: null,
      lastUpdated: new Date().toISOString(),
    }

    setTickets([newTicket, ...tickets])
    setNewTicketForm({
      requester: "",
      department: "",
      category: "",
      subcategory: "",
      priority: "P3",
      description: "",
    })
    setIsNewTicketOpen(false)
  }

  const updateTicketStatus = (ticketId: string, newStatus: Ticket["status"]) => {
    setTickets(
      tickets.map((ticket) =>
        ticket.id === ticketId ? { ...ticket, status: newStatus, lastUpdated: new Date().toISOString() } : ticket,
      ),
    )
    if (selectedTicket?.id === ticketId) {
      setSelectedTicket({ ...selectedTicket, status: newStatus, lastUpdated: new Date().toISOString() })
    }
  }

  const handleKPIClick = (kpiType: string) => {
    setSelectedKPI(kpiType)
    setIsKPIDetailOpen(true)
  }

  const renderMainContent = () => {
    switch (activeView) {
      case "tickets":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-foreground">Ticket Management</h2>
                <p className="text-muted-foreground">Manage and track all support tickets</p>
              </div>
              <Dialog open={isNewTicketOpen} onOpenChange={setIsNewTicketOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600">
                    <Plus className="mr-2 h-4 w-4" />
                    New Ticket
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[525px]">
                  <DialogHeader>
                    <DialogTitle>Create New Ticket</DialogTitle>
                    <DialogDescription>Fill out the form below to create a new support ticket.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="requester" className="text-right">
                        Requester
                      </Label>
                      <Input
                        id="requester"
                        value={newTicketForm.requester}
                        onChange={(e) => setNewTicketForm({ ...newTicketForm, requester: e.target.value })}
                        className="col-span-3"
                        placeholder="Enter requester name"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="department" className="text-right">
                        Department
                      </Label>
                      <Select
                        value={newTicketForm.department}
                        onValueChange={(value) => setNewTicketForm({ ...newTicketForm, department: value })}
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="IT">IT</SelectItem>
                          <SelectItem value="Finance">Finance</SelectItem>
                          <SelectItem value="HR">HR</SelectItem>
                          <SelectItem value="Sales">Sales</SelectItem>
                          <SelectItem value="Marketing">Marketing</SelectItem>
                          <SelectItem value="Operations">Operations</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="category" className="text-right">
                        Category
                      </Label>
                      <Select
                        value={newTicketForm.category}
                        onValueChange={(value) => setNewTicketForm({ ...newTicketForm, category: value })}
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Hardware">Hardware</SelectItem>
                          <SelectItem value="Software">Software</SelectItem>
                          <SelectItem value="Network">Network</SelectItem>
                          <SelectItem value="Access">Access</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="subcategory" className="text-right">
                        Subcategory
                      </Label>
                      <Input
                        id="subcategory"
                        value={newTicketForm.subcategory}
                        onChange={(e) => setNewTicketForm({ ...newTicketForm, subcategory: e.target.value })}
                        className="col-span-3"
                        placeholder="Enter subcategory"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="priority" className="text-right">
                        Priority
                      </Label>
                      <Select
                        value={newTicketForm.priority}
                        onValueChange={(value: "P1" | "P2" | "P3" | "P4") =>
                          setNewTicketForm({ ...newTicketForm, priority: value })
                        }
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="P1">P1 - Critical</SelectItem>
                          <SelectItem value="P2">P2 - High</SelectItem>
                          <SelectItem value="P3">P3 - Medium</SelectItem>
                          <SelectItem value="P4">P4 - Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="description" className="text-right">
                        Description
                      </Label>
                      <Textarea
                        id="description"
                        value={newTicketForm.description}
                        onChange={(e) => setNewTicketForm({ ...newTicketForm, description: e.target.value })}
                        className="col-span-3"
                        placeholder="Describe the issue in detail..."
                        rows={4}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      type="submit"
                      onClick={handleCreateTicket}
                      disabled={!newTicketForm.requester || !newTicketForm.description}
                    >
                      Create Ticket
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Ticket Management</CardTitle>
                <CardDescription>Search and filter support tickets</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search tickets..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8"
                      />
                    </div>
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="New">New</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="On Hold">On Hold</SelectItem>
                      <SelectItem value="Resolved">Resolved</SelectItem>
                      <SelectItem value="Closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Priority</SelectItem>
                      <SelectItem value="P1">P1 - Critical</SelectItem>
                      <SelectItem value="P2">P2 - High</SelectItem>
                      <SelectItem value="P3">P3 - Medium</SelectItem>
                      <SelectItem value="P4">P4 - Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Tickets Table */}
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Ticket ID</TableHead>
                        <TableHead>Requester</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Agent</TableHead>
                        <TableHead>SLA</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTickets.map((ticket) => (
                        <TableRow key={ticket.id} className={ticket.slaBreached ? "bg-destructive/10" : ""}>
                          <TableCell className="font-medium">{ticket.id}</TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{ticket.requester}</div>
                              <div className="text-sm text-muted-foreground">{ticket.department}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{ticket.category}</div>
                              <div className="text-sm text-muted-foreground">{ticket.subcategory}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={priorityColors[ticket.priority]}>{ticket.priority}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={statusColors[ticket.status]}>{ticket.status}</Badge>
                          </TableCell>
                          <TableCell>{ticket.assignedAgent}</TableCell>
                          <TableCell>
                            {ticket.slaBreached ? (
                              <Badge variant="destructive">Breached</Badge>
                            ) : (
                              <Badge variant="secondary">On Track</Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedTicket(ticket)
                                setIsTicketDetailOpen(true)
                              }}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      case "agents":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-foreground">Agent Management</h2>
              <p className="text-muted-foreground">Monitor agent performance and workload</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "Sarah Johnson", tickets: 15, avgTime: "4.2h", satisfaction: 4.8, status: "Online" },
                { name: "Mike Chen", tickets: 12, avgTime: "3.8h", satisfaction: 4.6, status: "Online" },
                { name: "Lisa Park", tickets: 8, avgTime: "5.1h", satisfaction: 4.3, status: "Away" },
                { name: "David Kim", tickets: 18, avgTime: "3.2h", satisfaction: 4.9, status: "Online" },
              ].map((agent) => (
                <Card key={agent.name} className="border-l-4 border-l-blue-500">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{agent.name}</span>
                      <Badge className={agent.status === "Online" ? "bg-green-500" : "bg-yellow-500"}>
                        {agent.status}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Active Tickets:</span>
                        <span className="font-medium">{agent.tickets}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Avg Resolution:</span>
                        <span className="font-medium">{agent.avgTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">CSAT Score:</span>
                        <span className="font-medium">{agent.satisfaction}/5.0</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )
      case "reports":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-foreground">Reports & Analytics</h2>
              <p className="text-muted-foreground">Detailed insights and performance metrics</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-l-4 border-l-orange-500">
                <CardHeader>
                  <CardTitle>Weekly Performance Report</CardTitle>
                  <CardDescription>Last 7 days summary</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Tickets Created:</span>
                      <span className="font-bold text-2xl text-orange-600">47</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Tickets Resolved:</span>
                      <span className="font-bold text-2xl text-green-600">52</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>SLA Compliance:</span>
                      <span className="font-bold text-2xl text-blue-600">94%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-green-500">
                <CardHeader>
                  <CardTitle>Monthly Trends</CardTitle>
                  <CardDescription>Performance over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Resolution Time Trend:</span>
                      <Badge className="bg-green-500">↓ 12% Improved</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Customer Satisfaction:</span>
                      <Badge className="bg-blue-500">↑ 8% Improved</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>First Call Resolution:</span>
                      <Badge className="bg-purple-500">↑ 15% Improved</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )
      default:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-foreground">Dashboard</h2>
                <p className="text-muted-foreground">IT Helpdesk Overview</p>
              </div>
              <Dialog open={isNewTicketOpen} onOpenChange={setIsNewTicketOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600">
                    <Plus className="mr-2 h-4 w-4" />
                    New Ticket
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[525px]">
                  <DialogHeader>
                    <DialogTitle>Create New Ticket</DialogTitle>
                    <DialogDescription>Fill out the form below to create a new support ticket.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="requester" className="text-right">
                        Requester
                      </Label>
                      <Input
                        id="requester"
                        value={newTicketForm.requester}
                        onChange={(e) => setNewTicketForm({ ...newTicketForm, requester: e.target.value })}
                        className="col-span-3"
                        placeholder="Enter requester name"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="department" className="text-right">
                        Department
                      </Label>
                      <Select
                        value={newTicketForm.department}
                        onValueChange={(value) => setNewTicketForm({ ...newTicketForm, department: value })}
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="IT">IT</SelectItem>
                          <SelectItem value="Finance">Finance</SelectItem>
                          <SelectItem value="HR">HR</SelectItem>
                          <SelectItem value="Sales">Sales</SelectItem>
                          <SelectItem value="Marketing">Marketing</SelectItem>
                          <SelectItem value="Operations">Operations</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="category" className="text-right">
                        Category
                      </Label>
                      <Select
                        value={newTicketForm.category}
                        onValueChange={(value) => setNewTicketForm({ ...newTicketForm, category: value })}
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Hardware">Hardware</SelectItem>
                          <SelectItem value="Software">Software</SelectItem>
                          <SelectItem value="Network">Network</SelectItem>
                          <SelectItem value="Access">Access</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="subcategory" className="text-right">
                        Subcategory
                      </Label>
                      <Input
                        id="subcategory"
                        value={newTicketForm.subcategory}
                        onChange={(e) => setNewTicketForm({ ...newTicketForm, subcategory: e.target.value })}
                        className="col-span-3"
                        placeholder="Enter subcategory"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="priority" className="text-right">
                        Priority
                      </Label>
                      <Select
                        value={newTicketForm.priority}
                        onValueChange={(value: "P1" | "P2" | "P3" | "P4") =>
                          setNewTicketForm({ ...newTicketForm, priority: value })
                        }
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="P1">P1 - Critical</SelectItem>
                          <SelectItem value="P2">P2 - High</SelectItem>
                          <SelectItem value="P3">P3 - Medium</SelectItem>
                          <SelectItem value="P4">P4 - Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="description" className="text-right">
                        Description
                      </Label>
                      <Textarea
                        id="description"
                        value={newTicketForm.description}
                        onChange={(e) => setNewTicketForm({ ...newTicketForm, description: e.target.value })}
                        className="col-span-3"
                        placeholder="Describe the issue in detail..."
                        rows={4}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      type="submit"
                      onClick={handleCreateTicket}
                      disabled={!newTicketForm.requester || !newTicketForm.description}
                    >
                      Create Ticket
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card
                className="cursor-pointer hover:shadow-lg transition-all duration-200 border-l-4 border-l-blue-500 hover:scale-105"
                onClick={() => handleKPIClick("total")}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
                  <AlertCircle className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">{kpiData.totalTickets}</div>
                  <p className="text-xs text-muted-foreground">Last 30 days</p>
                </CardContent>
              </Card>

              <Card
                className="cursor-pointer hover:shadow-lg transition-all duration-200 border-l-4 border-l-orange-500 hover:scale-105"
                onClick={() => handleKPIClick("open")}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
                  <Clock className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">{kpiData.openTickets}</div>
                  <p className="text-xs text-muted-foreground">Currently active</p>
                </CardContent>
              </Card>

              <Card
                className="cursor-pointer hover:shadow-lg transition-all duration-200 border-l-4 border-l-green-500 hover:scale-105"
                onClick={() => handleKPIClick("sla")}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">SLA Compliance</CardTitle>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{kpiData.slaCompliance}%</div>
                  <p className="text-xs text-muted-foreground">Within target</p>
                </CardContent>
              </Card>

              <Card
                className="cursor-pointer hover:shadow-lg transition-all duration-200 border-l-4 border-l-purple-500 hover:scale-105"
                onClick={() => handleKPIClick("resolution")}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Resolution Time</CardTitle>
                  <TrendingUp className="h-4 w-4 text-purple-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-600">{kpiData.avgTimeToResolve}h</div>
                  <p className="text-xs text-muted-foreground">Average hours</p>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="tickets" className="space-y-6">
              <TabsList>
                <TabsTrigger value="tickets">Tickets</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="knowledge-base">Knowledge Base</TabsTrigger>
              </TabsList>

              <TabsContent value="tickets" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Ticket Management</CardTitle>
                    <CardDescription>Search and filter support tickets</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-4 mb-4">
                      <div className="flex-1">
                        <div className="relative">
                          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Search tickets..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-8"
                          />
                        </div>
                      </div>
                      <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-40">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="New">New</SelectItem>
                          <SelectItem value="In Progress">In Progress</SelectItem>
                          <SelectItem value="On Hold">On Hold</SelectItem>
                          <SelectItem value="Resolved">Resolved</SelectItem>
                          <SelectItem value="Closed">Closed</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                        <SelectTrigger className="w-40">
                          <SelectValue placeholder="Priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Priority</SelectItem>
                          <SelectItem value="P1">P1 - Critical</SelectItem>
                          <SelectItem value="P2">P2 - High</SelectItem>
                          <SelectItem value="P3">P3 - Medium</SelectItem>
                          <SelectItem value="P4">P4 - Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Ticket ID</TableHead>
                            <TableHead>Requester</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Priority</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Agent</TableHead>
                            <TableHead>SLA</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredTickets.map((ticket) => (
                            <TableRow key={ticket.id} className={ticket.slaBreached ? "bg-destructive/10" : ""}>
                              <TableCell className="font-medium">{ticket.id}</TableCell>
                              <TableCell>
                                <div>
                                  <div className="font-medium">{ticket.requester}</div>
                                  <div className="text-sm text-muted-foreground">{ticket.department}</div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div>
                                  <div className="font-medium">{ticket.category}</div>
                                  <div className="text-sm text-muted-foreground">{ticket.subcategory}</div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge className={priorityColors[ticket.priority]}>{ticket.priority}</Badge>
                              </TableCell>
                              <TableCell>
                                <Badge className={statusColors[ticket.status]}>{ticket.status}</Badge>
                              </TableCell>
                              <TableCell>{ticket.assignedAgent}</TableCell>
                              <TableCell>
                                {ticket.slaBreached ? (
                                  <Badge variant="destructive">Breached</Badge>
                                ) : (
                                  <Badge variant="secondary">On Track</Badge>
                                )}
                              </TableCell>
                              <TableCell>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    setSelectedTicket(ticket)
                                    setIsTicketDetailOpen(true)
                                  }}
                                >
                                  <Eye className="h-4 w-4 mr-1" />
                                  View
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Tickets by Category</CardTitle>
                      <CardDescription>Distribution of ticket categories</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ChartContainer
                        config={{
                          value: {
                            label: "Tickets",
                          },
                        }}
                        className="h-[300px]"
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={categoryData}
                              cx="50%"
                              cy="50%"
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                              label={({ name, value }) => `${name}: ${value}`}
                            >
                              {categoryData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <ChartTooltip content={<ChartTooltipContent />} />
                          </PieChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Ticket Trends</CardTitle>
                      <CardDescription>New vs Resolved tickets over time</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ChartContainer
                        config={{
                          new: {
                            label: "New Tickets",
                            color: "hsl(var(--chart-1))",
                          },
                          resolved: {
                            label: "Resolved Tickets",
                            color: "hsl(var(--chart-2))",
                          },
                        }}
                        className="h-[300px]"
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={trendData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="week" />
                            <YAxis />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Line type="monotone" dataKey="new" stroke="hsl(var(--chart-1))" strokeWidth={2} />
                            <Line type="monotone" dataKey="resolved" stroke="hsl(var(--chart-2))" strokeWidth={2} />
                          </LineChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="knowledge-base" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Wi-Fi Connected but No Internet</CardTitle>
                      <CardDescription>Network connectivity troubleshooting</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Step-by-step guide to resolve Wi-Fi connectivity issues when connected but no internet access.
                      </p>
                      <Button variant="outline" size="sm">
                        View Guide
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Password Reset & Account Unlock</CardTitle>
                      <CardDescription>User account management</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Complete process for resetting passwords and unlocking user accounts in Active Directory.
                      </p>
                      <Button variant="outline" size="sm">
                        View Guide
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Printer Issues & Spooler</CardTitle>
                      <CardDescription>Printing troubleshooting</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Resolve common printer problems including spooler issues and driver conflicts.
                      </p>
                      <Button variant="outline" size="sm">
                        View Guide
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Email Not Sending/Receiving</CardTitle>
                      <CardDescription>Outlook troubleshooting</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Diagnose and fix Outlook email delivery issues including server settings and authentication.
                      </p>
                      <Button variant="outline" size="sm">
                        View Guide
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>VPN Connection Failures</CardTitle>
                      <CardDescription>Remote access troubleshooting</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Resolve VPN connectivity issues including DNS problems and certificate errors.
                      </p>
                      <Button variant="outline" size="sm">
                        View Guide
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <div className="w-64 bg-gradient-to-b from-slate-900 to-slate-800 border-r border-slate-700">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-white">IT Helpdesk</h1>
          <p className="text-sm text-slate-300">Ticketing System</p>
        </div>
        <nav className="px-4 space-y-2">
          <Button
            variant="ghost"
            className={`w-full justify-start transition-all duration-200 ${
              activeView === "dashboard"
                ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                : "text-slate-300 hover:bg-slate-700 hover:text-white"
            }`}
            onClick={() => setActiveView("dashboard")}
          >
            <TrendingUp className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-start transition-all duration-200 ${
              activeView === "tickets"
                ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                : "text-slate-300 hover:bg-slate-700 hover:text-white"
            }`}
            onClick={() => setActiveView("tickets")}
          >
            <AlertCircle className="mr-2 h-4 w-4" />
            Tickets
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-start transition-all duration-200 ${
              activeView === "agents"
                ? "bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-lg"
                : "text-slate-300 hover:bg-slate-700 hover:text-white"
            }`}
            onClick={() => setActiveView("agents")}
          >
            <Users className="mr-2 h-4 w-4" />
            Agents
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-start transition-all duration-200 ${
              activeView === "reports"
                ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg"
                : "text-slate-300 hover:bg-slate-700 hover:text-white"
            }`}
            onClick={() => setActiveView("reports")}
          >
            <BarChart3 className="mr-2 h-4 w-4" />
            Reports
          </Button>
        </nav>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="p-6">{renderMainContent()}</div>
      </div>

      <Dialog open={isTicketDetailOpen} onOpenChange={setIsTicketDetailOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Ticket Details - {selectedTicket?.id}</span>
              <Badge className={selectedTicket ? statusColors[selectedTicket.status] : ""}>
                {selectedTicket?.status}
              </Badge>
            </DialogTitle>
            <DialogDescription>
              Created on {selectedTicket?.createdAt ? new Date(selectedTicket.createdAt).toLocaleString() : ""}
            </DialogDescription>
          </DialogHeader>
          {selectedTicket && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Requester</Label>
                  <p className="text-sm text-muted-foreground">{selectedTicket.requester}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Department</Label>
                  <p className="text-sm text-muted-foreground">{selectedTicket.department}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Category</Label>
                  <p className="text-sm text-muted-foreground">
                    {selectedTicket.category} - {selectedTicket.subcategory}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Priority</Label>
                  <Badge className={priorityColors[selectedTicket.priority]}>{selectedTicket.priority}</Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Assigned Agent</Label>
                  <p className="text-sm text-muted-foreground">{selectedTicket.assignedAgent}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">SLA Target</Label>
                  <p className="text-sm text-muted-foreground">{selectedTicket.slaTarget} hours</p>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium">Description</Label>
                <p className="text-sm text-muted-foreground mt-1 p-3 bg-muted rounded-md">
                  {selectedTicket.description}
                </p>
              </div>
              {selectedTicket.resolution && (
                <div>
                  <Label className="text-sm font-medium">Resolution</Label>
                  <p className="text-sm text-muted-foreground mt-1 p-3 bg-green-50 border border-green-200 rounded-md">
                    {selectedTicket.resolution}
                  </p>
                </div>
              )}
              <div className="flex gap-2 pt-4">
                <Select
                  value={selectedTicket.status}
                  onValueChange={(value: Ticket["status"]) => updateTicketStatus(selectedTicket.id, value)}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="New">New</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="On Hold">On Hold</SelectItem>
                    <SelectItem value="Resolved">Resolved</SelectItem>
                    <SelectItem value="Closed">Closed</SelectItem>
                    <SelectItem value="Reopened">Reopened</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isKPIDetailOpen} onOpenChange={setIsKPIDetailOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedKPI === "total" && (
                <>
                  <AlertCircle className="h-5 w-5 text-blue-500" />
                  Total Tickets Details
                </>
              )}
              {selectedKPI === "open" && (
                <>
                  <Clock className="h-5 w-5 text-orange-500" />
                  Open Tickets Details
                </>
              )}
              {selectedKPI === "sla" && (
                <>
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  SLA Compliance Details
                </>
              )}
              {selectedKPI === "resolution" && (
                <>
                  <TrendingUp className="h-5 w-5 text-purple-500" />
                  Resolution Time Details
                </>
              )}
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            {selectedKPI === "total" && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-2xl font-bold text-blue-600">{kpiData.totalTickets}</div>
                    <div className="text-sm text-blue-700">Total Tickets</div>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="text-2xl font-bold text-slate-600">89</div>
                    <div className="text-sm text-slate-700">Last Month</div>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>• 15% increase from last month</p>
                  <p>• Peak hours: 9-11 AM and 2-4 PM</p>
                  <p>• Most common category: Hardware (35%)</p>
                </div>
              </div>
            )}
            {selectedKPI === "open" && (
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                    <div className="text-xl font-bold text-red-600">8</div>
                    <div className="text-sm text-red-700">P1 Critical</div>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="text-xl font-bold text-orange-600">15</div>
                    <div className="text-sm text-orange-700">P2 High</div>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="text-xl font-bold text-yellow-600">22</div>
                    <div className="text-sm text-yellow-700">P3/P4 Low</div>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>• 3 tickets approaching SLA breach</p>
                  <p>• Average age: 2.3 days</p>
                  <p>• Oldest ticket: 8 days (INC-20241123-0012)</p>
                </div>
              </div>
            )}
            {selectedKPI === "sla" && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-2xl font-bold text-green-600">{kpiData.slaCompliance}%</div>
                    <div className="text-sm text-green-700">Current Compliance</div>
                  </div>
                  <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                    <div className="text-2xl font-bold text-red-600">15</div>
                    <div className="text-sm text-red-700">Breached Tickets</div>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>• Target: 90% compliance</p>
                  <p>• Improvement from last month: +2.3%</p>
                  <p>• Main breach reason: Resource shortage</p>
                </div>
              </div>
            )}
            {selectedKPI === "resolution" && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="text-2xl font-bold text-purple-600">{kpiData.avgTimeToResolve}h</div>
                    <div className="text-sm text-purple-700">Current Average</div>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="text-2xl font-bold text-slate-600">21.2h</div>
                    <div className="text-sm text-slate-700">Last Month</div>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>• 13% improvement from last month</p>
                  <p>• Fastest resolution: 0.5h (Password reset)</p>
                  <p>• Slowest resolution: 72h (Hardware replacement)</p>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
