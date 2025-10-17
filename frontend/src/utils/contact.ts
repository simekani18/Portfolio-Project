export function buildWhatsAppLink(phoneNumber: string, firstName: string): string {
  const cleanPhone = phoneNumber.replace(/\D/g, '');
  const message = `Hi ${firstName}, I found your portfolio and would like to discuss a project`;
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
}
