import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  FileText, 
  Users, 
  MapPin, 
  Euro,
  Clock,
  AlertTriangle,
  CheckCircle,
  History,
  Download,
  Printer,
  ArrowLeftRight,
  User,
  Building
} from 'lucide-react';
import { transfers, regions, formatCurrency } from '@/data/dashboardData';

const TransferDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const transfer = transfers.find(t => t.id === id);
  const region = transfer ? regions.find(r => r.id === transfer.region) : null;

  if (!transfer) {
    return (
      <div className="min-h-screen bg-background">
        <DashboardHeader breadcrumbs={[{ label: 'Transfers', path: '/dashboard/transfers' }, { label: 'Not Found' }]} />
        <main className="container mx-auto px-4 py-12 text-center">
          <AlertTriangle className="w-16 h-16 text-amber-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Transfer Not Found</h1>
          <p className="text-muted-foreground mb-6">The transfer record you're looking for doesn't exist.</p>
          <Link to="/dashboard/transfers">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Transfers
            </Button>
          </Link>
        </main>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      pending: 'bg-blue-500/20 text-blue-600 border-blue-500/30',
      approved: 'bg-emerald-500/20 text-emerald-600 border-emerald-500/30',
      completed: 'bg-emerald-500/20 text-emerald-600 border-emerald-500/30',
      rejected: 'bg-red-500/20 text-red-600 border-red-500/30',
    };
    return (
      <Badge variant="outline" className={styles[status] || ''}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const timeline = [
    { date: transfer.submittedDate, event: 'Transfer request submitted', actor: 'Notary Public', status: 'completed' },
    { date: '2024-02-16', event: 'Document verification', actor: 'Registry Office', status: 'completed' },
    { date: '2024-02-17', event: 'Smart contract validation', actor: 'Blockchain System', status: 'completed' },
    { date: transfer.completedDate, event: 'Transfer completed', actor: 'System', status: transfer.status === 'completed' ? 'completed' : 'pending' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader 
        breadcrumbs={[
          { label: 'Transfers', path: '/dashboard/transfers' }, 
          { label: transfer.id }
        ]} 
      />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link to="/dashboard/transfers">
              <Button variant="ghost" size="icon" className="shrink-0">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-display font-bold text-foreground">{transfer.id}</h1>
                {getStatusBadge(transfer.status)}
              </div>
              <p className="text-muted-foreground mt-1">
                {transfer.type.charAt(0).toUpperCase() + transfer.type.slice(1)} Transfer
              </p>
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
                  <p className="text-2xl font-bold text-foreground">
                    {transfer.value > 0 ? formatCurrency(transfer.value) : 'N/A'}
                  </p>
                  <p className="text-xs text-muted-foreground">Transaction Value</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Clock className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {transfer.processingDays > 0 ? `${transfer.processingDays} days` : 'In Progress'}
                  </p>
                  <p className="text-xs text-muted-foreground">Processing Time</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/10">
                  <ArrowLeftRight className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground capitalize">{transfer.type}</p>
                  <p className="text-xs text-muted-foreground">Transfer Type</p>
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

        {/* Tabs */}
        <Tabs defaultValue="details" className="space-y-6">
          <TabsList className="bg-muted">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="parties">Parties</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="validation">Validation</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <FileText className="w-5 h-5 text-muted-foreground" />
                    Transfer Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Transfer ID</p>
                      <p className="font-mono font-medium">{transfer.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Parcel ID</p>
                      <p className="font-mono font-medium">{transfer.parcelId}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Type</p>
                      <p className="capitalize">{transfer.type}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Submitted Date</p>
                      <p>{new Date(transfer.submittedDate).toLocaleDateString('sr-RS')}</p>
                    </div>
                    {transfer.completedDate && (
                      <div>
                        <p className="text-sm text-muted-foreground">Completed Date</p>
                        <p>{new Date(transfer.completedDate).toLocaleDateString('sr-RS')}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-muted-foreground" />
                    Property Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Region</p>
                      <p className="font-medium">{region?.displayName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Parcel ID</p>
                      <p className="font-mono">{transfer.parcelId}</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Transaction Hash</p>
                    <p className="font-mono text-xs break-all">0xa1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="parties">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Users className="w-5 h-5 text-muted-foreground" />
                  Transfer Parties
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                        <User className="w-6 h-6 text-red-500" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Seller</p>
                        <p className="font-medium text-lg">{transfer.seller}</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Role</span>
                        <span>Current Owner</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Verified</span>
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                        <User className="w-6 h-6 text-emerald-500" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Buyer</p>
                        <p className="font-medium text-lg">{transfer.buyer}</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Role</span>
                        <span>New Owner</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Verified</span>
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timeline">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <History className="w-5 h-5 text-muted-foreground" />
                  Transfer Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative space-y-6">
                  {timeline.map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          item.status === 'completed' ? 'bg-emerald-500/20' : 'bg-muted'
                        }`}>
                          {item.status === 'completed' ? (
                            <CheckCircle className="w-4 h-4 text-emerald-500" />
                          ) : (
                            <Clock className="w-4 h-4 text-muted-foreground" />
                          )}
                        </div>
                        {index < timeline.length - 1 && (
                          <div className="w-0.5 h-full bg-border mt-2" />
                        )}
                      </div>
                      <div className="flex-1 pb-6">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{item.event}</p>
                          {item.date && (
                            <span className="text-sm text-muted-foreground">
                              {new Date(item.date).toLocaleDateString('sr-RS')}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">By: {item.actor}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="validation">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-muted-foreground" />
                  Smart Contract Validation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { check: 'Seller ownership verified', passed: true },
                    { check: 'No active disputes on parcel', passed: true },
                    { check: 'No active liens or encumbrances', passed: true },
                    { check: 'No court stays in effect', passed: true },
                    { check: 'Buyer eligibility confirmed', passed: true },
                    { check: 'Transaction value within limits', passed: true },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <span>{item.check}</span>
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                  <div className="flex items-center gap-2 text-emerald-600 font-medium">
                    <CheckCircle className="w-5 h-5" />
                    All validation checks passed
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    This transfer has been validated by the blockchain smart contract system.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default TransferDetail;
