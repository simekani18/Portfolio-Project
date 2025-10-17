export interface PortfolioContactOption {
  id: number;
  title: string;
  description: string;
  icon: string;
  action: string;
  link: string;
  type: 'primary' | 'secondary';
}

export const BASE_CONTACT_OPTIONS: Omit<PortfolioContactOption, 'link'>[] = [
  {
    id: 1,
    title: "Schedule a Call",
    description: "Book a 30-minute meeting to discuss your project in detail",
    icon: "📅",
    action: "Book Meeting",
    type: "primary"
  },
  {
    id: 2,
    title: "WhatsApp Message",
    description: "Send a quick message for immediate responses",
    icon: "💬",
    action: "Send Message",
    type: "secondary"
  },
  {
    id: 3,
    title: "LinkedIn Connect",
    description: "Connect for professional networking and opportunities",
    icon: "💼",
    action: "Connect Now",
    type: "secondary"
  }
];

export const FALLBACK_CONTACT_LINKS = {
  calendly: "https://calendly.com/simekani-mabambi",
  whatsapp: "27829554784",
  linkedin: "https://www.linkedin.com/in/simekani",
} as const;
