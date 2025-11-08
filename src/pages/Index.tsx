import { CheckSquare, BookOpen, Target, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { StatsCard } from '@/components/Dashboard/StatsCard';
import { ProgressRing } from '@/components/Dashboard/ProgressRing';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Task, DailyGoal } from '@/types';
import { useState } from 'react';
import { format } from 'date-fns';

const Index = () => {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);
  const [dailyGoals, setDailyGoals] = useLocalStorage<DailyGoal[]>('dailyGoals', []);
  const [newGoal, setNewGoal] = useState('');

  const today = format(new Date(), 'yyyy-MM-dd');
  const todayGoals = dailyGoals.filter(g => g.date === today);
  
  const completedTasks = tasks.filter(t => t.completed).length;
  const totalTasks = tasks.length;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const addDailyGoal = () => {
    if (newGoal.trim()) {
      const goal: DailyGoal = {
        id: Date.now().toString(),
        goal: newGoal,
        completed: false,
        date: today,
      };
      setDailyGoals([...dailyGoals, goal]);
      setNewGoal('');
    }
  };

  const toggleGoal = (id: string) => {
    setDailyGoals(dailyGoals.map(g => 
      g.id === id ? { ...g, completed: !g.completed } : g
    ));
  };

  const upcomingTasks = tasks
    .filter(t => !t.completed && t.dueDate)
    .sort((a, b) => (a.dueDate! > b.dueDate! ? 1 : -1))
    .slice(0, 5);

  return (
    <div className="min-h-screen pb-20 md:pb-8">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Welcome back! 👋</h1>
          <p className="text-muted-foreground">Let's make today productive</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard
            title="Total Tasks"
            value={totalTasks}
            icon={CheckSquare}
            gradient="gradient-primary"
          />
          <StatsCard
            title="Completed"
            value={completedTasks}
            icon={Target}
            gradient="gradient-success"
          />
          <StatsCard
            title="Notes"
            value={0}
            icon={BookOpen}
            gradient="bg-secondary"
          />
          <StatsCard
            title="Study Hours"
            value="0h"
            icon={TrendingUp}
            gradient="bg-accent"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 card-shadow lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Today's Progress</h2>
            <div className="flex items-center justify-center py-8">
              <ProgressRing progress={progress} />
            </div>
            <div className="text-center mt-4">
              <p className="text-sm text-muted-foreground">
                {completedTasks} of {totalTasks} tasks completed
              </p>
            </div>
          </Card>

          <Card className="p-6 card-shadow">
            <h2 className="text-xl font-semibold mb-4">Daily Goals</h2>
            <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
              {todayGoals.map(goal => (
                <div key={goal.id} className="flex items-center gap-2">
                  <Checkbox
                    checked={goal.completed}
                    onCheckedChange={() => toggleGoal(goal.id)}
                  />
                  <span className={goal.completed ? 'line-through text-muted-foreground' : ''}>
                    {goal.goal}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Add a daily goal..."
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addDailyGoal()}
              />
              <Button onClick={addDailyGoal} size="sm">Add</Button>
            </div>
          </Card>
        </div>

        <Card className="p-6 card-shadow">
          <h2 className="text-xl font-semibold mb-4">Upcoming Tasks</h2>
          {upcomingTasks.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No upcoming tasks. Great job! 🎉
            </p>
          ) : (
            <div className="space-y-3">
              {upcomingTasks.map(task => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-4 bg-muted/30 rounded-lg"
                >
                  <div>
                    <p className="font-medium">{task.title}</p>
                    {task.dueDate && (
                      <p className="text-sm text-muted-foreground">
                        Due: {format(new Date(task.dueDate), 'MMM dd, yyyy')}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Index;
