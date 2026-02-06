import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
} from 'recharts';
import {
  Scale,
  CheckCircle,
  Clock,
  AlertTriangle,
  Gavel,
  ArrowLeft,
  Shield,
  FileText,
  Hash,
  ExternalLink,
} from 'lucide-react';
import {
  legalComplianceKPIs,
  propertyLegalStatuses,
  riskFlagsSummary,
} from '@/data/policyDashboardData';

const LegalComplianceDashboard: React.FC = () => {
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);

  const statusData = [
    { name: 'Verified', value: legalComplianceKPIs.fullyVerified, fill: 'hsl(168, 60%, 38%)' },
    { name: 'Pending', value: legalComplianceKPIs.pendingLegalChecks, fill: 'hsl(38, 92%, 50%)' },
    { name: 'Disputed', value: legalComplianceKPIs.disputed, fill: 'hsl(0, 72%, 51%)' },
    { name: 'Litigation', value: legalComplianceKPIs.underLitigation, fill: 'hsl(280, 60%, 50%)' },
  ];

  const riskChartData = riskFlagsSummary.map((r) => ({
    name: r.type,
    count: r.count,
    fill: r.severity === 'critical' ? 'hsl(0, 72%, 51%)' : r.severity === 'high' ? 'hsl(0, 62%, 60%)' : r.severity === 'medium' ? 'hsl(38, 92%, 50%)' : 'hsl(220, 15%, 60%)',
  }));

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="w-4 h-4 text-emerald-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-amber-500" />;
      case 'disputed':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'litigation':
        return <Gavel className="w-4 h-4 text-purple-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      verified: 'bg-emerald-500',
      pending: 'bg-amber-500',
      disputed: 'bg-red-500',
      litigation: 'bg-purple-500',
    };
    return <Badge className={styles[status as keyof typeof styles] || 'bg-muted'}>{status}</Badge>;
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
          <span className="text-foreground">Legal Compliance</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-emerald-500/10">
                <Scale className="w-6 h-6 text-emerald-500" />
              </div>
              <Badge variant="outline" className="text-emerald-500 border-emerald-500">
                Legal Verification
              </Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-foreground">
              Legal Compliance Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Every registered property — legally clean, verified, and enforceable
            </p>
          </div>
        </div>

        {/* KPI Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-emerald-500/5 border-emerald-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-sm text-emerald-600 mb-1">
                <CheckCircle className="w-4 h-4" />
                <span>Fully Verified</span>
              </div>
              <span className="text-3xl font-bold text-foreground">{legalComplianceKPIs.fullyVerified}%</span>
              <p className="text-xs text-muted-foreground mt-1">Properties legally clean</p>
            </CardContent>
          </Card>

          <Card className="bg-amber-500/5 border-amber-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-sm text-amber-600 mb-1">
                <Clock className="w-4 h-4" />
                <span>Pending Checks</span>
              </div>
              <span className="text-3xl font-bold text-foreground">{legalComplianceKPIs.pendingLegalChecks}%</span>
              <p className="text-xs text-muted-foreground mt-1">Awaiting verification</p>
            </CardContent>
          </Card>

          <Card className="bg-red-500/5 border-red-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-sm text-red-600 mb-1">
                <AlertTriangle className="w-4 h-4" />
                <span>Disputed</span>
              </div>
              <span className="text-3xl font-bold text-foreground">{legalComplianceKPIs.disputed}%</span>
              <p className="text-xs text-muted-foreground mt-1">Active disputes</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <Clock className="w-4 h-4" />
                <span>Avg Registration</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-foreground">{legalComplianceKPIs.avgRegistrationTime}</span>
                <span className="text-lg text-muted-foreground">days</span>
                <span className="text-sm text-emerald-500">({legalComplianceKPIs.avgRegistrationTimeChange}%)</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Improved from 5.2 days</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Status Overview Pie */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Legal Status Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
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
                      label={({ name, value }) => `${value}%`}
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={index} fill={entry.fill} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {statusData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.fill }}></div>
                    <span className="text-xs text-muted-foreground">{item.name}: {item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Risk Flags Chart */}
          <Card className="lg:col-span-2 bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Risk Flags Distribution</CardTitle>
              <p className="text-sm text-muted-foreground">Auto-generated alerts requiring attention</p>
            </CardHeader>
            <CardContent>
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={riskChartData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" horizontal={false} />
                    <XAxis type="number" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                    <YAxis 
                      dataKey="name" 
                      type="category" 
                      tick={{ fill: 'hsl(var(--muted-foreground))' }}
                      width={140}
                    />
                    <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                      {riskChartData.map((entry, index) => (
                        <Cell key={index} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Property Lifecycle Panel */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Property Verification Status</CardTitle>
            <p className="text-sm text-muted-foreground">Detailed lifecycle and compliance status per parcel</p>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Parcel ID</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Address</th>
                    <th className="text-center py-3 px-4 font-medium text-muted-foreground">Status</th>
                    <th className="text-center py-3 px-4 font-medium text-muted-foreground">Zoning</th>
                    <th className="text-center py-3 px-4 font-medium text-muted-foreground">Environmental</th>
                    <th className="text-center py-3 px-4 font-medium text-muted-foreground">Occupancy</th>
                    <th className="text-center py-3 px-4 font-medium text-muted-foreground">Mortgage</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Blockchain Hash</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Risk Flags</th>
                  </tr>
                </thead>
                <tbody>
                  {propertyLegalStatuses.map((property) => (
                    <tr key={property.id} className="border-b border-border hover:bg-muted/50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-muted-foreground" />
                          <span className="font-mono text-xs">{property.parcelId}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium">{property.address}</p>
                          <p className="text-xs text-muted-foreground">{property.city}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          {getStatusIcon(property.status)}
                          {getStatusBadge(property.status)}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center">
                        {property.zoningApproval ? (
                          <CheckCircle className="w-4 h-4 text-emerald-500 mx-auto" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-red-500 mx-auto" />
                        )}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {property.environmentalClearance ? (
                          <CheckCircle className="w-4 h-4 text-emerald-500 mx-auto" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-amber-500 mx-auto" />
                        )}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {property.occupancyCertificate ? (
                          <CheckCircle className="w-4 h-4 text-emerald-500 mx-auto" />
                        ) : (
                          <Clock className="w-4 h-4 text-amber-500 mx-auto" />
                        )}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <Badge 
                          variant="outline"
                          className={
                            property.mortgageStatus === 'clear' 
                              ? 'border-emerald-500 text-emerald-500' 
                              : property.mortgageStatus === 'active'
                              ? 'border-blue-500 text-blue-500'
                              : 'border-red-500 text-red-500'
                          }
                        >
                          {property.mortgageStatus}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <Hash className="w-3 h-3 text-muted-foreground" />
                          <span className="font-mono text-xs">{property.blockchainHash}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        {property.riskFlags.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {property.riskFlags.slice(0, 2).map((flag, i) => (
                              <Badge key={i} variant="destructive" className="text-xs">
                                {flag}
                              </Badge>
                            ))}
                            {property.riskFlags.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{property.riskFlags.length - 2}
                              </Badge>
                            )}
                          </div>
                        ) : (
                          <span className="text-xs text-muted-foreground">None</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Audit & Enforcement */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Shield className="w-5 h-5 text-accent" />
              Blockchain Audit Trail
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-muted/50 border border-border">
                <p className="text-sm text-muted-foreground">Total Properties on Chain</p>
                <p className="text-3xl font-bold mt-1">1,247,832</p>
                <Progress value={78} className="mt-3" />
                <p className="text-xs text-muted-foreground mt-1">78% of total registry</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50 border border-border">
                <p className="text-sm text-muted-foreground">Ownership Transfers Logged</p>
                <p className="text-3xl font-bold mt-1">3,456,789</p>
                <p className="text-xs text-muted-foreground mt-2">Immutable audit trail</p>
              </div>
              <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20">
                <p className="text-sm text-red-600">Tamper Attempts Detected</p>
                <p className="text-3xl font-bold text-red-500 mt-1">23</p>
                <p className="text-xs text-muted-foreground mt-2">All blocked & reported</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default LegalComplianceDashboard;
