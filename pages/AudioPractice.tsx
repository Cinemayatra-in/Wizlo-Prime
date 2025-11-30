import React, { useState } from 'react';
import { DAILY_SENTENCES } from '../constants';
import { speak } from '../utils/tts';
import { Play, Pause, SkipForward, Repeat } from 'lucide-react';
import { AdBanner } from '../components/AdBanner';

export const AudioPractice: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isLooping, setIsLooping] = useState(false);

  const currentSentence = DAILY_SENTENCES[currentIndex];

  const handlePlayCurrent = () => {
    setIsPlaying(true);
    // Play Spanish first, then English (Learning Mode)
    speak(currentSentence.spanish, 'es', playbackSpeed);
    
    // Rough estimation of duration to toggle UI or chain next
    // In a real app with audio files, we'd use onEnded events.
    setTimeout(() => {
        setIsPlaying(false);
        if (isLooping) {
            setTimeout(handlePlayCurrent, 1000);
        }
    }, 2500);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % DAILY_SENTENCES.length);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
        {/* Decorative BG */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600 rounded-full blur-3xl opacity-20"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-20"></div>
        </div>

        <div className="z-10 w-full max-w-md">
            <h2 className="text-center text-gray-400 text-sm tracking-widest uppercase mb-8">Audio Mode</h2>

            {/* Card */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 mb-8 text-center shadow-2xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2 text-white">{currentSentence.spanish}</h1>
                    <p className="text-xl text-indigo-300">{currentSentence.english}</p>
                </div>
                
                {/* Visualizer Placeholder */}
                <div className="flex items-center justify-center gap-1 h-12 mb-4">
                    {[...Array(10)].map((_, i) => (
                        <div 
                            key={i} 
                            className={`w-1 bg-white/50 rounded-full transition-all duration-300 ${isPlaying ? 'animate-pulse h-8' : 'h-2'}`}
                            style={{ animationDelay: `${i * 0.1}s` }}
                        ></div>
                    ))}
                </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col items-center gap-6">
                
                <div className="flex items-center gap-6">
                    <button 
                       onClick={() => setIsLooping(!isLooping)}
                       className={`p-3 rounded-full ${isLooping ? 'text-indigo-400 bg-white/10' : 'text-gray-500'}`}
                    >
                        <Repeat size={20} />
                    </button>

                    <button 
                        onClick={handlePlayCurrent}
                        className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center hover:bg-indigo-500 transition-transform hover:scale-105 shadow-lg shadow-indigo-500/50"
                    >
                        {isPlaying ? <Pause fill="white" className="ml-0.5" /> : <Play fill="white" className="ml-1" />}
                    </button>

                    <button onClick={handleNext} className="p-3 text-white hover:text-indigo-300">
                        <SkipForward size={28} />
                    </button>
                </div>

                <div className="flex gap-2">
                    {[0.5, 0.75, 1, 1.25].map(speed => (
                        <button 
                            key={speed}
                            onClick={() => setPlaybackSpeed(speed)}
                            className={`px-3 py-1 rounded text-xs font-bold ${playbackSpeed === speed ? 'bg-white text-gray-900' : 'bg-white/10 text-gray-400'}`}
                        >
                            {speed}x
                        </button>
                    ))}
                </div>

            </div>
            
            <div className="mt-12">
               <AdBanner slotId="audio_player" width={320} height={50} placement="footer" />
            </div>
        </div>
    </div>
  );
};