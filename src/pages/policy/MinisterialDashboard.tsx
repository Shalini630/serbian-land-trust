import React from 'react';
import { Link } from 'react-router-dom';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Home,
  Scale,
  Wallet,
  TrendingUp,
  ArrowRight,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Activity,
} from 'lucide-react';
import { ministerialKPIs } from '@/data/policyDashboardData';

interface PolicyTileProps {
  title: string;
  value: number;
  unit: string;
  trend: number;
  trendLabel: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  status: 'good' | 'warning' | 'critical';
  href: string;
  description: string;
}

const PolicyTile: React.FC<PolicyTileProps> = ({
  title,
  value,
  unit,
  trend,
  trendLabel,
  icon: Icon,
  iconBg,
  iconColor,
  status,
  href,
  description,
}) => {
  const statusColors = {
    good: 'border-emerald-500/30 bg-emerald-500/5',
    warning: 'border-amber-500/30 bg-amber-500/5',
    critical: 'border-red-500/30 bg-red-500/5',
  };

  const statusBadge = {
    good: { label: 'On Track', variant: 'default' as const, className: 'bg-emerald-500 hover:bg-emerald-600' },
    warning: { label: 'Monitor', variant: 'default' as const, className: 'bg-amber-500 hover:bg-amber-600' },
    critical: { label: 'Action Required', variant: 'default' as const, className: 'bg-red-500 hover:bg-red-600' },
  };

  return (
    <Link to={href}>
      <Card className={`group relative overflow-hidden border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${statusColors[status]}`}>
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <div className={`p-3 rounded-xl ${iconBg}`}>
              <Icon className={`w-6 h-6 ${iconColor}`} />
            </div>
            <Badge className={statusBadge[status].className}>
              {statusBadge[status].label}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-4xl font-display font-bold text-foreground">{value}</span>
              <span className="text-lg text-muted-foreground">{unit}</span>
            </div>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>

          <div className="flex items-center justify-between pt-2 border-t border-border">
            <div className={`flex items-center gap-1 text-sm ${trend >= 0 ? (title.includes('Risk') ? 'text-red-500' : 'text-emerald-500') : (title.includes('Risk') ? 'text-emerald-500' : 'text-red-500')}`}>
              {trend >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              <span className="font-medium">{Math.abs(trend)}%</span>
              <span className="text-muted-foreground ml-1">{trendLabel}</span>
            </div>
            <div className="flex items-center gap-1 text-accent opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-sm font-medium">View Details</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

const MinisterialDashboard: React.FC = () => {
  const tiles: PolicyTileProps[] = [
    {
      title: 'Affordability Score',
      value: ministerialKPIs.affordabilityScore,
      unit: '/100',
      trend: ministerialKPIs.affordabilityTrend,
      trendLabel: 'vs last quarter',
      icon: Home,
      iconBg: 'bg-blue-500/10',
      iconColor: 'text-blue-500',
      status: ministerialKPIs.affordabilityScore >= 70 ? 'good' : ministerialKPIs.affordabilityScore >= 50 ? 'warning' : 'critical',
      href: '/policy/affordable-housing',
      description: 'Housing remains structurally unaffordable in Belgrade & Novi Sad. Price-to-income ratio exceeds EU benchmarks.',
    },
    {
      title: 'Legal Cleanliness',
      value: ministerialKPIs.legalCleanliness,
      unit: '%',
      trend: ministerialKPIs.legalTrend,
      trendLabel: 'improvement',
      icon: Scale,
      iconBg: 'bg-emerald-500/10',
      iconColor: 'text-emerald-500',
      status: ministerialKPIs.legalCleanliness >= 85 ? 'good' : ministerialKPIs.legalCleanliness >= 70 ? 'warning' : 'critical',
      href: '/policy/legal-compliance',
      description: '78.4% of properties fully verified. 1,217 active disputes and 156 under litigation require attention.',
    },
    {
      title: 'Subsidy Effectiveness',
      value: ministerialKPIs.subsidyEffectiveness,
      unit: '%',
      trend: ministerialKPIs.subsidyTrend,
      trendLabel: 'delivery rate',
      icon: Wallet,
      iconBg: 'bg-purple-500/10',
      iconColor: 'text-purple-500',
      status: ministerialKPIs.subsidyEffectiveness >= 80 ? 'good' : ministerialKPIs.subsidyEffectiveness >= 65 ? 'warning' : 'critical',
      href: '/policy/subsidy-allocation',
      description: '€76.2M of €98.5M allocated has been utilized. 3.2% leakage detected requiring investigation.',
    },
    {
      title: 'Bubble Risk Index',
      value: ministerialKPIs.bubbleRiskIndex,
      unit: '/100',
      trend: ministerialKPIs.bubbleTrend,
      trendLabel: 'increase',
      icon: TrendingUp,
      iconBg: 'bg-red-500/10',
      iconColor: 'text-red-500',
      status: ministerialKPIs.bubbleRiskIndex <= 40 ? 'good' : ministerialKPIs.bubbleRiskIndex <= 60 ? 'warning' : 'critical',
      href: '/policy/bubble-protection',
      description: 'High risk detected in urban centers. Price growth (18.4%) significantly outpacing income growth (4.7%).',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-accent/10">
                <Activity className="w-6 h-6 text-accent" />
              </div>
              <Badge variant="outline" className="text-accent border-accent">
                Policy Command Center
              </Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-foreground">
              Ministerial Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Real-time policy monitoring for Serbia's real estate digitization initiative
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              <span className="text-sm font-medium text-emerald-600">All Systems Operational</span>
            </div>
            <div className="text-sm text-muted-foreground">
              Last updated: {new Date().toLocaleTimeString('sr-RS')}
            </div>
          </div>
        </div>

        {/* Alert Banner */}
        <Card className="border-amber-500/30 bg-amber-500/5">
          <CardContent className="p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-foreground">Attention Required</p>
              <p className="text-sm text-muted-foreground mt-1">
                Bubble risk index has increased by 8.5% this quarter. AI forecasting indicates 42% probability of price correction in the next 12 months. 
                <Link to="/policy/bubble-protection" className="text-accent hover:underline ml-1">
                  View recommended actions →
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Policy Tiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tiles.map((tile) => (
            <PolicyTile key={tile.title} {...tile} />
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Quick Navigation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Link 
                to="/dashboard" 
                className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-accent/50 hover:bg-accent/5 transition-all"
              >
                <div className="p-2 rounded-lg bg-muted">
                  <Activity className="w-4 h-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-sm">Land Registry</p>
                  <p className="text-xs text-muted-foreground">Operations</p>
                </div>
              </Link>
              <Link 
                to="/dashboard/disputes" 
                className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-accent/50 hover:bg-accent/5 transition-all"
              >
                <div className="p-2 rounded-lg bg-muted">
                  <Scale className="w-4 h-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-sm">Disputes</p>
                  <p className="text-xs text-muted-foreground">1,217 Active</p>
                </div>
              </Link>
              <Link 
                to="/dashboard/transfers" 
                className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-accent/50 hover:bg-accent/5 transition-all"
              >
                <div className="p-2 rounded-lg bg-muted">
                  <TrendingUp className="w-4 h-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-sm">Transfers</p>
                  <p className="text-xs text-muted-foreground">456 Pending</p>
                </div>
              </Link>
              <Link 
                to="/presentations" 
                className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-accent/50 hover:bg-accent/5 transition-all"
              >
                <div className="p-2 rounded-lg bg-muted">
                  <Home className="w-4 h-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-sm">Presentations</p>
                  <p className="text-xs text-muted-foreground">Portal</p>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Footer Note */}
        <div className="text-center text-sm text-muted-foreground py-4">
          <p>Data refreshed every 15 minutes • Blockchain verified • Last audit: {new Date().toLocaleDateString('sr-RS')}</p>
        </div>
      </main>
    </div>
  );
};

export default MinisterialDashboard;
