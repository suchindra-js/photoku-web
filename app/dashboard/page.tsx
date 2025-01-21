"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import PhotographerDashboard from "../_components/photographer-dashboard";
import UserDashboard from "./UserDashboard";

const Dashboard = () => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return; // Wait for session to load
    if (!session) {
      // If the user is not logged in, redirect to login page
      window.location.href = "/auth/login";
    } else {
      setLoading(false);
    }
  }, [status, session]);

  if (loading) {
    return <div>Loading...</div>; // Optional loading state while checking session
  }

  if (session?.user?.role === "PHOTOGRAPHER") {
    return <PhotographerDashboard />;
  } else if (session?.user?.role === "USER") {
    return <UserDashboard />;
  } else {
    return <div>Unauthorized</div>; // Handle unauthorized role or error case
  }
};

export default Dashboard;
