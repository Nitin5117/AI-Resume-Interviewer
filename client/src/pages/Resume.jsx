import DashboardLayout from "../components/layout/DashboardLayout";
import ResumeHeader from "../components/resume/ResumeHeader";
import ResumeUploader from "../components/resume/ResumeUploader";
import ResumeScoreCard from "../components/resume/ResumeScoreCard";
import ResumeKeywords from "../components/resume/ResumeKeywords";
import ResumeTips from "../components/resume/ResumeTips";

const Resume = () => {
  return (
    <DashboardLayout>
      <ResumeHeader />

      <div className="mt-8">
        <ResumeUploader />
      </div>

      <div className="mt-10">
        <ResumeScoreCard />
      </div>

      <div className="grid md:grid-cols-2 gap-8 mt-8">
        <ResumeKeywords />
        <ResumeTips />
      </div>
    </DashboardLayout>
  );
};

export default Resume;
