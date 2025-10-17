import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';

export default function DebugPage() {
  const { data: experiences, isLoading, error } = useQuery({
    queryKey: ['experiences'],
    queryFn: api.getAllExperiences,
  });

  const testEdit = (exp: any) => {
    alert(`Edit clicked for: ${exp.company}\nID: ${exp.id}`);
  };

  const testDelete = (id: string) => {
    alert(`Delete clicked for ID: ${id}`);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Debug Page</h1>

      <div className="mb-4 p-4 bg-gray-100 rounded">
        <p>Loading: {String(isLoading)}</p>
        <p>Error: {error ? String(error) : 'none'}</p>
        <p>Experience count: {experiences?.length || 0}</p>
      </div>

      {experiences?.map((exp) => (
        <div key={exp.id} className="mb-4 p-4 border rounded">
          <h3 className="font-bold">{exp.title}</h3>
          <p>{exp.company}</p>
          <div className="mt-2 flex gap-2">
            <Button onClick={() => testEdit(exp)}>
              Edit
            </Button>
            <Button onClick={() => testDelete(exp.id)} variant="destructive">
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
