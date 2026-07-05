import { motion } from "framer-motion";
import Button from "../Button";
import Container from "../Container";
import Badge from "../Badge";

const Hero = () => {
  return (
    <section className="py-28">
      <Container>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Badge> AI Powered Interview Platform</Badge>

            <h1 className="mt-6 text-6xl font-bold leading-tight">
              Practice Smarter.
              <br />
              Interview Better.
            </h1>

            <p className="mt-6 text-slate-400 text-lg">
              Upload your resume, practice AI-generated interviews, receive
              instant feedback, and track your growth.
            </p>

            <div className="mt-10 flex gap-4">
              <Button>Get Started</Button>
              <Button>Watch Demo</Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="rounded-3xl border border-slate-700 bg-slate-900 p-10">
              <h3 className="text-xl font-semibold">AI Interview Dashboard</h3>

              <div className="mt-8 space-y-4">
                <div className="bg-slate-800 rounded-xl p-5">
                  Resume Score
                  <span className="float-right font-bold text-green-400">
                    91%
                  </span>
                </div>

                <div className="bg-slate-800 rounded-xl p-5">
                  Interview Score
                  <span className="float-right font-bold text-indigo-400">
                    89%
                  </span>
                </div>

                <div className="bg-slate-800 rounded-xl p-5">
                  Confidence
                  <span className="float-right font-bold text-cyan-400">
                    High
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
