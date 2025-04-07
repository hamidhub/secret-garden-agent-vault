
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ActivityItem {
  id: string;
  type: "connection" | "access" | "revoke" | "error";
  app: string;
  timestamp: string;
  description: string;
}

interface RecentActivityProps {
  activities: ActivityItem[];
}

export default function RecentActivity({ activities }: RecentActivityProps) {
  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case "connection":
        return "🔗";
      case "access":
        return "🔐";
      case "revoke":
        return "⛔";
      case "error": 
        return "⚠️";
      default:
        return "📝";
    }
  };

  return (
    <Card className="h-[400px]">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[320px] px-4 pb-4">
          <div className="space-y-4">
            {activities.map((activity) => (
              <div 
                key={activity.id}
                className="flex items-start p-3 bg-muted/50 rounded-md animate-fade-in"
              >
                <div className="mr-3 text-xl">{getActivityIcon(activity.type)}</div>
                <div>
                  <p className="font-medium text-sm">{activity.app}</p>
                  <p className="text-muted-foreground text-sm">{activity.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {activity.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
