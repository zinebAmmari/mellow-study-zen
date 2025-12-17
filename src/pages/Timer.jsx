// import { useState, useEffect } from "react";
// import { Play, Pause, RotateCcw } from "lucide-react";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { useToast } from "@/hooks/use-toast";
// import { useLocalStorage } from "@/hooks/useLocalStorage";

// const WORK_TIME = 25 * 60; // 25 minutes en secondes
// const BREAK_TIME = 5 * 60; // 5 minutes en secondes

// const Timer = () => {
//   const [timeLeft, setTimeLeft] = useState(WORK_TIME);
//   const [isRunning, setIsRunning] = useState(false);
//   const [isWorkSession, setIsWorkSession] = useState(true);
//   const [elapsedTime, setElapsedTime] = useState(0); // Temps écoulé de la session de travail actuelle (en secondes)
//   const [totalStudyMins, setTotalStudyMins] = useLocalStorage("studyMins", 0);
//   const { toast } = useToast();

//   const saveStudyTime = (seconds) => {
//     // Calculer les minutes (arrondi à l'inférieur, ex: 24:59 min -> 24 min)
//     const minutes = Math.floor(seconds / 60);
//     if (minutes > 0) {
//       setTotalStudyMins((prevMins) => prevMins + minutes);
//     }
//   };

//   useEffect(() => {
//     let interval;

//     if (isRunning && timeLeft > 0) {
//       interval = setInterval(() => {
//         setTimeLeft((prev) => prev - 1);
//         if (isWorkSession) {
//           setElapsedTime((prev) => prev + 1);
//         }
//       }, 1000);
//     }
//     // Fin de la session Pomodoro complète (timeLeft === 0)
//     else if (timeLeft === 0) {
//       setIsRunning(false);

//       // Enregistrement du temps de la session précédente (qui vient de se terminer)
//       if (!isWorkSession) {
//         // Si on passe au break, ça signifie que le travail vient de se terminer
//         saveStudyTime(elapsedTime);
//         setElapsedTime(0); // Réinitialiser le temps écoulé après l'enregistrement
//       }

//       const nextSession = !isWorkSession;
//       setIsWorkSession(nextSession);
//       setTimeLeft(nextSession ? WORK_TIME : BREAK_TIME);

//       toast({
//         title: nextSession ? "Break time! 🎉" : "Time to focus! 💪",
//         description: nextSession
//           ? "Take a short break to recharge."
//           : "Let's start another productive session!",
//       });
//     }

//     // LOGIQUE CRUCIALE: Enregistrement lors du DÉMONTAGE du composant (changement de page)
//     return () => {
//       clearInterval(interval);

//       // Si la session de travail était active au moment de la navigation, on enregistre le temps
//       if (isRunning && isWorkSession && elapsedTime > 0) {
//         saveStudyTime(elapsedTime);
//         // Le temps écoulé n'a pas besoin d'être remis à zéro ici car le composant sera recréé.
//       }
//     };
//   }, [
//     isRunning,
//     timeLeft,
//     isWorkSession,
//     toast,
//     elapsedTime,
//     setTotalStudyMins,
//   ]);

//   // Enregistrement lors de la PAUSE
//   const toggleTimer = () => {
//     setIsRunning((prevIsRunning) => {
//       if (prevIsRunning && isWorkSession && elapsedTime > 0) {
//         // Si on passe de RUNNING à PAUSED
//         saveStudyTime(elapsedTime);
//         setElapsedTime(0); // Réinitialiser après l'enregistrement
//       }
//       return !prevIsRunning;
//     });
//   };

//   // Enregistrement lors du RESET
//   const resetTimer = () => {
//     setIsRunning(false);

//     // Enregistrement du temps écoulé avant la réinitialisation
//     if (isWorkSession && elapsedTime > 0) {
//       saveStudyTime(elapsedTime);
//     }

//     setTimeLeft(isWorkSession ? WORK_TIME : BREAK_TIME);
//     setElapsedTime(0); // Réinitialiser le temps écoulé à 0
//   };

//   // Enregistrement lors du changement de mode
//   const switchMode = () => {
//     setIsRunning(false);

//     // Enregistrement du temps écoulé avant le changement de mode
//     if (isWorkSession && elapsedTime > 0) {
//       saveStudyTime(elapsedTime);
//     }

//     const newMode = !isWorkSession;
//     setIsWorkSession(newMode);
//     setTimeLeft(newMode ? WORK_TIME : BREAK_TIME);
//     setElapsedTime(0); // Réinitialiser le temps écoulé à 0
//   };

