import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getDashboard } from "../services/dashboardService";
import Loader from "../components/Loader";

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

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-gray-500">Total Projects</h2>

          <p className="text-3xl font-bold mt-2">
            {dashboardData?.totalProjects}
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-gray-500">Total Tasks</h2>

          <p className="text-3xl font-bold mt-2">
            {dashboardData?.totalTasks}
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-gray-500">
            Completed Tasks
          </h2>

          <p className="text-3xl font-bold mt-2">
            {dashboardData?.completedTasks}
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-gray-500">
            Pending Tasks
          </h2>

          <p className="text-3xl font-bold mt-2">
            {dashboardData?.pendingTasks}
          </p>
        </div>

      </div>

    </div>
  );
};

export default Dashboard;