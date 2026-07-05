const Button = ({ children, type = "button", onClick, className = "" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 transition py-3 text-white font-semibold ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
