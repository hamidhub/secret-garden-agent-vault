
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import AppsPage from "./pages/AppsPage";
import CustomAppsPage from "./pages/CustomAppsPage";
import ClientsPage from "./pages/ClientsPage";
import AuditPage from "./pages/AuditPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={
            <MainLayout>
              <Dashboard />
            </MainLayout>
          } />
          <Route path="/apps" element={
            <MainLayout>
              <AppsPage />
            </MainLayout>
          } />
          <Route path="/custom-apps" element={
            <MainLayout>
              <CustomAppsPage />
            </MainLayout>
          } />
          <Route path="/clients" element={
            <MainLayout>
              <ClientsPage />
            </MainLayout>
          } />
          <Route path="/audit" element={
            <MainLayout>
              <AuditPage />
            </MainLayout>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
