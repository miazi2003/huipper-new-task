import AIPoweredDesign from "@/components/sections/AIPoweredDesign";
import Benefits from "@/components/sections/Benefits";
import ClientStories from "@/components/sections/ClientStories";
import Comparison from "@/components/sections/Comparison";
import ContactCTA from "@/components/sections/ContactCTA";
import FAQ from "@/components/sections/FAQ";
import Footer from "@/components/sections/Footer";
import FooterBrandVisual from "@/components/sections/FooterBrandVisual";
import GlobalReach from "@/components/sections/GlobalReach";
import HuipperProcess from "@/components/sections/HuipperProcess";
import NewHero from "@/components/sections/NewHero";
import IndustryWins from "@/components/sections/IndustryWins";
import Newsletter from "@/components/sections/Newsletter";
import ResourcesShowcase from "@/components/sections/ResourcesShowcase";
import ServicesShowcase from "@/components/sections/ServicesShowcase";
import TrustedBrands from "@/components/sections/TrustedBrands";
import TestimonialsMarquee from "@/components/sections/TestimonialsMarquee";
import TrustStrip from "@/components/sections/TrustStrip";

export default function HomePage() {
  return (
    <>
      <main id="main-content">
        <NewHero />
        <TrustedBrands />
        <HuipperProcess />
        <IndustryWins />
        <GlobalReach />
        <ClientStories />
        <AIPoweredDesign />
        <ServicesShowcase />
        <Benefits />
        <ResourcesShowcase />
        <Comparison />
        <TestimonialsMarquee />
        <FAQ />
        <ContactCTA />
        <TrustStrip />
        <Newsletter />
      </main>
      <Footer />
      <FooterBrandVisual />
    </>
  );
}
