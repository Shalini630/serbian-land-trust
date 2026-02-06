import React from 'react';
import { Link } from 'react-router-dom';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  Legend,
} from 'recharts';
import {
  Wallet,
  Users,
  Building2,
  ArrowLeft,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  Target,
  Clock,
  Star,
} from 'lucide-react';
import {
  subsidyKPIs,
  subsidyByIncomeBracket,
  subsidyRedFlags,
  subsidyOutcomes,
  subsidyByCity,
  formatCurrency,
} from '@/data/policyDashboardData';

const SubsidyAllocationDashboard: React.FC = () => {
  const utilizationPercent = (subsidyKPIs.utilized / subsidyKPIs.allocated) * 100;

  const bracketChartData = subsidyByIncomeBracket.map((b) => ({
    name: b.bracket,
    allocated: b.allocated / 1000000,
    utilized: b.utilized / 1000000,
  }));

  const cityChartData = subsidyByCity.map((c) => ({
    name: c.city,
    budget: c.budget / 1000000,
    utilized: c.utilized / 1000000,
    units: c.units,
  }));

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Breadcrumb & Header */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/policy" className="hover:text-foreground flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" />
            Policy Dashboard
          </Link>
          <span>/</span>
          <span className="text-foreground">Subsidy Allocation</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-purple-500/10">
                <Wallet className="w-6 h-6 text-purple-500" />
              </div>
              <Badge variant="outline" className="text-purple-500 border-purple-500">
                Subsidy Management
              </Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-foreground">
              Subsidy Allocation Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Precise, targeted, leak-proof, and politically defensible subsidies
            </p>
          </div>
        </div>

        {/* Budget Flow Summary */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <Wallet className="w-4 h-4" />
                <span>Total Budget</span>
              </div>
              <span className="text-3xl font-bold text-foreground">{formatCurrency(subsidyKPIs.totalBudget)}</span>
              <p className="text-xs text-muted-foreground mt-1">FY 2024 Allocation</p>
            </CardContent>
          </Card>

          <Card className="bg-blue-500/5 border-blue-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-sm text-blue-600 mb-1">
                <Target className="w-4 h-4" />
                <span>Allocated</span>
              </div>
              <span className="text-3xl font-bold text-foreground">{formatCurrency(subsidyKPIs.allocated)}</span>
              <Progress value={(subsidyKPIs.allocated / subsidyKPIs.totalBudget) * 100} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-1">{((subsidyKPIs.allocated / subsidyKPIs.totalBudget) * 100).toFixed(1)}% of budget</p>
            </CardContent>
          </Card>

          <Card className="bg-emerald-500/5 border-emerald-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-sm text-emerald-600 mb-1">
                <CheckCircle className="w-4 h-4" />
                <span>Utilized</span>
              </div>
              <span className="text-3xl font-bold text-foreground">{formatCurrency(subsidyKPIs.utilized)}</span>
              <Progress value={utilizationPercent} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-1">{utilizationPercent.toFixed(1)}% utilization rate</p>
            </CardContent>
          </Card>

          <Card className="bg-red-500/5 border-red-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-sm text-red-600 mb-1">
                <AlertTriangle className="w-4 h-4" />
                <span>Leakage</span>
              </div>
              <span className="text-3xl font-bold text-foreground">{subsidyKPIs.leakageMismatch}%</span>
              <p className="text-xs text-muted-foreground mt-1">Mismatch / fraud detected</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Allocation by Income Bracket */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Allocation by Income Bracket</CardTitle>
              <p className="text-sm text-muted-foreground">Budget vs utilization across income levels (€M)</p>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={bracketChartData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="name" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} />
                    <YAxis tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="allocated" name="Allocated" fill="hsl(220, 70%, 50%)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="utilized" name="Utilized" fill="hsl(168, 60%, 38%)" radius={[4, 4, 0, 0]} />
                    <Legend />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Allocation by City */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Allocation by City</CardTitle>
              <p className="text-sm text-muted-foreground">Geographic distribution of subsidies (€M)</p>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={cityChartData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" horizontal={false} />
                    <XAxis type="number" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                    <YAxis dataKey="name" type="category" tick={{ fill: 'hsl(var(--muted-foreground))' }} width={80} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="budget" name="Budget" fill="hsl(220, 70%, 50%)" radius={[0, 4, 4, 0]} />
                    <Bar dataKey="utilized" name="Utilized" fill="hsl(168, 60%, 38%)" radius={[0, 4, 4, 0]} />
                    <Legend />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Red Flags */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              Subsidy Red Flags
            </CardTitle>
            <p className="text-sm text-muted-foreground">Anomalies and potential fraud indicators</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {subsidyRedFlags.map((flag) => (
                <div 
                  key={flag.type}
                  className="p-4 rounded-lg border border-red-500/20 bg-red-500/5"
                >
                  <p className="text-sm font-medium text-foreground">{flag.type}</p>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-2xl font-bold text-red-500">{flag.count}</span>
                    <span className="text-xs text-muted-foreground">cases</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{formatCurrency(flag.amount)}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Outcome Tracking */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Outcome Tracking</CardTitle>
            <p className="text-sm text-muted-foreground">Measuring subsidy effectiveness and impact</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <Building2 className="w-8 h-8 mx-auto text-blue-500" />
                <p className="text-3xl font-bold mt-3">{subsidyOutcomes.unitsDelivered.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground mt-1">Units Delivered</p>
                <p className="text-xs text-muted-foreground">of {subsidyOutcomes.unitsSubsidized.toLocaleString()} subsidized</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <Target className="w-8 h-8 mx-auto text-emerald-500" />
                <p className="text-3xl font-bold mt-3">{subsidyOutcomes.deliveryRate}%</p>
                <p className="text-sm text-muted-foreground mt-1">Delivery Rate</p>
                <div className="flex items-center justify-center gap-1 mt-1 text-emerald-500">
                  <TrendingUp className="w-3 h-3" />
                  <span className="text-xs">+2.4% vs last year</span>
                </div>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <TrendingDown className="w-8 h-8 mx-auto text-purple-500" />
                <p className="text-3xl font-bold mt-3">{subsidyOutcomes.avgPriceReduction}%</p>
                <p className="text-sm text-muted-foreground mt-1">Avg Price Reduction</p>
                <p className="text-xs text-muted-foreground">For beneficiaries</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <Clock className="w-8 h-8 mx-auto text-amber-500" />
                <p className="text-3xl font-bold mt-3">{subsidyOutcomes.avgTimeToPossession}</p>
                <p className="text-sm text-muted-foreground mt-1">Months to Possession</p>
                <p className="text-xs text-muted-foreground">Average timeline</p>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-lg bg-accent/5 border border-accent/20">
              <div className="flex items-center gap-3">
                <Star className="w-6 h-6 text-accent" />
                <div>
                  <p className="font-medium">Beneficiary Satisfaction Score</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-2xl font-bold">{subsidyOutcomes.satisfactionScore}/10</span>
                    <Progress value={subsidyOutcomes.satisfactionScore * 10} className="w-32" />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Eligibility Matrix Summary */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Eligibility Matrix</CardTitle>
            <p className="text-sm text-muted-foreground">Cross-filter: Income × Property Size × Location × First-time buyer</p>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Income Bracket</th>
                    <th className="text-right py-3 px-4 font-medium text-muted-foreground">Allocated</th>
                    <th className="text-right py-3 px-4 font-medium text-muted-foreground">Utilized</th>
                    <th className="text-right py-3 px-4 font-medium text-muted-foreground">Beneficiaries</th>
                    <th className="text-right py-3 px-4 font-medium text-muted-foreground">Utilization %</th>
                    <th className="text-right py-3 px-4 font-medium text-muted-foreground">Leakage %</th>
                  </tr>
                </thead>
                <tbody>
                  {subsidyByIncomeBracket.map((bracket) => (
                    <tr key={bracket.bracket} className="border-b border-border hover:bg-muted/50">
                      <td className="py-3 px-4 font-medium">{bracket.bracket}</td>
                      <td className="py-3 px-4 text-right">{formatCurrency(bracket.allocated)}</td>
                      <td className="py-3 px-4 text-right">{formatCurrency(bracket.utilized)}</td>
                      <td className="py-3 px-4 text-right">{bracket.beneficiaries.toLocaleString()}</td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Progress value={(bracket.utilized / bracket.allocated) * 100} className="w-16" />
                          <span>{((bracket.utilized / bracket.allocated) * 100).toFixed(0)}%</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Badge className={bracket.leakage > 5 ? 'bg-red-500' : bracket.leakage > 3 ? 'bg-amber-500' : 'bg-emerald-500'}>
                          {bracket.leakage}%
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default SubsidyAllocationDashboard;
