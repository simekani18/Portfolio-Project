import { useState } from 'react';
import { usePortfolioNavigation } from '@/hooks/useNavigationScroll';
import { PORTFOLIO_NAV_ITEMS, PERSONAL_SOCIAL_LINKS } from '@/constants/navigation';
import { NavItem } from './NavItem';
import { SocialIcon, EmailIcon, LinkedInIcon, GitHubIcon } from './SocialIcon';

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isVisible, isInWhiteSection } = usePortfolioNavigation();

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className={`text-2xl font-black tracking-tight ${
              isInWhiteSection ? 'text-black' : 'text-white'
            }`}>
              Simekani.
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className={`backdrop-blur-lg rounded-full px-2 py-2 border transition-all duration-300 ${
              isInWhiteSection ? 'bg-black/10 border-black/20' : 'bg-white/10 border-white/20'
            }`}>
              <div className="flex items-center space-x-1">
                {PORTFOLIO_NAV_ITEMS.map((item) => (
                  <NavItem
                    key={item.name}
                    item={item}
                    isInWhiteSection={isInWhiteSection}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Social Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <SocialIcon
              href={`mailto:${PERSONAL_SOCIAL_LINKS.email}`}
              icon={<EmailIcon />}
              label="Email"
              isInWhiteSection={isInWhiteSection}
            />
            <SocialIcon
              href={PERSONAL_SOCIAL_LINKS.linkedin}
              icon={<LinkedInIcon />}
              label="LinkedIn"
              isInWhiteSection={isInWhiteSection}
            />
            <SocialIcon
              href={PERSONAL_SOCIAL_LINKS.github}
              icon={<GitHubIcon />}
              label="GitHub"
              isInWhiteSection={isInWhiteSection}
            />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`focus:outline-none transition-colors ${
                isInWhiteSection
                  ? 'text-gray-600 hover:text-black focus:text-black'
                  : 'text-gray-400 hover:text-white focus:text-white'
              }`}
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black/90 backdrop-blur-md rounded-2xl mt-4">
              {PORTFOLIO_NAV_ITEMS.map((item) => (
                <NavItem
                  key={item.name}
                  item={item}
                  isInWhiteSection={isInWhiteSection}
                  isMobile
                  onClick={() => setIsMenuOpen(false)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
