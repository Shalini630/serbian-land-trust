import React from 'react';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Eye } from 'lucide-react';

export interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (item: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyField: keyof T;
  onRowClick?: (item: T) => void;
  linkPrefix?: string;
  emptyMessage?: string;
  pageSize?: number;
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  keyField,
  onRowClick,
  linkPrefix,
  emptyMessage = 'No data available',
  pageSize = 10,
}: DataTableProps<T>) {
  const [currentPage, setCurrentPage] = React.useState(1);
  
  const totalPages = Math.ceil(data.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = data.slice(startIndex, startIndex + pageSize);

  const getStatusBadge = (status: string) => {
    const statusStyles: Record<string, string> = {
      open: 'bg-amber-500/20 text-amber-600 border-amber-500/30',
      pending: 'bg-blue-500/20 text-blue-600 border-blue-500/30',
      investigation: 'bg-purple-500/20 text-purple-600 border-purple-500/30',
      approved: 'bg-emerald-500/20 text-emerald-600 border-emerald-500/30',
      completed: 'bg-emerald-500/20 text-emerald-600 border-emerald-500/30',
      resolved: 'bg-emerald-500/20 text-emerald-600 border-emerald-500/30',
      rejected: 'bg-red-500/20 text-red-600 border-red-500/30',
      court: 'bg-red-500/20 text-red-600 border-red-500/30',
      active: 'bg-blue-500/20 text-blue-600 border-blue-500/30',
      paid: 'bg-emerald-500/20 text-emerald-600 border-emerald-500/30',
      defaulted: 'bg-red-500/20 text-red-600 border-red-500/30',
      foreclosure: 'bg-red-500/20 text-red-600 border-red-500/30',
    };

    return (
      <Badge variant="outline" className={statusStyles[status] || 'bg-muted text-muted-foreground'}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const renderCell = (item: T, column: Column<T>) => {
    if (column.render) {
      return column.render(item);
    }

    const value = item[column.key as keyof T];
    
    // Auto-detect status fields
    if (column.key === 'status' && typeof value === 'string') {
      return getStatusBadge(value);
    }

    // Auto-detect type fields
    if (column.key === 'type' && typeof value === 'string') {
      return (
        <span className="capitalize text-muted-foreground">{value}</span>
      );
    }

    return value;
  };

  if (data.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              {columns.map((column) => (
                <TableHead key={String(column.key)} className={column.className}>
                  {column.header}
                </TableHead>
              ))}
              {(onRowClick || linkPrefix) && (
                <TableHead className="w-[100px]">Action</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((item) => (
              <TableRow 
                key={String(item[keyField])} 
                className="hover:bg-muted/30 transition-colors"
              >
                {columns.map((column) => (
                  <TableCell key={String(column.key)} className={column.className}>
                    {renderCell(item, column)}
                  </TableCell>
                ))}
                {(onRowClick || linkPrefix) && (
                  <TableCell>
                    {linkPrefix ? (
                      <Link to={`${linkPrefix}/${item[keyField]}`}>
                        <Button variant="ghost" size="sm" className="text-accent hover:text-accent hover:bg-accent/10">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                      </Link>
                    ) : (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => onRowClick?.(item)}
                        className="text-accent hover:text-accent hover:bg-accent/10"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {startIndex + 1}-{Math.min(startIndex + pageSize, data.length)} of {data.length} entries
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-sm text-muted-foreground px-2">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
