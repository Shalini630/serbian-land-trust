 import React from 'react';
 import { Link, useNavigate } from 'react-router-dom';
 import { useAuth } from '@/contexts/AuthContext';
 import { Button } from '@/components/ui/button';
 import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
 import { Badge } from '@/components/ui/badge';
 import { ShieldIcon } from '@/components/icons/ShieldIcon';
 import { 
   ArrowLeft, 
   LogOut, 
   Presentation, 
   Database, 
   FileText, 
   Lock,
   Eye,
   Download,
   Play,
   ChevronRight
 } from 'lucide-react';
 
 interface PresentationPhase {
   id: string;
   phase: number;
   title: string;
   description: string;
   status: 'available' | 'locked';
   items: { type: 'presentation' | 'dashboard' | 'document'; title: string; description: string }[];
   requiredRole: ('admin' | 'government' | 'public')[];
 }
 
 const presentations: PresentationPhase[] = [
   {
     id: 'phase-1',
     phase: 1,
     title: 'Executive Overview',
     description: 'High-level introduction to the National Digital Land Registry initiative, vision, and expected outcomes.',
     status: 'available',
     requiredRole: ['admin', 'government', 'public'],
     items: [
       { type: 'presentation', title: 'Vision & Mission', description: 'Strategic overview of blockchain land registry' },
       { type: 'presentation', title: 'Problem Statement', description: 'Current challenges in Serbian land registry' },
       { type: 'document', title: 'Executive Summary', description: 'One-page project brief for stakeholders' },
     ],
   },
   {
     id: 'phase-2',
     phase: 2,
     title: 'Technical Deep Dive',
     description: 'Comprehensive technical documentation, data collection points, dashboards, and implementation roadmap.',
     status: 'available',
     requiredRole: ['admin', 'government'],
     items: [
       { type: 'dashboard', title: 'Analytics Dashboard', description: 'Live data visualization and KPIs' },
       { type: 'presentation', title: 'Data Architecture', description: 'Data collection and processing pipeline' },
       { type: 'presentation', title: 'Smart Contract Design', description: 'Blockchain transaction workflows' },
       { type: 'document', title: 'Technical Specification', description: 'Detailed system requirements' },
       { type: 'document', title: 'Integration Guide', description: 'API and system integration documentation' },
     ],
   },
   {
     id: 'phase-3',
     phase: 3,
     title: 'Implementation & Rollout',
     description: 'Internal company materials, project management, timelines, and deployment strategies.',
     status: 'available',
     requiredRole: ['admin'],
     items: [
       { type: 'presentation', title: 'Rollout Strategy', description: 'Phased deployment across Serbian regions' },
       { type: 'dashboard', title: 'Project Tracker', description: 'Internal milestone and task management' },
       { type: 'document', title: 'Risk Assessment', description: 'Risk mitigation and contingency plans' },
       { type: 'document', title: 'Budget & Resources', description: 'Financial projections and team allocation' },
     ],
   },
 ];
 
 const getItemIcon = (type: string) => {
   switch (type) {
     case 'presentation':
       return <Presentation className="w-4 h-4" />;
     case 'dashboard':
       return <Database className="w-4 h-4" />;
     case 'document':
       return <FileText className="w-4 h-4" />;
     default:
       return <FileText className="w-4 h-4" />;
   }
 };
 
 export const PresentationsPortal: React.FC = () => {
   const { user, role, logout } = useAuth();
   const navigate = useNavigate();
 
   const handleLogout = () => {
     logout();
     navigate('/');
   };
 
   const canAccessPhase = (phase: PresentationPhase) => {
     if (!role) return false;
     return phase.requiredRole.includes(role);
   };
 
   const getRoleBadgeVariant = (r: string) => {
     switch (r) {
       case 'admin':
         return 'default';
       case 'government':
         return 'secondary';
       default:
         return 'outline';
     }
   };
 
   if (!user) {
     navigate('/login');
     return null;
   }
 
   return (
     <div className="min-h-screen bg-primary">
       {/* Header */}
       <header className="sticky top-0 z-50 bg-primary/95 backdrop-blur-sm border-b border-primary-foreground/10">
         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex items-center justify-between h-16">
             <div className="flex items-center gap-4">
               <Link to="/" className="flex items-center gap-2 text-primary-foreground/70 hover:text-accent transition-colors">
                 <ArrowLeft className="w-4 h-4" />
                 <span className="text-sm font-body hidden sm:inline">Home</span>
               </Link>
               <div className="w-px h-6 bg-primary-foreground/20" />
               <div className="flex items-center gap-2">
                 <ShieldIcon className="w-6 h-6 text-accent" />
                 <span className="font-display text-primary-foreground font-semibold">Presentations</span>
               </div>
             </div>
 
             <div className="flex items-center gap-4">
               <div className="hidden sm:flex items-center gap-2">
                 <span className="text-sm text-primary-foreground/60 font-body">{user.name}</span>
                 <Badge variant={getRoleBadgeVariant(role || '')} className="capitalize">
                   {role}
                 </Badge>
               </div>
               <Button variant="ghost" size="sm" onClick={handleLogout} className="text-primary-foreground/70 hover:text-destructive">
                 <LogOut className="w-4 h-4" />
                 <span className="hidden sm:inline ml-2">Logout</span>
               </Button>
             </div>
           </div>
         </div>
       </header>
 
       {/* Main Content */}
       <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
         {/* Welcome Section */}
         <div className="mb-8 sm:mb-12">
           <h1 className="font-display text-2xl sm:text-3xl font-bold text-primary-foreground mb-2">
             Welcome, {user.name}
           </h1>
           <p className="text-primary-foreground/60 font-body">
             Access presentations and materials for the National Digital Land Registry project.
           </p>
         </div>
 
         {/* Phases Grid */}
         <div className="space-y-6">
           {presentations.map((phase) => {
             const hasAccess = canAccessPhase(phase);
             
             return (
               <Card
                 key={phase.id}
                 className={`bg-card/10 border-primary-foreground/10 transition-all duration-300 ${
                   hasAccess ? 'hover:border-accent/30' : 'opacity-60'
                 }`}
               >
                 <CardHeader>
                   <div className="flex items-start justify-between gap-4">
                     <div className="flex items-center gap-3">
                       <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-display font-bold text-lg ${
                         hasAccess ? 'bg-accent/20 text-accent' : 'bg-muted/20 text-muted-foreground'
                       }`}>
                         {phase.phase}
                       </div>
                       <div>
                         <CardTitle className="text-primary-foreground font-display flex items-center gap-2">
                           {phase.title}
                           {!hasAccess && <Lock className="w-4 h-4 text-muted-foreground" />}
                         </CardTitle>
                         <CardDescription className="text-primary-foreground/50 font-body mt-1">
                           {phase.description}
                         </CardDescription>
                       </div>
                     </div>
                     <div className="flex gap-1">
                       {phase.requiredRole.map((r) => (
                         <Badge key={r} variant="outline" className="text-xs capitalize text-primary-foreground/40 border-primary-foreground/20">
                           {r}
                         </Badge>
                       ))}
                     </div>
                   </div>
                 </CardHeader>
                 
                 <CardContent>
                   {hasAccess ? (
                     <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                       {phase.items.map((item, index) => (
                         <div
                           key={index}
                           className="group p-4 rounded-lg bg-primary-foreground/5 border border-primary-foreground/10 hover:border-accent/30 hover:bg-primary-foreground/10 transition-all cursor-pointer"
                         >
                           <div className="flex items-start justify-between mb-2">
                             <div className={`w-8 h-8 rounded flex items-center justify-center ${
                               item.type === 'dashboard' ? 'bg-success/20 text-success' :
                               item.type === 'presentation' ? 'bg-accent/20 text-accent' :
                               'bg-muted/20 text-muted-foreground'
                             }`}>
                               {getItemIcon(item.type)}
                             </div>
                             <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                               {item.type === 'presentation' && (
                                 <Button variant="ghost" size="icon" className="w-7 h-7 text-primary-foreground/50 hover:text-accent">
                                   <Play className="w-3.5 h-3.5" />
                                 </Button>
                               )}
                               {item.type === 'dashboard' && (
                                 <Link to="/dashboard">
                                   <Button variant="ghost" size="icon" className="w-7 h-7 text-primary-foreground/50 hover:text-success">
                                     <Eye className="w-3.5 h-3.5" />
                                   </Button>
                                 </Link>
                               )}
                               <Button variant="ghost" size="icon" className="w-7 h-7 text-primary-foreground/50 hover:text-primary-foreground">
                                 <Download className="w-3.5 h-3.5" />
                               </Button>
                             </div>
                           </div>
                           <h4 className="text-sm font-medium text-primary-foreground font-body mb-1">
                             {item.title}
                           </h4>
                           <p className="text-xs text-primary-foreground/50 font-body">
                             {item.description}
                           </p>
                         </div>
                       ))}
                     </div>
                   ) : (
                     <div className="flex items-center justify-center py-8 text-primary-foreground/40">
                       <Lock className="w-5 h-5 mr-2" />
                       <span className="font-body text-sm">
                         This phase requires {phase.requiredRole.join(' or ')} access
                       </span>
                     </div>
                   )}
                 </CardContent>
               </Card>
             );
           })}
         </div>
 
         {/* Quick Links */}
         <div className="mt-12 pt-8 border-t border-primary-foreground/10">
           <h2 className="font-display text-lg text-primary-foreground mb-4">Quick Links</h2>
           <div className="flex flex-wrap gap-3">
             <Link to="/dashboard">
               <Button variant="heroOutline" size="sm" className="gap-2">
                 <Database className="w-4 h-4" />
                 View Dashboard
                 <ChevronRight className="w-4 h-4" />
               </Button>
             </Link>
             <Link to="/">
               <Button variant="ghost" size="sm" className="text-primary-foreground/60 gap-2">
                 <Eye className="w-4 h-4" />
                 View Landing Page
               </Button>
             </Link>
           </div>
         </div>
       </main>
     </div>
   );
 };
 
 export default PresentationsPortal;