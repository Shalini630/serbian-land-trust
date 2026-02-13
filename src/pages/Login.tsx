import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ShieldIcon } from '@/components/icons/ShieldIcon';
import { Shield, Building2, Users, ArrowLeft, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

interface Credentials {
  username: string;
  password: string;
  role: Exclude<UserRole, null>;
  title: string;
  description: string;
  icon: React.ReactNode;
  access: string[];
  canInputData: boolean;
}

const CREDENTIALS: Credentials[] = [
  {
    username: 'admin',
    password: 'TerraBlock@2024',
    role: 'admin',
    title: 'TerraBlock Admin',
    description: 'Full system access — all phases, dashboards, data input, and management',
    icon: <Shield className="w-6 h-6" />,
    access: ['All 3 Phases', 'All Dashboards', 'Data Input & Management', 'User Administration'],
    canInputData: true,
  },
  {
    username: 'gov.serbia',
    password: 'Ministry@2024',
    role: 'government',
    title: 'Government of Serbia',
    description: 'Access to Phase 1 & 2, policy dashboards, and data input capabilities',
    icon: <Building2 className="w-6 h-6" />,
    access: ['Phase 1 & 2', 'Policy Dashboards', 'Data Input', 'Reports & Analytics'],
    canInputData: true,
  },
  {
    username: 'public',
    password: 'ViewOnly@2024',
    role: 'public',
    title: 'Public Access',
    description: 'View-only access to Phase 1 overview and public information',
    icon: <Users className="w-6 h-6" />,
    access: ['Phase 1 Only', 'Overview Reports', 'Read-Only Access'],
    canInputData: false,
  },
];

export const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [selectedRole, setSelectedRole] = useState<Credentials | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const match = CREDENTIALS.find(
      c => c.username === username.trim() && c.password === password
    );

    if (match) {
      login(match.role);
      navigate('/presentations');
    } else {
      setError('Invalid username or password. Please check your credentials.');
    }
  };

  const handleQuickSelect = (cred: Credentials) => {
    setSelectedRole(cred);
    setUsername(cred.username);
    setPassword(cred.password);
    setError('');
  };

  return (
    <div className="min-h-screen bg-primary flex flex-col">
      {/* Header */}
      <header className="p-4 sm:p-6">
        <Link to="/" className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-accent transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-body">Back to Home</span>
        </Link>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-5xl space-y-8">
          {/* Logo & Title */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-accent/20 border border-accent/30 mb-2">
              <ShieldIcon className="w-7 h-7 text-accent" />
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-primary-foreground">
              Secure Portal Login
            </h1>
            <p className="text-primary-foreground/60 font-body max-w-md mx-auto text-sm">
              Enter your credentials to access the National Digital Land Registry portal
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Login Form */}
            <Card className="bg-card/10 border-primary-foreground/10">
              <CardHeader className="pb-4">
                <CardTitle className="text-primary-foreground font-display text-lg flex items-center gap-2">
                  <Lock className="w-4 h-4 text-accent" />
                  Authentication
                </CardTitle>
                <CardDescription className="text-primary-foreground/50 font-body text-xs">
                  Use your assigned credentials to log in
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-primary-foreground/70 text-sm">Username</Label>
                    <Input
                      id="username"
                      value={username}
                      onChange={e => { setUsername(e.target.value); setError(''); }}
                      placeholder="Enter username"
                      className="bg-primary-foreground/5 border-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/30"
                      autoComplete="username"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-primary-foreground/70 text-sm">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={e => { setPassword(e.target.value); setError(''); }}
                        placeholder="Enter password"
                        className="bg-primary-foreground/5 border-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/30 pr-10"
                        autoComplete="current-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-foreground/30 hover:text-primary-foreground/60"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 text-destructive text-xs bg-destructive/10 p-3 rounded-lg">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      {error}
                    </div>
                  )}

                  {selectedRole && (
                    <div className="bg-accent/5 border border-accent/20 rounded-lg p-3 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-accent">{selectedRole.icon}</span>
                        <span className="text-primary-foreground font-display text-sm font-medium">{selectedRole.title}</span>
                        {selectedRole.canInputData && (
                          <Badge className="bg-accent/20 text-accent text-[10px]">Data Input</Badge>
                        )}
                      </div>
                      <p className="text-primary-foreground/50 text-xs">{selectedRole.description}</p>
                    </div>
                  )}

                  <Button type="submit" variant="hero" className="w-full">
                    Login
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Credentials Reference */}
            <div className="space-y-3">
              <p className="text-primary-foreground/40 text-xs font-body uppercase tracking-wider">Quick Access — Click to autofill</p>
              {CREDENTIALS.map(cred => (
                <Card
                  key={cred.role}
                  className={`bg-card/10 border-primary-foreground/10 hover:border-accent/30 transition-all cursor-pointer group ${
                    selectedRole?.role === cred.role ? 'border-accent/50 bg-accent/5' : ''
                  }`}
                  onClick={() => handleQuickSelect(cred)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center group-hover:bg-accent/20 transition-colors shrink-0">
                        {cred.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-primary-foreground font-display text-sm font-medium">{cred.title}</h3>
                          {cred.canInputData && (
                            <Badge className="bg-accent/20 text-accent text-[10px]">Can Input Data</Badge>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-0.5 mb-2">
                          <p className="text-primary-foreground/40 text-xs font-body">
                            ID: <span className="text-primary-foreground/70 font-mono">{cred.username}</span>
                          </p>
                          <p className="text-primary-foreground/40 text-xs font-body">
                            Pass: <span className="text-primary-foreground/70 font-mono">{cred.password}</span>
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {cred.access.map((a, i) => (
                            <span key={i} className="text-[10px] text-primary-foreground/40 bg-primary-foreground/5 px-1.5 py-0.5 rounded">
                              {a}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <p className="text-center text-[10px] text-primary-foreground/30 font-body mt-4">
                Demo environment — In production, credentials will be managed via secure SSO/LDAP integration
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
