import React, { useState, useMemo } from 'react';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { KPICard } from '@/components/dashboard/KPICard';
import { DashboardFilters } from '@/components/dashboard/DashboardFilters';
import { DataTable, Column } from '@/components/dashboard/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ArrowLeftRight, 
  Clock, 
  CheckCircle, 
  XCircle,
  FileText,
  Euro,
  TrendingUp
} from 'lucide-react';
import { transfers, TransferRecord, regions, formatCurrency, formatNumber } from '@/data/dashboardData';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';

const TransfersDashboard: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedDateRange, setSelectedDateRange] = useState('30d');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTransfers = useMemo(() => {
    return transfers.filter((transfer) => {
      const matchesRegion = selectedRegion === 'all' || transfer.region === selectedRegion;
      const matchesStatus = selectedStatus === 'all' || transfer.status === selectedStatus;
      const matchesSearch = !searchQuery || 
        transfer.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transfer.parcelId.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesRegion && matchesStatus && matchesSearch;
    });
  }, [selectedRegion, selectedStatus, searchQuery]);

  // Calculate metrics
  const pendingTransfers = transfers.filter(t => t.status === 'pending').length;
  const completedTransfers = transfers.filter(t => t.status === 'completed').length;
  const rejectedTransfers = transfers.filter(t => t.status === 'rejected').length;
  const totalValue = transfers.reduce((sum, t) => sum + t.value, 0);
  const avgProcessingDays = Math.round(
    transfers.filter(t => t.processingDays > 0).reduce((sum, t) => sum + t.processingDays, 0) / 
    transfers.filter(t => t.processingDays > 0).length
  );

  // Charts data
  const statusData = [
    { name: 'Pending', value: pendingTransfers, fill: 'hsl(var(--chart-1))' },
    { name: 'Approved', value: transfers.filter(t => t.status === 'approved').length, fill: 'hsl(var(--chart-2))' },
    { name: 'Completed', value: completedTransfers, fill: 'hsl(var(--chart-3))' },
    { name: 'Rejected', value: rejectedTransfers, fill: 'hsl(var(--chart-4))' },
  ];

  const typeData = [
    { name: 'Sale', value: transfers.filter(t => t.type === 'sale').length, fill: 'hsl(var(--chart-1))' },
    { name: 'Inheritance', value: transfers.filter(t => t.type === 'inheritance').length, fill: 'hsl(var(--chart-2))' },
    { name: 'Subdivision', value: transfers.filter(t => t.type === 'subdivision').length, fill: 'hsl(var(--chart-3))' },
    { name: 'Donation', value: transfers.filter(t => t.type === 'donation').length, fill: 'hsl(var(--chart-4))' },
  ];

  const columns: Column<TransferRecord>[] = [
    { key: 'id', header: 'Transfer ID', className: 'font-mono text-sm' },
    { key: 'parcelId', header: 'Parcel ID', className: 'font-mono text-sm' },
    { 
      key: 'region', 
      header: 'Region',
      render: (item) => regions.find(r => r.id === item.region)?.displayName || item.region
    },
    { key: 'type', header: 'Type' },
    { key: 'status', header: 'Status' },
    { key: 'buyer', header: 'Buyer' },
    { key: 'seller', header: 'Seller' },
    { 
      key: 'value', 
      header: 'Value',
      render: (item) => item.value > 0 ? formatCurrency(item.value) : 'N/A'
    },
    { 
      key: 'processingDays', 
      header: 'Processing',
      render: (item) => item.processingDays > 0 ? `${item.processingDays} days` : 'In progress'
    },
  ];

  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'pending', label: 'Pending' },
    { value: 'approved', label: 'Approved' },
    { value: 'completed', label: 'Completed' },
    { value: 'rejected', label: 'Rejected' },
  ];

  const chartConfig = {
    transfers: { label: 'Transfers', color: 'hsl(var(--chart-1))' },
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader breadcrumbs={[{ label: 'Transfers' }]} />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-foreground">
            Transfers Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Monitor property transfers and mutations
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            title="Pending Transfers"
            value={formatNumber(pendingTransfers)}
            change={8}
            changeLabel="vs last week"
            icon={ArrowLeftRight}
            iconColor="text-blue-500"
          />
          <KPICard
            title="Completed Today"
            value={formatNumber(completedTransfers)}
            change={15}
            changeLabel="vs yesterday"
            icon={CheckCircle}
            iconColor="text-emerald-500"
          />
          <KPICard
            title="Avg. Processing"
            value={`${avgProcessingDays} days`}
            change={-20}
            changeLabel="improvement"
            icon={Clock}
            iconColor="text-purple-500"
          />
          <KPICard
            title="Total Value"
            value={formatCurrency(totalValue)}
            subtitle="This period"
            icon={Euro}
            iconColor="text-accent"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Transfers by Status</CardTitle>
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
              <CardTitle className="text-lg font-semibold">Transfers by Type</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[250px]">
                <PieChart>
                  <Pie
                    data={typeData}
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
                    {typeData.map((entry, index) => (
                      <Cell key={index} fill={entry.fill} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

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
          onExport={() => console.log('Export transfers')}
        />

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <FileText className="w-5 h-5 text-muted-foreground" />
              Transfer Records
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              data={filteredTransfers}
              columns={columns}
              keyField="id"
              linkPrefix="/dashboard/transfers"
              emptyMessage="No transfers found matching your criteria"
            />
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default TransfersDashboard;
