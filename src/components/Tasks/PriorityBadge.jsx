

import { Badge } from "@/components/ui/badge";

export function PriorityBadge({ priority }) {
  const colors = {
    high: "bg-priority-high/20 text-priority-high border-priority-high/30",
    medium:
      "bg-priority-medium/20 text-priority-medium border-priority-medium/30",
    low: "bg-priority-low/20 text-priority-low border-priority-low/30",
  };

  return (
    <Badge variant="outline" className={`${colors[priority]} capitalize`}>
      {priority}
    </Badge>
  );
}
