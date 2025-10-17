import { Link, useLocation } from 'react-router-dom';
import { PortfolioNavItem } from '@/constants/navigation';

interface NavItemProps {
  item: PortfolioNavItem;
  isInWhiteSection: boolean;
  isMobile?: boolean;
  onClick?: () => void;
}

export const NavItem = ({ item, isInWhiteSection, isMobile = false, onClick }: NavItemProps) => {
  const location = useLocation();
  const isActive = item.type === 'route' && location.pathname === item.href;

  const baseClasses = isMobile
    ? `block px-3 py-2 text-base font-medium ${
        isActive ? 'text-white bg-white/20' : 'text-gray-300 hover:text-white'
      }`
    : `px-6 py-2 text-sm font-medium transition-all duration-200 rounded-full ${
        isActive || item.name === 'Home'
          ? isInWhiteSection
            ? 'bg-black text-white'
            : 'bg-white text-black'
          : isInWhiteSection
          ? 'text-black hover:bg-black/20'
          : 'text-white hover:bg-white/20'
      }`;

  const Element = item.type === 'route' ? Link : 'a';
  const props = item.type === 'route' ? { to: item.href } : { href: item.href };

  return (
    <Element {...props} className={baseClasses} onClick={onClick}>
      {item.name}
    </Element>
  );
};
