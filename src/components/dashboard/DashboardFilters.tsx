import React from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar, Filter, Search, X, Download } from 'lucide-react';
import { regions } from '@/data/dashboardData';

interface DashboardFiltersProps {
  onRegionChange?: (region: string) => void;
  onDateRangeChange?: (range: string) => void;
  onStatusChange?: (status: string) => void;
  onSearch?: (query: string) => void;
  onReset?: () => void;
  onExport?: () => void;
  showStatus?: boolean;
  statusOptions?: { value: string; label: string }[];
  selectedRegion?: string;
  selectedDateRange?: string;
  selectedStatus?: string;
  searchQuery?: string;
}

export const DashboardFilters: React.FC<DashboardFiltersProps> = ({
  onRegionChange,
  onDateRangeChange,
  onStatusChange,
  onSearch,
  onReset,
  onExport,
  showStatus = true,
  statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'open', label: 'Open' },
    { value: 'pending', label: 'Pending' },
    { value: 'completed', label: 'Completed' },
  ],
  selectedRegion = 'all',
  selectedDateRange = '30d',
  selectedStatus = 'all',
  searchQuery = '',
}) => {
  return (
    <div className="bg-card border border-border rounded-xl p-4">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm font-medium text-foreground">Filters</span>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {/* Search */}
        <div className="relative lg:col-span-2">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by ID or name..."
            className="pl-9 bg-background"
            value={searchQuery}
            onChange={(e) => onSearch?.(e.target.value)}
          />
        </div>

        {/* Region */}
        <Select value={selectedRegion} onValueChange={onRegionChange}>
          <SelectTrigger className="bg-background">
            <SelectValue placeholder="Region" />
          </SelectTrigger>
          <SelectContent className="bg-card border-border">
            <SelectItem value="all">All Regions</SelectItem>
            {regions.map((region) => (
              <SelectItem key={region.id} value={region.id}>
                {region.displayName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Date Range */}
        <Select value={selectedDateRange} onValueChange={onDateRangeChange}>
          <SelectTrigger className="bg-background">
            <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
            <SelectValue placeholder="Date range" />
          </SelectTrigger>
          <SelectContent className="bg-card border-border">
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
            <SelectItem value="1y">Last year</SelectItem>
            <SelectItem value="all">All time</SelectItem>
          </SelectContent>
        </Select>

        {/* Status (conditional) */}
        {showStatus && (
          <Select value={selectedStatus} onValueChange={onStatusChange}>
            <SelectTrigger className="bg-background">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              {statusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {/* Action buttons */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <Button
          variant="ghost"
          size="sm"
          onClick={onReset}
          className="text-muted-foreground hover:text-foreground"
        >
          <X className="w-4 h-4 mr-2" />
          Reset filters
        </Button>
        
        {onExport && (
          <Button
            variant="outline"
            size="sm"
            onClick={onExport}
            className="border-accent text-accent hover:bg-accent/10"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        )}
      </div>
    </div>
  );
};
