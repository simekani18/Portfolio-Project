export interface WorkExperience {
  id: number;
  period: string;
  title: string;
  company: string;
  isCurrent: boolean;
  description: string[];
}

export const WORK_EXPERIENCES: WorkExperience[] = [
  {
    id: 1,
    period: "Jan 2024 - Present",
    title: "Software Engineer",
    company: "Direct Transact, South Africa",
    isCurrent: true,
    description: [
      "Designed and developed a PCI-compliant tokenization system securing sensitive payment data",
      "Led implementation of microservices architecture using Kubernetes and Kafka for scalable backend infrastructure",
      "Developed using C#, .NET Core, PostgreSQL, and AWS cloud services (EC2, RDS, Aurora)",
      "Automated deployment pipelines and collaborated with cross-functional teams to maintain high code quality"
    ]
  },
  {
    id: 2,
    period: "Jan 2022 - Dec 2023",
    title: "iOS Developer (Contracted to ABSA Bank)",
    company: "DVT, South Africa",
    isCurrent: false,
    description: [
      "Solo iOS developer for ABSA's short-term insurance division, independently building and maintaining feature-rich iOS apps",
      "Advocated and implemented SOLID principles, led code reviews, and ensured adherence to Apple's Human Interface Guidelines",
      "Actively participated in Agile ceremonies, sprint planning, and feature releases",
      "Delivered seamless user experiences aligned with business requirements and compliance standards",
      "KEY ACHIEVEMENT: Successfully delivered critical short-term insurance app features as sole iOS developer"
    ]
  },
  {
    id: 3,
    period: "Jan 2021 - Dec 2021",
    title: "Graduate iOS Developer",
    company: "DVT, South Africa",
    isCurrent: false,
    description: [
      "Integrated third-party APIs and built user-friendly interfaces consistent with Apple's HIG standards",
      "Demonstrated quick adaptability to new tools and frameworks, contributing to team projects with efficient solutions",
      "Collaborated with senior developers to deliver high-quality mobile applications"
    ]
  }
];
