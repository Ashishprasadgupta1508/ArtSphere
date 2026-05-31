import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Palette, Search, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { useAuthStore } from '../store/useAuthStore';
import { signOutUser } from '../firebase';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const currentUser = useAuthStore((state) => state.currentUser);

  const handleSignOut = async () => {
    await signOutUser();
    useAuthStore.getState().setCurrentUser(null);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
            <Palette className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold tracking-tighter">ArtSphere</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link to="/explore" className="text-muted-foreground transition-colors hover:text-foreground">
              Explore
            </Link>
            <Link to="/dashboard" className="text-muted-foreground transition-colors hover:text-foreground">
              For Creators
            </Link>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <div className="relative hidden lg:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search creators..."
              className="h-9 w-64 rounded-md border border-input bg-transparent px-3 pl-8 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          {currentUser ? (
            <div className="flex items-center gap-3">
              <Link to="/profile" className="inline-flex items-center gap-2 rounded-full border border-input bg-background px-3 py-2 text-sm font-medium text-foreground hover:bg-muted">
                <img
                  src={currentUser.photoURL || '/favicon.svg'}
                  alt={currentUser.displayName ?? 'User'}
                  onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/favicon.svg'; }}
                  className="h-7 w-7 rounded-full object-cover"
                />
                <span>{currentUser.displayName ?? currentUser.email}</span>
              </Link>
              <button
                onClick={handleSignOut}
                className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-muted-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <>
              <Link to="/auth/login" className="text-sm font-medium transition-colors hover:text-foreground text-muted-foreground">
                Sign In
              </Link>
              <Link to="/auth/register" className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                Join Now
              </Link>
            </>
          )}
        </div>

        <button
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden md:hidden border-b border-border/40 bg-background"
          >
            <div className="flex flex-col space-y-4 p-4">
              <Link to="/explore" className="text-sm font-medium" onClick={() => setIsOpen(false)}>
                Explore
              </Link>
              <Link to="/dashboard" className="text-sm font-medium" onClick={() => setIsOpen(false)}>
                For Creators
              </Link>
              <hr className="border-border" />
              {currentUser ? (
                <>
                  <Link to="/profile" className="text-sm font-medium" onClick={() => setIsOpen(false)}>
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setIsOpen(false);
                    }}
                    className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-muted-foreground"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/auth/login" className="text-sm font-medium" onClick={() => setIsOpen(false)}>
                    Sign In
                  </Link>
                  <Link to="/auth/register" className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground" onClick={() => setIsOpen(false)}>
                    Join Now
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
