
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreVertical, CheckCircle, XCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

export interface AppCardProps {
  id: string;
  name: string;
  icon?: string;
  iconFallback?: string;
  status: "active" | "expired" | "revoked";
  lastUsed: string;
  onManage?: () => void;
  onRenew?: () => void;
  onRevoke?: () => void;
}

export default function AppCard({
  id,
  name,
  icon,
  iconFallback,
  status,
  lastUsed,
  onManage,
  onRenew,
  onRevoke
}: AppCardProps) {
  return (
    <Card className="overflow-hidden card-hover">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="app-icon">
              {icon ? (
                <img
                  src={icon}
                  alt={name}
                  className="w-6 h-6"
                />
              ) : (
                <span className="text-lg font-bold">
                  {iconFallback || name.charAt(0)}
                </span>
              )}
            </div>
            <div>
              <h3 className="font-medium">{name}</h3>
              <div className="flex items-center space-x-2 mt-1">
                <Badge 
                  variant={
                    status === "active" ? "default" : 
                    status === "expired" ? "outline" : "destructive"
                  }
                  className="text-xs"
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  Last used {lastUsed}
                </span>
              </div>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onManage}>
                Manage
              </DropdownMenuItem>
              {status === "expired" && (
                <DropdownMenuItem onClick={onRenew}>
                  <CheckCircle className="mr-2 h-4 w-4" /> Renew Connection
                </DropdownMenuItem>
              )}
              {status === "active" && (
                <DropdownMenuItem 
                  onClick={onRevoke}
                  className="text-destructive"
                >
                  <XCircle className="mr-2 h-4 w-4" /> Revoke Access
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="mt-4">
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={onManage}
          >
            Manage Connection
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
