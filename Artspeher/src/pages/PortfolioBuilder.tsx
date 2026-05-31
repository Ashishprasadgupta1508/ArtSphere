import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { GripVertical, Trash2, Plus, Image as ImageIcon, Save } from 'lucide-react';
import { useCreatorStore } from '../store/useCreatorStore';

export default function PortfolioBuilder() {
  const { currentUser, updateProfile, addProject, removeProject } = useCreatorStore();
  
  const [bio, setBio] = useState(currentUser.bio);
  const [skills, setSkills] = useState(currentUser.skills.join(', '));
  const [newProjectTitle, setNewProjectTitle] = useState('');
  const [newProjectImage, setNewProjectImage] = useState('');

  const handleSaveProfile = () => {
    updateProfile({
      bio,
      skills: skills.split(',').map(s => s.trim()).filter(Boolean)
    });
    alert('Profile updated successfully!');
  };

  const handleAddProject = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newProjectTitle || !newProjectImage) return;
    
    addProject({
      title: newProjectTitle,
      imageUrl: newProjectImage
    });
    setNewProjectTitle('');
    setNewProjectImage('');
  };

  return (
    <div className="container mx-auto px-4 py-8 md:px-8 max-w-5xl">
      <div className="mb-8 flex items-center justify-between border-b pb-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Portfolio Builder</h1>
          <p className="text-muted-foreground">Customize your profile and manage your projects.</p>
        </div>
        <button 
          onClick={handleSaveProfile}
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
        >
          <Save className="mr-2 h-4 w-4" /> Save Changes
        </button>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {/* Profile Settings */}
        <div className="space-y-6 md:col-span-1">
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <h2 className="font-semibold text-lg mb-4">Basic Info</h2>
            
            <div className="space-y-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Bio</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  placeholder="Tell clients about yourself..."
                />
              </div>
              
              <div className="grid gap-2">
                <label className="text-sm font-medium">Skills (comma separated)</label>
                <input
                  type="text"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  placeholder="UI Design, Figma, React..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Project Management */}
        <div className="space-y-6 md:col-span-2">
          {/* Add New Project */}
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <h2 className="font-semibold text-lg mb-4">Add New Project</h2>
            <form onSubmit={handleAddProject} className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 space-y-2">
                <input
                  type="text"
                  value={newProjectTitle}
                  onChange={(e) => setNewProjectTitle(e.target.value)}
                  placeholder="Project Title"
                  className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
                <div className="relative">
                  <ImageIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <input
                    type="url"
                    value={newProjectImage}
                    onChange={(e) => setNewProjectImage(e.target.value)}
                    placeholder="Image URL (Unsplash, etc.)"
                    className="w-full rounded-md border border-input bg-transparent pl-9 pr-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  />
                </div>
              </div>
              <button 
                type="submit"
                disabled={!newProjectTitle || !newProjectImage}
                className="inline-flex h-10 items-center justify-center rounded-md bg-secondary text-secondary-foreground px-4 text-sm font-medium shadow-sm transition-colors hover:bg-secondary/80 disabled:opacity-50"
              >
                <Plus className="mr-2 h-4 w-4" /> Add
              </button>
            </form>
          </div>

          {/* Project List */}
          <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
            <div className="border-b bg-muted/50 px-6 py-3">
              <h2 className="font-semibold">Your Portfolio ({currentUser.projects.length})</h2>
            </div>
            <div className="divide-y">
              {currentUser.projects.map((project) => (
                <motion.div 
                  key={project.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-4 p-4 hover:bg-muted/30 transition-colors"
                >
                  <GripVertical className="h-5 w-5 text-muted-foreground cursor-move" />
                  <div className="h-16 w-24 shrink-0 rounded overflow-hidden bg-muted">
                    <img src={project.imageUrl} alt={project.title} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{project.title}</p>
                    <p className="text-xs text-muted-foreground">{project.likes} likes</p>
                  </div>
                  <button 
                    onClick={() => removeProject(project.id)}
                    className="p-2 text-muted-foreground hover:text-destructive transition-colors rounded-md hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </motion.div>
              ))}
              
              {currentUser.projects.length === 0 && (
                <div className="p-8 text-center text-muted-foreground">
                  No projects yet. Add your first project above!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
