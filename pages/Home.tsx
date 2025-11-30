import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, PlayCircle, Target, BookOpen } from 'lucide-react';
import { AdBanner } from '../components/AdBanner';
import { useUser } from '../context/UserContext';

export const Home: React.FC = () => {
  const { progress } = useUser();
  const learnedCount = progress.learnedSentences.length;

  return (
    <div className="flex flex-col min-h-screen">
       {/* Top Ad */}
       <div className="bg-white pb-2">
         <AdBanner slotId="home_top" width={728} height={90} placement="header" />
       </div>

       {/* Hero */}
       <section className="bg-indigo-600 text-white pt-12 pb-16 px-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Master Spanish, <span className="text-indigo-200">One Day at a Time.</span>
            </h1>
            <p className="text-lg md:text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
              Learn through English with daily games, realistic audio, and smart tasks.
            </p>
            <Link 
              to="/daily" 
              className="inline-flex items-center px-8 py-4 bg-white text-indigo-600 font-bold rounded-full shadow-lg hover:shadow-xl hover:bg-indigo-50 transition-all transform hover:-translate-y-1"
            >
              Start Learning Today <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
       </section>

       {/* Quick Dashboard */}
       <div className="max-w-6xl mx-auto px-4 -mt-10 relative z-20">
         <div className="bg-white rounded-xl shadow-xl p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 text-green-600 rounded-lg">
                <Target size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Daily Goal</p>
                <p className="font-bold text-gray-900">150 Sentences</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                <BookOpen size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Learned</p>
                <p className="font-bold text-gray-900">{learnedCount} Sentences</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
                <PlayCircle size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Next Task</p>
                <Link to="/tasks" className="text-sm font-bold text-indigo-600 hover:underline">View Daily Tasks</Link>
              </div>
            </div>
         </div>
       </div>

       {/* Features */}
       <section className="py-16 max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
             <div>
               <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Wizlo?</h2>
               <div className="space-y-6">
                 <div className="flex gap-4">
                   <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold">1</div>
                   <div>
                     <h3 className="font-bold text-lg">No Repetitions</h3>
                     <p className="text-gray-600">Fresh content generated daily. Never get bored with the same old "The cat eats the apple."</p>
                   </div>
                 </div>
                 <div className="flex gap-4">
                   <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 font-bold">2</div>
                   <div>
                     <h3 className="font-bold text-lg">Gamified Learning</h3>
                     <p className="text-gray-600">Earn XP, keep your streak alive, and climb the leaderboard by playing translation games.</p>
                   </div>
                 </div>
                 <div className="flex gap-4">
                   <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 font-bold">3</div>
                   <div>
                     <h3 className="font-bold text-lg">Audio First</h3>
                     <p className="text-gray-600">Train your ear with realistic English to Spanish audio playback for every sentence.</p>
                   </div>
                 </div>
               </div>
             </div>
             
             {/* Mini Game Teaser */}
             <div className="bg-gray-900 rounded-2xl p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 rounded-full blur-3xl opacity-50"></div>
                <h3 className="text-xl font-bold mb-4">Quick Challenge</h3>
                <div className="bg-white/10 p-4 rounded-lg mb-4 backdrop-blur-sm">
                   <p className="text-sm text-gray-300 mb-1">Translate:</p>
                   <p className="text-lg font-bold">I need a taxi.</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                   <button className="bg-indigo-600 hover:bg-indigo-500 py-2 rounded text-sm font-medium transition">Necesito un taxi</button>
                   <button className="bg-gray-700 hover:bg-gray-600 py-2 rounded text-sm font-medium transition">Quiero agua</button>
                </div>
                <div className="mt-6 text-center">
                   <Link to="/games" className="text-sm text-indigo-300 hover:text-white font-medium">Play full games →</Link>
                </div>
             </div>
          </div>
       </section>

       <div className="mt-auto pb-8">
         <AdBanner slotId="home_bottom" width={320} height={50} placement="footer" />
       </div>
    </div>
  );
};