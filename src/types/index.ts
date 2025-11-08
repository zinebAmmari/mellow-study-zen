export type Priority = 'high' | 'medium' | 'low';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: Priority;
  dueDate?: string;
  category?: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  subject: string;
  createdAt: string;
  updatedAt: string;
}

export interface StickyNote {
  id: string;
  content: string;
  color: string;
  position: { x: number; y: number };
}

export interface DailyGoal {
  id: string;
  goal: string;
  completed: boolean;
  date: string;
}
