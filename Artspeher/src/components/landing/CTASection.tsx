import { Link } from 'react-router-dom';

export default function CTASection() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="rounded-3xl bg-primary px-6 py-16 text-center text-primary-foreground sm:px-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to elevate your career?</h2>
          <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">
            Join thousands of creators who are already using ArtSphere to land their dream projects.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link to="/auth/register" className="inline-flex h-12 items-center justify-center rounded-md bg-background px-6 text-sm font-medium text-primary-foreground shadow">
              Get Started
            </Link>
            <Link to="/explore" className="inline-flex h-12 items-center justify-center rounded-md border border-input bg-primary/10 px-6 text-sm font-medium shadow">
              Browse Creators
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
