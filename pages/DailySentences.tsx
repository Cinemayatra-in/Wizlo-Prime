
import React, { useState, useRef, useEffect } from 'react';
import { DAILY_SENTENCES } from '../constants';
import { SentenceCard } from '../components/SentenceCard';
import { AdBanner } from '../components/AdBanner';
import { useUser } from '../context/UserContext';
import { CheckCheck, Play, Square } from 'lucide-react';
import { speak, cancel } from '../utils/tts';

export const DailySentences: React.FC = () => {
  const { progress, markSentenceLearned } = useUser();
  const [isPlayingAll, setIsPlayingAll] = useState(false);
  const [activeSentenceId, setActiveSentenceId] = useState<number | null>(null);
  const stopPlaybackRef = useRef(false);

  // In a real app, this would filter based on 'today's' batch date
  const todaysSentences = DAILY_SENTENCES; 

  const learnedCount = todaysSentences.filter(s => progress.learnedSentences.includes(s.id)).length;
  const totalSentences = todaysSentences.length;
  const progressPercent = Math.min(100, Math.round((learnedCount / totalSentences) * 100));

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopPlaybackRef.current = true;
      cancel();
    };
  }, []);

  const handlePlayAll = async () => {
    if (isPlayingAll) {
      stopPlaybackRef.current = true;
      cancel();
      setIsPlayingAll(false);
      setActiveSentenceId(null);
      return;
    }

    setIsPlayingAll(true);
    stopPlaybackRef.current = false;

    // Optional: Reset browser audio context or focus if needed
    // Loop through sentences
    for (const sentence of todaysSentences) {
      if (stopPlaybackRef.current) break;
      
      setActiveSentenceId(sentence.id);
      
      // Auto-scroll logic
      const element = document.getElementById(`sentence-${sentence.id}`);
      if (element) {
        const rect = element.getBoundingClientRect();
        const isInView = (
          rect.top >= 80 && // Offset for sticky header
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
        );
        
        if (!isInView) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }

      // Speak English (cancel previous if any)
      await speak(sentence.english, 'en', 1, true);
      
      if (stopPlaybackRef.current) break;
      
      // Short pause
      await new Promise(resolve => setTimeout(resolve, 300));

      if (stopPlaybackRef.current) break;

      // Speak Spanish (do not cancel previous, though previous promise resolved already)
      await speak(sentence.spanish, 'es', 1, false);

      if (stopPlaybackRef.current) break;
      
      // Pause between sentences
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    setIsPlayingAll(false);
    setActiveSentenceId(null);
    stopPlaybackRef.current = false;
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      
      {/* Sticky Sub-header for Progress & Controls */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40 px-4 py-3 shadow-sm">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
          <div className="flex-1">
            <div className="flex justify-between text-sm mb-1 font-medium text-gray-600">
              <span>Daily Goal</span>
              <span>{learnedCount} / {totalSentences}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-wizlo-600 h-2.5 rounded-full transition-all duration-500" 
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>
          
          <button 
            onClick={handlePlayAll} 
            className={`flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full shadow-lg transition-colors ${isPlayingAll ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-wizlo-600 hover:bg-wizlo-700 text-white'}`}
            title={isPlayingAll ? "Stop Autoplay" : "Play All Sentences"}
          >
            {isPlayingAll ? <Square size={16} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Today's Sentences</h1>
          <p className="text-gray-500">Listen, reveal, and mark as learned.</p>
        </div>

        {todaysSentences.map((sentence, index) => (
          <React.Fragment key={sentence.id}>
            <div id={`sentence-${sentence.id}`} className="scroll-mt-32">
              <SentenceCard 
                sentence={sentence} 
                isLearned={progress.learnedSentences.includes(sentence.id)}
                onMarkLearned={() => markSentenceLearned(sentence.id)}
                isHighlighted={activeSentenceId === sentence.id}
              />
            </div>
            
            {/* Insert Ad every 10 sentences */}
            {(index + 1) % 10 === 0 && index !== todaysSentences.length - 1 && (
               <AdBanner slotId={`feed_${index}`} width={320} height={50} placement="content" />
            )}
          </React.Fragment>
        ))}

        {learnedCount >= todaysSentences.length && (
          <div className="bg-green-100 border border-green-200 rounded-xl p-8 text-center">
            <div className="inline-flex p-4 bg-green-200 rounded-full mb-4 text-green-700">
              <CheckCheck size={40} />
            </div>
            <h2 className="text-2xl font-bold text-green-800 mb-2">All Done for Today!</h2>
            <p className="text-green-700 mb-6">You've mastered all available sentences. Come back tomorrow for 150 new ones!</p>
          </div>
        )}

      </div>
    </div>
  );
};
