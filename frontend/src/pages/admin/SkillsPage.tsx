import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '@/lib/api';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function SkillsPage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!api.isAuthenticated()) {
      navigate('/admin/login');
    }
  }, [navigate]);

  return (
    <AdminLayout>
      <div>
        <h1 className="text-3xl font-bold mb-2">Technical Skills</h1>
        <p className="text-muted-foreground mb-8">
          Manage your technical skills and proficiency levels
        </p>

        <Card>
          <CardHeader>
            <CardTitle>Coming Soon</CardTitle>
            <CardDescription>Skills management functionality will be added here</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              This section will allow you to manage:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-sm text-muted-foreground">
              <li>Skill name and proficiency level (0-100%)</li>
              <li>Skill category (Languages, Frameworks, Databases, Cloud, DevOps)</li>
              <li>Display order</li>
              <li>Add, edit, and delete skills</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
