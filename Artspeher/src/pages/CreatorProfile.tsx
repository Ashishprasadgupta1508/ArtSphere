import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Link as LinkIcon, Mail, Heart } from 'lucide-react';
import { MOCK_CREATORS } from '../lib/mockData';

export default function CreatorProfile() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const creator = MOCK_CREATORS.find(c => c.id === id);

  if (!creator) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-3xl font-bold">Creator not found</h1>
        <button onClick={() => navigate('/explore')} className="mt-4 text-primary hover:underline">
          Back to Explore
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/10 pb-20">
      {/* Cover Image */}
      <div className="h-64 w-full md:h-80 lg:h-[400px]">
        <img 
          src={creator.coverImage} 
          alt="Cover" 
          className="h-full w-full object-cover"
        />
      </div>

      <div className="container mx-auto px-4 md:px-8">
        <div className="relative -mt-20 flex flex-col md:-mt-24 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col md:flex-row md:items-end md:gap-6">
            <div className="h-32 w-32 shrink-0 rounded-full border-4 border-background bg-muted md:h-40 md:w-40 shadow-xl overflow-hidden">
              <img src={creator.avatar} alt={creator.name} className="h-full w-full object-cover" />
            </div>
            <div className="mt-4 md:mt-0 md:pb-2">
              <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">{creator.name}</h1>
              <p className="text-lg text-muted-foreground">{creator.title}</p>
            </div>
          </div>
          
          <div className="mt-6 flex gap-3 md:mt-0 md:pb-2">
            <button className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground">
              <Heart className="mr-2 h-4 w-4" /> Follow
            </button>
            <Link 
              to={`/hire/${creator.id}`}
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
            >
              Hire Me
            </Link>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Sidebar / Info */}
          <div className="space-y-8 lg:col-span-1">
            <section>
              <h2 className="text-xl font-semibold mb-4">About</h2>
              <p className="text-muted-foreground leading-relaxed">{creator.bio}</p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-4">Details</h2>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-center gap-2"><MapPin className="h-4 w-4" /> San Francisco, CA</li>
                <li className="flex items-center gap-2"><LinkIcon className="h-4 w-4" /> <a href="#" className="hover:text-foreground hover:underline">portfolio.com</a></li>
                <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> <a href="#" className="hover:text-foreground hover:underline">Contact directly</a></li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {creator.skills.map(skill => (
                  <span key={skill} className="inline-flex items-center rounded-md border bg-card px-3 py-1 text-sm font-medium shadow-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </section>
            
            <section className="rounded-xl border bg-card p-6 shadow-sm">
              <h3 className="font-semibold text-lg">Hourly Rate</h3>
              <p className="text-3xl font-bold tracking-tight mt-2">{creator.rate}</p>
              <p className="text-sm text-muted-foreground mt-1">Available for freelance opportunities</p>
            </section>
          </div>

          {/* Portfolio Grid */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Portfolio</h2>
            </div>
            
            <div className="grid gap-6 sm:grid-cols-2">
              {creator.projects.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-muted cursor-pointer"
                >
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end p-6">
                    <div className="text-white">
                      <h3 className="font-bold text-lg">{project.title}</h3>
                      <div className="flex items-center gap-1 mt-1 text-sm text-white/80">
                        <Heart className="h-4 w-4 fill-white/80" /> {project.likes}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
