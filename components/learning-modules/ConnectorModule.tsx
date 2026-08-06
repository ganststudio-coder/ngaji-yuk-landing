import React from 'react';
import { LetterConnectorCard } from './LetterConnectorCard';

const examples = [
  {
    title: "Contoh 1: Qaf-Tho-Ba",
    letters: ["ق", "ط", "ب"],
    connected: "قَطْبٌ",
    description: "Analisis: Qaf di awal, Tho di tengah, Ba di akhir. Terdapat hukum Qolqolah pada huruf Tho (sukun)."
  },
  {
    title: "Contoh 2: Mad Dasar",
    letters: ["م", "د", "ا", "ر", "س"],
    connected: "مَدَارِسُ",
    description: "Analisis: Huruf Dal, Alif, Ra tidak dapat disambung ke setelahnya."
  },
  {
    title: "Contoh 3: Sukun & Mad",
    letters: ["ج", "د", "ي", "د"],
    connected: "جَدِيْدٌ",
    description: "Analisis: Penekanan pada Mad Ya dan tanwin di akhir."
  }
];

export const ConnectorModule: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {examples.map((ex, i) => (
        <LetterConnectorCard key={i} {...ex} />
      ))}
    </div>
  );
};
