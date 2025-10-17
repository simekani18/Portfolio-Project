import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '@/lib/api';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function BlogPage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!api.isAuthenticated()) {
      navigate('/admin/login');
    }
  }, [navigate]);

  return (
    <AdminLayout>
      <div>
        <h1 className="text-3xl font-bold mb-2">Blog Posts</h1>
        <p className="text-muted-foreground mb-8">
          Manage your blog posts and articles
        </p>

        <Card>
          <CardHeader>
            <CardTitle>Coming Soon</CardTitle>
            <CardDescription>Blog post management functionality will be added here</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              This section will allow you to manage:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-sm text-muted-foreground">
              <li>Post title and thumbnail (emoji or image)</li>
              <li>Publication date</li>
              <li>Summary and full content</li>
              <li>URL slug for SEO</li>
              <li>Published/draft status</li>
              <li>Add, edit, and delete blog posts</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
