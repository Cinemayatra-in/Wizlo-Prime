
import React, { useState, useEffect } from 'react';
import { GameType, Sentence } from '../types';
import { DAILY_SENTENCES } from '../constants';
import { useUser } from '../context/UserContext';
import { Puzzle, RefreshCw, Trophy, ArrowRight, Check, X, RotateCcw } from 'lucide-react';

export const Games: React.FC = () => {
  const [activeGame, setActiveGame] = useState<GameType | null>(null);

  if (activeGame === GameType.MATCH) {
    return <MatchGame onExit={() => setActiveGame(null)} />;
  }

  if (activeGame === GameType.BUILDER) {
    return <WordBuilderGame onExit={() => setActiveGame(null)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Learning Games</h1>
        <p className="text-gray-500 mb-8">Boost your memory and earn XP with fun challenges.</p>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Game Card 1 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-32 bg-indigo-500 flex items-center justify-center">
              <Puzzle className="text-white h-12 w-12" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Sentence Match</h3>
              <p className="text-gray-600 mb-6 text-sm">Read the English sentence and quickly select the correct Spanish translation.</p>
              <button 
                onClick={() => setActiveGame(GameType.MATCH)}
                className="w-full py-3 bg-gray-900 text-white font-bold rounded-lg hover:bg-gray-800 transition-colors"
              >
                Play Now
              </button>
            </div>
          </div>

          {/* Game Card 2 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-32 bg-orange-400 flex items-center justify-center">
              <RefreshCw className="text-white h-12 w-12" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Word Builder</h3>
              <p className="text-gray-600 mb-6 text-sm">Tap the words in the correct order to construct the Spanish sentence.</p>
              <button 
                onClick={() => setActiveGame(GameType.BUILDER)}
                className="w-full py-3 bg-gray-900 text-white font-bold rounded-lg hover:bg-gray-800 transition-colors"
              >
                Play Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Sub Component: Match Game Logic ---

const MatchGame: React.FC<{ onExit: () => void }> = ({ onExit }) => {
  const { addXp, completeTask } = useUser();
  const [currentRound, setCurrentRound] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [questions, setQuestions] = useState<{ target: Sentence; options: Sentence[] }[]>([]);

  // Initialize Game
  useEffect(() => {
    const shuffled = [...DAILY_SENTENCES].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 5); // 5 rounds
    
    const q = selected.map(target => {
      // Get 3 distractors
      const distractors = DAILY_SENTENCES
        .filter(s => s.id !== target.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
      const options = [...distractors, target].sort(() => 0.5 - Math.random());
      return { target, options };
    });

    setQuestions(q);
  }, []);

  const handleAnswer = (selectedId: number) => {
    const isCorrect = selectedId === questions[currentRound].target.id;
    if (isCorrect) setScore(s => s + 1);

    if (currentRound < questions.length - 1) {
      setCurrentRound(prev => prev + 1);
    } else {
      setGameOver(true);
      if (score > 3) {
        addXp(50);
        completeTask('task_2');
      }
    }
  };

  if (questions.length === 0) return <div>Loading...</div>;

  if (gameOver) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full">
          <Trophy className="mx-auto h-16 w-16 text-yellow-500 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Game Over!</h2>
          <p className="text-gray-600 mb-6">You scored {score} out of {questions.length}</p>
          <div className="space-y-3">
             <button onClick={onExit} className="w-full py-3 bg-indigo-600 text-white rounded-lg font-bold">Back to Games</button>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentRound];

  return (
    <div className="min-h-screen bg-indigo-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="flex justify-between items-center mb-6">
          <span className="text-indigo-900 font-bold">Round {currentRound + 1}/{questions.length}</span>
          <button onClick={onExit} className="text-gray-500 hover:text-gray-800">Exit</button>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6 text-center">
          <p className="text-sm text-gray-400 uppercase tracking-wide font-bold mb-2">Translate this</p>
          <h2 className="text-2xl font-bold text-gray-900">{currentQ.target.english}</h2>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {currentQ.options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => handleAnswer(opt.id)}
              className="p-4 bg-white border-2 border-transparent hover:border-indigo-500 rounded-xl shadow-sm text-left transition-all hover:shadow-md font-medium text-gray-700"
            >
              {opt.spanish}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Sub Component: Word Builder Game Logic ---

interface WordToken {
    id: string;
    text: string;
}

const WordBuilderGame: React.FC<{ onExit: () => void }> = ({ onExit }) => {
    const { addXp } = useUser();
    const [round, setRound] = useState(0);
    const [score, setScore] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);
    
    // Game Data
    const [questions, setQuestions] = useState<Sentence[]>([]);
    
    // Round State
    const [availableWords, setAvailableWords] = useState<WordToken[]>([]);
    const [selectedWords, setSelectedWords] = useState<WordToken[]>([]);
    const [status, setStatus] = useState<'playing' | 'correct' | 'incorrect'>('playing');

    // Init
    useEffect(() => {
        const shuffled = [...DAILY_SENTENCES].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 5);
        setQuestions(selected);
    }, []);

    // Setup Round
    useEffect(() => {
        if (questions.length > 0 && round < questions.length) {
            const target = questions[round];
            // Simple split by space. Keeps punctuation attached to word (e.g. "Hola." -> ["Hola."])
            const words = target.spanish.split(' ').map((text, idx) => ({
                id: `${round}-${idx}-${text}`,
                text
            }));
            
            // Shuffle
            const shuffled = [...words].sort(() => 0.5 - Math.random());
            
            setAvailableWords(shuffled);
            setSelectedWords([]);
            setStatus('playing');
        } else if (questions.length > 0 && round >= questions.length) {
            setIsGameOver(true);
            if (score >= 4) { // High score bonus
                 addXp(50);
            }
        }
    }, [questions, round]);

    const handleWordSelect = (word: WordToken) => {
        if (status !== 'playing') return;
        setAvailableWords(prev => prev.filter(w => w.id !== word.id));
        setSelectedWords(prev => [...prev, word]);
    };

    const handleWordDeselect = (word: WordToken) => {
        if (status !== 'playing') return;
        setSelectedWords(prev => prev.filter(w => w.id !== word.id));
        setAvailableWords(prev => [...prev, word]);
    };

    const checkAnswer = () => {
        const currentSentence = selectedWords.map(w => w.text).join(' ');
        const targetSentence = questions[round].spanish;
        
        if (currentSentence === targetSentence) {
            setStatus('correct');
            setScore(s => s + 1);
            addXp(10); // XP per sentence
        } else {
            setStatus('incorrect');
        }
    };

    const nextRound = () => {
        setRound(r => r + 1);
    };

    const retryRound = () => {
        // Reset tokens for this round
        const target = questions[round];
        const words = target.spanish.split(' ').map((text, idx) => ({
             id: `${round}-${idx}-${text}`,
             text
        }));
        setAvailableWords(words.sort(() => 0.5 - Math.random()));
        setSelectedWords([]);
        setStatus('playing');
    };

    if (questions.length === 0) return <div>Loading...</div>;

    if (isGameOver) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
                <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full">
                  <Trophy className="mx-auto h-16 w-16 text-yellow-500 mb-4" />
                  <h2 className="text-2xl font-bold mb-2">Well Done!</h2>
                  <p className="text-gray-600 mb-6">You got {score} out of {questions.length} correct.</p>
                  <button onClick={onExit} className="w-full py-3 bg-gray-900 text-white rounded-lg font-bold">Back to Games</button>
                </div>
            </div>
        );
    }

    const currentQ = questions[round];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col p-4">
            <div className="max-w-2xl mx-auto w-full flex-1 flex flex-col">
                
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-2">
                        <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-bold">
                            {round + 1} / {questions.length}
                        </span>
                        <span className="text-sm text-gray-500">Score: {score}</span>
                    </div>
                    <button onClick={onExit} className="text-gray-400 hover:text-gray-600">
                        <X />
                    </button>
                </div>

                {/* Question */}
                <div className="mb-8">
                    <h2 className="text-xl text-gray-500 font-medium mb-2">Translate this sentence:</h2>
                    <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
                        <div className="flex items-center gap-3">
                             <span className="text-2xl font-bold text-gray-900">{currentQ.english}</span>
                        </div>
                    </div>
                </div>

                {/* Building Area */}
                <div className="min-h-[140px] bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 p-4 mb-8 flex flex-wrap content-start gap-2 relative">
                     {selectedWords.length === 0 && (
                         <div className="absolute inset-0 flex items-center justify-center text-gray-400 pointer-events-none">
                             Tap words below to build the sentence
                         </div>
                     )}
                     {selectedWords.map((word) => (
                         <button
                            key={word.id}
                            onClick={() => handleWordDeselect(word)}
                            disabled={status !== 'playing'}
                            className="bg-white border border-gray-200 shadow-sm px-4 py-2 rounded-lg font-bold text-gray-800 hover:bg-red-50 hover:border-red-200 transition-colors animate-fade-in"
                         >
                            {word.text}
                         </button>
                     ))}
                </div>

                {/* Available Words */}
                <div className="flex flex-wrap justify-center gap-3 mb-auto">
                    {availableWords.map((word) => (
                        <button
                           key={word.id}
                           onClick={() => handleWordSelect(word)}
                           className="bg-white border border-gray-200 shadow-sm px-4 py-3 rounded-xl font-bold text-gray-800 hover:shadow-md hover:-translate-y-0.5 transition-all active:scale-95"
                        >
                           {word.text}
                        </button>
                    ))}
                </div>

                {/* Feedback / Controls */}
                <div className="mt-8">
                    {status === 'playing' ? (
                        <button 
                            onClick={checkAnswer}
                            disabled={selectedWords.length === 0}
                            className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all ${
                                selectedWords.length > 0 
                                ? 'bg-green-500 hover:bg-green-600 text-white transform hover:-translate-y-1' 
                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            }`}
                        >
                            Check Answer
                        </button>
                    ) : (
                        <div className={`rounded-xl p-4 mb-4 ${status === 'correct' ? 'bg-green-100 border border-green-200' : 'bg-red-100 border border-red-200'}`}>
                             <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    {status === 'correct' ? (
                                        <>
                                            <div className="p-2 bg-green-500 rounded-full text-white"><Check size={20} /></div>
                                            <span className="font-bold text-green-800 text-lg">Correct!</span>
                                        </>
                                    ) : (
                                        <>
                                            <div className="p-2 bg-red-500 rounded-full text-white"><X size={20} /></div>
                                            <div>
                                                <span className="font-bold text-red-800 text-lg">Incorrect</span>
                                                <p className="text-red-600 text-sm">Correct answer: <strong>{currentQ.spanish}</strong></p>
                                            </div>
                                        </>
                                    )}
                                </div>
                             </div>
                             
                             {status === 'correct' ? (
                                 <button onClick={nextRound} className="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700">
                                     Next Sentence <ArrowRight className="inline ml-1" size={18} />
                                 </button>
                             ) : (
                                <div className="flex gap-3">
                                    <button onClick={retryRound} className="flex-1 py-3 bg-white text-gray-700 font-bold rounded-lg border border-gray-300 hover:bg-gray-50">
                                        <RotateCcw className="inline mr-1" size={18} /> Try Again
                                    </button>
                                    <button onClick={nextRound} className="flex-1 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700">
                                        Skip
                                    </button>
                                </div>
                             )}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};
