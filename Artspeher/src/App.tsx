import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import LandingPage from './pages/LandingPage';
import ExplorePage from './pages/ExplorePage';
import CreatorProfile from './pages/CreatorProfile';
import Dashboard from './pages/Dashboard';
import PortfolioBuilder from './pages/PortfolioBuilder';
import UploadArtwork from './pages/UploadArtwork';
import HirePage from './pages/HirePage';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/creator/:id" element={<CreatorProfile />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/build" element={<PortfolioBuilder />} />
            <Route path="/dashboard/upload" element={<UploadArtwork />} />
            <Route path="/hire/:id" element={<HirePage />} />
            <Route path="/hire/:id/checkout" element={<Checkout />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/edit" element={<EditProfile />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
