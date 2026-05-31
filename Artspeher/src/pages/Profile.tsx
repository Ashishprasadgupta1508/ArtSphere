import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, User as UserIcon } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { getUserFromFirestore } from '../firebase';

export default function Profile() {
  const navigate = useNavigate();
  const currentUser = useAuthStore((s) => s.currentUser);

  const [profile, setProfile] = useState({
    name: '',
    photoURL: '',
    bio: '',
    location: '',
    website: '',
    skills: [] as string[],
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
        setProfile({
          name: doc?.name || currentUser.displayName || '',
          photoURL: doc?.photoURL || currentUser.photoURL || '',
          bio: doc?.bio || '',
          location: doc?.location || '',
          website: doc?.website || '',
          skills: Array.isArray(doc?.skills) ? doc.skills : (doc?.skills ? String(doc.skills).split(',').map((skill: string) => skill.trim()).filter(Boolean) : []),
        });
      } finally {
        // profile load complete
      }
    })();

    return () => { mounted = false; };
  }, [currentUser, navigate]);

  if (!currentUser) return null;

  return (
    <div className="container mx-auto px-4 py-12 md:px-8 max-w-3xl">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <UserIcon className="h-6 w-6" />
          <div>
            <h1 className="text-2xl font-bold">Your Profile</h1>
            <p className="text-sm text-muted-foreground">Manage your creator profile and update your details anytime.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Link to="/profile/edit" className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90">
            Edit Profile
          </Link>
          <button onClick={() => navigate(-1)} className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </button>
        </div>
      </div>

      <div className="rounded-xl border bg-card p-8 shadow-sm">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="h-20 w-20 overflow-hidden rounded-full border bg-muted">
              <img
                src={profile.photoURL || '/favicon.svg'}
                alt={profile.name || currentUser.displayName || 'User avatar'}
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/favicon.svg'; }}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-xl font-semibold">{profile.name || currentUser.displayName || 'Your Name'}</h2>
              <p className="text-sm text-muted-foreground">{currentUser.email}</p>
            </div>
          </div>
          <div className="grid gap-2 text-sm text-muted-foreground">
            <div>{profile.location || 'Location not set'}</div>
            {profile.website ? (
              <a href={profile.website} className="text-primary hover:underline" target="_blank" rel="noreferrer">{profile.website}</a>
            ) : (
              <div>Website not set</div>
            )}
          </div>
        </div>

        <div className="mt-8 space-y-6">
          <section>
            <h3 className="text-lg font-semibold">About</h3>
            <p className="mt-2 text-muted-foreground">{profile.bio || 'No bio has been added yet.'}</p>
          </section>

          <section>
            <h3 className="text-lg font-semibold">Skills</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {profile.skills.length ? profile.skills.map((skill) => (
                <span key={skill} className="rounded-full border border-input px-3 py-1 text-sm text-muted-foreground">{skill}</span>
              )) : <span className="text-sm text-muted-foreground">No skills listed yet.</span>}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
