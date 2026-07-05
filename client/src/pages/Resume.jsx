import DashboardLayout from "../components/layout/DashboardLayout";
import ResumeHeader from "../components/resume/ResumeHeader";
import ResumeUploader from "../components/resume/ResumeUploader";

const Resume = () => {
  return (
    <DashboardLayout>
      <ResumeHeader />

      <div className="mt-8">
        <ResumeUploader />
      </div>
    </DashboardLayout>
  );
};

export default Resume;
