
import React from "react";
import PageHeader from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { PlusCircle, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import AppCard, { AppCardProps } from "@/components/apps/AppCard";
import AppConnectModal from "@/components/apps/AppConnectModal";
import { toast } from "sonner";

export default function AppsPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isConnectModalOpen, setIsConnectModalOpen] = React.useState(false);
  
  // Mock data for connected apps
  const connectedApps: Omit<AppCardProps, "onManage" | "onRenew" | "onRevoke">[] = [
    {
      id: "google",
      name: "Google APIs",
      iconFallback: "G",
      status: "active",
      lastUsed: "2 hours ago"
    },
    {
      id: "microsoft",
      name: "Microsoft",
      iconFallback: "M",
      status: "active",
      lastUsed: "1 day ago"
    },
    {
      id: "slack",
      name: "Slack",
      iconFallback: "S",
      status: "expired",
      lastUsed: "5 days ago"
    },
    {
      id: "github",
      name: "GitHub",
      iconFallback: "G",
      status: "active",
      lastUsed: "3 days ago"
    },
    {
      id: "notion",
      name: "Notion",
      iconFallback: "N",
      status: "revoked",
      lastUsed: "2 weeks ago"
    }
  ];

  const filteredApps = connectedApps.filter(app => 
    app.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleManageApp = (appId: string) => {
    toast.info(`Managing app: ${appId}`);
  };

  const handleRenewApp = (appId: string) => {
    toast.success(`Renewing connection for: ${appId}`);
  };

  const handleRevokeApp = (appId: string) => {
    toast.success(`Access revoked for: ${appId}`, {
      description: "The app will no longer have access to your data"
    });
  };

  const handleConnectApp = (appId: string) => {
    setIsConnectModalOpen(false);
    toast.success(`Connecting to ${appId}...`, {
      description: "Redirecting to authentication page"
    });
  };

  return (
    <>
      <PageHeader
        title="Connected Apps"
        description="Manage your connected applications and API integrations"
        action={
          <Button onClick={() => setIsConnectModalOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" /> Connect App
          </Button>
        }
      />
      
      <div className="flex items-center mb-6">
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search apps..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      {filteredApps.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredApps.map((app) => (
            <AppCard
              key={app.id}
              {...app}
              onManage={() => handleManageApp(app.id)}
              onRenew={() => handleRenewApp(app.id)}
              onRevoke={() => handleRevokeApp(app.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium">No apps found</h3>
          <p className="text-muted-foreground mt-1">
            {searchQuery 
              ? "Try a different search term" 
              : "Connect your first app to get started"}
          </p>
          <Button className="mt-4" onClick={() => setIsConnectModalOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" /> Connect App
          </Button>
        </div>
      )}
      
      <AppConnectModal
        isOpen={isConnectModalOpen}
        onClose={() => setIsConnectModalOpen(false)}
        onConnect={handleConnectApp}
      />
    </>
  );
}
