import { motion } from 'framer-motion'
import Button from '../Button'
import Container from '../Container'
import Badge from '../Badge'

const Hero = () => {
  return (
    <section className="py-28">
      <Container>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}>
            <Badge> AI Powered Interview Platform</Badge>

            <h1 className="mt-6 text-6xl font-bold leading-tight">
              Practice Smarter.
              <br />
              Interview Better.
            </h1>

            <p className="mt-6 text-slate-400 text-lg">
              Upload your resume, practice AI-generated interviews, receive instant feedback, and
              track your growth.
            </p>

            <div className="mt-10 flex gap-4">
              <Button>Get Started</Button>
              <Button>Watch Demo</Button>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}>
            <div className="rounded-3xl border border-slate-700 bg-slate-900 p-10 shadow-2xl shadow-indigo-950/40">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">Welcome aboard</h3>
                <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-medium text-emerald-300">
                  Online
                </span>
              </div>

              <div className="mt-8 space-y-4">
                <div className="rounded-xl border border-slate-700 bg-slate-800 p-5">
                  <p className="text-sm text-slate-300">Your AI prep starts here</p>
                  <p className="mt-2 text-2xl font-bold text-white">Ready to begin</p>
                </div>

                <div className="rounded-xl border border-slate-700 bg-slate-800 p-5">
                  <p className="text-sm text-slate-300">Access</p>
                  <p className="mt-2 text-xl font-semibold text-indigo-300">Login / Signup</p>
                </div>

                <div className="rounded-xl border border-slate-700 bg-slate-800 p-5">
                  <p className="text-sm text-slate-300">Next step</p>
                  <p className="mt-2 text-xl font-semibold text-cyan-300">Create your profile</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}

export default Hero
