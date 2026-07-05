import { useState } from "react";

import Input from "../ui/Input";
import Button from "../ui/Button";
import { registerUser } from "../../services/authService";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await registerUser({
        firstName: formData.firstName,
        lastName: formData.lastName,
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      console.log(response);

      alert("Registration Successful");
    } catch (error) {
      console.log(error);
      console.log(error.response);
      console.log(error.response?.data);

      alert(error.response?.data?.message || error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="First Name"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
      />

      <Input
        label="Last Name"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
      />

      <Input
        label="Username"
        name="username"
        value={formData.username}
        onChange={handleChange}
      />

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

      <Input
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
      />

      <Button type="submit" className="mt-3">
        Create Account
      </Button>
    </form>
  );
};

export default RegisterForm;
