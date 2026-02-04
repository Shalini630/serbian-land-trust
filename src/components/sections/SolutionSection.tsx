import React from 'react';
import { ShieldIcon, ShieldLockIcon, BlockchainIcon } from '@/components/icons/ShieldIcon';
import { CheckCircle2, Database, FileCheck, Users, Eye, Zap } from 'lucide-react';

const features = [
  {
    icon: Database,
    title: 'Immutable Digital Titles',
    description: 'Every land parcel exists as a permanently secured digital record that cannot be altered or backdated.',
  },
  {
    icon: BlockchainIcon,
    title: 'Verified Mutations',
    description: 'All ownership changes are validated against approved legal rules before any transaction is approved.',
  },
  {
    icon: FileCheck,
    title: 'Complete Audit Trail',
    description: 'Full traceability of who approved what, when, and under which legal authority.',
  },
  {
    icon: Zap,
    title: 'Real-time Verification',
    description: 'Instant verification for courts, registrars, auditors, and banks — no reconstruction needed.',
  },
];

const preserves = [
  'Does NOT change Serbian land or property law',
  'Does NOT bypass courts or notaries',
  'Does NOT make land records public',
  'Does NOT remove government authority',
];

export const SolutionSection: React.FC = () => {
  return (
    <section id="solution" className="py-24 gradient-hero relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 shield-pattern opacity-30" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium font-body mb-4">
            The Solution
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
            Blockchain-Secured
            <br />
            <span className="text-gradient-gold">Land Registry</span>
          </h2>
          <p className="text-lg text-primary-foreground/80 font-body leading-relaxed">
            A fundamentally stronger model where security, transparency, and auditability 
            are embedded by design rather than enforced after the fact.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group p-6 rounded-2xl bg-card/5 border border-primary-foreground/10 hover:bg-card/10 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-display text-lg font-semibold text-primary-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-sm text-primary-foreground/70 font-body leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Architecture Diagram */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Visual */}
          <div className="relative">
            <div className="bg-card/5 backdrop-blur-xl rounded-2xl border border-primary-foreground/10 p-8">
              <h3 className="font-display text-xl font-semibold text-primary-foreground mb-6 text-center">
                System Architecture
              </h3>
              
              {/* Architecture Visualization */}
              <div className="space-y-4">
                {/* Network Layer */}
                <div className="p-4 rounded-xl bg-primary-foreground/5 border border-primary-foreground/10">
                  <div className="flex items-center gap-3 mb-3">
                    <ShieldLockIcon className="w-5 h-5 text-accent" />
                    <span className="text-sm font-medium text-primary-foreground font-body">Permissioned Blockchain Network</span>
                  </div>
                  <div className="flex gap-2">
                    {['Registry Office', 'Registry Office', 'Registry Office'].map((node, i) => (
                      <div key={i} className="flex-1 p-2 rounded-lg bg-accent/10 border border-accent/20 text-center">
                        <div className="w-6 h-6 mx-auto mb-1 rounded-full bg-accent/20 flex items-center justify-center">
                          <Database className="w-3 h-3 text-accent" />
                        </div>
                        <p className="text-[10px] text-primary-foreground/60 font-body">{node} {i + 1}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Smart Contracts */}
                <div className="p-4 rounded-xl bg-primary-foreground/5 border border-primary-foreground/10">
                  <div className="flex items-center gap-3 mb-3">
                    <FileCheck className="w-5 h-5 text-accent" />
                    <span className="text-sm font-medium text-primary-foreground font-body">Smart Contracts (Legal Rules)</span>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {['Sale', 'Inheritance', 'Mortgage', 'Subdivision'].map((rule) => (
                      <span key={rule} className="px-3 py-1 rounded-full bg-success/10 border border-success/20 text-xs text-success font-body">
                        {rule}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Access Layer */}
                <div className="p-4 rounded-xl bg-primary-foreground/5 border border-primary-foreground/10">
                  <div className="flex items-center gap-3 mb-3">
                    <Users className="w-5 h-5 text-accent" />
                    <span className="text-sm font-medium text-primary-foreground font-body">Role-Based Access</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { role: 'Officials', access: 'Write' },
                      { role: 'Notaries', access: 'Submit' },
                      { role: 'Courts', access: 'Read' },
                    ].map((item) => (
                      <div key={item.role} className="p-2 rounded-lg bg-primary-foreground/5 text-center">
                        <p className="text-xs text-primary-foreground/80 font-body">{item.role}</p>
                        <p className="text-[10px] text-accent font-body">{item.access}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - What it preserves */}
          <div className="space-y-8">
            <div>
              <h3 className="font-display text-2xl font-bold text-primary-foreground mb-4">
                What the System Preserves
              </h3>
              <p className="text-primary-foreground/70 font-body leading-relaxed mb-6">
                The blockchain ensures approved law is enforced uniformly and transparently. 
                It does not replace Serbian land law, courts, or notaries — it strengthens them.
              </p>
            </div>

            <div className="space-y-4">
              {preserves.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-card/5 border border-primary-foreground/10">
                  <CheckCircle2 className="w-5 h-5 text-success mt-0.5 shrink-0" />
                  <span className="text-primary-foreground/90 font-body">{item}</span>
                </div>
              ))}
            </div>

            <div className="p-6 rounded-xl gradient-gold">
              <div className="flex items-start gap-4">
                <ShieldIcon className="w-8 h-8 text-accent-foreground shrink-0" />
                <div>
                  <h4 className="font-display text-lg font-semibold text-accent-foreground mb-2">
                    Structural Guarantee
                  </h4>
                  <p className="text-sm text-accent-foreground/80 font-body">
                    Trust is built into the system architecture, not dependent on 
                    process compliance alone.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
