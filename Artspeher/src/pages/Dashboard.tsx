import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, Heart, MessageSquare, Briefcase, Plus, Settings } from 'lucide-react';
import { MOCK_CREATORS } from '../lib/mockData';

export default function Dashboard() {
  // Mock current user
  const currentUser = MOCK_CREATORS[0];

  const stats = [
    { label: 'Profile Views', value: '1,245', icon: <Eye className="h-4 w-4 text-muted-foreground" />, change: '+12.5%' },
    { label: 'Project Likes', value: '746', icon: <Heart className="h-4 w-4 text-muted-foreground" />, change: '+5.2%' },
    { label: 'Hire Requests', value: '8', icon: <Briefcase className="h-4 w-4 text-muted-foreground" />, change: '+2' },
    { label: 'Messages', value: '14', icon: <MessageSquare className="h-4 w-4 text-muted-foreground" />, change: '3 unread' },
  ];

  return (
    <div className="container mx-auto px-4 py-8 md:px-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {currentUser.name}. Here's what's happening.</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            to="/dashboard/build"
            className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
          >
            <Plus className="mr-2 h-4 w-4" /> Add Project
          </Link>
          <Link
            to="/dashboard/upload"
            className="inline-flex h-11 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            Upload Artwork
          </Link>
          <button className="inline-flex h-11 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground">
            <Settings className="mr-2 h-4 w-4" /> Settings
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-xl border bg-card p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
              {stat.icon}
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <h2 className="text-3xl font-bold tracking-tight">{stat.value}</h2>
              <span className="text-xs font-medium text-green-500">{stat.change}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        {/* Recent Projects */}
        <div className="lg:col-span-2 rounded-xl border bg-card shadow-sm">
          <div className="border-b p-6 flex items-center justify-between">
            <h2 className="font-semibold text-lg">Manage Portfolio</h2>
            <Link to="/dashboard/build" className="text-sm font-medium text-primary hover:underline">View all</Link>
          </div>
          <div className="p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              {currentUser.projects.slice(0, 2).map(project => (
                <div key={project.id} className="group relative overflow-hidden rounded-lg border bg-muted">
                  <div className="aspect-video w-full">
                    <img src={project.imageUrl} alt={project.title} className="h-full w-full object-cover" />
                  </div>
                  <div className="p-3 bg-card border-t">
                    <p className="font-medium text-sm truncate">{project.title}</p>
                    <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                      <Heart className="h-3 w-3" /> {project.likes} likes
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity / Requests */}
        <div className="rounded-xl border bg-card shadow-sm">
          <div className="border-b p-6">
            <h2 className="font-semibold text-lg">Recent Requests</h2>
          </div>
          <div className="p-0">
            <div className="divide-y">
              {[
                { name: "Acme Corp", role: "UI/UX Redesign", time: "2 hours ago", status: "New" },
                { name: "TechStart", role: "Landing Page", time: "1 day ago", status: "In Progress" },
                { name: "Designify", role: "Brand Identity", time: "3 days ago", status: "Completed" },
              ].map((req, i) => (
                <div key={i} className="flex items-start gap-4 p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    {req.name.charAt(0)}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{req.name}</p>
                    <p className="text-sm text-muted-foreground">{req.role}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">{req.time}</p>
                    <span className="mt-1 inline-block rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium">
                      {req.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
