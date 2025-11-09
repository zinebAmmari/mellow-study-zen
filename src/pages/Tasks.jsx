// import { useState } from 'react';
// import { Plus, Trash2 } from 'lucide-react';
// import { Card } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Checkbox } from '@/components/ui/checkbox';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { useLocalStorage } from '@/hooks/useLocalStorage';
// import { Task, Priority } from '@/types';
// import { PriorityBadge } from '@/components/Tasks/PriorityBadge';

// const Tasks = () => {
//   const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);
//   const [newTask, setNewTask] = useState('');
//   const [selectedPriority, setSelectedPriority] = useState<Priority>('medium');
//   const [filterPriority, setFilterPriority] = useState<Priority | 'all'>('all');

//   const addTask = () => {
//     if (newTask.trim()) {
//       const task: Task = {
//         id: Date.now().toString(),
//         title: newTask,
//         completed: false,
//         priority: selectedPriority,
//       };
//       setTasks([...tasks, task]);
//       setNewTask('');
//     }
//   };

//   const toggleTask = (id: string) => {
//     setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
//   };

//   const deleteTask = (id: string) => {
//     setTasks(tasks.filter(t => t.id !== id));
//   };

//   const filteredTasks = filterPriority === 'all'
//     ? tasks
//     : tasks.filter(t => t.priority === filterPriority);

//   return (
//     <div className="min-h-screen pb-20 md:pb-8">
//       <div className="container mx-auto px-4 py-8">
//         <h1 className="text-4xl font-bold mb-8">Tasks</h1>

//         <Card className="p-6 card-shadow mb-6">
//           <div className="flex flex-col md:flex-row gap-4">
//             <Input
//               placeholder="Add a new task..."
//               value={newTask}
//               onChange={(e) => setNewTask(e.target.value)}
//               onKeyDown={(e) => e.key === 'Enter' && addTask()}
//               className="flex-1"
//             />
//             <Select value={selectedPriority} onValueChange={(v) => setSelectedPriority(v as Priority)}>
//               <SelectTrigger className="w-full md:w-32">
//                 <SelectValue />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="high">High</SelectItem>
//                 <SelectItem value="medium">Medium</SelectItem>
//                 <SelectItem value="low">Low</SelectItem>
//               </SelectContent>
//             </Select>
//             <Button onClick={addTask} className="w-full md:w-auto">
//               <Plus className="w-4 h-4 mr-2" />
//               Add Task
//             </Button>
//           </div>
//         </Card>

//         <div className="mb-4">
//           <Select value={filterPriority} onValueChange={(v) => setFilterPriority(v as Priority | 'all')}>
//             <SelectTrigger className="w-full md:w-48">
//               <SelectValue placeholder="Filter by priority" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">All Priorities</SelectItem>
//               <SelectItem value="high">High Priority</SelectItem>
//               <SelectItem value="medium">Medium Priority</SelectItem>
//               <SelectItem value="low">Low Priority</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>

//         <div className="space-y-3">
//           {filteredTasks.map(task => (
//             <Card key={task.id} className="p-4 card-shadow smooth-transition hover:card-shadow-hover">
//               <div className="flex items-center justify-between gap-4">
//                 <div className="flex items-center gap-3 flex-1">
//                   <Checkbox
//                     checked={task.completed}
//                     onCheckedChange={() => toggleTask(task.id)}
//                   />
//                   <span className={`flex-1 ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
//                     {task.title}
//                   </span>
//                   <PriorityBadge priority={task.priority} />
//                 </div>
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   onClick={() => deleteTask(task.id)}
//                   className="text-destructive hover:text-destructive"
//                 >
//                   <Trash2 className="w-4 h-4" />
//                 </Button>
//               </div>
//             </Card>
//           ))}
//           {filteredTasks.length === 0 && (
//             <p className="text-center text-muted-foreground py-12">
//               No tasks yet. Add your first task above! 📝
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Tasks;

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
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
  const [newTask, setNewTask] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("medium");
  const [filterPriority, setFilterPriority] = useState("all");

  const addTask = () => {
    if (newTask.trim()) {
      const task = {
        id: Date.now().toString(),
        title: newTask,
        completed: false,
        priority: selectedPriority,
      };
      setTasks([...tasks, task]);
      setNewTask("");
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
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              placeholder="Add a new task..."
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTask()}
              className="flex-1"
            />
            <Select
              value={selectedPriority}
              onValueChange={setSelectedPriority}
            >
              <SelectTrigger className="w-full md:w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={addTask} className="w-full md:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              Add Task
            </Button>
          </div>
        </Card>

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
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 flex-1">
                  <Checkbox
                    checked={task.completed}
                    onCheckedChange={() => toggleTask(task.id)}
                  />
                  <span
                    className={`flex-1 ${
                      task.completed ? "line-through text-muted-foreground" : ""
                    }`}
                  >
                    {task.title}
                  </span>
                  <PriorityBadge priority={task.priority} />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteTask(task.id)}
                  className="text-destructive hover:text-destructive"
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
