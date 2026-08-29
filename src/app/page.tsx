import ClientStories from "@/components/sections/ClientStories";
import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import IndustryWins from "@/components/sections/IndustryWins";
import TrustedBrands from "@/components/sections/TrustedBrands";

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <TrustedBrands />
        <IndustryWins />
        <ClientStories />
      </main>
    </>
  );
}
