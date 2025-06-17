import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Home() {
  const [form, setForm] = useState({ name: '', bio: '', skills: '', projects: '' });
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    localStorage.setItem('formData', JSON.stringify(form));
    router.push('/generate');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-6">AI Portfolio Generator</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded-xl shadow space-y-4">
        {['name', 'bio', 'skills', 'projects'].map((key) => (
          <div key={key}>
            <label className="block font-semibold capitalize">{key}</label>
            <textarea
              required
              className="w-full p-2 border rounded"
              rows={key === 'projects' ? 4 : 2}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            />
          </div>
        ))}
        <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
          Generate Portfolio
        </button>
      </form>
    </div>
  );
}
