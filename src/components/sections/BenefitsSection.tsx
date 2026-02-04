import React from 'react';
import { Building2, Scale, TrendingUp, Users, ArrowRight } from 'lucide-react';

const benefitCategories = [
  {
    icon: Building2,
    title: 'Governance Benefits',
    color: 'accent',
    benefits: [
      'Structural reduction in disputes',
      'Reduced administrative discretion',
      'Higher accountability and transparency',
      'Protection of honest officials',
    ],
  },
  {
    icon: Scale,
    title: 'Judicial Benefits',
    color: 'success',
    benefits: [
      'Faster verification of ownership',
      'Reduced case backlog',
      'Stronger evidentiary records',
      'Elimination of historical reconstruction',
    ],
  },
  {
    icon: TrendingUp,
    title: 'Economic Benefits',
    color: 'primary',
    benefits: [
      'Faster property transactions',
      'Increased investor and bank confidence',
      'More efficient mortgage processing',
      'Reduced transaction costs',
    ],
  },
  {
    icon: Users,
    title: 'Citizen Benefits',
    color: 'warning',
    benefits: [
      'Clear and final ownership records',
      'Faster service delivery',
      'Permanent certainty across generations',
      'Reduced legal expenses',
    ],
  },
];

const kpis = [
  { value: '80%', label: 'Reduction in registration time' },
  { value: '95%', label: 'Reduction in ownership disputes' },
  { value: '99.9%', label: 'Fraud prevention rate' },
  { value: '70%', label: 'Reduction in audit effort' },
];

export const BenefitsSection: React.FC = () => {
  return (
    <section id="benefits" className="py-24 bg-muted/30 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium font-body mb-4">
            Benefits & Outcomes
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Institutional and
            <br />
            <span className="text-muted-foreground">Long-term Value</span>
          </h2>
          <p className="text-lg text-muted-foreground font-body leading-relaxed">
            The National Digital Land Registry delivers measurable improvements 
            across governance, judicial efficiency, economic activity, and citizen satisfaction.
          </p>
        </div>

        {/* KPI Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {kpis.map((kpi, index) => (
            <div
              key={index}
              className="bg-card rounded-xl border border-border p-6 text-center shadow-card"
            >
              <p className="font-display text-3xl lg:text-4xl font-bold text-primary mb-2">
                {kpi.value}
              </p>
              <p className="text-sm text-muted-foreground font-body">
                {kpi.label}
              </p>
            </div>
          ))}
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {benefitCategories.map((category, index) => (
            <div
              key={category.title}
              className="bg-card rounded-2xl border border-border p-8 shadow-card hover:shadow-card-hover transition-all duration-300"
            >
              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  category.color === 'accent' ? 'bg-accent/10' :
                  category.color === 'success' ? 'bg-success/10' :
                  category.color === 'primary' ? 'bg-primary/10' :
                  'bg-warning/10'
                }`}>
                  <category.icon className={`w-6 h-6 ${
                    category.color === 'accent' ? 'text-accent' :
                    category.color === 'success' ? 'text-success' :
                    category.color === 'primary' ? 'text-primary' :
                    'text-warning'
                  }`} />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground">
                  {category.title}
                </h3>
              </div>

              {/* Benefits List */}
              <ul className="space-y-3">
                {category.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <ArrowRight className={`w-4 h-4 mt-1 shrink-0 ${
                      category.color === 'accent' ? 'text-accent' :
                      category.color === 'success' ? 'text-success' :
                      category.color === 'primary' ? 'text-primary' :
                      'text-warning'
                    }`} />
                    <span className="text-muted-foreground font-body">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
