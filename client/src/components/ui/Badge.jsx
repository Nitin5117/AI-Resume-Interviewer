const Badge = ({ children }) => {
  return (
    <span
      className="
      inline-block
      px-4
      py-2
      rounded-full
      bg-indigo-500/20
      text-indigo-300
      text-sm
      "
    >
      {children}
    </span>
  );
};

export default Badge;
