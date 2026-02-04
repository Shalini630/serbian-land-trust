import React, { useState, useMemo } from 'react';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { KPICard } from '@/components/dashboard/KPICard';
import { DashboardFilters } from '@/components/dashboard/DashboardFilters';
import { DataTable, Column } from '@/components/dashboard/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Building2, 
  AlertTriangle, 
  CheckCircle, 
  Euro,
  FileText,
  Banknote,
  TrendingDown
} from 'lucide-react';
import { mortgages, MortgageRecord, regions, formatCurrency, formatNumber } from '@/data/dashboardData';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const MortgagesDashboard: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedDateRange, setSelectedDateRange] = useState('30d');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMortgages = useMemo(() => {
    return mortgages.filter((mortgage) => {
      const matchesRegion = selectedRegion === 'all' || mortgage.region === selectedRegion;
      const matchesStatus = selectedStatus === 'all' || mortgage.status === selectedStatus;
      const matchesSearch = !searchQuery || 
        mortgage.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mortgage.parcelId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mortgage.bank.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesRegion && matchesStatus && matchesSearch;
    });
  }, [selectedRegion, selectedStatus, searchQuery]);

  // Calculate metrics
  const activeMortgages = mortgages.filter(m => m.status === 'active').length;
  const defaulted = mortgages.filter(m => m.status === 'defaulted' || m.status === 'foreclosure').length;
  const totalAmount = mortgages.reduce((sum, m) => sum + m.amount, 0);
  const totalRemaining = mortgages.filter(m => m.status === 'active').reduce((sum, m) => sum + m.remainingBalance, 0);

  // Charts data
  const statusData = [
    { name: 'Active', value: activeMortgages, fill: 'hsl(var(--chart-1))' },
    { name: 'Paid', value: mortgages.filter(m => m.status === 'paid').length, fill: 'hsl(var(--chart-2))' },
    { name: 'Defaulted', value: mortgages.filter(m => m.status === 'defaulted').length, fill: 'hsl(var(--chart-3))' },
    { name: 'Foreclosure', value: mortgages.filter(m => m.status === 'foreclosure').length, fill: 'hsl(var(--chart-4))' },
  ];

  const bankData = Object.entries(
    mortgages.reduce((acc, m) => {
      acc[m.bank] = (acc[m.bank] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  )
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  const columns: Column<MortgageRecord>[] = [
    { key: 'id', header: 'Mortgage ID', className: 'font-mono text-sm' },
    { key: 'parcelId', header: 'Parcel ID', className: 'font-mono text-sm' },
    { 
      key: 'region', 
      header: 'Region',
      render: (item) => regions.find(r => r.id === item.region)?.displayName || item.region
    },
    { key: 'bank', header: 'Bank' },
    { key: 'status', header: 'Status' },
    { 
      key: 'amount', 
      header: 'Original Amount',
      render: (item) => formatCurrency(item.amount)
    },
    { 
      key: 'remainingBalance', 
      header: 'Remaining',
      render: (item) => formatCurrency(item.remainingBalance)
    },
    { 
      key: 'monthlyPayment', 
      header: 'Monthly',
      render: (item) => item.monthlyPayment > 0 ? formatCurrency(item.monthlyPayment) : 'N/A'
    },
    { 
      key: 'startDate', 
      header: 'Start Date',
      render: (item) => new Date(item.startDate).toLocaleDateString('sr-RS')
    },
  ];

  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'active', label: 'Active' },
    { value: 'paid', label: 'Paid Off' },
    { value: 'defaulted', label: 'Defaulted' },
    { value: 'foreclosure', label: 'Foreclosure' },
  ];

  const chartConfig = {
    mortgages: { label: 'Mortgages', color: 'hsl(var(--chart-1))' },
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader breadcrumbs={[{ label: 'Mortgages' }]} />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-foreground">
            Mortgages Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Monitor registered mortgages and encumbrances
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            title="Active Mortgages"
            value={formatNumber(activeMortgages)}
            change={3.5}
            changeLabel="vs last month"
            icon={Building2}
            iconColor="text-blue-500"
          />
          <KPICard
            title="At Risk"
            value={formatNumber(defaulted)}
            subtitle="Defaulted or foreclosure"
            icon={AlertTriangle}
            iconColor="text-red-500"
          />
          <KPICard
            title="Total Registered"
            value={formatCurrency(totalAmount)}
            subtitle="Original mortgage value"
            icon={Euro}
            iconColor="text-purple-500"
          />
          <KPICard
            title="Outstanding Balance"
            value={formatCurrency(totalRemaining)}
            subtitle="Active mortgages"
            icon={Banknote}
            iconColor="text-accent"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Mortgages by Status</CardTitle>
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
              <CardTitle className="text-lg font-semibold">Mortgages by Bank</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[250px]">
                <BarChart data={bankData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" horizontal={false} />
                  <XAxis type="number" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
                    width={100}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="value" fill="hsl(var(--chart-3))" radius={[0, 4, 4, 0]} />
                </BarChart>
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
          onExport={() => console.log('Export mortgages')}
        />

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <FileText className="w-5 h-5 text-muted-foreground" />
              Mortgage Records
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              data={filteredMortgages}
              columns={columns}
              keyField="id"
              linkPrefix="/dashboard/mortgages"
              emptyMessage="No mortgages found matching your criteria"
            />
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default MortgagesDashboard;
