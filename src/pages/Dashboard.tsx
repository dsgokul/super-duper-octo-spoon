// pages/Dashboard.tsx
import DonutChart from "./components/DashboardComponents/DonutChart";
import SkillsDistribution from "./components/SkillsDistribution";
import TopSkillsChart from "./components/DashboardComponents/TopSkillsChart";
import { useTrainerStore } from "../store/useTrainerStore";
import TopTrainersByRating from "./components/DashboardComponents/TopTrainersByRating";

const Dashboard = () => {
  const trainers = useTrainerStore((state) => state.trainers);

  // Calculate cities data from actual trainers
  const citiesData = Object.entries(
    trainers.reduce((acc: { [key: string]: number }, trainer) => {
      acc[trainer.city] = (acc[trainer.city] || 0) + 1;
      return acc;
    }, {})
  )
    .map(([name, value], index) => ({
      name,
      value,
      // Rotate through colors for different cities
      color: [
        "#34D399", // green
        "#F97316", // orange
        "#6366F1", // indigo
        "#F43F5E", // pink
        "#F59E0B", // amber
        "#8B5CF6", // purple
        "#EC4899", // pink
        "#10B981", // emerald
      ][index % 8],
    }))
    .sort((a, b) => b.value - a.value) // Sort by highest count
    .slice(0, 5); // Take top 5 cities

  return (
    <div className="p-6">
      {/* Filter Controls */}
      <div className=" hidden justify-end mb-6 space-x-4">
        <div className="relative">
          <div className="flex items-center border rounded-md p-2 w-40">
            <span className="text-sm text-gray-600 mr-1">Filter:</span>
            <span className="text-sm font-medium">Prequalified</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-chevron-down ml-auto"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
              />
            </svg>
          </div>
        </div>

        <div className="relative">
          <div className="flex items-center border rounded-md p-2 w-44">
            <span className="text-sm text-gray-600 mr-1">Source:</span>
            <span className="text-sm font-medium">Reference</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-chevron-down ml-auto"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="grid grid-cols-2 gap-6">
        {/* Skills Distribution Component */}
        <SkillsDistribution />

        {/* Trainer Distribution Across Geographies */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4">
            <h2 className="text-lg font-medium">Cities</h2>
            <DonutChart title="" data={citiesData} />
          </div>
        </div>

        {/* Top Skills Offered */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-medium mb-4">
            Top Skills Offered By Trainers
          </h2>
          <div>
            <TopSkillsChart />
          </div>
        </div>

        {/* Top Trainers By Rating */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-center">
            <TopTrainersByRating />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
