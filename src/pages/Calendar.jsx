

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Calendar as CalendarUI } from "@/components/ui/calendar";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { format } from "date-fns";

const Calendar = () => {
  const [date, setDate] = useState(new Date());
  // Le champ 'tasks' est maintenant enrichi avec 'description' et 'dueDate'
  const [tasks] = useLocalStorage("tasks", []);

  // La logique de filtrage par date est correcte si dueDate contient bien la date.
  const tasksForDate = tasks.filter(
    (task) =>
      // Vérifie si la tâche a une date d'échéance
      task.dueDate &&
      // Compare la partie date (AAAA-MM-JJ) de la dueDate de la tâche avec la date sélectionnée
      format(new Date(task.dueDate), "yyyy-MM-dd") ===
        format(date || new Date(), "yyyy-MM-dd")
  );

  return (
    <div className="min-h-screen pb-20 md:pb-8">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Calendar</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="p-6 card-shadow lg:col-span-2">
            <CalendarUI
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-lg pointer-events-auto"
            />
          </Card>

          <Card className="p-6 card-shadow">
            <h2 className="text-xl font-semibold mb-4">
              Tasks for {date ? format(date, "MMM dd, yyyy") : "Today"}
            </h2>
            {tasksForDate.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No tasks scheduled for this day
              </p>
            ) : (
              <div className="space-y-3">
                {tasksForDate.map((task) => (
                  <div key={task.id} className="p-4 bg-muted/30 rounded-lg">
                    {/* Affichage de l'heure de la tâche */}
                    {task.dueDate && (
                      <p className="text-sm font-semibold text-blue-600 mb-1">
                        {format(new Date(task.dueDate), "HH:mm")}
                      </p>
                    )}
                    {/* Nom de la tâche */}
                    <p className="font-medium">{task.title}</p>
                    {/* Description de la tâche */}
                    {task.description && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {task.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
