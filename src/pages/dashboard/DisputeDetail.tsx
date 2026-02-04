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
  Calendar,
  Euro,
  Clock,
  AlertTriangle,
  CheckCircle,
  Scale,
  History,
  Download,
  Printer
} from 'lucide-react';
import { disputes, regions, formatCurrency } from '@/data/dashboardData';

const DisputeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispute = disputes.find(d => d.id === id);
  const region = dispute ? regions.find(r => r.id === dispute.region) : null;

  if (!dispute) {
    return (
      <div className="min-h-screen bg-background">
        <DashboardHeader breadcrumbs={[{ label: 'Disputes', path: '/dashboard/disputes' }, { label: 'Not Found' }]} />
        <main className="container mx-auto px-4 py-12 text-center">
          <AlertTriangle className="w-16 h-16 text-amber-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Dispute Not Found</h1>
          <p className="text-muted-foreground mb-6">The dispute record you're looking for doesn't exist.</p>
          <Link to="/dashboard/disputes">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Disputes
            </Button>
          </Link>
        </main>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      open: 'bg-amber-500/20 text-amber-600 border-amber-500/30',
      investigation: 'bg-purple-500/20 text-purple-600 border-purple-500/30',
      court: 'bg-red-500/20 text-red-600 border-red-500/30',
      resolved: 'bg-emerald-500/20 text-emerald-600 border-emerald-500/30',
    };
    return (
      <Badge variant="outline" className={styles[status] || ''}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  // Mock timeline data
  const timeline = [
    { date: dispute.filedDate, event: 'Dispute filed', actor: 'System', status: 'completed' },
    { date: '2024-01-20', event: 'Initial review completed', actor: 'Registry Office', status: 'completed' },
    { date: '2024-01-25', event: 'Document request sent', actor: 'Officer M. Petrović', status: 'completed' },
    { date: '2024-02-05', event: 'Evidence received', actor: 'Claimant', status: 'completed' },
    { date: null, event: 'Final resolution', actor: 'Pending', status: 'pending' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader 
        breadcrumbs={[
          { label: 'Disputes', path: '/dashboard/disputes' }, 
          { label: dispute.id }
        ]} 
      />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link to="/dashboard/disputes">
              <Button variant="ghost" size="icon" className="shrink-0">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-display font-bold text-foreground">{dispute.id}</h1>
                {getStatusBadge(dispute.status)}
              </div>
              <p className="text-muted-foreground mt-1">
                {dispute.type.charAt(0).toUpperCase() + dispute.type.slice(1)} Dispute
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
                  <p className="text-2xl font-bold text-foreground">{formatCurrency(dispute.estimatedValue)}</p>
                  <p className="text-xs text-muted-foreground">Estimated Value</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-500/10">
                  <Clock className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{dispute.daysOpen > 0 ? `${dispute.daysOpen}` : 'Resolved'}</p>
                  <p className="text-xs text-muted-foreground">Days Open</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Users className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{dispute.parties.length}</p>
                  <p className="text-xs text-muted-foreground">Parties Involved</p>
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
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <FileText className="w-5 h-5 text-muted-foreground" />
                    Dispute Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Dispute ID</p>
                      <p className="font-mono font-medium">{dispute.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Parcel ID</p>
                      <p className="font-mono font-medium">{dispute.parcelId}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Type</p>
                      <p className="capitalize">{dispute.type}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Filed Date</p>
                      <p>{new Date(dispute.filedDate).toLocaleDateString('sr-RS')}</p>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Description</p>
                    <p className="text-sm">
                      This {dispute.type} dispute was filed on {new Date(dispute.filedDate).toLocaleDateString('sr-RS')} 
                      regarding parcel {dispute.parcelId} in the {region?.displayName} region. 
                      The estimated value of the property in question is {formatCurrency(dispute.estimatedValue)}.
                    </p>
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
                      <p className="text-sm text-muted-foreground">District Parcels</p>
                      <p>{region ? region.totalParcels.toLocaleString() : 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Dispute Rate</p>
                      <p>{region ? `${(region.disputeRate * 100).toFixed(2)}%` : 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Avg. Processing</p>
                      <p>{region ? `${region.avgProcessingDays} days` : 'N/A'}</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Blockchain Record Hash</p>
                    <p className="font-mono text-xs break-all">0x7f4e3d2a1b9c8e5f6a7d4b3c2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b</p>
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
                  Involved Parties
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dispute.parties.map((party, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                          <span className="text-accent font-bold">{party.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="font-medium">{party}</p>
                          <p className="text-sm text-muted-foreground">
                            {index === 0 ? 'Claimant' : index === 1 ? 'Respondent' : 'Additional Party'}
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">View Profile</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timeline">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <History className="w-5 h-5 text-muted-foreground" />
                  Case Timeline
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

          <TabsContent value="documents">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <FileText className="w-5 h-5 text-muted-foreground" />
                  Related Documents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {['Original Ownership Certificate', 'Dispute Filing Form', 'Evidence Package A', 'Witness Statements'].map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-accent" />
                        <div>
                          <p className="font-medium">{doc}</p>
                          <p className="text-xs text-muted-foreground">Uploaded on {new Date().toLocaleDateString('sr-RS')}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default DisputeDetail;
