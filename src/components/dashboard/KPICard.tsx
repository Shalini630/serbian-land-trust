import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: LucideIcon;
  iconColor?: string;
  href?: string;
  subtitle?: string;
}

export const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  change,
  changeLabel,
  icon: Icon,
  iconColor = 'text-accent',
  href,
  subtitle,
}) => {
  const content = (
    <Card className={`group bg-card border-border hover:border-accent/50 transition-all duration-300 ${href ? 'cursor-pointer hover:shadow-lg hover:-translate-y-0.5' : ''}`}>
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <p className="text-sm text-muted-foreground font-medium truncate">{title}</p>
            <p className="text-2xl sm:text-3xl font-display font-bold text-foreground mt-1">{value}</p>
            
            {(change !== undefined || subtitle) && (
              <div className="flex items-center gap-2 mt-2">
                {change !== undefined && (
                  <div className={`flex items-center gap-1 text-sm ${change >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                    {change >= 0 ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    <span className="font-medium">{Math.abs(change)}%</span>
                  </div>
                )}
                {changeLabel && (
                  <span className="text-xs text-muted-foreground">{changeLabel}</span>
                )}
                {subtitle && !changeLabel && (
                  <span className="text-xs text-muted-foreground">{subtitle}</span>
                )}
              </div>
            )}
          </div>
          
          <div className={`flex-shrink-0 p-3 rounded-xl bg-accent/10 ${iconColor}`}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
        
        {href && (
          <div className="flex items-center gap-1 mt-4 text-sm text-accent opacity-0 group-hover:opacity-100 transition-opacity">
            <span>View details</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        )}
      </CardContent>
    </Card>
  );

  if (href) {
    return <Link to={href}>{content}</Link>;
  }

  return content;
};
