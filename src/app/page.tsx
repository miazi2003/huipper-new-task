import AIPoweredDesign from "@/components/sections/AIPoweredDesign";
import Benefits from "@/components/sections/Benefits";
import ClientStories from "@/components/sections/ClientStories";
import Comparison from "@/components/sections/Comparison";
import ContactCTA from "@/components/sections/ContactCTA";
import FAQ from "@/components/sections/FAQ";
import Footer from "@/components/sections/Footer";
import FooterBrandVisual from "@/components/sections/FooterBrandVisual";
import GlobalLocations from "@/components/sections/GlobalLocations";
import NewHero from "@/components/sections/NewHero";
import IndustryWins from "@/components/sections/IndustryWins";
import Newsletter from "@/components/sections/Newsletter";
import ResourcesShowcase from "@/components/sections/ResourcesShowcase";
import ServicesShowcase from "@/components/sections/ServicesShowcase";
import TrustedBrands from "@/components/sections/TrustedBrands";
import TestimonialsMarquee from "@/components/sections/TestimonialsMarquee";
import TrustStrip from "@/components/sections/TrustStrip";
import WhyUsVideo from "@/components/sections/WhyUsVideo";

export default function HomePage() {
  return (
    <>
      <main id="main-content">
        <NewHero />
        <TrustedBrands />
        <IndustryWins />
        <ClientStories />
        <AIPoweredDesign />
        <WhyUsVideo />
        <ServicesShowcase />
        <Benefits />
        <ResourcesShowcase />
        <Comparison />
        <TestimonialsMarquee />
        <FAQ />
        <ContactCTA />
        <TrustStrip />
        <Newsletter />
        <GlobalLocations />
      </main>
      <Footer />
      <FooterBrandVisual />
    </>
  );
}
