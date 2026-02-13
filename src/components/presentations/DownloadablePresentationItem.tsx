import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Presentation, Download, Loader2 } from 'lucide-react';
import {
  generateAffordableHousingPPT,
  generateLegalCompliancePPT,
  generateSubsidyAllocationPPT,
  generateBubbleProtectionPPT,
  generateMinisterialOverviewPPT,
  generateExecutiveOverviewPPT,
  generateDataArchitecturePPT,
  generateSmartContractPPT,
  generateProblemSolutionPPT,
} from '@/utils/pptGenerator';

interface DownloadablePresentationItemProps {
  title: string;
  description: string;
  presentationKey: string;
}

const PRESENTATION_GENERATORS: Record<string, () => Promise<void>> = {
  'vision-mission': generateExecutiveOverviewPPT,
  'problem-statement': generateExecutiveOverviewPPT,
  'ministerial-command': generateMinisterialOverviewPPT,
  'affordable-housing': generateAffordableHousingPPT,
  'legal-compliance': generateLegalCompliancePPT,
  'subsidy-allocation': generateSubsidyAllocationPPT,
  'bubble-protection': generateBubbleProtectionPPT,
  'data-architecture': generateDataArchitecturePPT,
  'smart-contract': generateSmartContractPPT,
  'problem-solution': generateProblemSolutionPPT,
};

export const DownloadablePresentationItem: React.FC<DownloadablePresentationItemProps> = ({
  title,
  description,
  presentationKey,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    const generator = PRESENTATION_GENERATORS[presentationKey];
    if (!generator) {
      console.warn(`No generator found for key: ${presentationKey}`);
      return;
    }

    setIsGenerating(true);
    try {
      await generator();
    } catch (error) {
      console.error('Failed to generate presentation:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const hasGenerator = !!PRESENTATION_GENERATORS[presentationKey];

  return (
    <div className="group p-4 rounded-lg bg-primary-foreground/5 border border-primary-foreground/10 hover:border-accent/30 hover:bg-primary-foreground/10 transition-all h-full">
      <div className="flex items-start justify-between mb-2">
        <div className="w-8 h-8 rounded flex items-center justify-center bg-accent/20 text-accent">
          <Presentation className="w-4 h-4" />
        </div>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {hasGenerator && (
            <Button
              variant="ghost"
              size="icon"
              className="w-7 h-7 text-primary-foreground/50 hover:text-accent"
              onClick={handleDownload}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Download className="w-3.5 h-3.5" />
              )}
            </Button>
          )}
        </div>
      </div>
      <h4 className="text-sm font-medium text-primary-foreground font-body mb-1">
        {title}
      </h4>
      <p className="text-xs text-primary-foreground/50 font-body">
        {description}
      </p>
      {hasGenerator && (
        <Button
          variant="ghost"
          size="sm"
          className="mt-3 w-full text-xs text-accent hover:bg-accent/10"
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
      )}
    </div>
  );
};

export default DownloadablePresentationItem;
