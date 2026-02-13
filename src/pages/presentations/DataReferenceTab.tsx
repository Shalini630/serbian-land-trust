import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, Database, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { regions, disputes, transfers, mortgages, systemMetrics, monthlyTrends } from '@/data/dashboardData';
import {
  affordabilityByCity,
  incomeDecileData,
  nationalAffordabilityKPIs,
  legalComplianceKPIs,
  propertyLegalStatuses,
  riskFlagsSummary,
  subsidyKPIs,
  subsidyByIncomeBracket,
  subsidyRedFlags,
  subsidyOutcomes,
  subsidyByCity,
  bubbleIndicators,
  marketStressSignals,
  cityBubbleRisk,
  aiForecast,
  priceGrowthTrend,
  ministerialKPIs,
} from '@/data/policyDashboardData';

const exportToCSV = (headers: string[], rows: string[][], filename: string) => {
  const csvContent = [headers.join(','), ...rows.map(r => r.map(c => `"${c}"`).join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${filename}.csv`;
  link.click();
};

const DataReferenceTab: React.FC = () => {
  const [search, setSearch] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl font-bold text-primary-foreground">Data Reference</h2>
          <p className="text-primary-foreground/50 text-sm font-body">All underlying datasets used to build the dashboards</p>
        </div>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-foreground/30" />
          <Input
            placeholder="Filter tables..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9 bg-primary-foreground/5 border-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/30"
          />
        </div>
      </div>

      <Tabs defaultValue="regions" className="w-full">
        <TabsList className="bg-primary-foreground/5 border border-primary-foreground/10 flex-wrap h-auto gap-1 p-1">
          {['regions', 'disputes', 'transfers', 'mortgages', 'affordability', 'legal', 'subsidies', 'bubble', 'trends'].map(tab => (
            <TabsTrigger key={tab} value={tab} className="text-xs capitalize text-primary-foreground/60 data-[state=active]:bg-accent/20 data-[state=active]:text-accent">
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* REGIONS */}
        <TabsContent value="regions">
          <DataCard
            title="Regional Performance Data"
            subtitle={`${regions.length} regions | Source: Land Registry Blockchain`}
            onExport={() => exportToCSV(
              ['Region', 'Total Parcels', 'Active Disputes', 'Pending Transfers', 'Active Mortgages', 'Avg Processing Days', 'Fraud Attempts', 'Dispute Rate'],
              regions.map(r => [r.displayName, String(r.totalParcels), String(r.activeDisputes), String(r.pendingTransfers), String(r.activeMortgages), String(r.avgProcessingDays), String(r.fraudAttempts), `${r.disputeRate}%`]),
              'regions_data'
            )}
          >
            <Table>
              <TableHeader>
                <TableRow className="border-primary-foreground/10">
                  {['Region', 'Total Parcels', 'Disputes', 'Transfers', 'Mortgages', 'Avg Days', 'Fraud', 'Dispute %'].map(h => (
                    <TableHead key={h} className="text-primary-foreground/50 text-xs">{h}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {regions.filter(r => !search || r.displayName.toLowerCase().includes(search.toLowerCase())).map(r => (
                  <TableRow key={r.id} className="border-primary-foreground/5">
                    <TableCell className="text-primary-foreground text-xs font-medium">{r.displayName}</TableCell>
                    <TableCell className="text-primary-foreground/70 text-xs">{r.totalParcels.toLocaleString()}</TableCell>
                    <TableCell className="text-primary-foreground/70 text-xs">{r.activeDisputes}</TableCell>
                    <TableCell className="text-primary-foreground/70 text-xs">{r.pendingTransfers}</TableCell>
                    <TableCell className="text-primary-foreground/70 text-xs">{r.activeMortgages.toLocaleString()}</TableCell>
                    <TableCell className="text-primary-foreground/70 text-xs">{r.avgProcessingDays}</TableCell>
                    <TableCell className="text-primary-foreground/70 text-xs">{r.fraudAttempts}</TableCell>
                    <TableCell className="text-primary-foreground/70 text-xs">{r.disputeRate}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </DataCard>
        </TabsContent>

        {/* DISPUTES */}
        <TabsContent value="disputes">
          <DataCard
            title="Dispute Records"
            subtitle={`${disputes.length} records | Source: Registry + Court System`}
            onExport={() => exportToCSV(
              ['ID', 'Parcel', 'Region', 'Type', 'Status', 'Filed', 'Parties', 'Value (EUR)', 'Days Open'],
              disputes.map(d => [d.id, d.parcelId, d.region, d.type, d.status, d.filedDate, d.parties.join('; '), String(d.estimatedValue), String(d.daysOpen)]),
              'disputes_data'
            )}
          >
            <Table>
              <TableHeader>
                <TableRow className="border-primary-foreground/10">
                  {['ID', 'Parcel', 'Region', 'Type', 'Status', 'Filed', 'Value', 'Days'].map(h => (
                    <TableHead key={h} className="text-primary-foreground/50 text-xs">{h}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {disputes.filter(d => !search || d.id.toLowerCase().includes(search.toLowerCase()) || d.region.includes(search.toLowerCase())).map(d => (
                  <TableRow key={d.id} className="border-primary-foreground/5">
                    <TableCell className="text-primary-foreground text-xs font-mono">{d.id}</TableCell>
                    <TableCell className="text-primary-foreground/70 text-xs">{d.parcelId}</TableCell>
                    <TableCell className="text-primary-foreground/70 text-xs capitalize">{d.region}</TableCell>
                    <TableCell className="text-primary-foreground/70 text-xs capitalize">{d.type}</TableCell>
                    <TableCell><Badge variant="outline" className="text-[10px] capitalize">{d.status}</Badge></TableCell>
                    <TableCell className="text-primary-foreground/70 text-xs">{d.filedDate}</TableCell>
                    <TableCell className="text-primary-foreground/70 text-xs">€{d.estimatedValue.toLocaleString()}</TableCell>
                    <TableCell className="text-primary-foreground/70 text-xs">{d.daysOpen}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </DataCard>
        </TabsContent>

        {/* TRANSFERS */}
        <TabsContent value="transfers">
          <DataCard
            title="Transfer Records"
            subtitle={`${transfers.length} records | Source: Blockchain Registry`}
            onExport={() => exportToCSV(
              ['ID', 'Parcel', 'Region', 'Type', 'Status', 'Submitted', 'Value', 'Days', 'Buyer', 'Seller'],
              transfers.map(t => [t.id, t.parcelId, t.region, t.type, t.status, t.submittedDate, String(t.value), String(t.processingDays), t.buyer, t.seller]),
              'transfers_data'
            )}
          >
            <Table>
              <TableHeader>
                <TableRow className="border-primary-foreground/10">
                  {['ID', 'Parcel', 'Type', 'Status', 'Date', 'Value', 'Buyer', 'Seller'].map(h => (
                    <TableHead key={h} className="text-primary-foreground/50 text-xs">{h}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {transfers.map(t => (
                  <TableRow key={t.id} className="border-primary-foreground/5">
                    <TableCell className="text-primary-foreground text-xs font-mono">{t.id}</TableCell>
                    <TableCell className="text-primary-foreground/70 text-xs">{t.parcelId}</TableCell>
                    <TableCell className="text-primary-foreground/70 text-xs capitalize">{t.type}</TableCell>
                    <TableCell><Badge variant="outline" className="text-[10px] capitalize">{t.status}</Badge></TableCell>
                    <TableCell className="text-primary-foreground/70 text-xs">{t.submittedDate}</TableCell>
                    <TableCell className="text-primary-foreground/70 text-xs">€{t.value.toLocaleString()}</TableCell>
                    <TableCell className="text-primary-foreground/70 text-xs">{t.buyer}</TableCell>
                    <TableCell className="text-primary-foreground/70 text-xs">{t.seller}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </DataCard>
        </TabsContent>

        {/* MORTGAGES */}
        <TabsContent value="mortgages">
          <DataCard
            title="Mortgage Records"
            subtitle={`${mortgages.length} records | Source: Banks + Registry`}
            onExport={() => exportToCSV(
              ['ID', 'Parcel', 'Region', 'Bank', 'Amount', 'Status', 'Start', 'Remaining', 'Monthly'],
              mortgages.map(m => [m.id, m.parcelId, m.region, m.bank, String(m.amount), m.status, m.startDate, String(m.remainingBalance), String(m.monthlyPayment)]),
              'mortgages_data'
            )}
          >
            <Table>
              <TableHeader>
                <TableRow className="border-primary-foreground/10">
                  {['ID', 'Parcel', 'Bank', 'Amount', 'Status', 'Start', 'Balance', 'Monthly'].map(h => (
                    <TableHead key={h} className="text-primary-foreground/50 text-xs">{h}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {mortgages.map(m => (
                  <TableRow key={m.id} className="border-primary-foreground/5">
                    <TableCell className="text-primary-foreground text-xs font-mono">{m.id}</TableCell>
                    <TableCell className="text-primary-foreground/70 text-xs">{m.parcelId}</TableCell>
                    <TableCell className="text-primary-foreground/70 text-xs">{m.bank}</TableCell>
                    <TableCell className="text-primary-foreground/70 text-xs">€{m.amount.toLocaleString()}</TableCell>
                    <TableCell><Badge variant="outline" className="text-[10px] capitalize">{m.status}</Badge></TableCell>
                    <TableCell className="text-primary-foreground/70 text-xs">{m.startDate}</TableCell>
                    <TableCell className="text-primary-foreground/70 text-xs">€{m.remainingBalance.toLocaleString()}</TableCell>
                    <TableCell className="text-primary-foreground/70 text-xs">€{m.monthlyPayment.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </DataCard>
        </TabsContent>

        {/* AFFORDABILITY */}
        <TabsContent value="affordability">
          <DataCard
            title="Affordability by City"
            subtitle={`${affordabilityByCity.length} cities | National HAI: ${nationalAffordabilityKPIs.nationalHAI}`}
            onExport={() => exportToCSV(
              ['City', 'HAI', 'Median Price', 'Median Income', 'PIR', 'Eligible %', 'New Units', 'Status'],
              affordabilityByCity.map(a => [a.cityName, String(a.housingAffordabilityIndex), `€${a.medianHousePrice}`, `€${a.medianHouseholdIncome}`, `${a.priceToIncomeRatio}x`, `${a.eligibleHouseholds}%`, String(a.newAffordableUnits), a.affordabilityStatus]),
              'affordability_data'
            )}
          >
            <Table>
              <TableHeader>
                <TableRow className="border-primary-foreground/10">
                  {['City', 'HAI', 'Med. Price', 'Med. Income', 'PIR', 'Eligible %', 'New Units', 'Status'].map(h => (
                    <TableHead key={h} className="text-primary-foreground/50 text-xs">{h}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {affordabilityByCity.map(a => (
                  <TableRow key={a.cityId} className="border-primary-foreground/5">
                    <TableCell className="text-primary-foreground text-xs font-medium">{a.cityName}</TableCell>
                    <TableCell className="text-primary-foreground/70 text-xs">{a.housingAffordabilityIndex}</TableCell>
                    <TableCell className="text-primary-foreground/70 text-xs">€{a.medianHousePrice.toLocaleString()}</TableCell>
                    <TableCell className="text-primary-foreground/70 text-xs">€{a.medianHouseholdIncome.toLocaleString()}</TableCell>
                    <TableCell className="text-primary-foreground/70 text-xs">{a.priceToIncomeRatio}x</TableCell>
                    <TableCell className="text-primary-foreground/70 text-xs">{a.eligibleHouseholds}%</TableCell>
                    <TableCell className="text-primary-foreground/70 text-xs">{a.newAffordableUnits}</TableCell>
                    <TableCell><Badge variant="outline" className="text-[10px] capitalize">{a.affordabilityStatus}</Badge></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </DataCard>
        </TabsContent>

        {/* LEGAL */}
        <TabsContent value="legal">
          <DataCard
            title="Property Legal Status Records"
            subtitle={`${propertyLegalStatuses.length} records | Verified: ${legalComplianceKPIs.fullyVerified}%`}
            onExport={() => exportToCSV(
              ['ID', 'Parcel', 'Address', 'City', 'Status', 'Lineage', 'Zoning', 'Env.', 'Occupancy', 'Mortgage', 'Lien', 'Hash', 'Flags'],
              propertyLegalStatuses.map(p => [p.id, p.parcelId, p.address, p.city, p.status, String(p.ownershipLineage), p.zoningApproval ? 'Yes' : 'No', p.environmentalClearance ? 'Yes' : 'No', p.occupancyCertificate ? 'Yes' : 'No', p.mortgageStatus, p.lienStatus ? 'Yes' : 'No', p.blockchainHash, p.riskFlags.join('; ')]),
              'legal_status_data'
            )}
          >
            <Table>
              <TableHeader>
                <TableRow className="border-primary-foreground/10">
                  {['Parcel', 'City', 'Status', 'Zoning', 'Env.', 'Occupancy', 'Mortgage', 'Flags'].map(h => (
                    <TableHead key={h} className="text-primary-foreground/50 text-xs">{h}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {propertyLegalStatuses.map(p => (
                  <TableRow key={p.id} className="border-primary-foreground/5">
                    <TableCell className="text-primary-foreground text-xs font-mono">{p.parcelId}</TableCell>
                    <TableCell className="text-primary-foreground/70 text-xs">{p.city}</TableCell>
                    <TableCell><Badge variant="outline" className="text-[10px] capitalize">{p.status}</Badge></TableCell>
                    <TableCell className="text-xs">{p.zoningApproval ? '✅' : '❌'}</TableCell>
                    <TableCell className="text-xs">{p.environmentalClearance ? '✅' : '❌'}</TableCell>
                    <TableCell className="text-xs">{p.occupancyCertificate ? '✅' : '❌'}</TableCell>
                    <TableCell className="text-primary-foreground/70 text-xs capitalize">{p.mortgageStatus}</TableCell>
                    <TableCell className="text-primary-foreground/70 text-xs">{p.riskFlags.length > 0 ? p.riskFlags.join(', ') : 'None'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </DataCard>
        </TabsContent>

        {/* SUBSIDIES */}
        <TabsContent value="subsidies">
          <div className="space-y-4">
            <DataCard
              title="Subsidy by Income Bracket"
              subtitle={`Total Budget: €${(subsidyKPIs.totalBudget / 1e6).toFixed(0)}M | Beneficiaries: ${subsidyKPIs.beneficiaries.toLocaleString()}`}
              onExport={() => exportToCSV(
                ['Bracket', 'Allocated', 'Utilized', 'Beneficiaries', 'Leakage %'],
                subsidyByIncomeBracket.map(s => [s.bracket, `€${(s.allocated / 1e6).toFixed(1)}M`, `€${(s.utilized / 1e6).toFixed(1)}M`, String(s.beneficiaries), `${s.leakage}%`]),
                'subsidy_income_data'
              )}
            >
              <Table>
                <TableHeader>
                  <TableRow className="border-primary-foreground/10">
                    {['Bracket', 'Allocated', 'Utilized', 'Beneficiaries', 'Leakage %'].map(h => (
                      <TableHead key={h} className="text-primary-foreground/50 text-xs">{h}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subsidyByIncomeBracket.map((s, i) => (
                    <TableRow key={i} className="border-primary-foreground/5">
                      <TableCell className="text-primary-foreground text-xs font-medium">{s.bracket}</TableCell>
                      <TableCell className="text-primary-foreground/70 text-xs">€{(s.allocated / 1e6).toFixed(1)}M</TableCell>
                      <TableCell className="text-primary-foreground/70 text-xs">€{(s.utilized / 1e6).toFixed(1)}M</TableCell>
                      <TableCell className="text-primary-foreground/70 text-xs">{s.beneficiaries.toLocaleString()}</TableCell>
                      <TableCell className="text-primary-foreground/70 text-xs">{s.leakage}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </DataCard>

            <DataCard
              title="Subsidy by City"
              subtitle="Geographic distribution"
              onExport={() => exportToCSV(
                ['City', 'Budget', 'Utilized', 'Units', 'Leakage %'],
                subsidyByCity.map(s => [s.city, `€${(s.budget / 1e6).toFixed(1)}M`, `€${(s.utilized / 1e6).toFixed(1)}M`, String(s.units), `${s.leakage}%`]),
                'subsidy_city_data'
              )}
            >
              <Table>
                <TableHeader>
                  <TableRow className="border-primary-foreground/10">
                    {['City', 'Budget', 'Utilized', 'Units', 'Leakage %'].map(h => (
                      <TableHead key={h} className="text-primary-foreground/50 text-xs">{h}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subsidyByCity.map((s, i) => (
                    <TableRow key={i} className="border-primary-foreground/5">
                      <TableCell className="text-primary-foreground text-xs font-medium">{s.city}</TableCell>
                      <TableCell className="text-primary-foreground/70 text-xs">€{(s.budget / 1e6).toFixed(1)}M</TableCell>
                      <TableCell className="text-primary-foreground/70 text-xs">€{(s.utilized / 1e6).toFixed(1)}M</TableCell>
                      <TableCell className="text-primary-foreground/70 text-xs">{s.units.toLocaleString()}</TableCell>
                      <TableCell className="text-primary-foreground/70 text-xs">{s.leakage}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </DataCard>
          </div>
        </TabsContent>

        {/* BUBBLE */}
        <TabsContent value="bubble">
          <DataCard
            title="City Bubble Risk Analysis"
            subtitle={`Risk Index: ${bubbleIndicators.priceGrowthVsIncome} divergence | Investor Share: ${bubbleIndicators.investorTransactionShare}%`}
            onExport={() => exportToCSV(
              ['City', 'Risk Score', 'Price Growth', 'Income Growth', 'Status'],
              cityBubbleRisk.map(c => [c.city, String(c.riskScore), `${c.priceGrowth}%`, `${c.incomeGrowth}%`, c.status]),
              'bubble_risk_data'
            )}
          >
            <Table>
              <TableHeader>
                <TableRow className="border-primary-foreground/10">
                  {['City', 'Risk Score', 'Price Growth', 'Income Growth', 'PIDI', 'Status'].map(h => (
                    <TableHead key={h} className="text-primary-foreground/50 text-xs">{h}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {cityBubbleRisk.map(c => (
                  <TableRow key={c.city} className="border-primary-foreground/5">
                    <TableCell className="text-primary-foreground text-xs font-medium">{c.city}</TableCell>
                    <TableCell className="text-primary-foreground/70 text-xs">{c.riskScore}/100</TableCell>
                    <TableCell className="text-primary-foreground/70 text-xs">+{c.priceGrowth}%</TableCell>
                    <TableCell className="text-primary-foreground/70 text-xs">+{c.incomeGrowth}%</TableCell>
                    <TableCell className="text-primary-foreground/70 text-xs">{((c.priceGrowth - c.incomeGrowth) / 3.2).toFixed(1)}</TableCell>
                    <TableCell><Badge variant="outline" className="text-[10px] capitalize">{c.status}</Badge></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </DataCard>
        </TabsContent>

        {/* TRENDS */}
        <TabsContent value="trends">
          <DataCard
            title="Monthly Trend Data"
            subtitle={`${monthlyTrends.length} months | Source: Blockchain Transaction Log`}
            onExport={() => exportToCSV(
              ['Month', 'Transfers', 'Disputes', 'Mortgages', 'Fraud Blocked'],
              monthlyTrends.map(t => [t.month, String(t.transfers), String(t.disputes), String(t.mortgages), String(t.fraudBlocked)]),
              'monthly_trends_data'
            )}
          >
            <Table>
              <TableHeader>
                <TableRow className="border-primary-foreground/10">
                  {['Month', 'Transfers', 'Disputes', 'Mortgages', 'Fraud Blocked'].map(h => (
                    <TableHead key={h} className="text-primary-foreground/50 text-xs">{h}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {monthlyTrends.map((t, i) => (
                  <TableRow key={i} className="border-primary-foreground/5">
                    <TableCell className="text-primary-foreground text-xs font-medium">{t.month}</TableCell>
                    <TableCell className="text-primary-foreground/70 text-xs">{t.transfers.toLocaleString()}</TableCell>
                    <TableCell className="text-primary-foreground/70 text-xs">{t.disputes}</TableCell>
                    <TableCell className="text-primary-foreground/70 text-xs">{t.mortgages.toLocaleString()}</TableCell>
                    <TableCell className="text-primary-foreground/70 text-xs">{t.fraudBlocked}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </DataCard>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const DataCard: React.FC<{ title: string; subtitle: string; onExport: () => void; children: React.ReactNode }> = ({ title, subtitle, onExport, children }) => (
  <Card className="bg-card/10 border-primary-foreground/10">
    <CardHeader className="pb-3">
      <div className="flex items-center justify-between">
        <div>
          <CardTitle className="text-primary-foreground font-display text-sm flex items-center gap-2">
            <Database className="w-4 h-4 text-accent" />
            {title}
          </CardTitle>
          <p className="text-primary-foreground/40 text-xs font-body mt-1">{subtitle}</p>
        </div>
        <Button variant="ghost" size="sm" className="text-accent hover:bg-accent/10 text-xs gap-1" onClick={onExport}>
          <Download className="w-3 h-3" />
          Export CSV
        </Button>
      </div>
    </CardHeader>
    <CardContent className="overflow-x-auto">
      {children}
    </CardContent>
  </Card>
);

export default DataReferenceTab;
