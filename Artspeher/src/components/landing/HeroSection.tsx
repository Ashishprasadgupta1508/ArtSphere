import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import type { User } from 'firebase/auth';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function HeroSection({ currentUser }: { currentUser: User | null }) {
  const isVerified = currentUser?.emailVerified ?? false;
  const userName = currentUser?.displayName || currentUser?.email?.split('@')[0] || 'creator';

  return (
    <section className="relative overflow-hidden pt-24 pb-32 lg:pt-36 lg:pb-40">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background"></div>
      <div className="container mx-auto px-4 text-center md:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          className="mx-auto max-w-4xl"
        >
          {currentUser ? (
            <div className="mb-6 inline-flex items-center justify-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              Welcome back, <span className="font-semibold">{userName}</span>! {isVerified ? 'Your account is verified.' : 'Please verify your email to unlock full access.'}
            </div>
          ) : (
            <div className="mb-6 inline-flex items-center justify-center gap-2 rounded-full border border-secondary/20 bg-secondary/5 px-4 py-2 text-sm font-medium text-secondary">
              <CheckCircle2 className="h-4 w-4 text-secondary" />
              Sign in with Google to save your portfolio and get discovered.
            </div>
          )}

          <motion.h1 variants={fadeIn} className="text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
            Showcase Your Vision.<br />
            <span className="text-muted-foreground">Get Discovered.</span>
          </motion.h1>
          <motion.p variants={fadeIn} className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            ArtSphere is the premium destination for top creative talent to build stunning portfolios and connect with clients worldwide.
          </motion.p>
          <motion.div variants={fadeIn} className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/auth/register"
              className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
            >
              Start Building Free
            </Link>
            <Link
              to="/explore"
              className="inline-flex h-12 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Explore Talent <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
