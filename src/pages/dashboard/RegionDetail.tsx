import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { KPICard } from '@/components/dashboard/KPICard';
import { DataTable, Column } from '@/components/dashboard/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  MapPin, 
  AlertTriangle,
  ArrowLeftRight,
  Building2,
  Clock,
  Shield,
  FileText,
  TrendingDown,
  Building
} from 'lucide-react';
import { 
  regions, 
  getDisputesByRegion, 
  getTransfersByRegion, 
  getMortgagesByRegion,
  formatCurrency,
  formatNumber,
  DisputeRecord,
  TransferRecord,
  MortgageRecord
} from '@/data/dashboardData';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell } from 'recharts';

const RegionDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const region = regions.find(r => r.id === id);
  
  if (!region) {
    return (
      <div className="min-h-screen bg-background">
        <DashboardHeader breadcrumbs={[{ label: 'Regions', path: '/dashboard/regions' }, { label: 'Not Found' }]} />
        <main className="container mx-auto px-4 py-12 text-center">
          <AlertTriangle className="w-16 h-16 text-amber-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Region Not Found</h1>
          <p className="text-muted-foreground mb-6">The region you're looking for doesn't exist.</p>
          <Link to="/dashboard/regions">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Regions
            </Button>
          </Link>
        </main>
      </div>
    );
  }

  const regionDisputes = getDisputesByRegion(region.id);
  const regionTransfers = getTransfersByRegion(region.id);
  const regionMortgages = getMortgagesByRegion(region.id);

  const activityData = [
    { name: 'Disputes', value: region.activeDisputes, fill: 'hsl(var(--chart-1))' },
    { name: 'Transfers', value: region.pendingTransfers, fill: 'hsl(var(--chart-2))' },
    { name: 'Mortgages', value: region.activeMortgages, fill: 'hsl(var(--chart-3))' },
  ];

  const performanceData = [
    { metric: 'Dispute Rate', value: region.disputeRate * 100, target: 10 },
    { metric: 'Avg Processing', value: region.avgProcessingDays, target: 4 },
    { metric: 'Fraud Blocked', value: region.fraudAttempts, target: 5 },
  ];

  const chartConfig = {
    value: { label: 'Value', color: 'hsl(var(--chart-1))' },
  };

  const disputeColumns: Column<DisputeRecord>[] = [
    { key: 'id', header: 'Dispute ID', className: 'font-mono text-sm' },
    { key: 'parcelId', header: 'Parcel ID', className: 'font-mono text-sm' },
    { key: 'type', header: 'Type' },
    { key: 'status', header: 'Status' },
    { 
      key: 'estimatedValue', 
      header: 'Value',
      render: (item) => formatCurrency(item.estimatedValue)
    },
  ];

  const transferColumns: Column<TransferRecord>[] = [
    { key: 'id', header: 'Transfer ID', className: 'font-mono text-sm' },
    { key: 'parcelId', header: 'Parcel ID', className: 'font-mono text-sm' },
    { key: 'type', header: 'Type' },
    { key: 'status', header: 'Status' },
    { 
      key: 'value', 
      header: 'Value',
      render: (item) => item.value > 0 ? formatCurrency(item.value) : 'N/A'
    },
  ];

  const mortgageColumns: Column<MortgageRecord>[] = [
    { key: 'id', header: 'Mortgage ID', className: 'font-mono text-sm' },
    { key: 'parcelId', header: 'Parcel ID', className: 'font-mono text-sm' },
    { key: 'bank', header: 'Bank' },
    { key: 'status', header: 'Status' },
    { 
      key: 'remainingBalance', 
      header: 'Balance',
      render: (item) => formatCurrency(item.remainingBalance)
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader 
        breadcrumbs={[
          { label: 'Regions', path: '/dashboard/regions' }, 
          { label: region.displayName }
        ]} 
      />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link to="/dashboard/regions">
            <Button variant="ghost" size="icon" className="shrink-0">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <MapPin className="w-6 h-6 text-accent" />
              <h1 className="text-2xl font-display font-bold text-foreground">{region.displayName}</h1>
            </div>
            <p className="text-muted-foreground mt-1">
              Regional Land Registry Overview
            </p>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <KPICard
            title="Total Parcels"
            value={formatNumber(region.totalParcels)}
            icon={Building}
            iconColor="text-accent"
          />
          <KPICard
            title="Active Disputes"
            value={formatNumber(region.activeDisputes)}
            icon={AlertTriangle}
            iconColor="text-amber-500"
          />
          <KPICard
            title="Pending Transfers"
            value={formatNumber(region.pendingTransfers)}
            icon={ArrowLeftRight}
            iconColor="text-blue-500"
          />
          <KPICard
            title="Active Mortgages"
            value={formatNumber(region.activeMortgages)}
            icon={Building2}
            iconColor="text-purple-500"
          />
          <KPICard
            title="Avg. Processing"
            value={`${region.avgProcessingDays} days`}
            icon={Clock}
            iconColor="text-emerald-500"
          />
          <KPICard
            title="Fraud Blocked"
            value={formatNumber(region.fraudAttempts)}
            icon={Shield}
            iconColor="text-red-500"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Activity Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[250px]">
                <PieChart>
                  <Pie
                    data={activityData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    innerRadius={50}
                    paddingAngle={2}
                    label={({ name, value }) => `${name}: ${value}`}
                    labelLine={false}
                  >
                    {activityData.map((entry, index) => (
                      <Cell key={index} fill={entry.fill} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Dispute Rate</span>
                    <span className="font-medium">{(region.disputeRate * 100).toFixed(2)}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-amber-500 rounded-full" 
                      style={{ width: `${Math.min(region.disputeRate * 1000, 100)}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Avg. Processing (days)</span>
                    <span className="font-medium">{region.avgProcessingDays}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${region.avgProcessingDays <= 4 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                      style={{ width: `${Math.min((region.avgProcessingDays / 7) * 100, 100)}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Fraud Prevention Score</span>
                    <span className="font-medium">{100 - (region.fraudAttempts * 5)}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-purple-500 rounded-full" 
                      style={{ width: `${100 - (region.fraudAttempts * 5)}%` }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs with tables */}
        <Tabs defaultValue="disputes" className="space-y-6">
          <TabsList className="bg-muted">
            <TabsTrigger value="disputes" className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Disputes ({regionDisputes.length})
            </TabsTrigger>
            <TabsTrigger value="transfers" className="flex items-center gap-2">
              <ArrowLeftRight className="w-4 h-4" />
              Transfers ({regionTransfers.length})
            </TabsTrigger>
            <TabsTrigger value="mortgages" className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              Mortgages ({regionMortgages.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="disputes">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <FileText className="w-5 h-5 text-muted-foreground" />
                  Disputes in {region.displayName}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <DataTable
                  data={regionDisputes}
                  columns={disputeColumns}
                  keyField="id"
                  linkPrefix="/dashboard/disputes"
                  emptyMessage="No disputes in this region"
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transfers">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <FileText className="w-5 h-5 text-muted-foreground" />
                  Transfers in {region.displayName}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <DataTable
                  data={regionTransfers}
                  columns={transferColumns}
                  keyField="id"
                  linkPrefix="/dashboard/transfers"
                  emptyMessage="No transfers in this region"
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mortgages">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <FileText className="w-5 h-5 text-muted-foreground" />
                  Mortgages in {region.displayName}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <DataTable
                  data={regionMortgages}
                  columns={mortgageColumns}
                  keyField="id"
                  linkPrefix="/dashboard/mortgages"
                  emptyMessage="No mortgages in this region"
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default RegionDetail;
