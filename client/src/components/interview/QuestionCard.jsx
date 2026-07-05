const QuestionCard = ({ question }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
      <h2 className="text-xl font-semibold mb-6">Interview Question</h2>

      <p className="text-lg leading-8">{question}</p>
    </div>
  );
};

export default QuestionCard;
