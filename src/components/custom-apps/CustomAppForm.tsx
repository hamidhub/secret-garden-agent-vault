
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

interface CustomAppFormProps {
  onSubmit: (data: any) => void;
  isLoading?: boolean;
}

export default function CustomAppForm({
  onSubmit,
  isLoading = false
}: CustomAppFormProps) {
  const [formData, setFormData] = React.useState({
    name: "",
    description: "",
    clientId: "",
    clientSecret: "",
    apiBaseUrl: "",
    scopes: "",
    authType: "oauth2"
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>Add Custom App</CardTitle>
          <CardDescription>
            Configure a custom API integration with AgentVault
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Application Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="My Custom App"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="authType">Authentication Type</Label>
              <Select
                value={formData.authType}
                onValueChange={(value) => handleSelectChange("authType", value)}
              >
                <SelectTrigger id="authType">
                  <SelectValue placeholder="Select auth type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="oauth2">OAuth 2.0</SelectItem>
                  <SelectItem value="apiKey">API Key</SelectItem>
                  <SelectItem value="basic">Basic Auth</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Describe what this app integration is for"
              value={formData.description}
              onChange={handleChange}
              rows={2}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="apiBaseUrl">API Base URL</Label>
            <Input
              id="apiBaseUrl"
              name="apiBaseUrl"
              placeholder="https://api.example.com"
              value={formData.apiBaseUrl}
              onChange={handleChange}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="clientId">Client ID</Label>
              <Input
                id="clientId"
                name="clientId"
                placeholder="client_id"
                value={formData.clientId}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="clientSecret">Client Secret</Label>
              <Input
                id="clientSecret"
                name="clientSecret"
                type="password"
                placeholder="••••••••••••••••"
                value={formData.clientSecret}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="scopes">Scopes (comma separated)</Label>
            <Input
              id="scopes"
              name="scopes"
              placeholder="read, write, profile"
              value={formData.scopes}
              onChange={handleChange}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Adding..." : "Add Custom App"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
