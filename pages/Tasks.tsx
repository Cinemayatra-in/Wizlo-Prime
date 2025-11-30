import React from 'react';
import { useUser } from '../context/UserContext';
import { CheckCircle, Circle, Zap } from 'lucide-react';
import { AdBanner } from '../components/AdBanner';

export const Tasks: React.FC = () => {
  const { tasks } = useUser();

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Daily Challenges</h1>
        <p className="text-gray-500 mb-8">Complete these to earn extra XP and rewards.</p>

        <div className="space-y-4">
          {tasks.map((task) => (
            <div 
              key={task.id} 
              className={`flex items-center p-4 bg-white rounded-xl border transition-all ${
                task.isCompleted ? 'border-green-200 bg-green-50' : 'border-gray-200'
              }`}
            >
              <div className="mr-4">
                {task.isCompleted ? (
                  <CheckCircle className="text-green-500 h-8 w-8" />
                ) : (
                  <Circle className="text-gray-300 h-8 w-8" />
                )}
              </div>
              <div className="flex-1">
                <h3 className={`font-bold ${task.isCompleted ? 'text-green-800' : 'text-gray-900'}`}>
                  {task.title}
                </h3>
                <p className="text-sm text-gray-500">{task.description}</p>
              </div>
              <div className="flex items-center text-orange-500 font-bold bg-orange-50 px-3 py-1 rounded-full text-xs">
                 <Zap size={14} className="mr-1" fill="currentColor" /> {task.xpReward} XP
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12">
           <AdBanner slotId="tasks_bottom" width={320} height={50} placement="content" />
        </div>
      </div>
    </div>
  );
};