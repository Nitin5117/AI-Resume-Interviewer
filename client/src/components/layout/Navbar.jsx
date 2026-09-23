import { Link } from 'react-router-dom'
import Container from '../ui/Container'
import Button from '../ui/Button'

const Navbar = () => {
  return (
    <nav className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm">
      <Container>
        <div className="flex h-20 items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold tracking-tight text-white">
            AI Interview
          </Link>

          {/* Navigation */}
          <div className="hidden md:flex items-center gap-8"></div>

          {/* Buttons */}
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="secondary" className="min-w-[90px]">
                Login
              </Button>
            </Link>

            <Link to="/register">
              <Button variant="primary" className="min-w-[110px]">
                Register
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </nav>
  )
}

export default Navbar
