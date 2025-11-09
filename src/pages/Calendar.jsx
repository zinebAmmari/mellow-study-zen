// import { useState } from 'react';
// import { Card } from '@/components/ui/card';
// import { Calendar as CalendarUI } from '@/components/ui/calendar';
// import { useLocalStorage } from '@/hooks/useLocalStorage';
// import { Task } from '@/types';
// import { format } from 'date-fns';

// const Calendar = () => {
//   const [date, setDate] = useState<Date | undefined>(new Date());
//   const [tasks] = useLocalStorage<Task[]>('tasks', []);

//   const tasksForDate = tasks.filter(task =>
//     task.dueDate && format(new Date(task.dueDate), 'yyyy-MM-dd') === format(date || new Date(), 'yyyy-MM-dd')
//   );

//   return (
//     <div className="min-h-screen pb-20 md:pb-8">
//       <div className="container mx-auto px-4 py-8">
//         <h1 className="text-4xl font-bold mb-8">Calendar</h1>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           <Card className="p-6 card-shadow lg:col-span-2">
//             <CalendarUI
//               mode="single"
//               selected={date}
//               onSelect={setDate}
//               className="rounded-lg pointer-events-auto"
//             />
//           </Card>

//           <Card className="p-6 card-shadow">
//             <h2 className="text-xl font-semibold mb-4">
//               Tasks for {date ? format(date, 'MMM dd, yyyy') : 'Today'}
//             </h2>
//             {tasksForDate.length === 0 ? (
//               <p className="text-muted-foreground text-center py-8">
//                 No tasks scheduled for this day
//               </p>
//             ) : (
//               <div className="space-y-3">
//                 {tasksForDate.map(task => (
//                   <div
//                     key={task.id}
//                     className="p-4 bg-muted/30 rounded-lg"
//                   >
//                     <p className="font-medium">{task.title}</p>
//                     {task.category && (
//                       <p className="text-sm text-muted-foreground mt-1">
//                         {task.category}
//                       </p>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Calendar;

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Calendar as CalendarUI } from "@/components/ui/calendar";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { format } from "date-fns";

const Calendar = () => {
  const [date, setDate] = useState(new Date());
  const [tasks] = useLocalStorage("tasks", []);

  const tasksForDate = tasks.filter(
    (task) =>
      task.dueDate &&
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
                    <p className="font-medium">{task.title}</p>
                    {task.category && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {task.category}
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
