export type SceneKind = "intro" | "loop" | "outro";

export type SceneDefinition = {
  id: string;
  title: string;
  kind: SceneKind;
  segmentIndex: number;
};

export type Project = {
  title: string;
  description: string;
  tags: string[];
  href?: string;
  photoName?: string;
};

export type CertificateItem = {
  title: string;
  issuer: string;
  fileName: string;
  summary?: string;
};

export type TimelineItem = {
  title: string;
  organization: string;
  period: string;
  details: string;
};

export type LinkItem = {
  label: string;
  href: string;
};

export const navigation = [
  { id: "hero", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "global-certifications", label: "Global Certs" },
  { id: "other-certifications", label: "Other Certs" },
  { id: "awards", label: "Awards" },
  { id: "education", label: "Education" },
  { id: "internships", label: "Internships" },
  { id: "contact", label: "Contact" },
];

export const scenes: SceneDefinition[] = [
  { id: "hero", title: "Hero", kind: "intro", segmentIndex: 0 },
  { id: "projects", title: "Projects", kind: "loop", segmentIndex: 0 },
  { id: "global-certifications", title: "Global Certifications", kind: "loop", segmentIndex: 1 },
  { id: "other-certifications", title: "Other Certifications", kind: "loop", segmentIndex: 2 },
  { id: "awards", title: "Awards", kind: "loop", segmentIndex: 3 },
  { id: "education", title: "Education", kind: "loop", segmentIndex: 4 },
  { id: "internships", title: "Internships", kind: "loop", segmentIndex: 5 },
  { id: "contact", title: "Contact", kind: "outro", segmentIndex: 0 },
];

export const heroCopy = {
  name: "K. Krishkanth",
  subtitle: "Third-year computer science and engineering student focused on backend systems and applied AI.",
  description:
    "Third-year CSE student at K. Ramakrishnan College of Engineering with strong interest in artificial intelligence, backend development, and data-driven software systems.",
  location: "Trichy, Tamil Nadu, India",
};

export const profileStats = [
  { label: "CGPA", value: "9.41" },
  { label: "Certifications", value: "20+" },
];

export const featuredProjects: Project[] = [
  {
    title: "MEDUSA - Women Safety Edge Protection System",
    description:
      "Safety-first edge protection workflow with alerting logic and a fast-action interface for critical situations.",
    tags: ["Safety", "Edge logic", "Real-time alerts"],
    href: "https://github.com/Krish-CS/MEDUSA-WOMEN-SAFETY-APPLICATION",
  },
  {
    title: "SkillShare - Skill Marketplace and Opportunity Platform",
    description:
      "Marketplace-style platform for connecting learning demand with teachable skills and visible opportunities.",
    tags: ["Marketplace", "Discovery", "Opportunity flow"],
    href: "https://github.com/Krish-CS/SKILLSHARE",
  },
  {
    title: "Krish Mind AI - Personalized AI Assistant",
    description:
      "Personal assistant concept focused on responsive AI interaction and practical productivity support.",
    tags: ["AI", "Assistant", "Automation"],
    href: "https://cassandra-ai.onrender.com/",
  },
  {
    title: "Automated Report Generation",
    description: "Automated reporting workflow for structured output and repeatable analysis.",
    tags: ["Automation", "Reports", "Python"],
    href: "https://github.com/Krish-CS/AUTOMATED-REPORT-GENERATION",
  },
  {
    title: "API Integration and Data Visualization",
    description: "Integration-focused project centered on data presentation and clean API flow.",
    tags: ["API", "Visualization", "Data"],
    href: "https://github.com/Krish-CS/API-INTEGRATION-AND-DATA-VISUALIZATION",
  },
  {
    title: "Water Quality Prediction",
    description: "Prediction-oriented ML project focused on environmental measurement inputs.",
    tags: ["ML", "Prediction", "Environment"],
    href: "https://github.com/Krish-CS/WaterQualityPrediction",
  },
  {
    title: "Question Mind",
    description: "Question-driven assistant workflow built around retrieval and response handling.",
    tags: ["NLP", "Assistant", "Search"],
    href: "https://github.com/Krish-CS/QUESTION-MIND",
  },
];

export const globalCertificates: CertificateItem[] = [
  {
    title: "AWS Certified Cloud Practitioner",
    issuer: "AWS",
    fileName: "AWS Certified Cloud Practitioner certificate.pdf",
    summary: "Through this certification, I gained a comprehensive understanding of AWS Cloud concepts, security, and compliance. It built a strong foundation in core AWS services, billing, and pricing models, enabling me to architect foundationally resilient and cost-optimized cloud solutions.",
  },
  {
    title: "MongoDB Associate Database Administrator",
    issuer: "MongoDB",
    fileName: "MongoDBAssociateDatabaseAdministrator_Badge20260310-31-bmd3l1.pdf",
    summary: "This course provided deep insights into MongoDB administration, encompassing deployment, performance tuning, and robust security practices. I acquired hands-on expertise in query optimization, indexing strategies, and database monitoring, equipping me to maintain high-availability data infrastructure.",
  },
];

