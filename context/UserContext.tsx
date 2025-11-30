import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProgress, DailyTask } from '../types';
import { INITIAL_TASKS } from '../constants';

interface UserContextType {
  progress: UserProgress;
  tasks: DailyTask[];
  addXp: (amount: number) => void;
  markSentenceLearned: (id: number) => void;
  completeTask: (taskId: string) => void;
  currentLevel: number;
  nextLevelXp: number;
}

const DEFAULT_PROGRESS: UserProgress = {
  xp: 0,
  level: 1,
  streak: 1,
  learnedSentences: [],
  lastLoginDate: new Date().toISOString(),
  completedTasks: []
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('wizlo_progress');
    return saved ? JSON.parse(saved) : DEFAULT_PROGRESS;
  });

  const [tasks, setTasks] = useState<DailyTask[]>(INITIAL_TASKS);

  // Persistence
  useEffect(() => {
    localStorage.setItem('wizlo_progress', JSON.stringify(progress));
  }, [progress]);

  // Check task completion status against progress
  useEffect(() => {
    setTasks(prev => prev.map(t => ({
      ...t,
      isCompleted: progress.completedTasks.includes(t.id)
    })));
  }, [progress.completedTasks]);

  const addXp = (amount: number) => {
    setProgress(prev => ({
      ...prev,
      xp: prev.xp + amount
    }));
  };

  const markSentenceLearned = (id: number) => {
    if (!progress.learnedSentences.includes(id)) {
      setProgress(prev => ({
        ...prev,
        learnedSentences: [...prev.learnedSentences, id]
      }));
      addXp(10); // Hardcoded XP for sentence
      
      // Check for task completion (e.g., learn 5 sentences)
      // Simulating task check logic here for simplicity
      const learnedCount = progress.learnedSentences.length + 1;
      if (learnedCount >= 5 && !progress.completedTasks.includes('task_1')) {
         completeTask('task_1');
      }
    }
  };

  const completeTask = (taskId: string) => {
    if (!progress.completedTasks.includes(taskId)) {
        const task = tasks.find(t => t.id === taskId);
        if (task) {
            addXp(task.xpReward);
            setProgress(prev => ({
                ...prev,
                completedTasks: [...prev.completedTasks, taskId]
            }));
        }
    }
  };

  const currentLevel = Math.floor(progress.xp / 500) + 1;
  const nextLevelXp = currentLevel * 500;

  return (
    <UserContext.Provider value={{ 
      progress, 
      tasks, 
      addXp, 
      markSentenceLearned, 
      completeTask,
      currentLevel,
      nextLevelXp
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
};