import { Link } from 'react-router-dom';
import { Palette, MessageCircle, Globe, Activity } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t bg-muted/20">
      <div className="container mx-auto px-4 py-12 md:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="flex flex-col space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <Palette className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold tracking-tighter">ArtSphere</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              The premium portfolio platform for creators to showcase their work and get hired.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <MessageCircle className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <Globe className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <Activity className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="mb-4 text-sm font-semibold">Platform</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/explore" className="hover:text-foreground">Explore Creators</Link></li>
              <li><Link to="/dashboard" className="hover:text-foreground">For Creators</Link></li>
              <li><Link to="#" className="hover:text-foreground">Pricing</Link></li>
              <li><Link to="#" className="hover:text-foreground">Success Stories</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="#" className="hover:text-foreground">Blog</Link></li>
              <li><Link to="#" className="hover:text-foreground">Help Center</Link></li>
              <li><Link to="#" className="hover:text-foreground">Community</Link></li>
              <li><Link to="#" className="hover:text-foreground">Guidelines</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="#" className="hover:text-foreground">Privacy Policy</Link></li>
              <li><Link to="#" className="hover:text-foreground">Terms of Service</Link></li>
              <li><Link to="#" className="hover:text-foreground">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between border-t pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} ArtSphere. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