export const otherCertificates: CertificateItem[] = [
  {
    title: "Software Conceptual Design",
    issuer: "NPTEL",
    fileName: "Software Conceptual Design.pdf",
  },
  {
    title: "Problem Solving through Programming in C",
    issuer: "NPTEL",
    fileName: "Problem Solving through Programming in C.pdf",
  },
  {
    title: "Cloud Computing",
    issuer: "NPTEL",
    fileName: "Cloud Computing.pdf",
  },
  {
    title: "The Joy of Computing using Python",
    issuer: "NPTEL",
    fileName: "The Joy of Computing using Python.pdf",
  },
  {
    title: "Fundamental Algorithms - Design and Analysis",
    issuer: "NPTEL",
    fileName: "Fundamental Algorithms - Design and Analysis.pdf",
  },
  {
    title: "Programming in Java",
    issuer: "NPTEL",
    fileName: "Programming in Java.pdf",
  },
  {
    title: "Python for Data Science",
    issuer: "NPTEL",
    fileName: "Python for Data Science.pdf",
  },
  {
    title: "IBM Artificial Intelligence Fundamentals",
    issuer: "IBM SkillsBuild",
    fileName: "IBM ARTIFICIAL INTELLIGENCE FUNDAMENTALS.pdf",
  },
  {
    title: "Introduction to Cybersecurity Awareness",
    issuer: "HP LIFE",
    fileName: "Introduction to Cybersecurity Awareness.pdf",
  },
  {
    title: "Introduction to Digital Business Skills",
    issuer: "HP LIFE",
    fileName: "Introduction to Digital Business Skills.pdf",
  },
  {
    title: "Resume Writing and Job Interviewing",
    issuer: "HP LIFE",
    fileName: "Resume Writing and Job Interviewing.pdf",
  },
  {
    title: "Effective Presentations",
    issuer: "HP LIFE",
    fileName: "Effective Presentations.pdf",
  },
  {
    title: "Effective Leadership",
    issuer: "HP LIFE",
    fileName: "Effective Leadership.pdf",
  },
  {
    title: "Data Science & Analytics",
    issuer: "HP LIFE",
    fileName: "Data Science & Analytics.pdf",
  },
  {
    title: "Agile Project Management",
    issuer: "HP LIFE",
    fileName: "Agile Project Management.pdf",
  },
  {
    title: "AI for Beginners",
    issuer: "HP Foundation",
    fileName: "AI for Beginners.pdf",
  },
  {
    title: "Celonis Academic Process Mining Fundamentals",
    issuer: "Celonis",
    fileName: "CELONIS ACADEMIC PROCESS MINING FUNDAMENTALS.pdf",
  },
  {
    title: "Celonis Foundations",
    issuer: "Celonis",
    fileName: "CELONIS FOUNDATIONS.pdf",
  },
  {
    title: "Celonis AI Foundations",
    issuer: "Celonis",
    fileName: "CELONIS AI FOUNDATIONS.pdf",
  },
];

export const awards: TimelineItem[] = [
  {
    title: "NPTEL Discipline Star",
    organization: "Computer Science and Engineering",
    period: "Jul-Dec 2025",
    details: "Recognition for consistent performance and academic discipline in the NPTEL track.",
  },
];

export const membership = {
  title: "IEIESC membership",
  organization: "Institution of Electronics and Telecommunication Engineers",
  fileName: "IEIESC.pdf",
  summary: "Institutional membership document kept alongside the portfolio evidence.",
};

export const education: TimelineItem[] = [
  {
    title: "Bachelor of Engineering, Computer Science and Engineering",
    organization: "K. Ramakrishnan College of Engineering",
    period: "2023 - 2027",
    details: "CGPA 9.41. Focused on AI, backend systems, and applied software engineering.",
  },
  {
    title: "Higher Secondary Certificate",
    organization: "Alpha Wisdom Vidhyasharam",
    period: "2021 - 2023",
    details: "Completed with 86% and a strong technical foundation.",
  },
  {
    title: "Secondary School Leaving Certificate",
    organization: "Alpha Wisdom Vidhyasharam",
    period: "2020 - 2021",
    details: "Completed with 72% and an early interest in logical problem solving.",
  },
];

export const internships: TimelineItem[] = [
  {
    title: "Artificial Intelligence and Machine Learning Intern",
    organization: "Edunet Foundation in collaboration with AICTE and IBM SkillsBuild",
    period: "June 2025 - July 2025",
    details: "Worked in an applied ML learning environment with a focus on problem solving and model-oriented thinking.",
  },
  {
    title: "AI Internship",
    organization: "Microsoft, SAP, AICTE and Edunet Foundation",
    period: "Program internship",
    details: "Built exposure to practical AI workflows and collaboration across an education-industry ecosystem.",
  },
  {
    title: "Event Coordinator",
    organization: "TechXplore 24-Hour Hackathon, K. Ramakrishnan College of Engineering",
    period: "Campus event",
    details: "Supported coordination and execution during a high-energy student hackathon format.",
  },
];

export const codingProfiles = [
  {
    label: "GitHub",
    value: "Krish-CS",
    href: "https://github.com/Krish-CS",
  },
  {
    label: "LeetCode",
    value: "Krish_CS",
    href: "https://leetcode.com/u/Krish_CS",
  },
  {
    label: "HackerRank",
    value: "krishkanthkrce",
    href: "https://www.hackerrank.com/profile/krishkanthkrce",
  },
  {
    label: "LinkedIn",
    value: "Krishkanth K",
    href: "https://www.linkedin.com/in/krishkanth-k-79b4422a4",
  },
];

export const contactLinks: LinkItem[] = [
  { label: "GitHub", href: "https://github.com/Krish-CS" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/krishkanth-k-79b4422a4" },
  { label: "LeetCode", href: "https://leetcode.com/u/Krish_CS" },
  { label: "HackerRank", href: "https://www.hackerrank.com/profile/krishkanthkrce" },
  { label: "Resume", href: "/api/assets/my/RESUME.pdf" },
];

export const aboutBullets = [
  "Backend-first builder with a strong AI and automation bias.",
  "Turns real-world problems into polished, measurable software.",
  "Enjoys gardening, reading, and exploring emerging technologies.",
];
