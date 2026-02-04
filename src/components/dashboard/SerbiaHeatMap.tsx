import React from 'react';
import { useNavigate } from 'react-router-dom';
import { regions, RegionData } from '@/data/dashboardData';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface SerbiaHeatMapProps {
  metric: 'disputes' | 'transfers' | 'processing';
  onRegionClick?: (region: RegionData) => void;
}

export const SerbiaHeatMap: React.FC<SerbiaHeatMapProps> = ({ metric, onRegionClick }) => {
  const navigate = useNavigate();

  const getHeatColor = (region: RegionData): string => {
    let intensity: number;
    
    switch (metric) {
      case 'disputes':
        intensity = region.disputeRate * 100;
        break;
      case 'transfers':
        intensity = (region.pendingTransfers / 2500) * 100;
        break;
      case 'processing':
        intensity = (region.avgProcessingDays / 6) * 100;
        break;
      default:
        intensity = 50;
    }

    // Create color gradient from green (low) to yellow (medium) to red (high)
    if (intensity < 33) {
      return 'bg-emerald-500/70';
    } else if (intensity < 66) {
      return 'bg-amber-500/70';
    } else {
      return 'bg-red-500/70';
    }
  };

  const getMetricValue = (region: RegionData): string => {
    switch (metric) {
      case 'disputes':
        return `${region.activeDisputes} active`;
      case 'transfers':
        return `${region.pendingTransfers} pending`;
      case 'processing':
        return `${region.avgProcessingDays} days avg`;
      default:
        return '';
    }
  };

  const handleClick = (region: RegionData) => {
    if (onRegionClick) {
      onRegionClick(region);
    } else {
      navigate(`/dashboard/regions/${region.id}`);
    }
  };

  return (
    <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-muted/50 to-muted rounded-xl border border-border overflow-hidden">
      {/* Map background with Serbia outline approximation */}
      <svg 
        viewBox="0 0 100 100" 
        className="absolute inset-0 w-full h-full opacity-20"
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          d="M45 5 L60 8 L75 15 L80 25 L78 35 L82 45 L80 60 L75 75 L65 85 L55 90 L45 88 L35 82 L25 70 L20 55 L22 40 L28 25 L35 15 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-foreground/30"
        />
      </svg>

      {/* Region markers */}
      {regions.map((region) => (
        <Tooltip key={region.id}>
          <TooltipTrigger asChild>
            <button
              onClick={() => handleClick(region)}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 hover:scale-125 hover:z-10 cursor-pointer group`}
              style={{
                left: `${region.coordinates.x}%`,
                top: `${region.coordinates.y}%`,
              }}
            >
              <div className={`w-8 h-8 rounded-full ${getHeatColor(region)} flex items-center justify-center shadow-lg border-2 border-background group-hover:ring-2 ring-accent`}>
                <span className="text-xs font-bold text-white">{region.displayName.charAt(0)}</span>
              </div>
              <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                <span className="text-[10px] text-muted-foreground font-medium bg-background/80 px-1 rounded">
                  {region.displayName}
                </span>
              </div>
            </button>
          </TooltipTrigger>
          <TooltipContent side="right" className="bg-card border-border shadow-xl">
            <div className="space-y-1">
              <p className="font-semibold text-foreground">{region.displayName}</p>
              <p className="text-sm text-muted-foreground">{getMetricValue(region)}</p>
              <p className="text-xs text-accent">Click to view details →</p>
            </div>
          </TooltipContent>
        </Tooltip>
      ))}

      {/* Legend */}
      <div className="absolute bottom-3 left-3 bg-background/90 backdrop-blur-sm rounded-lg p-2 border border-border">
        <p className="text-xs text-muted-foreground mb-1 font-medium">
          {metric === 'disputes' ? 'Dispute Rate' : metric === 'transfers' ? 'Transfer Volume' : 'Processing Time'}
        </p>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            <span className="text-[10px] text-muted-foreground">Low</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <span className="text-[10px] text-muted-foreground">Med</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-[10px] text-muted-foreground">High</span>
          </div>
        </div>
      </div>
    </div>
  );
};
