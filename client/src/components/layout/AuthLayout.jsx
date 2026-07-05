const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
};

export default AuthLayout;
