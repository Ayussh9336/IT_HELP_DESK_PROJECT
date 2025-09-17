# IT Helpdesk & Ticketing Simulation System

A comprehensive, portfolio-ready IT helpdesk simulation built with Next.js, featuring incident logging, SLA tracking, dashboards, and knowledge base management. Designed for BCA/B.Sc. entry-level IT roles.

## 🎯 Project Overview

This project demonstrates a complete IT service management system with:
- **Ticket Management**: Full lifecycle tracking from creation to closure
- **SLA Monitoring**: Automated breach detection and compliance tracking  
- **Analytics Dashboard**: Real-time KPIs and trend analysis
- **Knowledge Base**: Structured troubleshooting guides
- **Agent Performance**: Individual and team metrics

## 📁 Project Structure

\`\`\`
├── app/
│   ├── page.tsx              # Main dashboard entry point
│   ├── layout.tsx            # Root layout with theme configuration
│   └── globals.css           # Design system tokens and styling
├── components/
│   ├── dashboard.tsx         # Main dashboard component
│   └── ui/                   # Reusable UI components
├── docs/
│   └── knowledge-base/       # Troubleshooting guides (planned)
└── README.md                 # This file
\`\`\`

## 🚀 Features

### Ticket Management
- **Unique Ticket IDs**: Format INC-YYYYMMDD-#### 
- **Priority System**: P1 (Critical) to P4 (Low) with color coding
- **Status Tracking**: New → In Progress → Resolved → Closed
- **SLA Compliance**: Automated breach detection and alerts
- **Advanced Filtering**: Search by ID, requester, description, status, priority

### Dashboard & Analytics
- **KPI Cards**: Total tickets, open tickets, SLA compliance, resolution times
- **Visual Charts**: Category distribution, trend analysis, performance metrics
- **Real-time Updates**: Live data refresh and status monitoring
- **Responsive Design**: Mobile-friendly interface

### Knowledge Base
- **Structured Guides**: Step-by-step troubleshooting procedures
- **Common Issues**: Wi-Fi, email, printer, VPN, password reset scenarios
- **Searchable Content**: Quick access to relevant solutions

## 🎨 Design System

### Color Palette
- **Primary**: #1f2937 (Professional dark gray)
- **Accent**: #8b5cf6 (Modern purple for interactions)
- **Neutrals**: White, light gray, medium gray for hierarchy
- **Status Colors**: Priority and status-specific color coding

### Typography
- **Headings**: Bold, clear hierarchy for information scanning
- **Body Text**: Readable, consistent spacing for data tables

## 📊 Data Model

### Ticket Structure
\`\`\`typescript
interface Ticket {
  id: string                    // INC-YYYYMMDD-####
  createdAt: string            // ISO datetime
  requester: string            // User name
  department: string           // IT, HR, Finance, etc.
  category: string             // Hardware, Software, Network, etc.
  subcategory: string          // Laptop, Email, Wi-Fi, etc.
  priority: 'P1'|'P2'|'P3'|'P4' // Critical to Low
  status: string               // New, In Progress, Resolved, etc.
  assignedAgent: string        // Agent name
  description: string          // Issue description
  slaTarget: number           // Hours for resolution
  timeToResolve: number       // Actual resolution time
  slaBreached: boolean        // Compliance status
  csatScore: number           // Customer satisfaction (1-5)
}
\`\`\`

### SLA Policies
- **P1 Critical**: 1h response, 4h resolution
- **P2 High**: 2h response, 8h resolution  
- **P3 Medium**: 4h response, 24h resolution
- **P4 Low**: 8h response, 72h resolution

## 🔧 How to Use

### Adding New Tickets
1. Click "New Ticket" button in dashboard header
2. Fill required fields: requester, category, priority, description
3. System auto-assigns ticket ID and SLA targets
4. Ticket appears in main table with status "New"

### Managing Tickets
1. Use search bar to find specific tickets
2. Filter by status, priority, or category
3. Click "View" to see full ticket details
4. Update status as work progresses
5. System tracks SLA compliance automatically

### Viewing Analytics
1. Switch to "Analytics" tab
2. Review KPI cards for key metrics
3. Analyze category distribution chart
4. Monitor trend lines for workload patterns
5. Use data for capacity planning and process improvement

### Accessing Knowledge Base
1. Navigate to "Knowledge Base" tab
2. Browse available troubleshooting guides
3. Click "View Guide" for detailed procedures
4. Reference guides when resolving similar tickets

## 📈 Key Performance Indicators

- **Total Tickets**: Volume tracking over time periods
- **Open Tickets**: Current active workload
- **SLA Compliance**: Percentage of tickets resolved within target
- **Average Resolution Time**: Performance efficiency metric
- **Reopen Rate**: Quality indicator for initial resolutions
- **Customer Satisfaction**: Service quality measurement

## 🎤 Interview Presentation Points

### Technical Skills Demonstrated
- **Frontend Development**: React, Next.js, TypeScript
- **UI/UX Design**: Professional dashboard design, responsive layout
- **Data Management**: Complex state management, filtering, sorting
- **Business Logic**: SLA calculations, automated compliance tracking

### Business Understanding
- **ITIL Framework**: Incident management best practices
- **Service Level Management**: SLA definition and monitoring
- **Performance Metrics**: KPI selection and dashboard design
- **User Experience**: Intuitive interface for IT professionals

### Problem-Solving Approach
- **Requirements Analysis**: Translated business needs into technical features
- **Data Modeling**: Structured ticket lifecycle and relationships
- **Process Automation**: Reduced manual tracking with calculated fields
- **Scalability**: Designed for growth and additional features

## 🔮 Future Enhancements

- **Database Integration**: Persistent data storage with Supabase/PostgreSQL
- **Real-time Updates**: WebSocket integration for live notifications
- **Advanced Reporting**: Custom report builder and export functionality
- **Mobile App**: Native mobile interface for field technicians
- **Integration APIs**: Connect with existing ITSM tools
- **Machine Learning**: Predictive analytics for ticket routing and resolution

## 🛠 Technical Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS with custom design tokens
- **Components**: Shadcn/ui component library
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React icon library

This project showcases enterprise-level thinking, technical proficiency, and understanding of IT service management principles - perfect for demonstrating readiness for system administration and application support roles.
