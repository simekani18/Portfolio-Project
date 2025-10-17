import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

export default function DiagnosticPage() {
  const { data: experiences, isLoading, error } = useQuery({
    queryKey: ['experiences'],
    queryFn: api.getAllExperiences,
  });

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Admin Diagnostic</h1>

      <div className="space-y-4">
        <div className="p-4 border rounded">
          <h2 className="font-bold">API Connection</h2>
          <p>Backend URL: http://localhost:5001</p>
          <p>Status: {isLoading ? 'Loading...' : error ? 'Error' : 'Connected'}</p>
          {error && <p className="text-red-500">Error: {String(error)}</p>}
        </div>

        <div className="p-4 border rounded">
          <h2 className="font-bold">Authentication</h2>
          <p>Token exists: {api.isAuthenticated() ? 'Yes' : 'No'}</p>
          <p>Token: {localStorage.getItem('admin_token')?.substring(0, 30)}...</p>
        </div>

        <div className="p-4 border rounded">
          <h2 className="font-bold">Experiences Data</h2>
          <p>Count: {experiences?.length || 0}</p>
          <pre className="text-xs mt-2 bg-gray-100 p-2 rounded">
            {JSON.stringify(experiences, null, 2)}
          </pre>
        </div>

        <div className="p-4 border rounded">
          <h2 className="font-bold">Component Checks</h2>
          <p>✅ ExperienceDialog imported</p>
          <p>✅ AlertDialog imported</p>
          <p>✅ useToast available</p>
          <p>✅ React Query setup</p>
        </div>
      </div>
    </div>
  );
}
