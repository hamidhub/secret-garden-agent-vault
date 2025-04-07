
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface AppOption {
  id: string;
  name: string;
  icon?: string;
  iconFallback?: string;
  description: string;
}

interface AppConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (appId: string) => void;
}

export default function AppConnectModal({
  isOpen,
  onClose,
  onConnect
}: AppConnectModalProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  
  // Mock data for supported apps
  const supportedApps: AppOption[] = [
    {
      id: "google",
      name: "Google APIs",
      iconFallback: "G",
      description: "Connect to Google services including Gmail, Drive, Calendar, and more."
    },
    {
      id: "microsoft",
      name: "Microsoft",
      iconFallback: "M",
      description: "Connect to Microsoft services including Office 365, Teams, and more."
    },
    {
      id: "slack",
      name: "Slack",
      iconFallback: "S",
      description: "Connect to Slack workspaces for messaging and notifications."
    },
    {
      id: "github",
      name: "GitHub",
      iconFallback: "G",
      description: "Connect to GitHub repositories and access code, issues, and pull requests."
    },
    {
      id: "notion",
      name: "Notion",
      iconFallback: "N",
      description: "Connect to Notion workspaces and access pages and databases."
    }
  ];

  const filteredApps = supportedApps.filter(app => 
    app.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Connect a new app</DialogTitle>
          <DialogDescription>
            Select an application to connect to your AgentVault
          </DialogDescription>
        </DialogHeader>
        
        <div className="relative mt-2">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search apps..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <ScrollArea className="h-[320px] mt-4">
          <div className="space-y-4">
            {filteredApps.map(app => (
              <div 
                key={app.id}
                className="flex items-center p-3 border rounded-md hover:bg-accent cursor-pointer"
                onClick={() => onConnect(app.id)}
              >
                <div className="app-icon mr-3">
                  {app.icon ? (
                    <img src={app.icon} alt={app.name} className="w-6 h-6" />
                  ) : (
                    <span className="text-lg font-bold">
                      {app.iconFallback || app.name.charAt(0)}
                    </span>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{app.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {app.description}
                  </p>
                </div>
              </div>
            ))}
            
            {filteredApps.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No apps found matching your search
              </div>
            )}
          </div>
        </ScrollArea>
        
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
