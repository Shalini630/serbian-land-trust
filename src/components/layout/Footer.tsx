import React from 'react';
import { ShieldIcon } from '@/components/icons/ShieldIcon';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-primary py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-accent/20 border border-accent/30">
              <ShieldIcon className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h3 className="font-display text-base font-semibold text-primary-foreground">
                National Digital Land Registry
              </h3>
              <p className="text-xs text-primary-foreground/60 font-body">
                Republic of Serbia
              </p>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-primary-foreground/60 font-body">
            <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-accent transition-colors">Terms of Use</a>
            <a href="#" className="hover:text-accent transition-colors">Accessibility</a>
            <a href="#" className="hover:text-accent transition-colors">Contact</a>
          </div>

          {/* Copyright */}
          <p className="text-xs text-primary-foreground/40 font-body">
            © 2024 Government of Serbia
          </p>
        </div>
      </div>
    </footer>
  );
};
