import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api, Experience, ExperienceInput } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Plus, LogOut, Pencil, Trash2 } from 'lucide-react';
import { ExperienceDialog } from '@/components/admin/ExperienceDialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    if (!api.isAuthenticated()) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const { data: experiences, isLoading } = useQuery({
    queryKey: ['experiences'],
    queryFn: api.getAllExperiences,
  });

  const deleteMutation = useMutation({
    mutationFn: api.deleteExperience,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['experiences'] });
      toast({
        title: 'Success',
        description: 'Experience deleted successfully',
      });
      setDeleteId(null);
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to delete experience',
        variant: 'destructive',
      });
    },
  });

  const handleLogout = () => {
    api.logout();
    navigate('/admin/login');
  };

  const handleEdit = (experience: Experience) => {
    setEditingExperience(experience);
    setIsDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingExperience(null);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingExperience(null);
  };

  const handleSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['experiences'] });
    handleCloseDialog();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto p-6 max-w-7xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-1">Manage your work experiences</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        <div className="mb-6">
          <Button onClick={handleAdd}>
            <Plus className="mr-2 h-4 w-4" />
            Add Experience
          </Button>
        </div>

        {isLoading ? (
          <div className="text-center py-12">Loading experiences...</div>
        ) : (
          <div className="grid gap-4">
            {experiences?.map((experience) => (
              <Card key={experience.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{experience.title}</CardTitle>
                      <CardDescription>{experience.company}</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleEdit(experience)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setDeleteId(experience.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="font-medium">Location:</span> {experience.location || 'N/A'}
                    </p>
                    <p>
                      <span className="font-medium">Period:</span> {experience.startDate} -{' '}
                      {experience.isCurrent ? 'Present' : experience.endDate}
                    </p>
                    <p>
                      <span className="font-medium">Display Order:</span> {experience.displayOrder}
                    </p>
                    <div>
                      <span className="font-medium">Technologies:</span>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {experience.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-primary/10 text-primary rounded text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="font-medium">Description:</span>
                      <ul className="list-disc list-inside mt-1 space-y-1">
                        {experience.description.map((desc, idx) => (
                          <li key={idx}>{desc}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <ExperienceDialog
          open={isDialogOpen}
          onClose={handleCloseDialog}
          experience={editingExperience}
          onSuccess={handleSuccess}
        />

        <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this experience.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => deleteId && deleteMutation.mutate(deleteId)}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
