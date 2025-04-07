
import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export default function PageHeader({ 
  title, 
  description, 
  action,
  className
}: PageHeaderProps) {
  return (
    <div className={cn("flex flex-col md:flex-row md:items-center justify-between py-2 mb-6", className)}>
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
        {description && (
          <p className="text-muted-foreground mt-1">
            {description}
          </p>
        )}
      </div>
      {action && <div className="mt-4 md:mt-0">{action}</div>}
    </div>
  );
}
