import { Link } from "react-router-dom";

import AuthLayout from "../components/layout/AuthLayout";
import AuthCard from "../components/auth/AuthCard";
import RegisterForm from "../components/auth/RegisterForm";

const Register = () => {
  return (
    <AuthLayout>
      <AuthCard
        title="Create Account"
        subtitle="Start your AI Interview journey."
      >
        <RegisterForm />

        <p className="text-center text-slate-400 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-500 hover:underline">
            Login
          </Link>
        </p>
      </AuthCard>
    </AuthLayout>
  );
};

export default Register;
