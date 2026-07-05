import DashboardLayout from "../components/layout/DashboardLayout";
import WelcomeCard from "../components/dashboard/WelcomeCard";
import StatsCard from "../components/dashboard/StatsCard";
import { FileText, Mic, Trophy, Upload, Brain, BarChart3 } from "lucide-react";
import ActionCard from "../components/dashboard/ActionCard";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <WelcomeCard />

      <div className="grid md:grid-cols-3 gap-6">
        <StatsCard
          title="Resume Score"
          value="91%"
          icon={<FileText />}
          color="bg-indigo-600/20 text-indigo-400"
        />

        <StatsCard
          title="Interviews"
          value="12"
          icon={<Mic />}
          color="bg-cyan-600/20 text-cyan-400"
        />

        <StatsCard
          title="Average Rating"
          value="8.9"
          icon={<Trophy />}
          color="bg-green-600/20 text-green-400"
        />
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>

        <div className="grid md:grid-cols-3 gap-6">
          <ActionCard
            title="Upload Resume"
            description="Upload and analyze your resume with AI."
            icon={<Upload />}
            color="bg-indigo-600/20 text-indigo-400"
            onClick={() => navigate("/resume")}
          />

          <ActionCard
            title="Start Interview"
            description="Practice with an AI interviewer."
            icon={<Brain />}
            color="bg-cyan-600/20 text-cyan-400"
            onClick={() => navigate("/interview")}
          />
          <ActionCard
            title="Performance Reports"
            description="View detailed interview analytics."
            icon={<BarChart3 />}
            color="bg-green-600/20 text-green-400"
            onClick={() => navigate("/report")}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
