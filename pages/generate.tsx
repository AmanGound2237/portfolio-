import { useEffect, useState } from 'react';
import { openai } from '../utils/openai';

export default function Generate() {
  const [portfolio, setPortfolio] = useState('');
  const formData = typeof window !== 'undefined' ? localStorage.getItem('formData') : null;

  useEffect(() => {
    async function generate() {
      if (!formData) return;
      const parsed = JSON.parse(formData);
      const prompt = `
Create a personal portfolio HTML for:
- Name: ${parsed.name}
- Bio: ${parsed.bio}
- Skills: ${parsed.skills}
- Projects: ${parsed.projects}

Structure it with "About Me", "Skills", and "Projects" sections. Make it look neat in plain HTML.
      `;

      const res = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt,
        max_tokens: 1500,
      });

      setPortfolio(res.data.choices[0].text || '');
    }

    generate();
  }, []);

  return (
    <div className="min-h-screen bg-white p-6">
      <h1 className="text-2xl font-bold mb-4">Your AI-Generated Portfolio</h1>
      <div className="bg-gray-100 p-4 whitespace-pre-wrap font-mono rounded shadow overflow-auto max-h-[80vh]">
        {portfolio ? portfolio : 'Generating...'}
      </div>
    </div>
  );
}
