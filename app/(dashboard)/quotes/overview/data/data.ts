interface AssignedPerson {
  name: string
  initials: string
}

interface Project {
  company: string
  size: string
  probability: string
  duration: string
  status: 'Drafted' | 'Sent' | 'Closed'
  assigned: AssignedPerson[]
}

interface Region {
  region: string
  project: Project[]
}

export const quotes: Region[] = [
  {
    project: [
      {
        assigned: [
          {
            initials: 'E',
            name: 'Emily Smith',
          },
          {
            initials: 'M',
            name: 'Max Warmer',
          },
          {
            initials: 'V',
            name: 'Victoria Steep',
          },
        ],
        company: 'Walton Holding',
        duration: '18 months',
        probability: '40%',
        size: '50K USD',
        status: 'Drafted',
      },
      {
        assigned: [
          {
            initials: 'E',
            name: 'Emma Stone',
          },
          {
            initials: 'C',
            name: 'Chris Bold',
          },
        ],
        company: 'Zurich Coats LLC',
        duration: '24 months',
        probability: '80%',
        size: '100-150K USD',
        status: 'Sent',
      },
      {
        assigned: [
          {
            initials: 'E',
            name: 'Emma Stephcorn',
          },
          {
            initials: 'C',
            name: 'Chris Bold',
          },
        ],
        company: 'Riverflow Media Group',
        duration: '24 months',
        probability: '80%',
        size: '280-300K USD',
        status: 'Sent',
      },
      {
        assigned: [
          {
            initials: 'V',
            name: 'Victoria Stone',
          },
          {
            initials: 'M',
            name: 'Max W.',
          },
        ],
        company: 'Nordic Solutions AG',
        duration: '12 months',
        probability: '60%',
        size: '175K USD',
        status: 'Drafted',
      },
      {
        assigned: [
          {
            initials: 'E',
            name: 'Emily Satally',
          },
          {
            initials: 'C',
            name: 'Chris Bold',
          },
        ],
        company: 'Swiss Tech Innovations',
        duration: '36 months',
        probability: '90%',
        size: '450K USD',
        status: 'Sent',
      },
      {
        assigned: [
          {
            initials: 'E',
            name: 'Emma Stone',
          },
        ],
        company: 'Berlin Digital Hub',
        duration: '15 months',
        probability: '70%',
        size: '200K USD',
        status: 'Drafted',
      },
    ],
    region: 'Europe',
  },
  {
    project: [
      {
        assigned: [
          {
            initials: 'L',
            name: 'Lena Mayer',
          },
          {
            initials: 'S',
            name: 'Sara Brick',
          },
        ],
        company: 'Real Estate Group',
        duration: '6 months',
        probability: '100%',
        size: '1.2M USD',
        status: 'Closed',
      },
      {
        assigned: [
          {
            initials: 'J',
            name: 'Jordan Afolter',
          },
          {
            initials: 'C',
            name: 'Corinna Bridge',
          },
        ],
        company: 'Grison Appartments',
        duration: '12 months',
        probability: '20%',
        size: '100K USD',
        status: 'Drafted',
      },
      {
        assigned: [
          {
            initials: 'L',
            name: 'Lena Mayer',
          },
          {
            initials: 'J',
            name: 'Jordan Corner',
          },
        ],
        company: 'Tokyo Tech Solutions',
        duration: '24 months',
        probability: '85%',
        size: '750K USD',
        status: 'Sent',
      },
      {
        assigned: [
          {
            initials: 'S',
            name: 'Sara Bridge',
          },
        ],
        company: 'Singapore Systems Ltd',
        duration: '18 months',
        probability: '75%',
        size: '300K USD',
        status: 'Drafted',
      },
      {
        assigned: [
          {
            initials: 'C',
            name: 'Corinna Berner',
          },
          {
            initials: 'L',
            name: 'Lena Mayer',
          },
        ],
        company: 'Seoul Digital Corp',
        duration: '30 months',
        probability: '95%',
        size: '880K USD',
        status: 'Sent',
      },
      {
        assigned: [
          {
            initials: 'J',
            name: 'Jordan Afolter',
          },
        ],
        company: 'Mumbai Innovations',
        duration: '12 months',
        probability: '40%',
        size: '450K USD',
        status: 'Drafted',
      },
    ],
    region: 'Asia',
  },
  {
    project: [
      {
        assigned: [
          {
            initials: 'C',
            name: 'Charlie Anuk',
          },
        ],
        company: 'Liquid Holdings Group',
        duration: 'Member',
        probability: '100%',
        size: '5.1M USD',
        status: 'Closed',
      },
      {
        assigned: [
          {
            initials: 'C',
            name: 'Charlie Anuk',
          },
          {
            initials: 'P',
            name: 'Patrick Daller',
          },
        ],
        company: 'Craft Labs, Inc.',
        duration: '18 months',
        probability: '80%',
        size: '80-90K USD',
        status: 'Sent',
      },
      {
        assigned: [
          {
            initials: 'P',
            name: 'Patrick Daller',
          },
          {
            initials: 'C',
            name: 'Charlie Anuk',
          },
        ],
        company: 'Toronto Tech Hub',
        duration: '12 months',
        probability: '65%',
        size: '250K USD',
        status: 'Drafted',
      },
      {
        assigned: [
          {
            initials: 'C',
            name: 'Charlie Anuk',
          },
        ],
        company: 'Silicon Valley Startups',
        duration: '24 months',
        probability: '90%',
        size: '1.5M USD',
        status: 'Sent',
      },
      {
        assigned: [
          {
            initials: 'P',
            name: 'Patrick Daller',
          },
        ],
        company: 'NYC Digital Solutions',
        duration: '15 months',
        probability: '70%',
        size: '750K USD',
        status: 'Drafted',
      },
    ],
    region: 'North America',
  },
]

