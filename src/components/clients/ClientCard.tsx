
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreVertical, Ban, ShieldAlert } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";

export interface ClientCardProps {
  id: string;
  name: string;
  status: "active" | "blocked" | "limited";
  usagePercent: number;
  lastSeen: string;
  appsAccessed: number;
  onBlock: () => void;
  onLimit: () => void;
  onViewDetails: () => void;
}

export default function ClientCard({
  id,
  name,
  status,
  usagePercent,
  lastSeen,
  appsAccessed,
  onBlock,
  onLimit,
  onViewDetails
}: ClientCardProps) {
  return (
    <Card className="overflow-hidden card-hover">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center">
              <h3 className="font-medium">{name}</h3>
              <Badge 
                variant={
                  status === "active" ? "default" : 
                  status === "blocked" ? "destructive" : "outline"
                }
                className="ml-2 text-xs"
              >
                {status === "active" ? "Active" : 
                 status === "blocked" ? "Blocked" : "Limited"}
              </Badge>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Last seen {lastSeen} • {appsAccessed} apps accessed
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onViewDetails}>
                View Details
              </DropdownMenuItem>
              {status !== "blocked" && (
                <DropdownMenuItem 
                  onClick={onBlock}
                  className="text-destructive"
                >
                  <Ban className="mr-2 h-4 w-4" /> Block Client
                </DropdownMenuItem>
              )}
              {status !== "limited" && status !== "blocked" && (
                <DropdownMenuItem onClick={onLimit}>
                  <ShieldAlert className="mr-2 h-4 w-4" /> Limit Access
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="mt-4 space-y-2">
          <div className="flex justify-between text-xs">
            <span>API Usage</span>
            <span>{usagePercent}%</span>
          </div>
          <Progress value={usagePercent} />
        </div>
        
        <div className="mt-4">
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={onViewDetails}
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
