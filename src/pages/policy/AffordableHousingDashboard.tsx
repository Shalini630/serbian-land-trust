import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
  Tooltip,
} from 'recharts';
import {
  Home,
  TrendingUp,
  TrendingDown,
  Users,
  Building2,
  ArrowLeft,
  Calculator,
  RefreshCw,
} from 'lucide-react';
import {
  affordabilityByCity,
  incomeDecileData,
  nationalAffordabilityKPIs,
  formatCurrency,
  getRiskColor,
  getRiskBgColor,
} from '@/data/policyDashboardData';

const AffordableHousingDashboard: React.FC = () => {
  const [maxPriceToIncome, setMaxPriceToIncome] = useState([8]);
  const [maxEMIPercent, setMaxEMIPercent] = useState([35]);
  const [simulatedImprovement, setSimulatedImprovement] = useState<number | null>(null);

  const runSimulation = () => {
    // Simulated improvement based on slider values
    const baseImprovement = (10 - maxPriceToIncome[0]) * 2 + (40 - maxEMIPercent[0]) * 0.5;
    setSimulatedImprovement(Math.max(0, Math.min(45, baseImprovement + Math.random() * 5)));
  };

  const chartConfig = {
    income: { label: 'Household Income', color: 'hsl(var(--chart-1))' },
    price: { label: 'Median Price', color: 'hsl(var(--chart-2))' },
  };

  // Transform data for scatter plot
  const scatterData = incomeDecileData.map((d) => ({
    x: d.income / 1000, // Convert to thousands
    y: d.avgPrice / 1000, // Convert to thousands
    decile: d.decile,
    affordable: d.affordable,
  }));

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
          <span className="text-foreground">Affordable Housing</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <Home className="w-6 h-6 text-blue-500" />
              </div>
              <Badge variant="outline" className="text-blue-500 border-blue-500">
                Housing Policy
              </Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-foreground">
              Affordable Housing Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Housing affordability anchored to income reality — not headline prices
            </p>
          </div>
        </div>

        {/* KPI Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <Home className="w-4 h-4" />
                <span>National HAI</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-foreground">{nationalAffordabilityKPIs.nationalHAI}</span>
                <div className={`flex items-center gap-1 text-sm ${nationalAffordabilityKPIs.nationalHAIChange > 0 ? 'text-red-500' : 'text-emerald-500'}`}>
                  {nationalAffordabilityKPIs.nationalHAIChange > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  <span>{Math.abs(nationalAffordabilityKPIs.nationalHAIChange)}</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Price to Income Ratio</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <Users className="w-4 h-4" />
                <span>Eligible Households</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-foreground">{nationalAffordabilityKPIs.eligibleHouseholdsNational}%</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Can afford median home</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <Building2 className="w-4 h-4" />
                <span>New Affordable Units</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-foreground">{nationalAffordabilityKPIs.newAffordableUnitsNational.toLocaleString()}</span>
                <div className="flex items-center gap-1 text-sm text-emerald-500">
                  <TrendingUp className="w-3 h-3" />
                  <span>{nationalAffordabilityKPIs.newAffordableUnitsChange}%</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">MoM increase</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <Calculator className="w-4 h-4" />
                <span>Median Ratio</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-foreground">{nationalAffordabilityKPIs.medianPriceToIncome}x</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Price / Annual Income</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Income vs Price Scatter Plot */}
          <Card className="lg:col-span-2 bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Income vs Price by Decile</CardTitle>
              <p className="text-sm text-muted-foreground">Red zone = structurally unaffordable (ratio &gt; 8x)</p>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart margin={{ top: 20, right: 20, bottom: 40, left: 40 }}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis 
                      type="number" 
                      dataKey="x" 
                      name="Income" 
                      unit="K" 
                      tick={{ fill: 'hsl(var(--muted-foreground))' }}
                      label={{ value: 'Household Income (€K/year)', position: 'bottom', offset: 20, fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <YAxis 
                      type="number" 
                      dataKey="y" 
                      name="Price" 
                      unit="K" 
                      tick={{ fill: 'hsl(var(--muted-foreground))' }}
                      label={{ value: 'Median Price (€K)', angle: -90, position: 'insideLeft', offset: 10, fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <Tooltip 
                      cursor={{ strokeDasharray: '3 3' }}
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
                              <p className="font-medium">{data.decile}</p>
                              <p className="text-sm text-muted-foreground">Income: €{data.x}K/year</p>
                              <p className="text-sm text-muted-foreground">Avg Price: €{data.y}K</p>
                              <p className={`text-sm font-medium mt-1 ${data.affordable ? 'text-emerald-500' : 'text-red-500'}`}>
                                {data.affordable ? 'Affordable' : 'Unaffordable'}
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Scatter name="Deciles" data={scatterData}>
                      {scatterData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.affordable ? 'hsl(168, 60%, 38%)' : 'hsl(0, 72%, 51%)'} 
                        />
                      ))}
                    </Scatter>
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Policy Control Panel */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Policy Simulation</CardTitle>
              <p className="text-sm text-muted-foreground">Adjust thresholds to simulate policy impact</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Max Price-to-Income Ratio</span>
                  <span className="font-medium">{maxPriceToIncome[0]}x</span>
                </div>
                <Slider
                  value={maxPriceToIncome}
                  onValueChange={setMaxPriceToIncome}
                  max={15}
                  min={3}
                  step={0.5}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">EU benchmark: 6-8x annual income</p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Max EMI % of Income</span>
                  <span className="font-medium">{maxEMIPercent[0]}%</span>
                </div>
                <Slider
                  value={maxEMIPercent}
                  onValueChange={setMaxEMIPercent}
                  max={50}
                  min={20}
                  step={1}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">Recommended: 30-35% of monthly income</p>
              </div>

              <Button onClick={runSimulation} className="w-full">
                <RefreshCw className="w-4 h-4 mr-2" />
                Run Simulation
              </Button>

              {simulatedImprovement !== null && (
                <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <p className="text-sm font-medium text-emerald-600">Simulated Outcome</p>
                  <p className="text-2xl font-bold text-emerald-500 mt-1">+{simulatedImprovement.toFixed(1)}%</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Affordability improvement if subsidy applied with these thresholds
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* City Heatmap */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">City Affordability Heatmap</CardTitle>
            <p className="text-sm text-muted-foreground">Green = affordable, Amber = stressed, Red = critical</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {affordabilityByCity.map((city) => (
                <div
                  key={city.cityId}
                  className={`p-4 rounded-lg border transition-all hover:shadow-md ${
                    city.affordabilityStatus === 'affordable'
                      ? 'border-emerald-500/30 bg-emerald-500/5'
                      : city.affordabilityStatus === 'stressed'
                      ? 'border-amber-500/30 bg-amber-500/5'
                      : 'border-red-500/30 bg-red-500/5'
                  }`}
                >
                  <p className="font-medium text-sm">{city.cityName}</p>
                  <p className={`text-2xl font-bold mt-1 ${getRiskColor(city.affordabilityStatus)}`}>
                    {city.housingAffordabilityIndex}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">HAI Score</p>
                  <div className="flex items-center gap-1 mt-2">
                    <div className={`w-2 h-2 rounded-full ${getRiskBgColor(city.affordabilityStatus)}`}></div>
                    <span className="text-xs capitalize">{city.affordabilityStatus}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Detailed Table */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Detailed City Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">City</th>
                    <th className="text-right py-3 px-4 font-medium text-muted-foreground">Median Price</th>
                    <th className="text-right py-3 px-4 font-medium text-muted-foreground">Median Income</th>
                    <th className="text-right py-3 px-4 font-medium text-muted-foreground">P/I Ratio</th>
                    <th className="text-right py-3 px-4 font-medium text-muted-foreground">Eligible %</th>
                    <th className="text-right py-3 px-4 font-medium text-muted-foreground">New Units</th>
                    <th className="text-center py-3 px-4 font-medium text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {affordabilityByCity.map((city) => (
                    <tr key={city.cityId} className="border-b border-border hover:bg-muted/50">
                      <td className="py-3 px-4 font-medium">{city.cityName}</td>
                      <td className="py-3 px-4 text-right">{formatCurrency(city.medianHousePrice)}</td>
                      <td className="py-3 px-4 text-right">{formatCurrency(city.medianHouseholdIncome)}/yr</td>
                      <td className="py-3 px-4 text-right font-medium">{city.priceToIncomeRatio}x</td>
                      <td className="py-3 px-4 text-right">{city.eligibleHouseholds}%</td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <span>{city.newAffordableUnits}</span>
                          <span className={`text-xs ${city.newAffordableUnitsChange >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                            ({city.newAffordableUnitsChange > 0 ? '+' : ''}{city.newAffordableUnitsChange}%)
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <Badge 
                          className={
                            city.affordabilityStatus === 'affordable' 
                              ? 'bg-emerald-500' 
                              : city.affordabilityStatus === 'stressed'
                              ? 'bg-amber-500'
                              : 'bg-red-500'
                          }
                        >
                          {city.affordabilityStatus}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AffordableHousingDashboard;
