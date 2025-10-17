import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '@/lib/api';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ProjectsPage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!api.isAuthenticated()) {
      navigate('/admin/login');
    }
  }, [navigate]);

  return (
    <AdminLayout>
      <div>
        <h1 className="text-3xl font-bold mb-2">Portfolio Projects</h1>
        <p className="text-muted-foreground mb-8">
          Manage your featured portfolio projects
        </p>

        <Card>
          <CardHeader>
            <CardTitle>Coming Soon</CardTitle>
            <CardDescription>Project management functionality will be added here</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              This section will allow you to manage:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-sm text-muted-foreground">
              <li>Project title, emoji, and category</li>
              <li>Project description and key features</li>
              <li>Technology stack</li>
              <li>Demo and details URLs</li>
              <li>Display order</li>
              <li>Add, edit, and delete projects</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
