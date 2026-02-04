import React, { useState } from 'react';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { KPICard } from '@/components/dashboard/KPICard';
import { SerbiaHeatMap } from '@/components/dashboard/SerbiaHeatMap';
import { DashboardFilters } from '@/components/dashboard/DashboardFilters';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  AlertTriangle,
  ArrowLeftRight,
  Building2,
  MapPin,
  Shield,
  Clock,
  Activity,
  CheckCircle,
} from 'lucide-react';
import {
  regions,
  systemMetrics,
  monthlyTrends,
  disputesByType,
  transfersByType,
  formatNumber,
} from '@/data/dashboardData';
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
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from 'recharts';

const Dashboard: React.FC = () => {
  const [heatMapMetric, setHeatMapMetric] = useState<'disputes' | 'transfers' | 'processing'>('disputes');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedDateRange, setSelectedDateRange] = useState('30d');

  // Calculate totals
  const totalDisputes = regions.reduce((sum, r) => sum + r.activeDisputes, 0);
  const totalTransfers = regions.reduce((sum, r) => sum + r.pendingTransfers, 0);
  const totalMortgages = regions.reduce((sum, r) => sum + r.activeMortgages, 0);
  const totalParcels = regions.reduce((sum, r) => sum + r.totalParcels, 0);

  const chartConfig = {
    transfers: { label: 'Transfers', color: 'hsl(var(--chart-1))' },
    disputes: { label: 'Disputes', color: 'hsl(var(--chart-2))' },
    mortgages: { label: 'Mortgages', color: 'hsl(var(--chart-3))' },
    fraudBlocked: { label: 'Fraud Blocked', color: 'hsl(var(--chart-4))' },
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Page Title */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-foreground">
              Registry Overview
            </h1>
            <p className="text-muted-foreground mt-1">
              Real-time land registry system monitoring
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-sm text-emerald-600 font-medium">System Online</span>
          </div>
        </div>

        {/* Filters */}
        <DashboardFilters
          selectedRegion={selectedRegion}
          selectedDateRange={selectedDateRange}
          onRegionChange={setSelectedRegion}
          onDateRangeChange={setSelectedDateRange}
          showStatus={false}
          onReset={() => {
            setSelectedRegion('all');
            setSelectedDateRange('30d');
          }}
        />

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            title="Active Disputes"
            value={formatNumber(totalDisputes)}
            change={-8.2}
            changeLabel="vs last month"
            icon={AlertTriangle}
            iconColor="text-amber-500"
            href="/dashboard/disputes"
          />
          <KPICard
            title="Pending Transfers"
            value={formatNumber(totalTransfers)}
            change={12.5}
            changeLabel="vs last month"
            icon={ArrowLeftRight}
            iconColor="text-blue-500"
            href="/dashboard/transfers"
          />
          <KPICard
            title="Active Mortgages"
            value={formatNumber(totalMortgages)}
            change={5.3}
            changeLabel="vs last month"
            icon={Building2}
            iconColor="text-purple-500"
            href="/dashboard/mortgages"
          />
          <KPICard
            title="Total Parcels"
            value={formatNumber(totalParcels)}
            subtitle="Registered in system"
            icon={MapPin}
            iconColor="text-accent"
            href="/dashboard/regions"
          />
        </div>

        {/* System Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Card className="bg-card border-border">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent/10">
                <Activity className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{systemMetrics.totalTransactionsToday}</p>
                <p className="text-xs text-muted-foreground">Transactions Today</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/10">
                <Clock className="w-5 h-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{systemMetrics.avgValidationTime}s</p>
                <p className="text-xs text-muted-foreground">Avg Validation</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <Shield className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{systemMetrics.activeNodes}</p>
                <p className="text-xs text-muted-foreground">Active Nodes</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/10">
                <CheckCircle className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{systemMetrics.systemUptime}%</p>
                <p className="text-xs text-muted-foreground">System Uptime</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Heat Map */}
          <Card className="lg:col-span-2 bg-card border-border">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">Regional Heat Map</CardTitle>
                <Tabs value={heatMapMetric} onValueChange={(v) => setHeatMapMetric(v as any)}>
                  <TabsList className="bg-muted">
                    <TabsTrigger value="disputes" className="text-xs">Disputes</TabsTrigger>
                    <TabsTrigger value="transfers" className="text-xs">Transfers</TabsTrigger>
                    <TabsTrigger value="processing" className="text-xs">Processing</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent>
              <SerbiaHeatMap metric={heatMapMetric} />
            </CardContent>
          </Card>

          {/* Dispute Types Pie Chart */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Disputes by Type</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[250px]">
                <PieChart>
                  <Pie
                    data={disputesByType}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    innerRadius={50}
                    paddingAngle={2}
                    label={({ name, value }) => `${name}: ${value}%`}
                    labelLine={false}
                  >
                    {disputesByType.map((entry, index) => (
                      <Cell key={index} fill={entry.fill} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ChartContainer>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {disputesByType.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.fill }}></div>
                    <span className="text-xs text-muted-foreground">{item.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Trends Chart */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Monthly Activity Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <AreaChart data={monthlyTrends}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis 
                  dataKey="month" 
                  className="text-muted-foreground text-xs"
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                />
                <YAxis 
                  className="text-muted-foreground text-xs"
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="transfers"
                  stackId="1"
                  stroke="hsl(var(--chart-1))"
                  fill="hsl(var(--chart-1))"
                  fillOpacity={0.4}
                />
                <Area
                  type="monotone"
                  dataKey="disputes"
                  stackId="2"
                  stroke="hsl(var(--chart-2))"
                  fill="hsl(var(--chart-2))"
                  fillOpacity={0.4}
                />
                <Area
                  type="monotone"
                  dataKey="mortgages"
                  stackId="3"
                  stroke="hsl(var(--chart-3))"
                  fill="hsl(var(--chart-3))"
                  fillOpacity={0.4}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Transfer Types */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Transfers by Type</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[250px]">
                <BarChart data={transfersByType} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" horizontal={false} />
                  <XAxis type="number" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    width={80}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                    {transfersByType.map((entry, index) => (
                      <Cell key={index} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Fraud Prevention</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[250px]">
                <BarChart data={monthlyTrends}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                  <YAxis tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar 
                    dataKey="fraudBlocked" 
                    fill="hsl(var(--chart-4))" 
                    radius={[4, 4, 0, 0]}
                    name="Fraud Attempts Blocked"
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
