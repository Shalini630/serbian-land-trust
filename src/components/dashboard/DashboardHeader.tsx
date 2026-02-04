import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShieldIcon } from '@/components/icons/ShieldIcon';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  AlertTriangle, 
  ArrowLeftRight, 
  Building2, 
  MapPin,
  Home,
  ChevronRight
} from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface DashboardHeaderProps {
  breadcrumbs?: BreadcrumbItem[];
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ breadcrumbs = [] }) => {
  const location = useLocation();
  
  const navItems = [
    { path: '/dashboard', label: 'Overview', icon: LayoutDashboard },
    { path: '/dashboard/disputes', label: 'Disputes', icon: AlertTriangle },
    { path: '/dashboard/transfers', label: 'Transfers', icon: ArrowLeftRight },
    { path: '/dashboard/mortgages', label: 'Mortgages', icon: Building2 },
    { path: '/dashboard/regions', label: 'Regions', icon: MapPin },
  ];

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 bg-primary border-b border-primary-foreground/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar */}
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-accent/20 border border-accent/30">
                <ShieldIcon className="w-6 h-6 text-accent" />
              </div>
              <div className="hidden sm:block">
                <h1 className="font-display text-lg font-semibold text-primary-foreground leading-tight">
                  Land Registry
                </h1>
                <p className="text-xs text-primary-foreground/70 font-body">
                  Dashboard
                </p>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm" className="text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10">
                <Home className="w-4 h-4 mr-2" />
                Home
              </Button>
            </Link>
            <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
              <span className="text-accent text-xs font-bold">RS</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-1 pb-3 overflow-x-auto">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path}>
              <Button
                variant="ghost"
                size="sm"
                className={`flex items-center gap-2 ${
                  isActive(item.path)
                    ? 'bg-accent/20 text-accent hover:bg-accent/30'
                    : 'text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>
      </div>

      {/* Breadcrumbs */}
      {breadcrumbs.length > 0 && (
        <div className="bg-muted/50 border-b border-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-2">
            <div className="flex items-center gap-2 text-sm">
              <Link to="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                Dashboard
              </Link>
              {breadcrumbs.map((item, index) => (
                <React.Fragment key={index}>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  {item.path ? (
                    <Link to={item.path} className="text-muted-foreground hover:text-foreground transition-colors">
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-foreground font-medium">{item.label}</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
