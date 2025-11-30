
import React, { useState } from 'react';
import { Sentence } from '../types';
import { Volume2, CheckCircle } from 'lucide-react';
import { speak } from '../utils/tts';

interface Props {
  sentence: Sentence;
  isLearned: boolean;
  onMarkLearned: () => void;
  isHighlighted?: boolean;
}

export const SentenceCard: React.FC<Props> = ({ sentence, isLearned, onMarkLearned, isHighlighted }) => {
  const [showSpanish, setShowSpanish] = useState(false);
  const [isPlaying, setIsPlaying] = useState<string | null>(null);

  const handlePlay = (text: string, lang: 'en' | 'es') => {
    setIsPlaying(lang);
    speak(text, lang);
    setTimeout(() => setIsPlaying(null), 1500); // Reset visual state approx
  };

  const containerClasses = `
    relative bg-white rounded-xl shadow-sm border transition-all duration-300
    ${isHighlighted 
      ? 'border-green-500 ring-4 ring-green-100 border-2 z-10 scale-[1.02]' 
      : (isLearned ? 'border-wizlo-200 bg-wizlo-50' : 'border-gray-200 hover:shadow-md')
    }
  `;

  return (
    <div className={containerClasses.trim().replace(/\s+/g, ' ')}>
      <div className="p-6">
        {/* Category Tag */}
        <span className="absolute top-4 right-4 text-xs font-semibold text-gray-400 uppercase tracking-wide bg-gray-100 px-2 py-1 rounded">
          {sentence.category}
        </span>

        {/* English Section */}
        <div className="mb-6">
          <div className="flex items-start gap-4">
             <button 
               onClick={() => handlePlay(sentence.english, 'en')}
               className={`p-2 rounded-full transition-colors ${isPlaying === 'en' ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
               aria-label="Play English"
             >
               <Volume2 size={20} />
             </button>
             <div>
               <h3 className="text-lg font-bold text-gray-900 leading-tight">{sentence.english}</h3>
               <p className="text-xs text-gray-400 mt-1">English</p>
             </div>
          </div>
        </div>

        <div className="h-px bg-gray-100 w-full mb-6"></div>

        {/* Spanish Section (Interaction) */}
        {!showSpanish && !isLearned && !isHighlighted ? (
           <button 
             onClick={() => setShowSpanish(true)}
             className="w-full py-3 bg-gray-50 text-gray-500 font-medium rounded-lg border border-dashed border-gray-300 hover:bg-gray-100 transition-colors"
           >
             Tap to reveal Spanish
           </button>
        ) : (
          <div className="animate-fade-in">
             <div className="flex items-start gap-4">
               <button 
                 onClick={() => handlePlay(sentence.spanish, 'es')}
                 className={`p-2 rounded-full transition-colors ${isPlaying === 'es' ? 'bg-wizlo-100 text-wizlo-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                 aria-label="Play Spanish"
               >
                 <Volume2 size={20} />
               </button>
               <div>
                 <h3 className="text-lg font-bold text-wizlo-700 leading-tight">{sentence.spanish}</h3>
                 <p className="text-xs text-wizlo-400 mt-1">Español</p>
               </div>
             </div>
          </div>
        )}

        {/* Action Footer */}
        <div className="mt-6 flex justify-end">
          {isLearned ? (
            <div className="flex items-center text-wizlo-600 text-sm font-semibold">
              <CheckCircle size={18} className="mr-1" /> Learned
            </div>
          ) : (
            (showSpanish || isHighlighted) && (
              <button
                onClick={onMarkLearned}
                className="flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all active:scale-95 shadow-lg shadow-gray-200"
              >
                Mark as Learned
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};
