import { Link } from "react-router-dom";
import Container from "../ui/Container";
import Button from "../ui/Button";

const Navbar = () => {
  return (
    <nav className="border-b border-slate-800">
      <Container>
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-white">
            AI Interview
          </Link>

          {/* Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-slate-300 hover:text-white">
              Features
            </a>

            <a href="#how-it-works" className="text-slate-300 hover:text-white">
              How it Works
            </a>

            <a href="#pricing" className="text-slate-300 hover:text-white">
              Pricing
            </a>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="secondary">Login</Button>
            </Link>

            <Link to="/register">
              <Button>Register</Button>
            </Link>
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
