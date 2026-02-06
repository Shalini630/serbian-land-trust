import React from 'react';
import { Link } from 'react-router-dom';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Line,
  LineChart,
  Legend,
  BarChart,
  Bar,
  Cell,
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  ArrowLeft,
  Activity,
  Shield,
  Brain,
  AlertCircle,
  Building2,
  Users,
  Percent,
  Home,
  Zap,
} from 'lucide-react';
import {
  bubbleIndicators,
  marketStressSignals,
  cityBubbleRisk,
  aiForecast,
  priceGrowthTrend,
  getRiskColor,
  getRiskBgColor,
} from '@/data/policyDashboardData';

const BubbleProtectionDashboard: React.FC = () => {
  const chartConfig = {
    priceGrowth: { label: 'Price Growth %', color: 'hsl(0, 72%, 51%)' },
    incomeGrowth: { label: 'Income Growth %', color: 'hsl(168, 60%, 38%)' },
  };

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
          <span className="text-foreground">Bubble Protection</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-red-500/10">
                <TrendingUp className="w-6 h-6 text-red-500" />
              </div>
              <Badge variant="outline" className="text-red-500 border-red-500">
                Market Surveillance
              </Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-foreground">
              Bubble Protection Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Detect speculative bubbles before they become financial crises
            </p>
          </div>
        </div>

        {/* Early Warning Indicators */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className={bubbleIndicators.priceGrowthVsIncome > 3 ? "bg-red-500/5 border-red-500/20" : "bg-card border-border"}>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <TrendingUp className="w-4 h-4" />
                <span>Price vs Income Divergence</span>
              </div>
              <span className={`text-3xl font-bold ${bubbleIndicators.priceGrowthVsIncome > 3 ? 'text-red-500' : 'text-foreground'}`}>
                {bubbleIndicators.priceGrowthVsIncome}x
              </span>
              <p className="text-xs text-muted-foreground mt-1">&gt;3x = Warning</p>
            </CardContent>
          </Card>

          <Card className={bubbleIndicators.priceToRentRatio > 25 ? "bg-amber-500/5 border-amber-500/20" : "bg-card border-border"}>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <Home className="w-4 h-4" />
                <span>Price-to-Rent Ratio</span>
              </div>
              <span className={`text-3xl font-bold ${bubbleIndicators.priceToRentRatio > 25 ? 'text-amber-500' : 'text-foreground'}`}>
                {bubbleIndicators.priceToRentRatio}
              </span>
              <p className="text-xs text-muted-foreground mt-1">&gt;25 = Elevated</p>
            </CardContent>
          </Card>

          <Card className={bubbleIndicators.investorTransactionShare > 30 ? "bg-red-500/5 border-red-500/20" : "bg-card border-border"}>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <Users className="w-4 h-4" />
                <span>Investor Transactions</span>
              </div>
              <span className={`text-3xl font-bold ${bubbleIndicators.investorTransactionShare > 30 ? 'text-red-500' : 'text-foreground'}`}>
                {bubbleIndicators.investorTransactionShare}%
              </span>
              <p className="text-xs text-muted-foreground mt-1">&gt;30% = Speculation</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <Building2 className="w-4 h-4" />
                <span>Vacancy Rate</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-foreground">{bubbleIndicators.vacancyRate}%</span>
                <span className="text-sm text-red-500">+{bubbleIndicators.vacancyTrend}%</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">YoY increase</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Price Growth Trend */}
          <Card className="lg:col-span-2 bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Price vs Income Growth Divergence</CardTitle>
              <p className="text-sm text-muted-foreground">Growing gap indicates bubble formation</p>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <LineChart data={priceGrowthTrend}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                  <YAxis tick={{ fill: 'hsl(var(--muted-foreground))' }} unit="%" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="priceGrowth" 
                    stroke="hsl(0, 72%, 51%)" 
                    strokeWidth={3}
                    name="Price Growth %"
                    dot={{ fill: 'hsl(0, 72%, 51%)' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="incomeGrowth" 
                    stroke="hsl(168, 60%, 38%)" 
                    strokeWidth={3}
                    name="Income Growth %"
                    dot={{ fill: 'hsl(168, 60%, 38%)' }}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* AI Forecast Panel */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-500" />
                AI Forecast Panel
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">6-Month Risk Score</span>
                  <span className="font-bold text-amber-500">{aiForecast.sixMonthRiskScore}/100</span>
                </div>
                <Progress value={aiForecast.sixMonthRiskScore} className="h-2" />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">12-Month Risk Score</span>
                  <span className="font-bold text-red-500">{aiForecast.twelveMonthRiskScore}/100</span>
                </div>
                <Progress value={aiForecast.twelveMonthRiskScore} className="h-2" />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border">
                <div className="text-center p-3 rounded-lg bg-red-500/10">
                  <p className="text-2xl font-bold text-red-500">{aiForecast.correctionProbability}%</p>
                  <p className="text-xs text-muted-foreground">Correction Probability</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-amber-500/10">
                  <p className="text-2xl font-bold text-amber-500">{aiForecast.liquidityStress}%</p>
                  <p className="text-xs text-muted-foreground">Liquidity Stress</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Market Stress Signals */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-500" />
              Market Stress Signals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {marketStressSignals.map((signal) => (
                <div 
                  key={signal.signal}
                  className={`p-4 rounded-lg border ${
                    signal.severity === 'high' 
                      ? 'border-red-500/20 bg-red-500/5' 
                      : 'border-amber-500/20 bg-amber-500/5'
                  }`}
                >
                  <p className="text-sm font-medium text-foreground">{signal.signal}</p>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className={`text-2xl font-bold ${signal.severity === 'high' ? 'text-red-500' : 'text-amber-500'}`}>
                      {signal.count.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 mt-1 text-red-500">
                    <TrendingUp className="w-3 h-3" />
                    <span className="text-xs">+{signal.trend}% trend</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* City Risk Table */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">City-Level Bubble Risk Assessment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">City</th>
                    <th className="text-center py-3 px-4 font-medium text-muted-foreground">Risk Score</th>
                    <th className="text-right py-3 px-4 font-medium text-muted-foreground">Price Growth</th>
                    <th className="text-right py-3 px-4 font-medium text-muted-foreground">Income Growth</th>
                    <th className="text-right py-3 px-4 font-medium text-muted-foreground">Divergence</th>
                    <th className="text-center py-3 px-4 font-medium text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {cityBubbleRisk.map((city) => (
                    <tr key={city.city} className="border-b border-border hover:bg-muted/50">
                      <td className="py-3 px-4 font-medium">{city.city}</td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Progress value={city.riskScore} className="w-16" />
                          <span className="font-bold">{city.riskScore}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right text-red-500">+{city.priceGrowth}%</td>
                      <td className="py-3 px-4 text-right text-emerald-500">+{city.incomeGrowth}%</td>
                      <td className="py-3 px-4 text-right font-medium">
                        {(city.priceGrowth / city.incomeGrowth).toFixed(1)}x
                      </td>
                      <td className="py-3 px-4 text-center">
                        <Badge 
                          className={
                            city.status === 'high' 
                              ? 'bg-red-500' 
                              : city.status === 'medium'
                              ? 'bg-amber-500'
                              : 'bg-emerald-500'
                          }
                        >
                          {city.status} risk
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Regulator Action Triggers */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Zap className="w-5 h-5 text-accent" />
              Recommended Regulator Actions
            </CardTitle>
            <p className="text-sm text-muted-foreground">AI-generated policy recommendations based on current indicators</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {aiForecast.recommendedActions.map((action, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-3 p-4 rounded-lg border border-accent/20 bg-accent/5"
                >
                  <div className="p-2 rounded-full bg-accent/20">
                    <Shield className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{action}</p>
                    <p className="text-xs text-muted-foreground mt-1">Priority: High</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex gap-3">
              <Button className="flex-1">
                Generate Detailed Report
              </Button>
              <Button variant="outline" className="flex-1">
                Schedule Review Meeting
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default BubbleProtectionDashboard;
