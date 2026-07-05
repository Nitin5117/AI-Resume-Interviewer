import { Link } from "react-router-dom";

import AuthLayout from "../components/layout/AuthLayout";
import AuthCard from "../components/auth/AuthCard";
import LoginForm from "../components/auth/LoginForm";

const Login = () => {
  return (
    <AuthLayout>
      <AuthCard
        title="Welcome Back"
        subtitle="Login to continue your AI Interview journey."
      >
        <LoginForm />

        <p className="text-center text-slate-400 mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-indigo-500 hover:underline">
            Register
          </Link>
        </p>
      </AuthCard>
    </AuthLayout>
  );
};

export default Login;
