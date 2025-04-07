
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  Clock
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  app: string;
  client: string;
  action: string;
  status: "success" | "failure" | "pending";
  details?: string;
}

interface AuditLogTableProps {
  entries: AuditLogEntry[];
  onViewDetails: (id: string) => void;
}

export default function AuditLogTable({
  entries,
  onViewDetails
}: AuditLogTableProps) {
  const [expanded, setExpanded] = React.useState<Record<string, boolean>>({});
  
  const toggleExpand = (id: string) => {
    setExpanded(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  const getStatusIcon = (status: AuditLogEntry["status"]) => {
    switch (status) {
      case "success":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "failure":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "pending":
        return <Clock className="h-4 w-4 text-amber-500" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="border rounded-md">
      <ScrollArea className="h-[600px]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[180px]">Timestamp</TableHead>
              <TableHead>App</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Action</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="w-[100px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {entries.map((entry) => (
              <React.Fragment key={entry.id}>
                <TableRow className="group">
                  <TableCell className="font-mono text-xs">
                    {entry.timestamp}
                  </TableCell>
                  <TableCell>{entry.app}</TableCell>
                  <TableCell>{entry.client}</TableCell>
                  <TableCell>{entry.action}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center">
                      {getStatusIcon(entry.status)}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleExpand(entry.id)}
                      >
                        {expanded[entry.id] ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onViewDetails(entry.id)}
                      >
                        Details
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                {expanded[entry.id] && entry.details && (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="bg-muted/50 p-4 text-xs font-mono"
                    >
                      {entry.details}
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
}
