

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import { Textarea } from "@/components/ui/textarea"; // Ajouté pour la description
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { PriorityBadge } from "@/components/Tasks/PriorityBadge";

const Tasks = () => {
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  // Mise à jour des états pour le nom, la description, la date et l'heure
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [taskTime, setTaskTime] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("medium");
  const [filterPriority, setFilterPriority] = useState("all");

  const addTask = () => {
    // Utiliser taskName pour la validation
    if (taskName.trim() && taskDate.trim() && taskTime.trim()) {
      // Combiner date et heure pour créer une chaîne de date complète
      const dueDate = `${taskDate}T${taskTime}`;

      const task = {
        id: Date.now().toString(),
        title: taskName, // Nom de la tâche
        description: taskDescription, // Nouvelle propriété
        dueDate: dueDate, // Nouvelle propriété (pour le calendrier)
        completed: false,
        priority: selectedPriority,
      };
      setTasks([...tasks, task]);
      // Réinitialisation des champs
      setTaskName("");
      setTaskDescription("");
      setTaskDate("");
      setTaskTime("");
    }
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const filteredTasks =
    filterPriority === "all"
      ? tasks
      : tasks.filter((t) => t.priority === filterPriority);

  return (
    <div className="min-h-screen pb-20 md:pb-8">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Tasks</h1>

        <Card className="p-6 card-shadow mb-6">
          <div className="flex flex-col gap-4">
            {/* 1. Nom de la tâche */}
            <Input
              placeholder="Nom de la tâche..."
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              className="flex-1"
            />

            {/* 2. Description de la tâche */}
            <Textarea
              placeholder="Description de la tâche (Optionnel)"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              className="flex-1"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* 3. Date d'échéance */}
              <Input
                type="date"
                value={taskDate}
                onChange={(e) => setTaskDate(e.target.value)}
                className="w-full"
              />

              {/* 4. Heure d'échéance */}
              <Input
                type="time"
                value={taskTime}
                onChange={(e) => setTaskTime(e.target.value)}
                className="w-full"
              />

              {/* 5. Sélecteur de priorité */}
              <Select
                value={selectedPriority}
                onValueChange={setSelectedPriority}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Priorité" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Bouton Ajouter */}
            <Button
              onClick={addTask}
              className="w-full"
              // Ajout de la validation pour le bouton
              disabled={
                !taskName.trim() || !taskDate.trim() || !taskTime.trim()
              }
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Task
            </Button>
          </div>
        </Card>

        {/* ... Reste de la section de filtrage et d'affichage des tâches ... */}
        <div className="mb-4">
          <Select value={filterPriority} onValueChange={setFilterPriority}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Filter by priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="high">High Priority</SelectItem>
              <SelectItem value="medium">Medium Priority</SelectItem>
              <SelectItem value="low">Low Priority</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          {filteredTasks.map((task) => (
            <Card
              key={task.id}
              className="p-4 card-shadow smooth-transition hover:card-shadow-hover"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3 flex-1">
                  <Checkbox
                    checked={task.completed}
                    onCheckedChange={() => toggleTask(task.id)}
                  />
                  <div className="flex-1">
                    <span
                      className={`block font-semibold ${
                        task.completed
                          ? "line-through text-muted-foreground"
                          : ""
                      }`}
                    >
                      {task.title}
                    </span>
                    {/* Affichage de la description et de l'heure/date si disponible */}
                    {task.description && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {task.description}
                      </p>
                    )}
                    {task.dueDate && (
                      <p className="text-xs text-blue-500 mt-1">
                        {format(
                          new Date(task.dueDate),
                          "MMM dd, yyyy 'at' HH:mm"
                        )}
                      </p>
                    )}
                  </div>
                  <PriorityBadge priority={task.priority} />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteTask(task.id)}
                  className="text-destructive hover:text-destructive flex-shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
          {filteredTasks.length === 0 && (
            <p className="text-center text-muted-foreground py-12">
              No tasks yet. Add your first task above! 📝
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
