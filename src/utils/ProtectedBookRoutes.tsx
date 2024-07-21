import useBookOwnership from "@/hooks/useBookOwnership";
import { Loader2 } from "lucide-react";
import React from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";

const ProtectedBookRoutes = ({ children }: { children: React.ReactNode }) => {
  const { slug } = useParams();
  const { isOwner, loading, error } = useBookOwnership(slug);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white dark:bg-darkMode1">
        <Loader2 className="animate-spin" color="blue" />
      </div>
    );
  }

  if (error || !isOwner) {
    return <Navigate to="/home" replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedBookRoutes;
