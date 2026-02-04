import React from 'react';
import { AlertTriangle, Clock, FileWarning, Scale } from 'lucide-react';

const problems = [
  {
    icon: FileWarning,
    title: 'Title Authenticity',
    description: 'Ownership records challenged due to historical inconsistencies or manual alterations.',
    impact: 'Multi-year court cases and erosion of public trust',
    stat: '40%',
    statLabel: 'of disputes from unclear records',
  },
  {
    icon: Clock,
    title: 'Slow Mutations',
    description: 'Property transfers and inheritance registrations take weeks or months.',
    impact: 'Delayed economic activity and citizen dissatisfaction',
    stat: '45+',
    statLabel: 'days average registration time',
  },
  {
    icon: AlertTriangle,
    title: 'Fraud & Hidden Liens',
    description: 'Hidden encumbrances or overlapping ownership claims discovered post-transaction.',
    impact: 'Financial loss and legal uncertainty',
    stat: '12%',
    statLabel: 'of properties with undisclosed liens',
  },
  {
    icon: Scale,
    title: 'Heavy Judicial Burden',
    description: 'Courts must reconstruct decades of ownership history during disputes.',
    impact: 'Backlogged court system and delayed justice',
    stat: '3.2yr',
    statLabel: 'average dispute resolution time',
  },
];

export const ProblemSection: React.FC = () => {
  return (
    <section id="problem" className="py-24 bg-background relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 blockchain-grid opacity-50" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-destructive/10 text-destructive text-sm font-medium font-body mb-4">
            The Challenge
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Why Current Systems
            <br />
            <span className="text-muted-foreground">Fall Short</span>
          </h2>
          <p className="text-lg text-muted-foreground font-body leading-relaxed">
            Despite years of digitisation efforts, fundamental problems persist because 
            current systems rely on procedural trust rather than structural guarantees.
          </p>
        </div>

        {/* Problem Cards */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {problems.map((problem, index) => (
            <div
              key={problem.title}
              className="group relative bg-card rounded-2xl border border-border p-6 lg:p-8 shadow-card hover:shadow-card-hover transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center mb-5">
                <problem.icon className="w-6 h-6 text-destructive" />
              </div>

              {/* Content */}
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                {problem.title}
              </h3>
              <p className="text-muted-foreground font-body mb-4 leading-relaxed">
                {problem.description}
              </p>

              {/* Impact Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted text-sm font-body">
                <span className="text-muted-foreground">{problem.impact}</span>
              </div>

              {/* Stat */}
              <div className="absolute top-6 right-6 text-right">
                <p className="font-display text-2xl lg:text-3xl font-bold text-destructive/80">
                  {problem.stat}
                </p>
                <p className="text-xs text-muted-foreground font-body max-w-[100px]">
                  {problem.statLabel}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Current State Summary */}
        <div className="mt-16 p-8 rounded-2xl bg-muted/50 border border-border">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2">
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                Current Approach Limitations
              </h3>
              <p className="text-muted-foreground font-body leading-relaxed">
                Existing centralised databases, sequential manual approvals, and reliance on scanned 
                documentation improve access compared to paper-only systems, but they do not 
                structurally prevent record alteration, delayed fraud detection, or disputes 
                arising years after registration.
              </p>
            </div>
            <div className="flex items-center justify-center">
              <div className="text-center">
                <p className="font-display text-4xl font-bold text-foreground mb-2">
                  Procedural
                </p>
                <p className="text-sm text-muted-foreground font-body">
                  Trust model — not guaranteed by design
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
