import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, User, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!api.isAuthenticated()) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const { data: experiences } = useQuery({
    queryKey: ['experiences'],
    queryFn: api.getAllExperiences,
  });

  const stats = [
    {
      title: 'Work Experiences',
      value: experiences?.length || 0,
      description: 'Total experiences added',
      icon: Briefcase,
      link: '/admin/experiences',
    },
    {
      title: 'Profile Status',
      value: 'Active',
      description: 'Profile is published',
      icon: User,
      link: '/admin/profile',
    },
    {
      title: 'Latest Update',
      value: new Date().toLocaleDateString(),
      description: 'Last profile update',
      icon: TrendingUp,
      link: '/admin/profile',
    },
  ];

  return (
    <AdminLayout>
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground mb-8">
          Welcome back! Here's an overview of your portfolio.
        </p>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          {stats.map((stat) => (
            <Card
              key={stat.title}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => navigate(stat.link)}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <button
                onClick={() => navigate('/admin/experiences')}
                className="w-full text-left px-4 py-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="font-medium">Manage Experiences</div>
                <div className="text-sm text-muted-foreground">
                  Add, edit, or delete work experiences
                </div>
              </button>
              <button
                onClick={() => navigate('/admin/profile')}
                className="w-full text-left px-4 py-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="font-medium">Update Profile</div>
                <div className="text-sm text-muted-foreground">
                  Edit your personal information
                </div>
              </button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest changes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-sm">
                  <div className="font-medium">Profile Updated</div>
                  <div className="text-muted-foreground">
                    {new Date().toLocaleDateString()}
                  </div>
                </div>
                <div className="text-sm">
                  <div className="font-medium">{experiences?.length || 0} Experiences</div>
                  <div className="text-muted-foreground">Currently published</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
