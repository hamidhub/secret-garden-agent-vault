
import React from "react";
import PageHeader from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AppCard, { AppCardProps } from "@/components/apps/AppCard";
import CustomAppForm from "@/components/custom-apps/CustomAppForm";
import { toast } from "sonner";

export default function CustomAppsPage() {
  const [activeTab, setActiveTab] = React.useState("list");
  
  // Mock data for custom apps
  const customApps: Omit<AppCardProps, "onManage" | "onRenew" | "onRevoke">[] = [
    {
      id: "custom-1",
      name: "Internal API",
      iconFallback: "I",
      status: "active",
      lastUsed: "1 hour ago"
    },
    {
      id: "custom-2",
      name: "Analytics Service",
      iconFallback: "A",
      status: "active",
      lastUsed: "3 days ago"
    }
  ];
  
  const handleAddCustomApp = (data: any) => {
    console.log("Adding custom app:", data);
    toast.success("Custom app added successfully");
    setActiveTab("list");
  };

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

  return (
    <>
      <PageHeader
        title="Custom Apps"
        description="Add and manage custom API integrations"
        action={
          <Button 
            onClick={() => setActiveTab(activeTab === "add" ? "list" : "add")}
            variant={activeTab === "add" ? "outline" : "default"}
          >
            {activeTab === "add" ? "View Apps" : "Add Custom App"}
          </Button>
        }
      />
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="list">Custom Apps</TabsTrigger>
          <TabsTrigger value="add">Add New App</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list">
          {customApps.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {customApps.map((app) => (
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
              <h3 className="text-lg font-medium">No custom apps yet</h3>
              <p className="text-muted-foreground mt-1">
                Add your first custom app to get started
              </p>
              <Button className="mt-4" onClick={() => setActiveTab("add")}>
                Add Custom App
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="add">
          <CustomAppForm onSubmit={handleAddCustomApp} />
        </TabsContent>
      </Tabs>
    </>
  );
}
