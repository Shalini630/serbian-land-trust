import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { KPICard } from '@/components/dashboard/KPICard';
import { SerbiaHeatMap } from '@/components/dashboard/SerbiaHeatMap';
import { DataTable, Column } from '@/components/dashboard/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MapPin, 
  Map,
  Building,
  AlertTriangle,
  ArrowLeftRight,
  Clock
} from 'lucide-react';
import { regions, RegionData, formatNumber } from '@/data/dashboardData';

const RegionsDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [heatMapMetric, setHeatMapMetric] = useState<'disputes' | 'transfers' | 'processing'>('disputes');

  // Calculate totals
  const totalParcels = regions.reduce((sum, r) => sum + r.totalParcels, 0);
  const totalDisputes = regions.reduce((sum, r) => sum + r.activeDisputes, 0);
  const totalTransfers = regions.reduce((sum, r) => sum + r.pendingTransfers, 0);
  const avgProcessing = (regions.reduce((sum, r) => sum + r.avgProcessingDays, 0) / regions.length).toFixed(1);

  const columns: Column<RegionData>[] = [
    { 
      key: 'displayName', 
      header: 'Region',
      render: (item) => (
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-accent" />
          <span className="font-medium">{item.displayName}</span>
        </div>
      )
    },
    { 
      key: 'totalParcels', 
      header: 'Total Parcels',
      render: (item) => formatNumber(item.totalParcels)
    },
    { 
      key: 'activeDisputes', 
      header: 'Active Disputes',
      render: (item) => (
        <span className={item.activeDisputes > 200 ? 'text-red-500 font-medium' : ''}>
          {formatNumber(item.activeDisputes)}
        </span>
      )
    },
    { 
      key: 'pendingTransfers', 
      header: 'Pending Transfers',
      render: (item) => formatNumber(item.pendingTransfers)
    },
    { 
      key: 'activeMortgages', 
      header: 'Active Mortgages',
      render: (item) => formatNumber(item.activeMortgages)
    },
    { 
      key: 'avgProcessingDays', 
      header: 'Avg. Processing',
      render: (item) => (
        <span className={item.avgProcessingDays > 5 ? 'text-amber-500' : 'text-emerald-500'}>
          {item.avgProcessingDays} days
        </span>
      )
    },
    { 
      key: 'fraudAttempts', 
      header: 'Fraud Blocked',
      render: (item) => (
        <span className="text-purple-500 font-medium">{item.fraudAttempts}</span>
      )
    },
    { 
      key: 'disputeRate', 
      header: 'Dispute Rate',
      render: (item) => `${(item.disputeRate * 100).toFixed(1)}%`
    },
  ];

  const handleRegionClick = (region: RegionData) => {
    navigate(`/dashboard/regions/${region.id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader breadcrumbs={[{ label: 'Regions' }]} />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-foreground">
            Regions Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Geographic overview of land registry activity
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            title="Total Regions"
            value={formatNumber(regions.length)}
            subtitle="Monitored districts"
            icon={Map}
            iconColor="text-accent"
          />
          <KPICard
            title="Total Parcels"
            value={formatNumber(totalParcels)}
            change={1.2}
            changeLabel="new this month"
            icon={Building}
            iconColor="text-blue-500"
          />
          <KPICard
            title="Total Active Disputes"
            value={formatNumber(totalDisputes)}
            change={-8}
            changeLabel="vs last month"
            icon={AlertTriangle}
            iconColor="text-amber-500"
          />
          <KPICard
            title="Avg. Processing Time"
            value={`${avgProcessing} days`}
            change={-15}
            changeLabel="improvement"
            icon={Clock}
            iconColor="text-emerald-500"
          />
        </div>

        {/* Heat Map */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <MapPin className="w-5 h-5 text-accent" />
                Regional Heat Map
              </CardTitle>
              <Tabs value={heatMapMetric} onValueChange={(v) => setHeatMapMetric(v as any)}>
                <TabsList className="bg-muted">
                  <TabsTrigger value="disputes" className="text-xs">Dispute Rate</TabsTrigger>
                  <TabsTrigger value="transfers" className="text-xs">Transfer Volume</TabsTrigger>
                  <TabsTrigger value="processing" className="text-xs">Processing Time</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Click on any region to view detailed statistics
            </p>
          </CardHeader>
          <CardContent>
            <SerbiaHeatMap metric={heatMapMetric} onRegionClick={handleRegionClick} />
          </CardContent>
        </Card>

        {/* Regions Table */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Map className="w-5 h-5 text-muted-foreground" />
              All Regions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              data={regions}
              columns={columns}
              keyField="id"
              linkPrefix="/dashboard/regions"
              emptyMessage="No regions found"
            />
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default RegionsDashboard;
