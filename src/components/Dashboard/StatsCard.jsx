

import { Card } from "@/components/ui/card";

export function StatsCard({
  title,
  value,
  icon: Icon,
  gradient = "gradient-primary",
}) {
  return (
    <Card className="p-6 card-shadow smooth-transition hover:card-shadow-hover">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-3xl font-bold">{value}</p>
        </div>
        <div
          className={`w-12 h-12 rounded-xl ${gradient} flex items-center justify-center`}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </Card>
  );
}