interface DataChart {
  date: string
  'Current year': number
  'Same period last year': number
}

interface DataChart2 {
  date: string
  Quotes: number
  'Total deal size': number
}

interface DataChart3 {
  date: string
  Addressed: number
  Unrealized: number
}

interface DataChart4 {
  date: string
  Density: number
}

export const dataChart: DataChart[] = [
  {
    'Current year': 23,
    date: 'Jan 24',
    'Same period last year': 67,
  },
  {
    'Current year': 31,
    date: 'Feb 24',
    'Same period last year': 23,
  },
  {
    'Current year': 46,
    date: 'Mar 24',
    'Same period last year': 78,
  },
  {
    'Current year': 46,
    date: 'Apr 24',
    'Same period last year': 23,
  },
  {
    'Current year': 39,
    date: 'May 24',
    'Same period last year': 32,
  },
  {
    'Current year': 65,
    date: 'Jun 24',
    'Same period last year': 32,
  },
]

export const dataChart2: DataChart2[] = [
  {
    date: 'Jan 24',
    Quotes: 120,
    'Total deal size': 55000,
  },
  {
    date: 'Feb 24',
    Quotes: 183,
    'Total deal size': 75400,
  },
  {
    date: 'Mar 24',
    Quotes: 165,
    'Total deal size': 50450,
  },
  {
    date: 'Apr 24',
    Quotes: 99,
    'Total deal size': 41540,
  },
  {
    date: 'May 24',
    Quotes: 194,
    'Total deal size': 63850,
  },
  {
    date: 'Jun 24',
    Quotes: 241,
    'Total deal size': 73850,
  },
]

export const dataChart3: DataChart3[] = [
  {
    Addressed: 8,
    date: 'Jan 24',
    Unrealized: 12,
  },
  {
    Addressed: 9,
    date: 'Feb 24',
    Unrealized: 12,
  },
  {
    Addressed: 6,
    date: 'Mar 24',
    Unrealized: 12,
  },
  {
    Addressed: 5,
    date: 'Apr 24',
    Unrealized: 12,
  },
  {
    Addressed: 12,
    date: 'May 24',
    Unrealized: 12,
  },
  {
    Addressed: 9,
    date: 'Jun 24',
    Unrealized: 12,
  },
]

export const dataChart4: DataChart4[] = [
  {
    Density: 0.891,
    date: 'Jan 24',
  },
  {
    Density: 0.084,
    date: 'Feb 24',
  },
  {
    Density: 0.155,
    date: 'Mar 24',
  },
  {
    Density: 0.75,
    date: 'Apr 24',
  },
  {
    Density: 0.221,
    date: 'May 24',
  },
  {
    Density: 0.561,
    date: 'Jun 24',
  },
]

interface Progress {
  current: number
  total: number
}

interface AuditDate {
  date: string
  auditor: string
}

interface Document {
  name: string
  status: 'OK' | 'Needs update' | 'In audit'
}

interface Section {
  id: string
  title: string
  certified: string
  progress: Progress
  status: 'complete' | 'warning'
  auditDates: AuditDate[]
  documents: Document[]
}

export const sections: Section[] = [
  {
    auditDates: [
      { auditor: 'Max Duster', date: 'Dec 10, 2023' },
      { auditor: 'Emma Stone', date: 'Dec 12, 2023' },
    ],
    certified: 'ISO',
    documents: [
      { name: 'policy_overview.xlsx', status: 'OK' },
      { name: 'employee_guidelines.xlsx', status: 'Needs update' },
      { name: 'compliance_checklist.xlsx', status: 'In audit' },
    ],
    id: 'item-1',
    progress: { current: 46, total: 46 },
    status: 'complete',
    title: 'CompTIA Security+',
  },
  {
    auditDates: [
      { auditor: 'Sarah Johnson', date: 'Jan 15, 2024' },
      { auditor: 'Mike Peters', date: 'Jan 20, 2024' },
    ],
    certified: 'IEC 2701',
    documents: [
      { name: 'certification_records.xlsx', status: 'OK' },
      { name: 'training_logs.xlsx', status: 'In audit' },
      { name: 'assessment_results.xlsx', status: 'Needs update' },
    ],
    id: 'item-2',
    progress: { current: 32, total: 41 },
    status: 'warning',
    title: 'SAFe Certifications',
  },
  {
    auditDates: [
      { auditor: 'Lisa Chen', date: 'Feb 5, 2024' },
      { auditor: 'Tom Wilson', date: 'Feb 8, 2024' },
    ],
    certified: 'ISO',
    documents: [
      { name: 'project_documents.xlsx', status: 'OK' },
      { name: 'methodology_guide.xlsx', status: 'OK' },
      { name: 'best_practices.xlsx', status: 'In audit' },
    ],
    id: 'item-3',
    progress: { current: 21, total: 21 },
    status: 'complete',
    title: 'PMP Certifications',
  },
  {
    auditDates: [
      { auditor: 'Alex Kumar', date: 'Mar 1, 2024' },
      { auditor: 'Rachel Green', date: 'Mar 5, 2024' },
    ],
    certified: 'SOC 2',
    documents: [
      { name: 'aws_certifications.xlsx', status: 'OK' },
      { name: 'azure_competencies.xlsx', status: 'OK' },
      { name: 'gcp_credentials.xlsx', status: 'In audit' },
      { name: 'cloud_security.xlsx', status: 'OK' },
    ],
    id: 'item-4',
    progress: { current: 21, total: 21 },
    status: 'complete',
    title: 'Cloud Certifications',
  },
]
