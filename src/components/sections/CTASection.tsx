import React from 'react';
import { Button } from '@/components/ui/button';
import { ShieldIcon } from '@/components/icons/ShieldIcon';
import { ArrowRight, FileText, Calendar } from 'lucide-react';

export const CTASection: React.FC = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 blockchain-grid opacity-30" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Main CTA Card */}
          <div className="bg-card rounded-3xl border border-border shadow-elevated overflow-hidden">
            {/* Header */}
            <div className="gradient-hero p-8 lg:p-12 text-center">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-accent/20 border border-accent/30 flex items-center justify-center mb-6">
                <ShieldIcon className="w-8 h-8 text-accent" />
              </div>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
                Minister-Level Takeaway
              </h2>
              <div className="max-w-2xl mx-auto">
                <p className="text-lg lg:text-xl text-primary-foreground/90 font-body leading-relaxed">
                  This reform does not merely digitise land records. It establishes a 
                  <span className="text-accent font-semibold"> permanent, verifiable foundation of trust</span>.
                </p>
                <p className="mt-4 text-primary-foreground/70 font-body">
                  When the State certifies land ownership through this system, that certification 
                  remains true, auditable, and defensible for generations to come.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="p-8 lg:p-12 bg-card">
              <div className="grid sm:grid-cols-2 gap-4 max-w-xl mx-auto">
                <Button variant="hero" size="xl" className="w-full">
                  <FileText className="w-5 h-5" />
                  Download Full Brief
                </Button>
                <Button variant="official" size="xl" className="w-full">
                  <Calendar className="w-5 h-5" />
                  Schedule Presentation
                </Button>
              </div>

              <div className="mt-8 text-center">
                <p className="text-sm text-muted-foreground font-body">
                  For inquiries, contact the Digital Transformation Office
                </p>
                <a href="#" className="inline-flex items-center gap-1 mt-2 text-primary hover:text-accent transition-colors font-body text-sm font-medium">
                  Learn more about implementation
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Legal Disclaimer */}
          <div className="mt-8 p-6 rounded-xl bg-muted/50 border border-border">
            <h4 className="font-display text-sm font-semibold text-foreground mb-2">
              Legal Disclaimers
            </h4>
            <p className="text-xs text-muted-foreground font-body leading-relaxed">
              Blockchain ensures integrity, not correctness of source data. Legal ownership remains 
              governed by Serbian law. System outcomes depend on adherence to approved processes. 
              This document is for informational purposes and does not constitute legal advice or 
              commitment to specific implementation timelines.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
