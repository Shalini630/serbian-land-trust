import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { KPICard } from '@/components/dashboard/KPICard';
import { DashboardFilters } from '@/components/dashboard/DashboardFilters';
import { DataTable, Column } from '@/components/dashboard/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  AlertTriangle, 
  Clock, 
  Scale, 
  TrendingDown,
  FileText,
  Users,
  Euro
} from 'lucide-react';
import { disputes, DisputeRecord, regions, formatCurrency, formatNumber } from '@/data/dashboardData';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const DisputesDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedDateRange, setSelectedDateRange] = useState('30d');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDisputes = useMemo(() => {
    return disputes.filter((dispute) => {
      const matchesRegion = selectedRegion === 'all' || dispute.region === selectedRegion;
      const matchesStatus = selectedStatus === 'all' || dispute.status === selectedStatus;
      const matchesSearch = !searchQuery || 
        dispute.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dispute.parcelId.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesRegion && matchesStatus && matchesSearch;
    });
  }, [selectedRegion, selectedStatus, searchQuery]);

  // Calculate metrics
  const openDisputes = disputes.filter(d => d.status === 'open').length;
  const inCourt = disputes.filter(d => d.status === 'court').length;
  const avgDaysOpen = Math.round(disputes.filter(d => d.daysOpen > 0).reduce((sum, d) => sum + d.daysOpen, 0) / disputes.length);
  const totalValue = disputes.reduce((sum, d) => sum + d.estimatedValue, 0);

  // Charts data
  const statusData = [
    { name: 'Open', value: disputes.filter(d => d.status === 'open').length, fill: 'hsl(var(--chart-1))' },
    { name: 'Investigation', value: disputes.filter(d => d.status === 'investigation').length, fill: 'hsl(var(--chart-2))' },
    { name: 'Court', value: disputes.filter(d => d.status === 'court').length, fill: 'hsl(var(--chart-3))' },
    { name: 'Resolved', value: disputes.filter(d => d.status === 'resolved').length, fill: 'hsl(var(--chart-4))' },
  ];

  const regionData = regions
    .map(r => ({ name: r.displayName, disputes: r.activeDisputes }))
    .sort((a, b) => b.disputes - a.disputes)
    .slice(0, 6);

  const columns: Column<DisputeRecord>[] = [
    { key: 'id', header: 'Dispute ID', className: 'font-mono text-sm' },
    { key: 'parcelId', header: 'Parcel ID', className: 'font-mono text-sm' },
    { 
      key: 'region', 
      header: 'Region',
      render: (item) => regions.find(r => r.id === item.region)?.displayName || item.region
    },
    { key: 'type', header: 'Type' },
    { key: 'status', header: 'Status' },
    { 
      key: 'filedDate', 
      header: 'Filed Date',
      render: (item) => new Date(item.filedDate).toLocaleDateString('sr-RS')
    },
    { 
      key: 'estimatedValue', 
      header: 'Est. Value',
      render: (item) => formatCurrency(item.estimatedValue)
    },
    { 
      key: 'daysOpen', 
      header: 'Days Open',
      render: (item) => item.daysOpen > 0 ? `${item.daysOpen} days` : 'Resolved'
    },
  ];

  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'open', label: 'Open' },
    { value: 'investigation', label: 'Investigation' },
    { value: 'court', label: 'In Court' },
    { value: 'resolved', label: 'Resolved' },
  ];

  const chartConfig = {
    disputes: { label: 'Disputes', color: 'hsl(var(--chart-1))' },
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader breadcrumbs={[{ label: 'Disputes' }]} />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Page Title */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-foreground">
            Disputes Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Monitor and manage land ownership disputes
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            title="Open Disputes"
            value={formatNumber(openDisputes)}
            change={-12}
            changeLabel="vs last month"
            icon={AlertTriangle}
            iconColor="text-amber-500"
          />
          <KPICard
            title="In Court"
            value={formatNumber(inCourt)}
            subtitle="Active litigation"
            icon={Scale}
            iconColor="text-red-500"
          />
          <KPICard
            title="Avg. Days Open"
            value={`${avgDaysOpen} days`}
            change={-15}
            changeLabel="improvement"
            icon={Clock}
            iconColor="text-blue-500"
          />
          <KPICard
            title="Total Value at Stake"
            value={formatCurrency(totalValue)}
            subtitle="Across all disputes"
            icon={Euro}
            iconColor="text-purple-500"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Disputes by Status</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[250px]">
                <PieChart>
                  <Pie
                    data={statusData}
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
                    {statusData.map((entry, index) => (
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
              <CardTitle className="text-lg font-semibold">Top Regions by Disputes</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[250px]">
                <BarChart data={regionData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" horizontal={false} />
                  <XAxis type="number" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    width={80}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="disputes" fill="hsl(var(--chart-1))" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <DashboardFilters
          selectedRegion={selectedRegion}
          selectedDateRange={selectedDateRange}
          selectedStatus={selectedStatus}
          searchQuery={searchQuery}
          onRegionChange={setSelectedRegion}
          onDateRangeChange={setSelectedDateRange}
          onStatusChange={setSelectedStatus}
          onSearch={setSearchQuery}
          statusOptions={statusOptions}
          onReset={() => {
            setSelectedRegion('all');
            setSelectedDateRange('30d');
            setSelectedStatus('all');
            setSearchQuery('');
          }}
          onExport={() => console.log('Export disputes')}
        />

        {/* Data Table */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <FileText className="w-5 h-5 text-muted-foreground" />
              Dispute Records
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              data={filteredDisputes}
              columns={columns}
              keyField="id"
              linkPrefix="/dashboard/disputes"
              emptyMessage="No disputes found matching your criteria"
            />
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default DisputesDashboard;
