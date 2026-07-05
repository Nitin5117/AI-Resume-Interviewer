const AnswerBox = ({ answer, setAnswer }) => {
  return (
    <textarea
      rows={8}
      value={answer}
      onChange={(e) => setAnswer(e.target.value)}
      placeholder="Type your answer here..."
      className="w-full mt-8 bg-slate-900 border border-slate-800 rounded-xl p-5 outline-none focus:border-indigo-500"
    />
  );
};

export default AnswerBox;
