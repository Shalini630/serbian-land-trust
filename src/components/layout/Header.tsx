import React from 'react';
import { ShieldIcon } from '@/components/icons/ShieldIcon';

export const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-sm border-b border-primary-foreground/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg bg-accent/20 border border-accent/30">
              <ShieldIcon className="w-6 h-6 sm:w-7 sm:h-7 text-accent" />
            </div>
            <div className="hidden sm:block">
              <h1 className="font-display text-lg font-semibold text-primary-foreground leading-tight">
                National Digital
              </h1>
              <p className="text-xs text-primary-foreground/70 font-body tracking-wide">
                Land Registry
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#problem" className="text-sm text-primary-foreground/80 hover:text-accent transition-colors font-body">
              The Challenge
            </a>
            <a href="#solution" className="text-sm text-primary-foreground/80 hover:text-accent transition-colors font-body">
              Our Solution
            </a>
            <a href="#demo" className="text-sm text-primary-foreground/80 hover:text-accent transition-colors font-body">
              Live Demo
            </a>
            <a href="#benefits" className="text-sm text-primary-foreground/80 hover:text-accent transition-colors font-body">
              Benefits
            </a>
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-4">
            <span className="hidden lg:inline-block text-xs text-primary-foreground/60 font-body">
              Republic of Serbia
            </span>
            <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
              <span className="text-accent text-xs font-bold">RS</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
