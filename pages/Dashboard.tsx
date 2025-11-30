import React from 'react';
import { useUser } from '../context/UserContext';
import { Trophy, Flame, BarChart3, Star } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { progress, currentLevel, nextLevelXp } = useUser();

  const xpProgress = ((progress.xp % 500) / 500) * 100;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Your Progress</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
              <div className="p-3 bg-yellow-100 text-yellow-600 rounded-full mb-3">
                 <Trophy size={24} />
              </div>
              <p className="text-gray-500 text-sm">Current Level</p>
              <p className="text-2xl font-bold text-gray-900">{currentLevel}</p>
           </div>
           
           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
              <div className="p-3 bg-orange-100 text-orange-600 rounded-full mb-3">
                 <Flame size={24} fill="currentColor" />
              </div>
              <p className="text-gray-500 text-sm">Day Streak</p>
              <p className="text-2xl font-bold text-gray-900">{progress.streak}</p>
           </div>

           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-full mb-3">
                 <BarChart3 size={24} />
              </div>
              <p className="text-gray-500 text-sm">Total XP</p>
              <p className="text-2xl font-bold text-gray-900">{progress.xp}</p>
           </div>

           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
              <div className="p-3 bg-purple-100 text-purple-600 rounded-full mb-3">
                 <Star size={24} />
              </div>
              <p className="text-gray-500 text-sm">Sentences Learned</p>
              <p className="text-2xl font-bold text-gray-900">{progress.learnedSentences.length}</p>
           </div>
        </div>

        {/* Level Progress */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 mb-8">
           <div className="flex justify-between items-end mb-2">
              <h3 className="font-bold text-lg">Level {currentLevel}</h3>
              <span className="text-sm text-gray-500">{progress.xp} / {nextLevelXp} XP</span>
           </div>
           <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
              <div className="bg-yellow-500 h-full rounded-full transition-all" style={{ width: `${xpProgress}%` }}></div>
           </div>
           <p className="text-xs text-gray-400 mt-2 text-right">Reach {nextLevelXp} XP to level up!</p>
        </div>

        {/* Achievements Placeholder */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
           <h3 className="font-bold text-lg mb-4">Achievements</h3>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-3 border border-gray-100 rounded-lg opacity-50">
                 <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                 <div>
                    <p className="font-bold text-sm text-gray-800">Early Bird</p>
                    <p className="text-xs text-gray-500">Learn before 8 AM</p>
                 </div>
              </div>
              <div className={`flex items-center gap-3 p-3 border rounded-lg ${progress.streak >= 7 ? 'border-orange-200 bg-orange-50' : 'border-gray-100 opacity-50'}`}>
                 <div className={`w-10 h-10 rounded-full flex items-center justify-center ${progress.streak >= 7 ? 'bg-orange-100 text-orange-600' : 'bg-gray-200'}`}>
                    <Flame size={20} />
                 </div>
                 <div>
                    <p className="font-bold text-sm text-gray-800">Week Warrior</p>
                    <p className="text-xs text-gray-500">7 day streak</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};