//   const minutes = Math.floor(timeLeft / 60);
//   const seconds = timeLeft % 60;
//   const progress =
//     (((isWorkSession ? WORK_TIME : BREAK_TIME) - timeLeft) /
//       (isWorkSession ? WORK_TIME : BREAK_TIME)) *
//     100;

//   return (
//     <div className="min-h-screen pb-20 md:pb-8">
//       <div className="container mx-auto px-4 py-8">
//         <h1 className="text-4xl font-bold mb-8 text-center">Pomodoro Timer</h1>

//         <div className="max-w-2xl mx-auto">
//           <Card className="p-12 card-shadow text-center">
//             <div className="mb-8">
//               <div className="inline-flex gap-2 p-1 bg-muted rounded-lg mb-8">
//                 <Button
//                   variant={isWorkSession ? "default" : "ghost"}
//                   onClick={switchMode}
//                   disabled={isRunning}
//                 >
//                   Focus
//                 </Button>
//                 <Button
//                   variant={!isWorkSession ? "default" : "ghost"}
//                   onClick={switchMode}
//                   disabled={isRunning}
//                 >
//                   Break
//                 </Button>
//               </div>
//             </div>

//             <div className="relative mb-12">
//               <div className="text-8xl font-bold mb-4">
//                 {String(minutes).padStart(2, "0")}:
//                 {String(seconds).padStart(2, "0")}
//               </div>
//               <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
//                 <div
//                   className="h-full bg-primary smooth-transition"
//                   style={{ width: `${progress}%` }}
//                 />
//               </div>
//             </div>

//             <div className="flex justify-center gap-4">
//               <Button size="lg" onClick={toggleTimer}>
//                 {isRunning ? (
//                   <>
//                     <Pause className="w-5 h-5 mr-2" />
//                     Pause
//                   </>
//                 ) : (
//                   <>
//                     <Play className="w-5 h-5 mr-2" />
//                     Start
//                   </>
//                 )}
//               </Button>
//               <Button size="lg" variant="outline" onClick={resetTimer}>
//                 <RotateCcw className="w-5 h-5 mr-2" />
//                 Reset
//               </Button>
//             </div>

//             <p className="text-muted-foreground mt-8">
//               {isWorkSession
//                 ? "Focus on your task without distractions"
//                 : "Take a break and relax for a few minutes"}
//             </p>
//           </Card>

//           <Card className="p-6 card-shadow mt-6">
//             <h2 className="text-lg font-semibold mb-3">How to use Pomodoro</h2>
//             <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
//               <li>Choose a task to focus on</li>
//               <li>Start the timer and work for 25 minutes</li>
//               <li>Take a 5-minute break when the timer rings</li>
//               <li>After 4 pomodoros, take a longer 15-30 minute break</li>
//             </ol>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Timer;

import { useState, useEffect } from "react";
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
  const [elapsedTime, setElapsedTime] = useState(0);
  const [totalStudyMins, setTotalStudyMins] = useLocalStorage("studyMins", 0);
  const { toast } = useToast();

  // FIX 1: Force Number conversion to prevent string concatenation (e.g., 88 + 3 = 883)
  const saveStudyTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    if (minutes > 0) {
      setTotalStudyMins((prevMins) => Number(prevMins) + minutes);
      // Reset elapsedTime immediately after saving so it's not saved again
      setElapsedTime(0);
    }
  };

  useEffect(() => {
    let interval;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
        if (isWorkSession) {
          setElapsedTime((prev) => prev + 1);
        }
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);

      // FIX 2: If work session ends, save the time
      if (isWorkSession) {
        saveStudyTime(elapsedTime);
      }

      const nextSession = !isWorkSession;
      setIsWorkSession(nextSession);
      setTimeLeft(nextSession ? WORK_TIME : BREAK_TIME);

      toast({
        title: nextSession ? "Time to focus! 💪" : "Break time! 🎉",
        description: nextSession
          ? "Let's start another productive session!"
          : "Take a short break to recharge.",
      });
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, isWorkSession, elapsedTime]);

  // FIX 3: Simplified Toggle
  const toggleTimer = () => {
    if (isRunning && isWorkSession) {
      saveStudyTime(elapsedTime);
    }
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    if (isWorkSession) {
      saveStudyTime(elapsedTime);
    }
    setTimeLeft(isWorkSession ? WORK_TIME : BREAK_TIME);
    setElapsedTime(0);
  };

  const switchMode = () => {
    if (isRunning && isWorkSession) {
      saveStudyTime(elapsedTime);
    }
    setIsRunning(false);
    const newMode = !isWorkSession;
    setIsWorkSession(newMode);
    setTimeLeft(newMode ? WORK_TIME : BREAK_TIME);
    setElapsedTime(0);
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
        </div>
      </div>
    </div>
  );
};

export default Timer;
