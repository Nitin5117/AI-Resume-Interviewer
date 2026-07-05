import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import Input from "../ui/Input";
import Button from "../ui/Button";
import Spinner from "../ui/Spinner";

import { loginUser } from "../../services/authService";
import useAuth from "../../hooks/useAuth";
import getErrorMessage from "../../utils/getErrorMessage";

const LoginForm = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await loginUser(formData);

      login(response.token, response.user);

      toast.success("Login Successful");

      navigate("/dashboard");
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />

      <Input
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />

      <Button type="submit" className="mt-4 w-full" disabled={loading}>
        {loading ? <Spinner /> : "Login"}
      </Button>
    </form>
  );
};

export default LoginForm;
