import { PortfolioContactOption, BASE_CONTACT_OPTIONS, FALLBACK_CONTACT_LINKS } from '@/constants/contactOptions';
import { buildWhatsAppLink } from './contact';

interface Profile {
  calendlyUrl?: string;
  whatsAppNumber?: string;
  linkedInUrl?: string;
  fullName?: string;
}

export function buildContactOptionsForPortfolio(profile?: Profile): PortfolioContactOption[] {
  const firstName = profile?.fullName?.split(' ')[0] || 'Simekani';

  return BASE_CONTACT_OPTIONS.map((option) => {
    switch (option.id) {
      case 1:
        return {
          ...option,
          link: profile?.calendlyUrl || FALLBACK_CONTACT_LINKS.calendly,
        };
      case 2:
        return {
          ...option,
          link: profile?.whatsAppNumber
            ? buildWhatsAppLink(profile.whatsAppNumber, firstName)
            : buildWhatsAppLink(FALLBACK_CONTACT_LINKS.whatsapp, firstName),
        };
      case 3:
        return {
          ...option,
          link: profile?.linkedInUrl || FALLBACK_CONTACT_LINKS.linkedin,
        };
      default:
        return { ...option, link: '' };
    }
  });
}
