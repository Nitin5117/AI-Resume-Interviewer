import DashboardLayout from "../components/layout/DashboardLayout";

const Interview = () => {
  return (
    <DashboardLayout>
      <h1 className="text-4xl font-bold">AI Mock Interview</h1>

      <p className="text-slate-400 mt-2">
        Practice with AI generated interview questions.
      </p>

      <div className="mt-10 bg-slate-900 border border-slate-800 rounded-2xl p-8">
        <h2 className="text-2xl font-semibold">Ready to begin?</h2>

        <p className="mt-4 text-slate-400">
          The interview consists of multiple AI-generated questions. Answer them
          one by one and receive an AI performance report.
        </p>

        <button className="mt-8 px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700">
          Start Interview
        </button>
      </div>
    </DashboardLayout>
  );
};

export default Interview;
