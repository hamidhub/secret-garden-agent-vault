
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShieldIcon } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center p-6 max-w-md">
        <div className="flex justify-center mb-4">
          <div className="bg-vault-light p-4 rounded-full">
            <ShieldIcon className="h-12 w-12 text-vault-primary" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-2">404</h1>
        <p className="text-xl text-muted-foreground mb-6">
          This vault doesn't exist
        </p>
        <p className="text-muted-foreground mb-6">
          The page you are looking for might have been moved or deleted.
        </p>
        <Button onClick={() => navigate("/")} className="w-full">
          Return to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
