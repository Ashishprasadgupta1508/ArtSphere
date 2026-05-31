import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ArrowLeft, Send } from 'lucide-react';
import { MOCK_CREATORS } from '../lib/mockData';

export default function HirePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const creator = MOCK_CREATORS.find(c => c.id === id);

  if (!creator) {
    return <div className="p-8 text-center">Creator not found</div>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const name = (formData.get('name') as string) || '';
    const email = (formData.get('email') as string) || '';
    const projectType = (formData.get('projectType') as string) || '';
    const budget = (formData.get('budget') as string) || '';
    const description = (formData.get('description') as string) || '';

    // navigate to checkout with order details
    setTimeout(() => {
      setIsSubmitting(false);
      navigate(`/hire/${creator.id}/checkout`, {
        state: {
          creatorId: creator.id,
          name,
          email,
          projectType,
          amount: budget,
          description,
        }
      });
    }, 600);
  };

  return (
    <div className="container mx-auto px-4 py-12 md:px-8 max-w-3xl">
      <button 
        onClick={() => navigate(-1)}
        className="mb-8 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Profile
      </button>

      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
        <div className="border-b bg-muted/30 p-8 md:p-10">
          <h1 className="text-3xl font-bold tracking-tight">Hire {creator.name}</h1>
          <p className="mt-2 text-muted-foreground">Fill out the form below to send a project proposal directly to the creator.</p>
          
          <div className="mt-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full overflow-hidden border bg-muted">
              <img src={creator.avatar} alt={creator.name} className="h-full w-full object-cover" />
            </div>
            <div>
              <p className="font-medium">{creator.title}</p>
              <p className="text-sm text-muted-foreground">Hourly Rate: {creator.rate}</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 md:p-10 space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Your Name</label>
              <input name="name" required type="text" className="h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" placeholder="Jane Doe" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Your Email</label>
              <input name="email" required type="email" className="h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" placeholder="jane@company.com" />
            </div>
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium">Project Type</label>
            <select name="projectType" required className="h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
              <option value="">Select a project type...</option>
              <option value="uiux">UI/UX Design</option>
              <option value="branding">Branding & Logo</option>
              <option value="3d">3D & Animation</option>
              <option value="illustration">Illustration</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium">Budget Range (USD)</label>
            <select name="budget" required className="h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
              <option value="">Select your budget...</option>
              <option value="$1,000 - $5,000">$1,000 - $5,000</option>
              <option value="$5,000 - $10,000">$5,000 - $10,000</option>
              <option value="$10,000+">$10,000+</option>
              <option value="hourly">Hourly Rate</option>
            </select>
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium">Project Description</label>
            <textarea name="description"
              required
              className="min-h-[150px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" 
              placeholder="Describe your project, timeline, and what you need from the creator..."
            />
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="inline-flex h-10 w-full items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 disabled:opacity-50"
          >
            {isSubmitting ? 'Sending Proposal...' : <><Send className="mr-2 h-4 w-4" /> Proceed to Payment</>}
          </button>
        </form>
      </div>
    </div>
  );
}
