import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import type { UpdateProfileRequest } from '@/types/profile';

const profileSchema = z.object({
  fullName: z.string().min(1, 'Full name is required').max(100, 'Full name must not exceed 100 characters'),
  title: z.string().min(1, 'Title is required').max(150, 'Title must not exceed 150 characters'),
  summary: z.string().max(500, 'Summary must not exceed 500 characters').optional(),
  bio: z.string().optional(),
  email: z.string().email('Invalid email format').or(z.literal('')).optional(),
  phone: z.string().optional(),
  whatsAppNumber: z.string().optional(),
  location: z.string().max(100).optional(),
  githubUrl: z.string().url('Invalid URL').or(z.literal('')).optional(),
  linkedInUrl: z.string().url('Invalid URL').or(z.literal('')).optional(),
  twitterUrl: z.string().url('Invalid URL').or(z.literal('')).optional(),
  calendlyUrl: z.string().url('Invalid URL').or(z.literal('')).optional(),
  portfolioUrl: z.string().url('Invalid URL').or(z.literal('')).optional(),
  profileImageUrl: z.string().url('Invalid URL').or(z.literal('')).optional(),
  resumePdfUrl: z.string().url('Invalid URL').or(z.literal('')).optional(),
  yearsOfExperience: z.number().int().min(0, 'Must be 0 or greater').optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!api.isAuthenticated()) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: () => api.getProfile(),
  });

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: '',
      title: '',
      summary: '',
      bio: '',
      email: '',
      phone: '',
      whatsAppNumber: '',
      location: '',
      githubUrl: '',
      linkedInUrl: '',
      twitterUrl: '',
      calendlyUrl: '',
      portfolioUrl: '',
      profileImageUrl: '',
      resumePdfUrl: '',
      yearsOfExperience: 0,
    },
  });

  // Update form when profile data is loaded
  useEffect(() => {
    if (profile) {
      form.reset({
        fullName: profile.fullName,
        title: profile.title,
        summary: profile.summary || '',
        bio: profile.bio || '',
        email: profile.email || '',
        phone: profile.phone || '',
        whatsAppNumber: profile.whatsAppNumber || '',
        location: profile.location || '',
        githubUrl: profile.githubUrl || '',
        linkedInUrl: profile.linkedInUrl || '',
        twitterUrl: profile.twitterUrl || '',
        calendlyUrl: profile.calendlyUrl || '',
        portfolioUrl: profile.portfolioUrl || '',
        profileImageUrl: profile.profileImageUrl || '',
        resumePdfUrl: profile.resumePdfUrl || '',
        yearsOfExperience: profile.yearsOfExperience || 0,
      });
    }
  }, [profile, form]);

  const updateMutation = useMutation({
    mutationFn: (data: UpdateProfileRequest) => api.updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      toast({
        title: 'Profile updated',
        description: 'Your profile has been updated successfully.',
      });
      setIsSaving(false);
    },
    onError: (error: Error) => {
      toast({
        title: 'Update failed',
        description: error.message,
        variant: 'destructive',
      });
      setIsSaving(false);
    },
  });

  const onSubmit = (data: ProfileFormData) => {
    setIsSaving(true);
    const profileData: UpdateProfileRequest = {
      ...data,
      email: data.email || undefined,
      phone: data.phone || undefined,
      whatsAppNumber: data.whatsAppNumber || undefined,
      location: data.location || undefined,
      summary: data.summary || undefined,
      bio: data.bio || undefined,
      githubUrl: data.githubUrl || undefined,
      linkedInUrl: data.linkedInUrl || undefined,
      twitterUrl: data.twitterUrl || undefined,
      calendlyUrl: data.calendlyUrl || undefined,
      portfolioUrl: data.portfolioUrl || undefined,
      profileImageUrl: data.profileImageUrl || undefined,
      resumePdfUrl: data.resumePdfUrl || undefined,
    };
    updateMutation.mutate(profileData);
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Profile Management</h1>
            <p className="text-muted-foreground">
              Edit your personal information and professional details
            </p>
          </div>
          <Button
            onClick={form.handleSubmit(onSubmit)}
            disabled={isSaving}
          >
            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
          </Button>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Information Card */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Your primary professional details</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name *</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Professional Title *</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="e.g., Software Engineer" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="yearsOfExperience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Years of Experience</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="e.g., South Africa" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="summary"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Summary / Tagline</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="A brief tagline for your hero section"
                          rows={2}
                        />
                      </FormControl>
                      <FormDescription>Max 500 characters</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Bio & Description Card */}
            <Card>
              <CardHeader>
                <CardTitle>Bio & Description</CardTitle>
                <CardDescription>Tell your story</CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Write a detailed bio about yourself..."
                          rows={6}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Contact Information Card */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>How people can reach you</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} placeholder="your.email@example.com" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input type="tel" {...field} placeholder="+1 234 567 8900" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="whatsAppNumber"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>WhatsApp Number</FormLabel>
                      <FormControl>
                        <Input type="tel" {...field} placeholder="+1234567890 (without spaces)" />
                      </FormControl>
                      <FormDescription>
                        Format: +CountryCodePhoneNumber (e.g., +27829554784)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Social Links Card */}
            <Card>
              <CardHeader>
                <CardTitle>Social Links</CardTitle>
                <CardDescription>Your professional online presence</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <FormField
                  control={form.control}
                  name="githubUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>GitHub URL</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="https://github.com/username" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="linkedInUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>LinkedIn URL</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="https://www.linkedin.com/in/username" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="twitterUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Twitter / X URL</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="https://twitter.com/username" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="calendlyUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Calendly URL</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="https://calendly.com/username" />
                      </FormControl>
                      <FormDescription>
                        For scheduling meetings
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="portfolioUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Portfolio URL</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="https://yourportfolio.com" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Media & Files Card */}
            <Card>
              <CardHeader>
                <CardTitle>Media & Files</CardTitle>
                <CardDescription>Profile image and resume (file upload coming soon)</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <FormField
                  control={form.control}
                  name="profileImageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Profile Image URL</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="https://example.com/image.jpg" />
                      </FormControl>
                      <FormDescription>
                        Temporary: Enter image URL directly. File upload feature coming soon.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="resumePdfUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Resume PDF URL</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="https://example.com/resume.pdf" />
                      </FormControl>
                      <FormDescription>
                        Temporary: Enter PDF URL directly. File upload feature coming soon.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Form Actions */}
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset()}
              >
                Discard Changes
              </Button>
              <Button type="submit" disabled={isSaving}>
                {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </AdminLayout>
  );
}
