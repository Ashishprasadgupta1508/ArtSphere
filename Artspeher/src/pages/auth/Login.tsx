import { Link, useNavigate } from 'react-router-dom';
import { Globe, Palette, LogIn } from 'lucide-react';
import { motion } from 'framer-motion';
import { signInWithGoogle } from '../../firebase';
import { useEffect, useState } from 'react';
import { useAuthStore } from '../../store/useAuthStore';

export default function Login() {
  const navigate = useNavigate();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const currentUser = useAuthStore((state) => state.currentUser);
  const setCurrentUser = useAuthStore((state) => state.setCurrentUser);

  useEffect(() => {
    if (currentUser) {
      navigate('/', { replace: true });
    }
  }, [currentUser, navigate]);

  const handleGoogleSignIn = async () => {
    setIsSigningIn(true);
    const user = await signInWithGoogle();

    if (user) {
      setCurrentUser(user);
      navigate('/');
      return;
    }

    setIsSigningIn(false);
    alert('Google sign-in failed. Please try again.');
  };

  return (
    <div className="container relative flex h-[calc(100vh-4rem)] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-primary" />
        <div className="relative z-20 flex items-center gap-2 text-lg font-medium">
          <Palette className="h-6 w-6" />
          ArtSphere
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;ArtSphere completely transformed how I get clients. My portfolio looks stunning, and the hiring process is seamless.&rdquo;
            </p>
            <footer className="text-sm">Sofia Davis, Digital Artist</footer>
          </blockquote>
        </div>
      </div>
      <div className="p-8 lg:p-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]"
        >
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
            <p className="text-sm text-muted-foreground">
              Sign in with Google to access your creator dashboard.
            </p>
          </div>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isSigningIn}
            className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-input bg-background px-4 py-3 text-sm font-medium shadow-sm transition hover:bg-accent hover:text-accent-foreground disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Globe className="h-5 w-5" />
            {isSigningIn ? 'Signing in with Google...' : 'Continue with Google'}
          </button>

          <div className="grid gap-6">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <label htmlFor="email" className="text-sm font-medium leading-none">Email</label>
                  <input
                    id="email"
                    placeholder="name@example.com"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="password" className="text-sm font-medium leading-none">Password</label>
                  <input
                    id="password"
                    type="password"
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <button className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                  <LogIn className="mr-2 h-4 w-4" /> Sign In
                </button>
              </div>
            </form>
          </div>
          <p className="px-8 text-center text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link to="/auth/register" className="underline underline-offset-4 hover:text-primary">
              Sign up
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
