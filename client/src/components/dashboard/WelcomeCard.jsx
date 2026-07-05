import useAuth from "../../hooks/useAuth";

const WelcomeCard = () => {
  const { user } = useAuth();

  return (
    <div className="bg-linear-to-r from-indigo-600 to-violet-600 rounded-3xl p-8 mb-8">
      <h1 className="text-4xl font-bold">Welcome back, {user?.firstName} 👋</h1>

      <p className="mt-3 text-indigo-100">Ready to ace your next interview?</p>
    </div>
  );
};

export default WelcomeCard;
