
import React from "react";
import { Navigate } from "react-router-dom";

const Index = () => {
  // Simply redirect to the Dashboard page
  return <Navigate to="/dashboard" replace />;
};

export default Index;
