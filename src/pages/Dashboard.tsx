
import React from "react";
import PageHeader from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { PlusCircle, AppsIcon, Users2Icon, AlertCircle, ShieldIcon } from "lucide-react";
import StatsCard from "@/components/dashboard/StatsCard";
import RecentActivity from "@/components/dashboard/RecentActivity";
import AppConnectModal from "@/components/apps/AppConnectModal";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [isConnectModalOpen, setIsConnectModalOpen] = React.useState(false);

  // Mock data for recent activities
  const recentActivities = [
    {
      id: "activity-1",
      type: "connection" as const,
      app: "Google Drive",
      timestamp: "2025-04-07 14:32",
      description: "Connected successfully"
    },
    {
      id: "activity-2",
      type: "access" as const,
      app: "Slack",
      timestamp: "2025-04-07 12:15",
      description: "Client 'AssistantBot' accessed messages"
    },
    {
      id: "activity-3",
      type: "error" as const,
      app: "Microsoft Graph",
      timestamp: "2025-04-06 23:42",
      description: "Authentication token expired"
    },
    {
      id: "activity-4",
      type: "revoke" as const,
      app: "GitHub",
      timestamp: "2025-04-06 19:11",
      description: "Access revoked by user"
    },
    {
      id: "activity-5",
      type: "access" as const,
      app: "Google Drive",
      timestamp: "2025-04-06 16:28",
      description: "Client 'DataProcessor' accessed files"
    }
  ];

  const handleConnectApp = (appId: string) => {
    setIsConnectModalOpen(false);
    toast.success(`Connecting to ${appId}...`, {
      description: "Redirecting to authentication page"
    });
    // In a real app, this would redirect to the OAuth flow
    setTimeout(() => {
      navigate("/apps");
    }, 1500);
  };

  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Overview of your AgentVault"
        action={
          <Button onClick={() => setIsConnectModalOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" /> Connect App
          </Button>
        }
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard
          title="Connected Apps"
          value="5"
          icon={AppsIcon}
          description="2 need attention"
          trend={{ value: 20, isPositive: true }}
        />
        <StatsCard
          title="Active Clients"
          value="8"
          icon={Users2Icon}
          description="3 new this week"
          trend={{ value: 15, isPositive: true }}
        />
        <StatsCard
          title="Security Alerts"
          value="2"
          icon={AlertCircle}
          description="1 high priority"
          trend={{ value: 50, isPositive: false }}
        />
        <StatsCard
          title="Auth Success Rate"
          value="98.2%"
          icon={ShieldIcon}
          description="Last 7 days"
          trend={{ value: 2.1, isPositive: true }}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-semibold mb-4">Connected Applications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["Google APIs", "Microsoft", "Slack"].map((app, i) => (
              <div 
                key={app}
                className="p-4 border rounded-lg flex items-center animate-fade-in"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="app-icon mr-4">
                  {app.charAt(0)}
                </div>
                <div>
                  <h3 className="font-medium">{app}</h3>
                  <p className="text-sm text-muted-foreground">
                    {i === 0 ? "4 active clients" : i === 1 ? "2 active clients" : "1 active client"}
                  </p>
                </div>
              </div>
            ))}
            <Button 
              variant="outline" 
              className="border-dashed h-full min-h-[5rem]"
              onClick={() => setIsConnectModalOpen(true)}
            >
              <PlusCircle className="mr-2 h-4 w-4" /> Connect New App
            </Button>
          </div>
        </div>
        
        <RecentActivity activities={recentActivities} />
      </div>
      
      <AppConnectModal
        isOpen={isConnectModalOpen}
        onClose={() => setIsConnectModalOpen(false)}
        onConnect={handleConnectApp}
      />
    </>
  );
}
