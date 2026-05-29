export const portfolioData = {
  personalInfo: {
    name: "Patrick Jake T. Biña",
    title: "Fullstack Developer",
    avatar: "/profile.jpg", // We will generate an awesome avatar or represent it beautifully
    bio: "Systems architect, cloud engineer, and fullstack developer. I build resilient, high-availability IT infrastructures, automate cloud deployments, and build modern responsive web applications.",
    location: "Philippines Cagayan de Oro City",
    email: "pjtbina@example.com",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    resumeUrl: "#",
    // Education and affiliations
    education: [
      {
        degree: "Bachelor of Information Technology (4th Year)",
        school: "STI College Cagayan de Oro City",
        period: "Expected Graduate Jul 2026",
        notes: "Currently completing final year coursework."
      },
      {
        degree: "Agribusiness (1st - 3rd Year)",
        school: "Xavier University - Ateneo de Cagayan",
        period: "Jun 2015 - 2018",
        notes: "Completed coursework prior to transfer to IT program."
      }
    ],
    affiliations: [
      "Philippine Air Force Reserve Corps",
      "XU ROTC Cadet Officer"
    ],
    stats: [
      { label: "Years Exp", value: "4" },
      { label: "Cloud Projects", value: "4+" },
      { label: "Uptime Guaranteed", value: "99.99%" },
      { label: "Security Audits", value: "20+" }
    ]
  },
  skills: [
    {
      category: "Cloud & DevOps",
      items: [
        { name: "AWS (EC2, S3, RDS, Lambda)", level: 95 },
        { name: "Terraform (IaC)", level: 90 },
        { name: "Docker & Kubernetes", level: 85 },
        { name: "CI/CD (GitHub Actions, Jenkins)", level: 88 },
        { name: "Google Cloud Platform", level: 75 }
      ]
    },
    {
      category: "SysAdmin & Core IT",
      items: [
        { name: "Linux Administration (RHEL, Ubuntu)", level: 95 },
        { name: "Scripting (Python, Bash, PowerShell)", level: 90 },
        { name: "Active Directory & IAM", level: 85 },
        { name: "Monitoring (Prometheus, Grafana)", level: 80 },
        { name: "Database Admin (PostgreSQL, MongoDB)", level: 82 }
      ]
    },
    {
      category: "Networking & Security",
      items: [
        { name: "Network Security & VPNs", level: 90 },
        { name: "Firewalls (Palo Alto, pfSense)", level: 85 },
        { name: "Penetration Testing (Kali, Nmap)", level: 75 },
        { name: "Compliance & Auditing (SOC2, ISO27001)", level: 80 },
        { name: "Cisco Routing & Switching", level: 88 }
      ]
    }
    ,  {
        category: "Full stack Development Application",
        items: [
          { name: "Software Developer (Desktop & Mobile)", level: 90 },
          { name: "Website Developer (Front-end & Back-end)", level: 95 }
        ]
      },
  ],
  experience: [
    {
      role: "Lead Cloud Infrastructure Engineer",
      company: "Apex Enterprise Solutions",
      period: "2023 - Present",
      description: "Directing the migration of legacy hybrid architectures to AWS. Engineered multi-region Kubernetes clusters supporting 2M+ active users. Achieved a 35% reduction in cloud compute costs using Terraform automation and dynamic autoscaling.",
      highlights: [
        "Implemented zero-trust security architecture for remote workforce of 500+",
        "Led team of 4 DevOps engineers to automate deployment pipelines",
        "Configured robust monitoring and alerting using Prometheus/Grafana, reducing MTTR by 40%"
      ]
    },
    {
      role: "Senior IT Systems & Network Specialist",
      company: "ByteDefend Cybersecurity",
      period: "2020 - 2023",
      description: "Managed core physical and virtual server infrastructure. Conducted vulnerability assessments and hardended Linux production environments. Orchestrated disaster recovery plans and oversaw successful SOC2 Type II compliance auditing.",
      highlights: [
        "Redesigned corporate LAN/WAN topology with advanced intrusion detection systems (IDS)",
        "Automated routine server patching across 250+ systems using Ansible",
        "Responded to and neutralized critical high-level security incidents as part of CSIRT"
      ]
    },
    {
      role: "IT Support & Systems Administrator",
      company: "Innova Tech Labs",
      period: "2018 - 2020",
      description: "Provided tier-3 server support and database maintenance. Maintained corporate Active Directory, DNS, DHCP, and virtual environments using VMware ESXi. Scripted automated user onboarding workflows.",
      highlights: [
        "Migrated office mail infrastructure to Microsoft 365, serving 150+ users",
        "Wrote Custom Python CLI tools to speed up IT hardware provisioning by 60%",
        "Managed and monitored high-performance SQL clusters"
      ]
    }
  ],
  projects: [
    {
      id: "cyber-shield",
      title: "Cyber Shield Game",
      description: "A fast-paced browser game inspired by classic space-impact titles. Built with Phaser and optimized for desktop and mobile play — features enemy waves, power-ups, and level progression.",
      category: "Game",
      icon: "activity",
      image: "/projects/cyber-shield.png",
      github: "https://github.com/trexbina/Cyber-shield-Game-phaser.git",
      demo: "https://cyber-shield-game-phaser.vercel.app",
      tags: ["Phaser", "JavaScript", "Canvas", "Game", "HTML5"]
    },
    {
      id: "friendspace",
      title: "Friendspace",
      description: "A social media prototype inspired by Friendster — focuses on profiles, friending, and simple activity feeds. This system is undergoing active development and is not yet fully functional, but it demonstrates core concepts of user authentication, real-time updates, and responsive design. - For testing Login using - Username: anya@gmail.com password: 123 ", 
      icon: "cloud",
      image: "/projects/friendspace.png",
      github: "https://github.com/trexbina/Friendspace.git",
      demo: "http://friendspace.infinityfreeapp.com",
      tags: ["React", "Next.js", "Social", "Realtime"]
    },
    {
      id: "peak-review",
      title: "Peak Review Center",
      description: "An online review and examination platform originally developed as a school thesis for a client. Provides examinations, timed quizzes, and result analytics for learners and instructors.",
      category: "Education",
      icon: "terminal",
      image: "/projects/peak-review.png",
      github: "https://github.com/trexbina2/peakNextJs",
      demo: "https://peak-next-js.vercel.app/",
      tags: ["Next.js", "React", "Exams", "Analytics"]
    }
  ],
  certifications: [
    {
      name: "Google Analytics Individual Qualification (GAIQ)",
      issuer: "Google",
      date: "Issued Mar 2024",
      code: "GAIQ-2024"
    },
    {
      name: "Google Data Analytics Professional Certificate",
      issuer: "Google / Coursera",
      date: "Issued Aug 2023",
      code: "GDAP-2023"
    },
    {
      name: "Microsoft Certified: Azure Fundamentals",
      issuer: "Microsoft",
      date: "Issued Jan 2024",
      code: "AZ-900-2024"
    },
    {
      name: "Meta Front-End Developer Professional Certificate",
      issuer: "Meta / Coursera",
      date: "Issued May 2024",
      code: "META-FE-2024"
    },
    {
      name: "AWS Certified Solutions Architect – Associate",
      issuer: "Amazon Web Services",
      date: "Issued Dec 2024",
      code: "AWS-SAA-8874"
    },
    
    {
      name: "Google Career Certificates (selected)",
      issuer: "Google / Coursera",
      date: "Issued 2024",
      code: "GOOGLE-CAREER-2024"
    },
    {
      name: "Certification of Safety Officer (SO1)",
      issuer: "DTI / Local Authority",
      date: "Issued 2024",
      code: "SO1-2024"
    },
    {
      name: "TESDA Automotive NC I",
      issuer: "TESDA",
      date: "Issued 2024",
      code: "TESDA-AUTO-NC1"
    }
  ],
  faqs: [
    {
      question: "Do you offer emergency support for server outages?",
      answer: "Yes, I provide 24/7 on-call emergency infrastructure support for critical clients under an active retainer agreement."
    },
    {
      question: "What is your stance on physical server rooms vs. 100% cloud?",
      answer: "It entirely depends on data latency, compliance (like HIPAA or extreme sovereignty needs), and cost. I design modern hybrid cloud architectures that combine the cost-effectiveness of local storage with the infinite scale and redundancy of AWS."
    },
    {
      question: "Which Infrastructure as Code tools do you recommend?",
      answer: "For almost all enterprise-scale work, I recommend Terraform for provisioning core resources, and Ansible for subsequent configuration management and application deployments."
    }
  ]
};
