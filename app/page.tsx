import { About } from "@/components/sections/About";
import { CallToAction } from "@/components/sections/CallToAction";
import { Footer } from "@/components/sections/Footer";
import { GlobalNetwork } from "@/components/sections/GlobalNetwork";
import { Hero } from "@/components/sections/Hero";
import { Navbar } from "@/components/sections/Navbar";
import { Services } from "@/components/sections/Services";
import { Sustainability } from "@/components/sections/Sustainability";
import { Tracking } from "@/components/sections/Tracking";
import { WhyNava } from "@/components/sections/WhyNava";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Services />
        <GlobalNetwork />
        <Tracking />
        <WhyNava />
        <Sustainability />
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}
