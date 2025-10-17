import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { api, Experience, ExperienceInput } from '@/lib/api';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { X } from 'lucide-react';

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
    statusText?: string;
  };
  message?: string;
}

const experienceSchema = z.object({
  company: z.string().min(1, 'Company name is required').max(150, 'Company name must not exceed 150 characters'),
  title: z.string().min(1, 'Job title is required').max(150, 'Job title must not exceed 150 characters'),
  location: z.string().optional(),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional(),
  isCurrent: z.boolean(),
  description: z.array(z.string().min(1, 'Description cannot be empty')).min(1, 'At least one description point is required'),
  technologies: z.array(z.string().min(1, 'Technology cannot be empty')).min(1, 'At least one technology is required'),
  displayOrder: z.number().min(1, 'Display order must be at least 1').int('Display order must be a whole number'),
}).refine((data) => {
  if (!data.isCurrent && !data.endDate) {
    return false;
  }
  return true;
}, {
  message: 'End date is required when not a current position',
  path: ['endDate'],
});

type ExperienceForm = z.infer<typeof experienceSchema>;

interface ExperienceDialogProps {
  open: boolean;
  onClose: () => void;
  experience: Experience | null;
  onSuccess: () => void;
}

export function ExperienceDialog({ open, onClose, experience, onSuccess }: ExperienceDialogProps) {
  const { toast } = useToast();
  const [descItems, setDescItems] = useState<string[]>(['']);
  const [techItems, setTechItems] = useState<string[]>(['']);

  const form = useForm<ExperienceForm>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      company: '',
      title: '',
      location: '',
      startDate: '',
      endDate: '',
      isCurrent: false,
      description: [''],
      technologies: [''],
      displayOrder: 1,
    },
  });

  useEffect(() => {
    if (open) {
      if (experience) {
        form.reset({
          company: experience.company,
          title: experience.title,
          location: experience.location || '',
          startDate: experience.startDate,
          endDate: experience.endDate || '',
          isCurrent: experience.isCurrent,
          description: experience.description,
          technologies: experience.technologies,
          displayOrder: experience.displayOrder,
        });
        setDescItems(experience.description);
        setTechItems(experience.technologies);
      } else {
        form.reset({
          company: '',
          title: '',
          location: '',
          startDate: '',
          endDate: '',
          isCurrent: false,
          description: [''],
          technologies: [''],
          displayOrder: 1,
        });
        setDescItems(['']);
        setTechItems(['']);
      }
    }
  }, [experience, open]);

  const createMutation = useMutation({
    mutationFn: api.createExperience,
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Experience created successfully',
      });
      onSuccess();
    },
    onError: (error: Error | ApiError | string) => {
      let errorMessage = 'Failed to create experience';

      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'object' && error !== null && 'response' in error) {
        errorMessage = error.response?.data?.message || error.response?.statusText || errorMessage;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }

      toast({
        title: 'Error Creating Experience',
        description: errorMessage,
        variant: 'destructive',
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: ExperienceInput }) =>
      api.updateExperience(id, data),
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Experience updated successfully',
      });
      onSuccess();
    },
    onError: (error: Error | ApiError | string) => {
      let errorMessage = 'Failed to update experience';

      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'object' && error !== null && 'response' in error) {
        errorMessage = error.response?.data?.message || error.response?.statusText || errorMessage;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }

      toast({
        title: 'Error Updating Experience',
        description: errorMessage,
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (data: ExperienceForm) => {
    const filteredDesc = data.description.filter(d => d.trim() !== '');
    const filteredTech = data.technologies.filter(t => t.trim() !== '');

    if (filteredDesc.length === 0) {
      toast({
        title: 'Validation Error',
        description: 'At least one description point is required',
        variant: 'destructive',
      });
      return;
    }

    if (filteredTech.length === 0) {
      toast({
        title: 'Validation Error',
        description: 'At least one technology is required',
        variant: 'destructive',
      });
      return;
    }

    const payload: ExperienceInput = {
      company: data.company,
      title: data.title,
      location: data.location,
      startDate: data.startDate,
      endDate: data.isCurrent ? undefined : data.endDate,
      isCurrent: data.isCurrent,
      description: filteredDesc,
      technologies: filteredTech,
      displayOrder: data.displayOrder,
    };

    if (experience) {
      updateMutation.mutate({ id: experience.id, data: payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  const addDescItem = () => {
    const newItems = [...descItems, ''];
    setDescItems(newItems);
    form.setValue('description', newItems);
  };

  const removeDescItem = (index: number) => {
    const newItems = descItems.filter((_, i) => i !== index);
    setDescItems(newItems);
    form.setValue('description', newItems);
  };

  const updateDescItem = (index: number, value: string) => {
    const newItems = [...descItems];
    newItems[index] = value;
    setDescItems(newItems);
    form.setValue('description', newItems);
  };

  const addTechItem = () => {
    const newItems = [...techItems, ''];
    setTechItems(newItems);
    form.setValue('technologies', newItems);
  };

  const removeTechItem = (index: number) => {
    const newItems = techItems.filter((_, i) => i !== index);
    setTechItems(newItems);
    form.setValue('technologies', newItems);
  };

  const updateTechItem = (index: number, value: string) => {
    const newItems = [...techItems];
    newItems[index] = value;
    setTechItems(newItems);
    form.setValue('technologies', newItems);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{experience ? 'Edit Experience' : 'Add Experience'}</DialogTitle>
          <DialogDescription>
            {experience ? 'Update the experience details below' : 'Fill in the details for the new experience'}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Company <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Company name" {...field} />
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
                  <FormLabel>
                    Title <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Job title" {...field} />
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
                  <FormLabel>Location (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Location" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Start Date <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      End Date{!form.watch('isCurrent') && <span className="text-destructive"> *</span>}
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        disabled={form.watch('isCurrent')}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="isCurrent"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Current Position</FormLabel>
                    <FormDescription>
                      Check this if you currently work here
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="displayOrder"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Display Order <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>
                    Lower numbers appear first
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <FormLabel>
                Description <span className="text-destructive">*</span>
              </FormLabel>
              <div className="space-y-2 mt-2">
                {descItems.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <Textarea
                      value={item}
                      onChange={(e) => updateDescItem(index, e.target.value)}
                      placeholder="Description point"
                      className="flex-1"
                    />
                    {descItems.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeDescItem(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={addDescItem}>
                  Add Description Point
                </Button>
              </div>
              {form.formState.errors.description && (
                <p className="text-sm font-medium text-destructive mt-2">
                  {form.formState.errors.description.message}
                </p>
              )}
            </div>

            <div>
              <FormLabel>
                Technologies <span className="text-destructive">*</span>
              </FormLabel>
              <div className="space-y-2 mt-2">
                {techItems.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={item}
                      onChange={(e) => updateTechItem(index, e.target.value)}
                      placeholder="Technology"
                      className="flex-1"
                    />
                    {techItems.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeTechItem(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={addTechItem}>
                  Add Technology
                </Button>
              </div>
              {form.formState.errors.technologies && (
                <p className="text-sm font-medium text-destructive mt-2">
                  {form.formState.errors.technologies.message}
                </p>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={createMutation.isPending || updateMutation.isPending}
              >
                {createMutation.isPending || updateMutation.isPending
                  ? 'Saving...'
                  : experience
                  ? 'Update'
                  : 'Create'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
