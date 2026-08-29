import AIPoweredDesign from "@/components/sections/AIPoweredDesign";
import Benefits from "@/components/sections/Benefits";
import ClientStories from "@/components/sections/ClientStories";
import Comparison from "@/components/sections/Comparison";
import ContactCTA from "@/components/sections/ContactCTA";
import FAQ from "@/components/sections/FAQ";
import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import IndustryWins from "@/components/sections/IndustryWins";
import ResourcesShowcase from "@/components/sections/ResourcesShowcase";
import ServicesShowcase from "@/components/sections/ServicesShowcase";
import TrustedBrands from "@/components/sections/TrustedBrands";
import TestimonialsMarquee from "@/components/sections/TestimonialsMarquee";
import WhyUsVideo from "@/components/sections/WhyUsVideo";

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
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
      </main>
    </>
  );
}
