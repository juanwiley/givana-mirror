'use client';
import { useEffect, useState } from 'react';

export default function CharityPanel({ ein }) {
  const [charity, setCharity] = useState(null);

  useEffect(() => {
    fetch(`https://api.every.org/v0/nonprofit/${ein}`)
      .then(res => res.json())
      .then(data => setCharity(data.nonprofit));
  }, [ein]);

  if (!charity) return null;

  return (
    <div className="border p-4 rounded bg-white shadow">
      <div className="flex items-center space-x-4">
        {charity.logoUrl && <img src={charity.logoUrl} alt={charity.name} className="h-12" />}
        <div>
          <h2 className="font-semibold text-lg">{charity.name}</h2>
          <p className="text-sm text-gray-600">{charity.description}</p>
          <a
            href={charity.donationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 underline mt-2 inline-block"
          >
            Donate
          </a>
        </div>
      </div>
    </div>
  );
}
