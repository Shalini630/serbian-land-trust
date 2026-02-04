import React from 'react';
import { CheckCircle2, Circle, ArrowRight } from 'lucide-react';

const phases = [
  {
    phase: 'Phase 1',
    title: 'Foundation',
    duration: '6-9 months',
    status: 'current',
    items: [
      'Legal framework validation',
      'Historical data cleansing',
      'Judicial sign-off process',
      'Smart contract legal review',
      'Security architecture design',
    ],
  },
  {
    phase: 'Phase 2',
    title: 'Pilot Deployment',
    duration: '12 months',
    status: 'upcoming',
    items: [
      'Single district deployment',
      'Parallel run with existing system',
      'Staff training program',
      'Integration with notary systems',
      'Performance benchmarking',
    ],
  },
  {
    phase: 'Phase 3',
    title: 'National Rollout',
    duration: '18-24 months',
    status: 'future',
    items: [
      'Full national deployment',
      'Bank and court integration',
      'Legacy system retirement',
      'EU reporting compliance',
      'Continuous improvement cycle',
    ],
  },
];

export const RoadmapSection: React.FC = () => {
  return (
    <section className="py-24 gradient-hero relative overflow-hidden">
      <div className="absolute inset-0 shield-pattern opacity-30" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium font-body mb-4">
            Implementation
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
            Phased Roadmap
          </h2>
          <p className="text-lg text-primary-foreground/80 font-body leading-relaxed">
            A structured approach ensuring legal alignment, stakeholder confidence, 
            and successful national adoption.
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {phases.map((phase, index) => (
              <div
                key={phase.phase}
                className={`relative p-6 lg:p-8 rounded-2xl border transition-all duration-300 ${
                  phase.status === 'current'
                    ? 'bg-card/10 border-accent/40 shadow-gold'
                    : 'bg-card/5 border-primary-foreground/10'
                }`}
              >
                {/* Connection Line */}
                {index < phases.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 lg:-right-5 w-8 lg:w-10">
                    <ArrowRight className="w-6 h-6 text-primary-foreground/30" />
                  </div>
                )}

                {/* Phase Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium font-body ${
                    phase.status === 'current'
                      ? 'bg-accent/20 text-accent border border-accent/30'
                      : phase.status === 'upcoming'
                      ? 'bg-primary-foreground/10 text-primary-foreground/80'
                      : 'bg-primary-foreground/5 text-primary-foreground/50'
                  }`}>
                    {phase.phase}
                  </span>
                  <span className="text-xs text-primary-foreground/50 font-body">
                    {phase.duration}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display text-xl font-semibold text-primary-foreground mb-4">
                  {phase.title}
                </h3>

                {/* Items */}
                <ul className="space-y-3">
                  {phase.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      {phase.status === 'current' && i < 2 ? (
                        <CheckCircle2 className="w-4 h-4 text-success mt-0.5 shrink-0" />
                      ) : (
                        <Circle className="w-4 h-4 text-primary-foreground/30 mt-0.5 shrink-0" />
                      )}
                      <span className={`text-sm font-body ${
                        phase.status === 'current' && i < 2
                          ? 'text-primary-foreground/90'
                          : 'text-primary-foreground/60'
                      }`}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Current Indicator */}
                {phase.status === 'current' && (
                  <div className="mt-6 pt-4 border-t border-accent/20">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                      <span className="text-xs text-accent font-medium font-body">
                        Currently in progress
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Commercial Principles */}
        <div className="max-w-3xl mx-auto mt-16">
          <div className="bg-card/5 backdrop-blur-xl rounded-2xl border border-primary-foreground/10 p-8">
            <h3 className="font-display text-xl font-semibold text-primary-foreground mb-6 text-center">
              Commercial Principles
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                'One-time implementation cost',
                'Annual governance and support fee',
                'No transaction-based tolls',
                'Government-friendly IP structure',
              ].map((principle, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-primary-foreground/5">
                  <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                  <span className="text-sm text-primary-foreground/80 font-body">{principle}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
