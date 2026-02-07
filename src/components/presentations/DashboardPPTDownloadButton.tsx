import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';
import {
  generateAffordableHousingPPT,
  generateLegalCompliancePPT,
  generateSubsidyAllocationPPT,
  generateBubbleProtectionPPT,
  generateMinisterialOverviewPPT,
} from '@/utils/pptGenerator';

interface DashboardPPTDownloadButtonProps {
  presentationKey: string;
  variant?: 'icon' | 'full';
  className?: string;
}

const DASHBOARD_GENERATORS: Record<string, () => Promise<void>> = {
  'ministerial-command': generateMinisterialOverviewPPT,
  'affordable-housing': generateAffordableHousingPPT,
  'legal-compliance': generateLegalCompliancePPT,
  'subsidy-allocation': generateSubsidyAllocationPPT,
  'bubble-protection': generateBubbleProtectionPPT,
};

export const DashboardPPTDownloadButton: React.FC<DashboardPPTDownloadButtonProps> = ({
  presentationKey,
  variant = 'full',
  className = '',
}) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const generator = DASHBOARD_GENERATORS[presentationKey];
    if (!generator) return;

    setIsGenerating(true);
    try {
      await generator();
    } catch (error) {
      console.error('Failed to generate presentation:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const hasGenerator = !!DASHBOARD_GENERATORS[presentationKey];
  if (!hasGenerator) return null;

  if (variant === 'icon') {
    return (
      <Button
        variant="ghost"
        size="icon"
        className={`w-7 h-7 text-primary-foreground/50 hover:text-accent ${className}`}
        onClick={handleDownload}
        disabled={isGenerating}
      >
        {isGenerating ? (
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
        ) : (
          <Download className="w-3.5 h-3.5" />
        )}
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      className={`w-full text-xs text-accent hover:bg-accent/10 ${className}`}
      onClick={handleDownload}
      disabled={isGenerating}
    >
      {isGenerating ? (
        <>
          <Loader2 className="w-3 h-3 mr-1 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Download className="w-3 h-3 mr-1" />
          Download PPT
        </>
      )}
    </Button>
  );
};

export default DashboardPPTDownloadButton;
