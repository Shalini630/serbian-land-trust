import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft, 
  FileText, 
  MapPin, 
  Euro,
  AlertTriangle,
  Building2,
  Banknote,
  Calendar,
  Download,
  Printer,
  TrendingDown
} from 'lucide-react';
import { mortgages, regions, formatCurrency } from '@/data/dashboardData';

const MortgageDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const mortgage = mortgages.find(m => m.id === id);
  const region = mortgage ? regions.find(r => r.id === mortgage.region) : null;

  if (!mortgage) {
    return (
      <div className="min-h-screen bg-background">
        <DashboardHeader breadcrumbs={[{ label: 'Mortgages', path: '/dashboard/mortgages' }, { label: 'Not Found' }]} />
        <main className="container mx-auto px-4 py-12 text-center">
          <AlertTriangle className="w-16 h-16 text-amber-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Mortgage Not Found</h1>
          <p className="text-muted-foreground mb-6">The mortgage record you're looking for doesn't exist.</p>
          <Link to="/dashboard/mortgages">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Mortgages
            </Button>
          </Link>
        </main>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      active: 'bg-blue-500/20 text-blue-600 border-blue-500/30',
      paid: 'bg-emerald-500/20 text-emerald-600 border-emerald-500/30',
      defaulted: 'bg-red-500/20 text-red-600 border-red-500/30',
      foreclosure: 'bg-red-500/20 text-red-600 border-red-500/30',
    };
    return (
      <Badge variant="outline" className={styles[status] || ''}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const paidPercentage = mortgage.amount > 0 
    ? ((mortgage.amount - mortgage.remainingBalance) / mortgage.amount) * 100 
    : 0;

  // Mock payment history
  const payments = [
    { date: '2024-02-01', amount: mortgage.monthlyPayment, status: 'paid' },
    { date: '2024-01-01', amount: mortgage.monthlyPayment, status: 'paid' },
    { date: '2023-12-01', amount: mortgage.monthlyPayment, status: 'paid' },
    { date: '2023-11-01', amount: mortgage.monthlyPayment, status: 'paid' },
    { date: '2023-10-01', amount: mortgage.monthlyPayment, status: 'paid' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader 
        breadcrumbs={[
          { label: 'Mortgages', path: '/dashboard/mortgages' }, 
          { label: mortgage.id }
        ]} 
      />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link to="/dashboard/mortgages">
              <Button variant="ghost" size="icon" className="shrink-0">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-display font-bold text-foreground">{mortgage.id}</h1>
                {getStatusBadge(mortgage.status)}
              </div>
              <p className="text-muted-foreground mt-1">{mortgage.bank}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Printer className="w-4 h-4 mr-2" />
              Print
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-accent/10">
                  <Euro className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{formatCurrency(mortgage.amount)}</p>
                  <p className="text-xs text-muted-foreground">Original Amount</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-500/10">
                  <Banknote className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{formatCurrency(mortgage.remainingBalance)}</p>
                  <p className="text-xs text-muted-foreground">Remaining Balance</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <TrendingDown className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{formatCurrency(mortgage.monthlyPayment)}</p>
                  <p className="text-xs text-muted-foreground">Monthly Payment</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-500/10">
                  <MapPin className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{region?.displayName || 'N/A'}</p>
                  <p className="text-xs text-muted-foreground">Region</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payment Progress */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Payment Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Amount Paid</span>
                <span className="font-medium">{formatCurrency(mortgage.amount - mortgage.remainingBalance)}</span>
              </div>
              <Progress value={paidPercentage} className="h-3" />
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{paidPercentage.toFixed(1)}% complete</span>
                <span className="text-muted-foreground">{formatCurrency(mortgage.remainingBalance)} remaining</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="details" className="space-y-6">
          <TabsList className="bg-muted">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="payments">Payment History</TabsTrigger>
            <TabsTrigger value="property">Property</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <FileText className="w-5 h-5 text-muted-foreground" />
                    Mortgage Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Mortgage ID</p>
                      <p className="font-mono font-medium">{mortgage.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Parcel ID</p>
                      <p className="font-mono font-medium">{mortgage.parcelId}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Bank</p>
                      <p>{mortgage.bank}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Start Date</p>
                      <p>{new Date(mortgage.startDate).toLocaleDateString('sr-RS')}</p>
                    </div>
                    {mortgage.endDate && (
                      <div>
                        <p className="text-sm text-muted-foreground">End Date</p>
                        <p>{new Date(mortgage.endDate).toLocaleDateString('sr-RS')}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-muted-foreground" />
                    Lender Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
                    <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <p className="font-medium">{mortgage.bank}</p>
                      <p className="text-sm text-muted-foreground">Licensed Financial Institution</p>
                    </div>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Encumbrance Record Hash</p>
                    <p className="font-mono text-xs break-all">0xm1n2o3p4q5r6s7t8u9v0w1x2y3z4a5b6c7d8e9f0g1h2i3j4k5l6</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="payments">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                  Payment History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {payments.map((payment, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                          <Euro className="w-5 h-5 text-emerald-500" />
                        </div>
                        <div>
                          <p className="font-medium">{formatCurrency(payment.amount)}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(payment.date).toLocaleDateString('sr-RS')}
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-emerald-500/20 text-emerald-600 border-emerald-500/30">
                        Paid
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="property">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-muted-foreground" />
                  Secured Property
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Parcel ID</p>
                      <p className="font-mono font-medium text-lg">{mortgage.parcelId}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Region</p>
                      <p className="font-medium">{region?.displayName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Encumbrance Status</p>
                      <Badge variant="outline" className="bg-blue-500/20 text-blue-600 border-blue-500/30 mt-1">
                        Active Mortgage
                      </Badge>
                    </div>
                  </div>
                  <div className="p-4 bg-amber-500/10 rounded-lg border border-amber-500/20">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-amber-600">Property Encumbered</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          This property has an active mortgage lien. Any transfer or additional encumbrance 
                          requires clearance from the lender ({mortgage.bank}).
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default MortgageDetail;
