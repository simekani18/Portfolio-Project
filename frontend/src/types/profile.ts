export interface Profile {
  id: string;
  fullName: string;
  title: string;
  summary?: string;
  bio?: string;
  email?: string;
  phone?: string;
  whatsAppNumber?: string;
  location?: string;
  githubUrl?: string;
  linkedInUrl?: string;
  twitterUrl?: string;
  calendlyUrl?: string;
  portfolioUrl?: string;
  profileImageUrl?: string;
  resumePdfUrl?: string;
  yearsOfExperience?: number;
}

export interface UpdateProfileRequest {
  fullName: string;
  title: string;
  summary?: string;
  bio?: string;
  email?: string;
  phone?: string;
  whatsAppNumber?: string;
  location?: string;
  githubUrl?: string;
  linkedInUrl?: string;
  twitterUrl?: string;
  calendlyUrl?: string;
  portfolioUrl?: string;
  profileImageUrl?: string;
  resumePdfUrl?: string;
  yearsOfExperience?: number;
}
