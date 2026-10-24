export const site = {
  name: 'BKM Technology Solutions',
  short: 'BKM',
  legal: 'BKM Technology Solutions LLC',
  tagline: 'Stable · Secure · Growth',
  location: 'Charlotte, North Carolina',
  reach: 'Serving clients coast to coast',
  email: 'admin@bkm-tech.com',
} as const;

export const navItems = [
  { id: 'services', label: 'Services' },
  { id: 'draftshield', label: 'DraftShield' },
  { id: 'about', label: 'About' },
  { id: 'stack', label: 'Stack' },
  { id: 'contact', label: 'Contact' },
] as const;

export type Accent = 'brand' | 'navy' | 'jade';

export type Service = {
  id: string;
  index: string;
  title: string;
  summary: string;
  points: string[];
  accent: Accent;
  span: string;
  feature?: boolean;
};

/**
 * Sourced from bkm-tech.com → Home → "Tailored Solutions for Business
 * Transformation". Titles and summaries are the client's own copy, verbatim.
 */
export const services: Service[] = [
  {
    id: 'custom-apps',
    index: '01',
    title: 'Custom Applications',
    summary:
      'From consulting to deployment, we create applications that enhance operations and accelerate growth.',
    points: [
      'Consulting through deployment',
      'Applications built to your exact requirements',
      'PHP, Laravel, C# and Python',
      'Legacy systems supported, not abandoned',
    ],
    accent: 'brand',
    span: 'lg:col-span-7 lg:row-span-2',
    feature: true,
  },
  {
    id: 'integration',
    index: '02',
    title: 'System Integration',
    summary:
      'We connect disparate systems through APIs, messaging queues, and ETL processes. Our integration solutions include CRM synchronization, accounting system connections, and enterprise data workflows.',
    points: [
      'API and messaging-queue integration',
      'CRM synchronization',
      'Accounting system connections',
      'Enterprise data workflows',
    ],
    accent: 'navy',
    span: 'lg:col-span-5',
  },
  {
    id: 'maintenance',
    index: '03',
    title: 'Application Maintenance',
    summary:
      'We provide comprehensive maintenance and support, ensuring your applications run smoothly so your business can thrive without technical disruptions.',
    points: [
      'Comprehensive maintenance',
      'Ongoing support',
      'Continuous improvement',
      'No technical disruption',
    ],
    accent: 'jade',
    span: 'lg:col-span-5',
  },
  {
    id: 'etl',
    index: '04',
    title: 'Data Processing & ETL',
    summary:
      'We provide automated data processing, ETL pipelines, and scraping services to gather and transform information. Perfect for product catalog management, vendor data integration, and system migrations.',
    points: [
      'Automated data processing',
      'ETL pipelines and scraping',
      'Product catalog management',
      'Vendor data and system migrations',
    ],
    accent: 'navy',
    span: 'lg:col-span-4',
  },
  {
    id: 'productivity',
    index: '05',
    title: 'Enhanced Productivity',
    summary:
      'We leverage AI tools, automated scraping, and RAG implementations to accelerate development cycles and reduce time to market for your applications.',
    points: [
      'AI tooling',
      'Automated scraping',
      'RAG implementations',
      'Reduced time to market',
    ],
    accent: 'brand',
    span: 'lg:col-span-4',
  },
  {
    id: 'problem-solving',
    index: '06',
    title: 'Fast Development',
    summary:
      'We deliver expert troubleshooting and optimization for existing applications, improving performance, security, and scalability to meet your evolving needs.',
    points: [
      'Expert troubleshooting',
      'Performance optimization',
      'Security and scalability',
      'Existing application rescue',
    ],
    accent: 'jade',
    span: 'lg:col-span-4',
  },
];

/** bkm-tech.com → About, verbatim. */
export const about = {
  intro:
    'We specialize in planning, implementing, and supporting advanced information technologies. From expert consulting to tailored development and ongoing support, we partner with businesses to help them scale and thrive.',
  close:
    'Our solutions are designed to meet the unique needs of each client, ensuring efficient operations and continuous growth.',
  pillars: [
    {
      title: 'Plan',
      body: 'Expert consulting for the technologies you already run and the ones you are weighing next.',
    },
    {
      title: 'Implement',
      body: 'Tailored development — custom applications, integrations, and data pipelines built to fit.',
    },
    {
      title: 'Support',
      body: 'Ongoing maintenance so systems keep running smoothly without technical disruption.',
    },
  ],
};

/** bkm-tech.com → Contact, verbatim. */
export const contactCopy = {
  eyebrow: 'Unlock Your Potential',
  title: 'Discover Tailored Solutions for Your Business Transformation',
  body: 'Discover how BKM can help transform your business. Our client focus and quality-driven mindset will help accelerate your growth potential.',
};

