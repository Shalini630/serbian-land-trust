import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { ProblemSection } from '@/components/sections/ProblemSection';
import { SolutionSection } from '@/components/sections/SolutionSection';
import { DemoSection } from '@/components/sections/DemoSection';
import { BenefitsSection } from '@/components/sections/BenefitsSection';
import { RoadmapSection } from '@/components/sections/RoadmapSection';
import { CTASection } from '@/components/sections/CTASection';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <DemoSection />
        <BenefitsSection />
        <RoadmapSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
