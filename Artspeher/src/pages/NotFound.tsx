import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-24 text-center md:px-8">
      <div className="inline-flex flex-col items-center gap-4 rounded-3xl border border-border bg-card px-8 py-14 shadow-lg">
        <AlertTriangle className="h-12 w-12 text-primary" />
        <h1 className="text-4xl font-bold tracking-tight">Page not found</h1>
        <p className="max-w-xl text-sm text-muted-foreground">The page you are looking for doesn’t exist or has been moved. Return to the dashboard or explore talented creators instead.</p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link to="/" className="inline-flex h-11 items-center justify-center rounded-2xl bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition hover:bg-primary/90">Home</Link>
          <Link to="/explore" className="inline-flex h-11 items-center justify-center rounded-2xl border border-input bg-background px-6 text-sm font-medium text-muted-foreground transition hover:bg-muted">Explore Creators</Link>
        </div>
      </div>
    </div>
  );
}
