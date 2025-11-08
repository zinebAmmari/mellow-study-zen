import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const WORK_TIME = 25 * 60;
const BREAK_TIME = 5 * 60;

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(WORK_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [isWorkSession, setIsWorkSession] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      const nextSession = !isWorkSession;
      setIsWorkSession(nextSession);
      setTimeLeft(nextSession ? WORK_TIME : BREAK_TIME);
      
      toast({
        title: nextSession ? 'Break time! 🎉' : 'Time to focus! 💪',
        description: nextSession 
          ? 'Take a short break to recharge.' 
          : "Let's start another productive session!",
      });
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, isWorkSession, toast]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(isWorkSession ? WORK_TIME : BREAK_TIME);
  };

  const switchMode = () => {
    setIsRunning(false);
    const newMode = !isWorkSession;
    setIsWorkSession(newMode);
    setTimeLeft(newMode ? WORK_TIME : BREAK_TIME);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = ((isWorkSession ? WORK_TIME : BREAK_TIME) - timeLeft) / 
                   (isWorkSession ? WORK_TIME : BREAK_TIME) * 100;

  return (
    <div className="min-h-screen pb-20 md:pb-8">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Pomodoro Timer</h1>

        <div className="max-w-2xl mx-auto">
          <Card className="p-12 card-shadow text-center">
            <div className="mb-8">
              <div className="inline-flex gap-2 p-1 bg-muted rounded-lg mb-8">
                <Button
                  variant={isWorkSession ? 'default' : 'ghost'}
                  onClick={switchMode}
                  disabled={isRunning}
                >
                  Focus
                </Button>
                <Button
                  variant={!isWorkSession ? 'default' : 'ghost'}
                  onClick={switchMode}
                  disabled={isRunning}
                >
                  Break
                </Button>
              </div>
            </div>

            <div className="relative mb-12">
              <div className="text-8xl font-bold mb-4">
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary smooth-transition"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <Button size="lg" onClick={toggleTimer}>
                {isRunning ? (
                  <>
                    <Pause className="w-5 h-5 mr-2" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 mr-2" />
                    Start
                  </>
                )}
              </Button>
              <Button size="lg" variant="outline" onClick={resetTimer}>
                <RotateCcw className="w-5 h-5 mr-2" />
                Reset
              </Button>
            </div>

            <p className="text-muted-foreground mt-8">
              {isWorkSession 
                ? 'Focus on your task without distractions' 
                : 'Take a break and relax for a few minutes'}
            </p>
          </Card>

          <Card className="p-6 card-shadow mt-6">
            <h2 className="text-lg font-semibold mb-3">How to use Pomodoro</h2>
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
              <li>Choose a task to focus on</li>
              <li>Start the timer and work for 25 minutes</li>
              <li>Take a 5-minute break when the timer rings</li>
              <li>After 4 pomodoros, take a longer 15-30 minute break</li>
            </ol>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Timer;
