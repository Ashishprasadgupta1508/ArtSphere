import { useAuthStore } from '../store/useAuthStore';
import HeroSection from '../components/landing/HeroSection';
import FeaturesSection from '../components/landing/FeaturesSection';
import CTASection from '../components/landing/CTASection';
import TestimonialsSection from '../components/landing/TestimonialsSection';
import FAQSection from '../components/landing/FAQSection';

export default function LandingPage() {
  const currentUser = useAuthStore((state) => state.currentUser);

  return (
    <div className="flex flex-col">
      <HeroSection currentUser={currentUser} />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
      <FAQSection />
    </div>
  );
}
