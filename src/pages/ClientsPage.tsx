
import React from "react";
import PageHeader from "@/components/ui/page-header";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import ClientCard, { ClientCardProps } from "@/components/clients/ClientCard";
import { toast } from "sonner";

export default function ClientsPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  
  // Mock data for clients
  const clients: Omit<ClientCardProps, "onBlock" | "onLimit" | "onViewDetails">[] = [
    {
      id: "client-1",
      name: "AssistantBot",
      status: "active",
      usagePercent: 67,
      lastSeen: "5 minutes ago",
      appsAccessed: 3
    },
    {
      id: "client-2",
      name: "DataProcessor",
      status: "active",
      usagePercent: 42,
      lastSeen: "2 hours ago",
      appsAccessed: 2
    },
    {
      id: "client-3",
      name: "ResearchAgent",
      status: "active",
      usagePercent: 89,
      lastSeen: "30 minutes ago",
      appsAccessed: 4
    },
    {
      id: "client-4",
      name: "MarketingBot",
      status: "limited",
      usagePercent: 38,
      lastSeen: "1 day ago",
      appsAccessed: 1
    },
    {
      id: "client-5",
      name: "SuspiciousClient",
      status: "blocked",
      usagePercent: 0,
      lastSeen: "3 days ago",
      appsAccessed: 2
    }
  ];

  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBlockClient = (clientId: string) => {
    const client = clients.find(c => c.id === clientId);
    toast.success(`${client?.name} has been blocked`, {
      description: "The client will no longer have access to your apps"
    });
  };

  const handleLimitClient = (clientId: string) => {
    const client = clients.find(c => c.id === clientId);
    toast.success(`${client?.name} has been limited`, {
      description: "The client will have restricted access to your apps"
    });
  };

  const handleViewClientDetails = (clientId: string) => {
    toast.info(`Viewing details for client: ${clientId}`);
  };

  return (
    <>
      <PageHeader
        title="Client Access"
        description="Manage clients and agents that use your API connections"
      />
      
      <div className="flex items-center mb-6">
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search clients..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      {filteredClients.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClients.map((client) => (
            <ClientCard
              key={client.id}
              {...client}
              onBlock={() => handleBlockClient(client.id)}
              onLimit={() => handleLimitClient(client.id)}
              onViewDetails={() => handleViewClientDetails(client.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium">No clients found</h3>
          <p className="text-muted-foreground mt-1">
            {searchQuery 
              ? "Try a different search term" 
              : "No clients have accessed your apps yet"}
          </p>
        </div>
      )}
    </>
  );
}
