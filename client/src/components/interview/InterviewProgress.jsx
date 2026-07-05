const InterviewProgress = ({ current, total }) => {
  const percent = (current / total) * 100;

  return (
    <div className="mb-8">
      <div className="flex justify-between mb-2">
        <span>Question {current}</span>
        <span>
          {current}/{total}
        </span>
      </div>

      <div className="h-3 bg-slate-800 rounded-full">
        <div
          className="h-3 rounded-full bg-indigo-600 transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};

export default InterviewProgress;
