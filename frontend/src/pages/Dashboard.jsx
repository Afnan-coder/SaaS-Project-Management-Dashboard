import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getDashboard } from "../services/dashboardService";
import Loader from "../components/Loader";
import StatCard from "../components/StatCard";

import {
  FaProjectDiagram,
  FaPlayCircle,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

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

      <h1 className="text-3xl font-bold">
        Dashboard
      </h1>

      <p className="text-gray-500 mt-2 mb-5">
        Welcome back, {user?.username}! 👋
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <StatCard
          title="Total Projects"
          value={dashboardData?.totalProjects}
          icon={<FaProjectDiagram />}
          colorClass="bg-blue-100 text-blue-600"
        />

        <StatCard
          title="Active Projects"
          value={dashboardData?.activeProjects}
          icon={<FaPlayCircle />}
          colorClass="bg-green-100 text-green-600"
        />

        <StatCard
          title="Completed Tasks"
          value={dashboardData?.completedTasks}
          icon={<FaCheckCircle />}
          colorClass="bg-purple-100 text-purple-600"
        />

        <StatCard
          title="Pending Tasks"
          value={dashboardData?.pendingTasks}
          icon={<FaClock />}
          colorClass="bg-orange-100 text-orange-600"
        />

      </div>

    </div>
  );
};

export default Dashboard;