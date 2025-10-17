export interface PortfolioNavItem {
  name: string;
  href: string;
  type: 'route' | 'anchor';
}

export const PORTFOLIO_NAV_ITEMS: PortfolioNavItem[] = [
  { name: 'Home', href: '/', type: 'route' },
  { name: 'About', href: '#about', type: 'anchor' },
  { name: 'Experience', href: '#experience', type: 'anchor' },
  { name: 'Skills', href: '#technical-skills', type: 'anchor' },
  { name: 'Projects', href: '#portfolio', type: 'anchor' },
  { name: 'Blog', href: '#blog', type: 'anchor' },
  { name: 'Contact', href: '#contact', type: 'anchor' },
];

export const PERSONAL_SOCIAL_LINKS = {
  email: 'simekani.mabambi@gmail.com',
  linkedin: 'https://www.linkedin.com/in/simekani',
  github: 'https://github.com/simekani',
} as const;
