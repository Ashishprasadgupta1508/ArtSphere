import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Filter, Star } from 'lucide-react';
import { MOCK_CREATORS } from '../lib/mockData';

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'UI/UX Design', '3D Art', 'Branding', 'Illustration', 'Motion Graphics'];

  const filteredCreators = MOCK_CREATORS.filter(creator => {
    const matchesSearch = creator.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          creator.title.toLowerCase().includes(searchQuery.toLowerCase());
    // In a real app, category filtering would map more cleanly to skills/tags
    const matchesCategory = activeCategory === 'All' || creator.skills.some(skill => skill.includes(activeCategory.split(' ')[0]));
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-12 md:px-8">
      <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Explore Talent</h1>
          <p className="mt-4 text-lg text-muted-foreground">Discover top creators and their breathtaking portfolios.</p>
        </div>
        
        <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search creators..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 w-full rounded-md border border-input bg-transparent px-3 pl-8 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <button className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground">
            <Filter className="mr-2 h-4 w-4" /> Filters
          </button>
        </div>
      </div>

      <div className="mb-8 flex space-x-2 overflow-x-auto pb-4 scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`inline-flex h-9 items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring whitespace-nowrap ${
              activeCategory === category
                ? 'bg-primary text-primary-foreground shadow hover:bg-primary/90'
                : 'bg-muted hover:bg-muted/80 text-muted-foreground'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCreators.map((creator, i) => (
          <motion.div
            key={creator.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md"
          >
            {/* Top Project Preview */}
            <div className="relative aspect-video w-full overflow-hidden bg-muted">
              {creator.projects[0] && (
                <img
                  src={creator.projects[0].imageUrl}
                  alt={creator.projects[0].title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              )}
              <div className="absolute top-2 right-2 rounded-full bg-background/90 px-2 py-1 text-xs font-medium text-foreground backdrop-blur-sm shadow-sm flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                Top Rated
              </div>
            </div>

            {/* Creator Info */}
            <div className="p-5">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full border bg-muted">
                  <img src={creator.avatar} alt={creator.name} className="h-full w-full object-cover" />
                </div>
                <div className="flex-1 overflow-hidden">
                  <Link to={`/creator/${creator.id}`} className="font-semibold hover:underline">
                    {creator.name}
                  </Link>
                  <p className="truncate text-sm text-muted-foreground">{creator.title}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{creator.rate}</p>
                </div>
              </div>
              
              <div className="mt-4 flex flex-wrap gap-2">
                {creator.skills.slice(0, 3).map(skill => (
                  <span key={skill} className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                    {skill}
                  </span>
                ))}
                {creator.skills.length > 3 && (
                  <span className="inline-flex items-center rounded-md border border-transparent bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">
                    +{creator.skills.length - 3}
                  </span>
                )}
              </div>

              <div className="mt-6 flex gap-3">
                <Link
                  to={`/creator/${creator.id}`}
                  className="inline-flex flex-1 items-center justify-center rounded-md border border-input bg-background h-9 px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  View Profile
                </Link>
                <Link
                  to={`/hire/${creator.id}`}
                  className="inline-flex flex-1 items-center justify-center rounded-md bg-primary h-9 px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
                >
                  Hire Me
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {filteredCreators.length === 0 && (
        <div className="py-24 text-center">
          <p className="text-lg text-muted-foreground">No creators found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
