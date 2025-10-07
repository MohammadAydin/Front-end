import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import NoInterviews from '@/components/NoInterviews';
import Registration from '@/components/Registration';
import HowItWorks from '@/components/HowItWorks';
import Benefits from '@/components/Benefits';
import AboutUs from '@/components/AboutUs';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import AppDownload from '@/components/AppDownload';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import ScrollToTop from '@/components/ScrollToTop';

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Blur Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="blur-orb blur-orb-1"></div>
        <div className="blur-orb blur-orb-2"></div>
        <div className="blur-orb blur-orb-3"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Navigation />
        <Hero />
        <AboutUs />
        <NoInterviews />
        <Registration />
        <HowItWorks />
        <Benefits />
        <Testimonials />
        <FAQ />
        <AppDownload />
        <Contact />
        <Footer />
      </div>

      {/* WhatsApp Button */}
      <WhatsAppButton />

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
};

export default Index;
