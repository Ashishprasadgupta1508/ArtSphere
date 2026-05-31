import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, ArrowLeft, CheckCircle } from 'lucide-react';
import { useCreatorStore } from '../store/useCreatorStore';

export default function UploadArtwork() {
  const navigate = useNavigate();
  const { addProject } = useCreatorStore();
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title || !imageUrl) return;

    setIsSubmitting(true);
    addProject({ title, imageUrl });

    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/dashboard');
    }, 800);
  };

  return (
    <div className="container mx-auto px-4 py-12 md:px-8 max-w-4xl">
      <button
        onClick={() => navigate(-1)}
        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      <div className="rounded-3xl border border-border bg-card p-8 shadow-lg">
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.22em] text-primary/70">Upload Artwork</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight">Add a new showcase piece to your portfolio</h1>
          <p className="mt-3 text-muted-foreground">Use this page to publish a polished project preview that clients can browse and hire you for.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-medium">Project title</span>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="E-Commerce UI Refresh"
                className="w-full rounded-2xl border border-input bg-transparent px-4 py-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                required
              />
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium">Cover image URL</span>
              <div className="relative">
                <Camera className="pointer-events-none absolute left-4 top-4 h-5 w-5 text-muted-foreground" />
                <input
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  className="w-full rounded-2xl border border-input bg-transparent px-4 py-3 pl-11 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                  required
                />
              </div>
            </label>
          </div>

          <label className="space-y-2">
            <span className="text-sm font-medium">Project description</span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              placeholder="Tell clients what the project was about, your role, and why it stands out."
              className="w-full rounded-2xl border border-input bg-transparent px-4 py-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            />
          </label>

          {imageUrl && (
            <div className="rounded-3xl border border-border overflow-hidden bg-muted">
              <img src={imageUrl} alt="Artwork preview" className="h-72 w-full object-cover" />
            </div>
          )}

          <button
            type="submit"
            disabled={!title || !imageUrl || isSubmitting}
            className="inline-flex h-12 items-center justify-center rounded-2xl bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Uploading...' : <><CheckCircle className="mr-2 h-4 w-4" /> Publish Artwork</>}
          </button>
        </form>
      </div>
    </div>
  );
}
