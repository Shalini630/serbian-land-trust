import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShieldIcon, BlockchainIcon } from '@/components/icons/ShieldIcon';
import { ArrowDown, CheckCircle2, LayoutDashboard, Presentation, Activity } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center gradient-hero overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 shield-pattern opacity-50" />
      
      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-accent/5 blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-accent/3 blur-3xl" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-sm text-accent font-medium font-body">
                Government Blockchain Initiative
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground leading-[1.1]">
                National Digital
                <br />
                <span className="text-gradient-gold">Land Registry</span>
              </h1>
              <p className="text-lg sm:text-xl text-primary-foreground/80 font-body leading-relaxed max-w-xl">
                A blockchain-secured system that permanently protects property rights 
                and prevents disputes by design for the Republic of Serbia.
              </p>
            </div>

            {/* Key Points */}
            <div className="flex flex-col sm:flex-row gap-4 text-sm font-body">
              {['Immutable Records', 'Real-time Verification', 'Zero Disputes'].map((point) => (
                <div key={point} className="flex items-center gap-2 text-primary-foreground/70">
                  <CheckCircle2 className="w-4 h-4 text-accent" />
                  <span>{point}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-3">
              <Link to="/dashboard">
                <Button variant="hero" size="xl" className="gap-2">
                  <LayoutDashboard className="w-5 h-5" />
                  Land Registry
                </Button>
              </Link>
              <Link to="/policy">
                <Button variant="hero" size="xl" className="gap-2">
                  <Activity className="w-5 h-5" />
                  Policy Dashboard
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="heroOutline" size="xl" className="gap-2">
                  <Presentation className="w-5 h-5" />
                  Presentations
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Content - Visual */}
          <div className="relative hidden lg:block">
            <div className="relative">
              {/* Main Card */}
              <div className="bg-card/10 backdrop-blur-xl rounded-2xl border border-primary-foreground/10 p-8 shadow-elevated">
                {/* Header */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-primary-foreground/10">
                  <div className="flex items-center gap-3">
                    <ShieldIcon className="w-8 h-8 text-accent" />
                    <div>
                      <h3 className="font-display text-lg font-semibold text-primary-foreground">
                        Parcel ID: RS-BG-2847
                      </h3>
                      <p className="text-xs text-primary-foreground/60 font-body">
                        Belgrade, Central District
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-success/20 border border-success/30">
                    <div className="w-2 h-2 rounded-full bg-success" />
                    <span className="text-xs text-success font-medium font-body">Verified</span>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-primary-foreground/5 border border-primary-foreground/10">
                      <p className="text-xs text-primary-foreground/50 font-body mb-1">Current Owner</p>
                      <p className="text-sm text-primary-foreground font-medium font-body">Marko Petrović</p>
                    </div>
                    <div className="p-4 rounded-lg bg-primary-foreground/5 border border-primary-foreground/10">
                      <p className="text-xs text-primary-foreground/50 font-body mb-1">Ownership Since</p>
                      <p className="text-sm text-primary-foreground font-medium font-body">15 Mar 2019</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-primary-foreground/5 border border-primary-foreground/10">
                    <p className="text-xs text-primary-foreground/50 font-body mb-2">Transaction History</p>
                    <div className="space-y-2">
                      {[
                        { event: 'Ownership Transfer', date: '15 Mar 2019', hash: '0x8f2a...9c4d' },
                        { event: 'Mortgage Released', date: '02 Jan 2019', hash: '0x3b7c...1e2f' },
                        { event: 'Initial Registration', date: '08 Jun 2005', hash: '0x1a4e...7d8b' },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between py-2 border-b border-primary-foreground/5 last:border-0">
                          <div className="flex items-center gap-2">
                            <BlockchainIcon className="w-4 h-4 text-accent/70" />
                            <span className="text-xs text-primary-foreground/80 font-body">{item.event}</span>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-primary-foreground/60 font-body">{item.date}</p>
                            <p className="text-[10px] text-accent/60 font-mono">{item.hash}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-6 pt-4 border-t border-primary-foreground/10 flex items-center justify-between">
                  <p className="text-xs text-primary-foreground/40 font-body">
                    Last verified: 2 minutes ago
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                    <span className="text-xs text-success font-body">Blockchain Secured</span>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 rounded-xl bg-accent/20 backdrop-blur-lg border border-accent/30 flex items-center justify-center animate-float shadow-gold">
                <ShieldIcon className="w-10 h-10 text-accent" />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-primary-foreground/40">
          <span className="text-xs font-body">Scroll to explore</span>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </div>
      </div>
    </section>
  );
};
