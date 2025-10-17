import type { Profile, UpdateProfileRequest } from '@/types/profile';

const API_BASE_URL = 'http://localhost:5001/api';

export interface Experience {
  id: string;
  company: string;
  title: string;
  location?: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  description: string[];
  technologies: string[];
  displayOrder: number;
}

export interface ExperienceInput {
  company: string;
  title: string;
  location?: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  description: string[];
  technologies: string[];
  displayOrder: number;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

class ApiClient {
  private getAuthHeader = (): HeadersInit => {
    const token = localStorage.getItem('admin_token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  login = async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('Invalid credentials');
    }

    const data = await response.json();
    localStorage.setItem('admin_token', data.access_token);
    localStorage.setItem('admin_token_expiry', (Date.now() + data.expires_in * 1000).toString());
    return data;
  };

  logout = async (): Promise<void> => {
    const token = localStorage.getItem('admin_token');

    if (token) {
      try {
        await fetch(`${API_BASE_URL}/auth/logout`, {
          method: 'POST',
          headers: this.getAuthHeader(),
        });
      } catch (error) {
        console.error('Logout API call failed:', error);
      }
    }

    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_token_expiry');
  };

  isAuthenticated = (): boolean => {
    return !!localStorage.getItem('admin_token');
  };

  getAllExperiences = async (): Promise<Experience[]> => {
    const response = await fetch(`${API_BASE_URL}/experiences`);
    if (!response.ok) throw new Error('Failed to fetch experiences');
    const data = await response.json();
    return data.experiences;
  };

  createExperience = async (experience: ExperienceInput): Promise<Experience> => {
    const response = await fetch(`${API_BASE_URL}/experiences`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeader(),
      },
      body: JSON.stringify(experience),
    });

    if (!response.ok) {
      let errorMessage = 'Failed to create experience';

      try {
        const errorData = await response.json();

        // Handle validation errors
        if (errorData.errors) {
          const validationErrors = Object.entries(errorData.errors)
            .map(([field, messages]) => `${field}: ${Array.isArray(messages) ? messages.join(', ') : messages}`)
            .join('; ');
          errorMessage = validationErrors;
        } else if (errorData.title) {
          errorMessage = errorData.title;
        } else if (errorData.message) {
          errorMessage = errorData.message;
        }
      } catch (e) {
        errorMessage = `${response.status}: ${response.statusText}`;
      }

      throw new Error(errorMessage);
    }

    return response.json();
  };

  updateExperience = async (id: string, experience: ExperienceInput): Promise<Experience> => {
    const response = await fetch(`${API_BASE_URL}/experiences/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeader(),
      },
      body: JSON.stringify(experience),
    });

    if (!response.ok) {
      let errorMessage = 'Failed to update experience';

      try {
        const errorData = await response.json();

        // Handle validation errors
        if (errorData.errors) {
          const validationErrors = Object.entries(errorData.errors)
            .map(([field, messages]) => `${field}: ${Array.isArray(messages) ? messages.join(', ') : messages}`)
            .join('; ');
          errorMessage = validationErrors;
        } else if (errorData.title) {
          errorMessage = errorData.title;
        } else if (errorData.message) {
          errorMessage = errorData.message;
        }
      } catch (e) {
        errorMessage = `${response.status}: ${response.statusText}`;
      }

      throw new Error(errorMessage);
    }

    return response.json();
  };

  deleteExperience = async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/experiences/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeader(),
    });

    if (!response.ok) {
      throw new Error('Failed to delete experience');
    }
  };

  // Profile methods
  getProfile = async (): Promise<Profile> => {
    const response = await fetch(`${API_BASE_URL}/profile`);
    if (!response.ok) throw new Error('Failed to fetch profile');
    return response.json();
  };

  updateProfile = async (profile: UpdateProfileRequest): Promise<Profile> => {
    const response = await fetch(`${API_BASE_URL}/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeader(),
      },
      body: JSON.stringify(profile),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.errors ? JSON.stringify(error.errors) : 'Failed to update profile');
    }

    return response.json();
  };
}

export const api = new ApiClient();
