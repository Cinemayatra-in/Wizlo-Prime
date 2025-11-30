export interface Sentence {
  id: number;
  english: string;
  spanish: string;
  category: string;
}

export interface UserProgress {
  xp: number;
  level: number;
  streak: number;
  learnedSentences: number[]; // Array of Sentence IDs
  lastLoginDate: string;
  completedTasks: string[];
}

export interface DailyTask {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  isCompleted: boolean;
  type: 'learning' | 'game' | 'listening';
}

export enum GameType {
  MATCH = 'MATCH',
  BUILDER = 'BUILDER',
  LISTENING = 'LISTENING'
}

export interface AdConfig {
  slotId: string;
  width: number;
  height: number;
  placement: 'header' | 'content' | 'footer';
}