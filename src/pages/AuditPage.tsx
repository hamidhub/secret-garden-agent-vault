
import React from "react";
import PageHeader from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Download, Filter } from "lucide-react";
import AuditLogTable, { AuditLogEntry } from "@/components/audit/AuditLogTable";
import { toast } from "sonner";

export default function AuditPage() {
  // Mock data for audit logs
  const auditLogs: AuditLogEntry[] = Array.from({ length: 20 }).map((_, i) => ({
    id: `log-${i}`,
    timestamp: `2025-04-${String(7 - Math.min(i, 6)).padStart(2, '0')} ${String(Math.floor(Math.random() * 24)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
    app: ["Google APIs", "Microsoft", "Slack", "GitHub", "Notion", "Internal API"][Math.floor(Math.random() * 6)],
    client: ["AssistantBot", "DataProcessor", "ResearchAgent", "MarketingBot"][Math.floor(Math.random() * 4)],
    action: ["getData", "postData", "authenticate", "listResources", "updateResource", "deleteResource"][Math.floor(Math.random() * 6)],
    status: ["success", "failure", "pending"][Math.floor(Math.random() * (i === 0 ? 3 : 2))] as "success" | "failure" | "pending",
    details: i < 5 ? `Request details:\n\nEndpoint: /api/v1/resources\nHeaders: {...}\nParams: {...}\nBody: {...}\nResponse: ${Math.random() > 0.7 ? "Error: Unauthorized" : "Success: 200 OK"}` : undefined
  }));

  const handleExportLogs = () => {
    toast.success("Logs exported successfully", {
      description: "The audit logs have been exported to a CSV file"
    });
  };

  const handleViewLogDetails = (logId: string) => {
    toast.info(`Viewing details for log: ${logId}`);
  };

  return (
    <>
      <PageHeader
        title="Audit Log"
        description="View and export logs of all API requests through AgentVault"
        action={
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" /> Filter
            </Button>
            <Button size="sm" onClick={handleExportLogs}>
              <Download className="mr-2 h-4 w-4" /> Export
            </Button>
          </div>
        }
      />
      
      <AuditLogTable
        entries={auditLogs}
        onViewDetails={handleViewLogDetails}
      />
    </>
  );
}
