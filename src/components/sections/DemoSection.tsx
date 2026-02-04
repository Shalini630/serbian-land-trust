import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ShieldIcon, BlockchainIcon } from '@/components/icons/ShieldIcon';
import { AlertTriangle, CheckCircle2, XCircle, Play, RotateCcw } from 'lucide-react';

type ScenarioType = 'duplicate' | 'mortgage' | 'court-stay';

interface Scenario {
  id: ScenarioType;
  title: string;
  description: string;
  action: string;
  result: 'blocked' | 'success';
  reason: string;
  details: string;
}

const scenarios: Scenario[] = [
  {
    id: 'duplicate',
    title: 'Duplicate Sale Attempt',
    description: 'Attempting to sell the same parcel to two different buyers simultaneously.',
    action: 'Process Transfer to Buyer B',
    result: 'blocked',
    reason: 'TRANSACTION BLOCKED',
    details: 'Parcel RS-BG-2847 has a pending transfer to Buyer A (submitted 2 hours ago). Duplicate ownership transfer is prohibited under Serbian Property Law Article 47.',
  },
  {
    id: 'mortgage',
    title: 'Transfer During Active Mortgage',
    description: 'Attempting ownership transfer while a bank mortgage is still registered.',
    action: 'Process Ownership Transfer',
    result: 'blocked',
    reason: 'ENCUMBRANCE DETECTED',
    details: 'Active mortgage registered by Komercijalna Banka (Lien ID: LN-2023-4521). Transfer requires mortgage release or bank authorization per Article 89.',
  },
  {
    id: 'court-stay',
    title: 'Mutation During Court Stay',
    description: 'Attempting to modify records while court injunction is active.',
    action: 'Process Subdivision Request',
    result: 'blocked',
    reason: 'JUDICIAL HOLD ACTIVE',
    details: 'Court Order CS-2024-1789 from Belgrade District Court prohibits any mutations until case resolution. Stay effective until 15 March 2025.',
  },
];

export const DemoSection: React.FC = () => {
  const [activeScenario, setActiveScenario] = useState<ScenarioType>('duplicate');
  const [isRunning, setIsRunning] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const currentScenario = scenarios.find(s => s.id === activeScenario)!;

  const runDemo = () => {
    setIsRunning(true);
    setShowResult(false);
    setTimeout(() => {
      setIsRunning(false);
      setShowResult(true);
    }, 2000);
  };

  const resetDemo = () => {
    setShowResult(false);
    setIsRunning(false);
  };

  return (
    <section id="demo" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 blockchain-grid opacity-30" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-success/10 text-success text-sm font-medium font-body mb-4">
            Live Demonstration
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Fraud Prevention
            <br />
            <span className="text-muted-foreground">In Action</span>
          </h2>
          <p className="text-lg text-muted-foreground font-body leading-relaxed">
            See how the system automatically blocks fraudulent or illegal transactions, 
            permanently records all attempts for accountability, and enforces legal rules by design.
          </p>
        </div>

        {/* Demo Interface */}
        <div className="max-w-5xl mx-auto">
          {/* Scenario Tabs */}
          <div className="flex flex-wrap gap-3 mb-8 justify-center">
            {scenarios.map((scenario) => (
              <button
                key={scenario.id}
                onClick={() => {
                  setActiveScenario(scenario.id);
                  resetDemo();
                }}
                className={`px-4 py-2 rounded-lg font-body text-sm font-medium transition-all duration-200 ${
                  activeScenario === scenario.id
                    ? 'bg-primary text-primary-foreground shadow-card'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {scenario.title}
              </button>
            ))}
          </div>

          {/* Demo Card */}
          <div className="bg-card rounded-2xl border border-border shadow-elevated overflow-hidden">
            {/* Header */}
            <div className="bg-primary/5 border-b border-border p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <ShieldIcon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground">
                      {currentScenario.title}
                    </h3>
                    <p className="text-sm text-muted-foreground font-body">
                      {currentScenario.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                  <span className="text-xs text-muted-foreground font-body">System Active</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Left - Transaction Request */}
                <div className="space-y-6">
                  <h4 className="font-display text-sm font-semibold text-foreground uppercase tracking-wide">
                    Transaction Request
                  </h4>
                  
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-muted/50 border border-border">
                      <p className="text-xs text-muted-foreground font-body mb-1">Parcel ID</p>
                      <p className="text-sm text-foreground font-medium font-body">RS-BG-2847</p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50 border border-border">
                      <p className="text-xs text-muted-foreground font-body mb-1">Requested Action</p>
                      <p className="text-sm text-foreground font-medium font-body">{currentScenario.action}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50 border border-border">
                      <p className="text-xs text-muted-foreground font-body mb-1">Submitted By</p>
                      <p className="text-sm text-foreground font-medium font-body">Notary Office #47, Belgrade</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button 
                      variant="official" 
                      className="flex-1"
                      onClick={runDemo}
                      disabled={isRunning || showResult}
                    >
                      {isRunning ? (
                        <>
                          <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                          Validating...
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4" />
                          Run Validation
                        </>
                      )}
                    </Button>
                    {showResult && (
                      <Button variant="outline" onClick={resetDemo}>
                        <RotateCcw className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>

                {/* Right - System Response */}
                <div className="space-y-6">
                  <h4 className="font-display text-sm font-semibold text-foreground uppercase tracking-wide">
                    System Response
                  </h4>
                  
                  <div className={`p-6 rounded-xl border-2 transition-all duration-500 ${
                    showResult 
                      ? 'bg-destructive/5 border-destructive/30' 
                      : 'bg-muted/30 border-border border-dashed'
                  }`}>
                    {!showResult && !isRunning && (
                      <div className="text-center py-8">
                        <BlockchainIcon className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                        <p className="text-sm text-muted-foreground font-body">
                          Click "Run Validation" to see the system response
                        </p>
                      </div>
                    )}
                    
                    {isRunning && (
                      <div className="text-center py-8">
                        <div className="w-12 h-12 border-3 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-3" />
                        <p className="text-sm text-foreground font-body">
                          Checking blockchain records...
                        </p>
                      </div>
                    )}

                    {showResult && (
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                            <XCircle className="w-5 h-5 text-destructive" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-destructive font-body">
                              {currentScenario.reason}
                            </p>
                            <p className="text-xs text-muted-foreground font-body">
                              Transaction ID: TX-2024-{Math.random().toString().slice(2, 8)}
                            </p>
                          </div>
                        </div>
                        
                        <div className="p-4 rounded-lg bg-background border border-border">
                          <p className="text-sm text-foreground font-body leading-relaxed">
                            {currentScenario.details}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-muted-foreground font-body">
                          <AlertTriangle className="w-3 h-3" />
                          <span>Attempt permanently recorded for audit trail</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {showResult && (
                    <div className="p-4 rounded-lg bg-success/5 border border-success/20">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-foreground font-body mb-1">
                            System Protected Property Rights
                          </p>
                          <p className="text-xs text-muted-foreground font-body">
                            Fraudulent or illegal transactions are blocked automatically, 
                            protecting citizens and maintaining record integrity.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-muted/30 border-t border-border p-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground font-body">
                <span>Demo Environment — For Illustration Purposes</span>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-success" />
                  <span>All validations performed on-chain</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
