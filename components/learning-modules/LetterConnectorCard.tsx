import React from 'react';

interface LetterConnectorCardProps {
  title: string;
  letters: string[];
  connected: string;
  description: string;
}

export const LetterConnectorCard: React.FC<LetterConnectorCardProps> = ({ title, letters, connected, description }) => {
  return (
    <div className="connector-card bg-white p-6 rounded-lg shadow-md border-t-4 border-green-500">
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <div className="flex items-center justify-center space-x-4 mb-4">
        <div className="flex space-x-2">
          {letters.map((l, i) => (
            <span key={i} className="text-2xl font-arabic bg-gray-100 p-2 rounded">{l}</span>
          ))}
        </div>
        <span className="text-2xl">→</span>
        <span className="text-4xl font-arabic text-green-700">{connected}</span>
      </div>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
};
