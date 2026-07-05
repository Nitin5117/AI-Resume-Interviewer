import Button from "../ui/Button";
import Container from "../ui/Container";

const Navbar = () => {
  return (
    <header className="border-b border-slate-800">
      <Container>
        <nav className="flex items-center justify-between h-20">
          <h1 className="text-2xl font-bold text-indigo-400">InterviewAI</h1>

          <ul className="hidden md:flex gap-8 text-slate-300">
            <li>Features</li>
            <li>How it Works</li>
            <li>About</li>
          </ul>

          <Button>Get Started</Button>
        </nav>
      </Container>
    </header>
  );
};

export default Navbar;