export const interestOptions = [
  'Custom Applications',
  'System Integration',
  'Application Maintenance',
  'Data Processing & ETL',
  'Enhanced Productivity',
  'Fast Development',
  'DraftShield',
];

/** bkm-tech.com → DraftShield, verbatim. */
export const draftshield = {
  name: 'DraftShield',
  eyebrow: 'Product',
  title: 'Your Private AI Legal Assistant',
  intro:
    'DraftShield empowers legal professionals with a secure, offline AI tool to streamline your practice. Save time, protect client data, and work smarter without an internet connection.',
  lead: 'Fully Offline, Work Faster, Stay Secure',
  features: [
    {
      title: 'Total Privacy',
      body: 'Keep client data safe with a fully offline solution, ensuring no sensitive information ever touches the cloud.',
      icon: 'lock',
    },
    {
      title: 'Smarter Case Work',
      body: 'Instantly summarize contracts, review case files, or draft documents with AI that understands legal work.',
      icon: 'file',
    },
    {
      title: 'Easy Document Access',
      body: 'Quickly search and analyze your case files, pulling key insights without endless scrolling or manual notes.',
      icon: 'search',
    },
    {
      title: 'Secure Storage',
      body: 'Your documents and insights are locked tight with encryption, accessible only to you and your team.',
      icon: 'shield',
    },
    {
      title: 'Runs on Your Hardware',
      body: 'Works smoothly on standard laptops or office servers, using your existing setup to save costs.',
      icon: 'cpu',
    },
    {
      title: 'Grows with Your Practice',
      body: 'Start simple, scale up—add features like advanced analytics or team collaboration as your needs grow.',
      icon: 'trend',
    },
  ],
  audience: {
    title: 'Built for Legal Professionals',
    body: 'DraftShield simplifies your work, delivering powerful AI tools to draft, analyze, and organize—all offline, all secure, all tailored to your legal practice.',
    stack: ['C#', 'Python'],
  },
  hardware: {
    title: 'Recommended Hardware',
    body: 'DraftShield runs smoothly on most modern laptops and office servers, so you can use the equipment you already have. For the best experience, we recommend:',
    specs: [
      'Processor: Intel i5, AMD Ryzen 5, Apple M1 or better',
      'Memory: 8GB RAM or higher',
      'Storage: 2GB free disk space for installation',
      'Graphics: Optional GPU (e.g., NVIDIA RTX 3050 or Apple M1 integrated graphics) for faster performance',
      'Operating System: Windows 10/11, macOS Ventura or later',
    ],
  },
  cta: {
    title: 'Start Saving Time Today',
    body: 'Get DraftShield and take control of your legal work with a private, powerful AI assistant. Download now and transform your practice.',
    label: 'Download Coming Soon',
  },
  disclaimer:
    'DraftShield is a tool designed to assist legal professionals with tasks such as document drafting and analysis. It is not a substitute for professional legal advice. Users should verify all AI-generated outputs and consult a qualified attorney for legal decisions. DraftShield and its creators are not liable for any errors, omissions, or consequences arising from the use of this software.',
};

/** bkm-tech.com → Privacy Policy, verbatim. */
export const privacy = {
  title: 'Privacy Policy',
  intro: 'We protect your privacy. This policy covers how we handle personal information on our website.',
  sections: [
    {
      label: 'Collection',
      body: 'We collect name, email, and contact details submitted via forms.',
    },
    {
      label: 'Use',
      body: 'Data improves services, enables personalized communication, and fulfills inquiries. We do not sell or rent it.',
    },
    {
      label: 'Cookies',
      body: 'Used for traffic analysis and better experience. Disable via browser settings.',
    },
    {
      label: 'Third Parties',
      body: 'Data shared with trusted providers for analytics and hosting.',
    },
    {
      label: 'Security',
      body: 'We use strong measures to safeguard data, though no transmission is fully secure.',
    },
    {
      label: 'Rights',
      body: 'Request access, correction, or deletion by contacting us.',
    },
  ],
};

/** Technologies named directly in the client's published copy. */
export const capabilities = [
  { group: 'Languages', items: ['PHP', 'C#', 'Python', 'JavaScript'] },
  { group: 'Frameworks', items: ['Laravel', 'ASP.NET Core', '.NET', 'React', 'Node.js'] },
  { group: 'Data', items: ['APIs', 'ETL pipelines', 'Messaging queues', 'Data workflows'] },
  { group: 'Platforms', items: ['Azure', 'Linux', 'Docker', 'Stripe'] },
  { group: 'AI', items: ['Claude', 'Grok', 'RAG implementations', 'Automated scraping'] },
  { group: 'Integration', items: ['CRM synchronization', 'Accounting systems', 'Product catalogs', 'Vendor data'] },
];
