import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getDashboard } from "../services/dashboardService";
import Loader from "../components/Loader";
import StatCard from "../components/StatCard";

const Dashboard = () => {
  const { user } = useAuth();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await getDashboard();

      setDashboardData(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div>

      <h1 className="text-3xl font-bold mb-2">
        Dashboard
      </h1>

      <p className="text-gray-600 mb-8">
        Welcome, {user?.username}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <StatCard
          title="Total Projects"
          value={dashboardData?.totalProjects}
        />

        <StatCard
          title="Active Projects"
          value={dashboardData?.activeProjects}
        />

        <StatCard
          title="Completed Tasks"
          value={dashboardData?.completedTasks}
        />

        <StatCard
          title="Pending Tasks"
          value={dashboardData?.pendingTasks}
        />

      </div>

    </div>
  );
};

export default Dashboard;