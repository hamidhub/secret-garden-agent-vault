
import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import AppSidebar from "./Sidebar";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <main className="flex-1 p-6 md:p-8 pt-6 overflow-y-auto">
            {children}
          </main>
        </div>
        <Toaster />
      </div>
    </SidebarProvider>
  );
}
