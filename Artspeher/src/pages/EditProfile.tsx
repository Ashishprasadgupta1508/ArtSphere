import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, User as UserIcon } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { getUserFromFirestore, updateUserProfile } from '../firebase';

export default function EditProfile() {
  const navigate = useNavigate();
  const currentUser = useAuthStore((s) => s.currentUser);
  const setCurrentUser = useAuthStore((s) => s.setCurrentUser);

  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: '',
    photoURL: '',
    bio: '',
    location: '',
    website: '',
    skills: '',
  });

  useEffect(() => {
    if (!currentUser) {
      navigate('/auth/login');
      return;
    }

    let mounted = true;
    (async () => {
      try {
        const doc = await getUserFromFirestore(currentUser.uid as string);
        if (!mounted) return;
        setForm({
          name: doc?.name || currentUser.displayName || '',
          photoURL: doc?.photoURL || currentUser.photoURL || '',
          bio: doc?.bio || '',
          location: doc?.location || '',
          website: doc?.website || '',
          skills: (doc?.skills || []).join ? (doc?.skills || []).join(', ') : (doc?.skills || ''),
        });
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => { mounted = false; };
  }, [currentUser, navigate]);

  const onChange = (k: string, v: string) => setForm((s) => ({ ...s, [k]: v }));

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    setLoading(true);
    const skillsArray = form.skills.split(',').map(s => s.trim()).filter(Boolean);
    try {
      await updateUserProfile(currentUser.uid as string, {
        name: form.name,
        photoURL: form.photoURL,
        bio: form.bio,
        location: form.location,
        website: form.website,
        skills: skillsArray,
        updatedAt: new Date().toISOString(),
      });

      setCurrentUser({ ...currentUser, displayName: form.name, photoURL: form.photoURL } as any);
      alert('Profile updated');
      navigate('/profile');
    } catch (err) {
      console.error(err);
      alert('Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser) return null;

  return (
    <div className="container mx-auto px-4 py-12 md:px-8 max-w-3xl">
      <div className="mb-6 flex items-center gap-3">
        <UserIcon className="h-6 w-6" />
        <h1 className="text-2xl font-bold">Edit Profile</h1>
      </div>

      <form onSubmit={handleSave} className="rounded-xl border bg-card p-8 shadow-sm space-y-6">
        <div className="grid gap-2">
          <label className="text-sm font-medium">Full Name</label>
          <input value={form.name} onChange={(e) => onChange('name', e.target.value)} className="h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm" />
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-medium">Profile Photo URL</label>
          <input value={form.photoURL} onChange={(e) => onChange('photoURL', e.target.value)} className="h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm" />
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-medium">Bio</label>
          <textarea value={form.bio} onChange={(e) => onChange('bio', e.target.value)} className="min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm" />
        </div>

        <div className="grid gap-2 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium">Location</label>
            <input value={form.location} onChange={(e) => onChange('location', e.target.value)} className="h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="text-sm font-medium">Website</label>
            <input value={form.website} onChange={(e) => onChange('website', e.target.value)} className="h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm" />
          </div>
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-medium">Skills (comma separated)</label>
          <input value={form.skills} onChange={(e) => onChange('skills', e.target.value)} className="h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm" />
        </div>

        <div className="flex justify-end">
          <button type="submit" disabled={loading} className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
            <Save className="h-4 w-4" /> Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
