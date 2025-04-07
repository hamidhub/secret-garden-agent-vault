
import { ReactNode } from "react";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarHeader,
  SidebarMenu, 
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger
} from "@/components/ui/sidebar";
import { 
  AppsIcon, 
  KeyIcon, 
  ShieldIcon, 
  LayoutDashboardIcon, 
  Users2Icon, 
  ClipboardListIcon,
  LogOutIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";

export default function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const menuItems = [
    { 
      icon: LayoutDashboardIcon, 
      label: "Dashboard", 
      path: "/" 
    },
    { 
      icon: AppsIcon, 
      label: "Connected Apps", 
      path: "/apps" 
    },
    { 
      icon: KeyIcon, 
      label: "Custom Apps", 
      path: "/custom-apps" 
    },
    { 
      icon: Users2Icon, 
      label: "Client Access", 
      path: "/clients" 
    },
    { 
      icon: ClipboardListIcon, 
      label: "Audit Log", 
      path: "/audit" 
    },
    { 
      icon: ShieldIcon, 
      label: "Security", 
      path: "/security" 
    },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <Sidebar>
      <SidebarHeader className="px-6 py-6">
        <div className="flex items-center space-x-2">
          <ShieldIcon className="h-8 w-8 text-vault-primary" />
          <div className="font-bold text-xl text-white">Agent<span className="text-vault-primary">Vault</span></div>
        </div>
        <SidebarTrigger className="ml-auto md:hidden bg-sidebar-accent hover:bg-sidebar-accent/90 rounded-md h-8 w-8 text-sidebar-foreground" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton 
                    className={`${isActive(item.path) ? 'bg-sidebar-accent text-white' : 'text-sidebar-foreground/80 hover:text-white'}`}
                    onClick={() => navigate(item.path)}
                  >
                    <item.icon className="h-5 w-5 mr-2" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <div className="mt-auto p-4">
        <Button 
          variant="ghost" 
          className="w-full justify-start text-sidebar-foreground/80 hover:text-white hover:bg-sidebar-accent"
        >
          <LogOutIcon className="h-4 w-4 mr-2" />
          Log out
        </Button>
      </div>
    </Sidebar>
  );
}
