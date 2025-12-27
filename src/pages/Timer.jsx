

import { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const WORK_TIME = 25 * 60;
const BREAK_TIME = 5 * 60;

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(WORK_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [isWorkSession, setIsWorkSession] = useState(true);
  const [sessionElapsed, setSessionElapsed] = useState(0);
  const [totalStudyMins, setTotalStudyMins] = useLocalStorage("studyMins", 0);
  const { toast } = useToast();

  // Référence pour suivre si on a déjà sauvegardé cette session
  const hasSavedSession = useRef(false);

  // Sauvegarder le temps étudié
  const saveStudyTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    if (minutes > 0 && !hasSavedSession.current) {
      setTotalStudyMins((prevMins) => {
        const prev = Number(prevMins) || 0;
        return prev + minutes;
      });
      hasSavedSession.current = true;
    }
  };

  useEffect(() => {
    let interval;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
        if (isWorkSession) {
          setSessionElapsed((prev) => prev + 1);
        }
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(interval);
      setIsRunning(false);

      // Si c'est une session de travail qui se termine, sauvegarder
      if (isWorkSession) {
        saveStudyTime(sessionElapsed);
      }

      // Passer à la session suivante
      const nextSession = !isWorkSession;
      setIsWorkSession(nextSession);
      setTimeLeft(nextSession ? WORK_TIME : BREAK_TIME);
      setSessionElapsed(0);
      hasSavedSession.current = false;

      toast({
        title: nextSession ? "Time to focus! 💪" : "Break time! 🎉",
        description: nextSession
          ? "Let's start another productive session!"
          : "Take a short break to recharge.",
      });
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft, isWorkSession, sessionElapsed]);

  // Sauvegarder le temps quand l'utilisateur quitte l'app/page
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (isWorkSession && sessionElapsed > 0) {
        saveStudyTime(sessionElapsed);
        // Sauvegarder dans sessionStorage pour récupération immédiate
        sessionStorage.setItem("pendingStudyTime", sessionElapsed.toString());
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      handleBeforeUnload();
    };
  }, [isWorkSession, sessionElapsed]);

  // Récupérer le temps en attente au chargement
  useEffect(() => {
    const pendingTime = sessionStorage.getItem("pendingStudyTime");
    if (pendingTime) {
      const seconds = parseInt(pendingTime, 10);
      if (!isNaN(seconds) && seconds > 0) {
        const minutes = Math.floor(seconds / 60);
        if (minutes > 0) {
          setTotalStudyMins((prev) => {
            const prevMins = Number(prev) || 0;
            return prevMins + minutes;
          });
        }
        sessionStorage.removeItem("pendingStudyTime");
      }
    }
  }, []);

  const toggleTimer = () => {
    if (!isRunning && isWorkSession) {
      // Réinitialiser le flag de sauvegarde quand on démarre une nouvelle session
      hasSavedSession.current = false;
    }

    if (isRunning && isWorkSession) {
      // Sauvegarder quand on pause
      saveStudyTime(sessionElapsed);
    }

    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    const wasRunning = isRunning;
    setIsRunning(false);

    if (isWorkSession && sessionElapsed > 0) {
      saveStudyTime(sessionElapsed);
    }

    setTimeLeft(isWorkSession ? WORK_TIME : BREAK_TIME);
    setSessionElapsed(0);
    hasSavedSession.current = false;
  };

  const switchMode = () => {
    if (isRunning) {
      setIsRunning(false);
    }

    if (isWorkSession && sessionElapsed > 0) {
      saveStudyTime(sessionElapsed);
    }

    const newMode = !isWorkSession;
    setIsWorkSession(newMode);
    setTimeLeft(newMode ? WORK_TIME : BREAK_TIME);
    setSessionElapsed(0);
    hasSavedSession.current = false;
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress =
    (((isWorkSession ? WORK_TIME : BREAK_TIME) - timeLeft) /
      (isWorkSession ? WORK_TIME : BREAK_TIME)) *
    100;




  return (
    <div className="min-h-screen pb-20 md:pb-8">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Pomodoro Timer</h1>
        <div className="max-w-2xl mx-auto">
          <Card className="p-12 text-center shadow-lg">
            <div className="mb-8">
              <div className="inline-flex gap-2 p-1 bg-muted rounded-lg mb-8">
                <Button
                  variant={isWorkSession ? "default" : "ghost"}
                  onClick={switchMode}
                  disabled={isRunning}
                >
                  Focus
                </Button>
                <Button
                  variant={!isWorkSession ? "default" : "ghost"}
                  onClick={switchMode}
                  disabled={isRunning}
                >
                  Break
                </Button>
              </div>
            </div>

            <div className="relative mb-12">
              <div className="text-8xl font-bold mb-4">
                {String(minutes).padStart(2, "0")}:
                {String(seconds).padStart(2, "0")}
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <Button size="lg" onClick={toggleTimer}>
                {isRunning ? (
                  <>
                    <Pause className="w-5 h-5 mr-2" /> Pause
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 mr-2" /> Start
                  </>
                )}
              </Button>
              <Button size="lg" variant="outline" onClick={resetTimer}>
                <RotateCcw className="w-5 h-5 mr-2" /> Reset
              </Button>
            </div>
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

          {/* Affichage debug */}
          <Card className="p-4 mt-4">
            <p className="text-sm text-muted-foreground">
              Session elapsed: {Math.floor(sessionElapsed / 60)}m{" "}
              {sessionElapsed % 60}s
            </p>
            <p className="text-sm text-muted-foreground">
              Total saved: {totalStudyMins} minutes
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Timer;
