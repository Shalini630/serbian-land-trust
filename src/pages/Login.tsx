 import React from 'react';
 import { useNavigate } from 'react-router-dom';
 import { useAuth, UserRole } from '@/contexts/AuthContext';
 import { Button } from '@/components/ui/button';
 import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
 import { ShieldIcon } from '@/components/icons/ShieldIcon';
 import { Shield, Building2, Users, ArrowLeft } from 'lucide-react';
 import { Link } from 'react-router-dom';
 
 const roleOptions: { role: Exclude<UserRole, null>; title: string; description: string; icon: React.ReactNode; access: string[] }[] = [
   {
     role: 'admin',
     title: 'TerraBlock Admin',
     description: 'Full access to all presentations, dashboards, and management tools',
     icon: <Shield className="w-8 h-8" />,
     access: ['All 3 Phases', 'Dashboard Management', 'Content Upload', 'Analytics'],
   },
   {
     role: 'government',
     title: 'Government of Serbia',
     description: 'Access to client presentations and detailed project documentation',
     icon: <Building2 className="w-8 h-8" />,
     access: ['Phase 1 & 2', 'Dashboards', 'Reports', 'Data Collection'],
   },
   {
     role: 'public',
     title: 'Public Access',
     description: 'View high-level overview and public information',
     icon: <Users className="w-8 h-8" />,
     access: ['Phase 1 Only', 'Overview', 'Public Reports'],
   },
 ];
 
 export const Login: React.FC = () => {
   const { login } = useAuth();
   const navigate = useNavigate();
 
   const handleLogin = (role: Exclude<UserRole, null>) => {
     login(role);
     navigate('/presentations');
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
         <div className="w-full max-w-4xl space-y-8">
           {/* Logo & Title */}
           <div className="text-center space-y-4">
             <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-accent/20 border border-accent/30 mb-4">
               <ShieldIcon className="w-8 h-8 text-accent" />
             </div>
             <h1 className="font-display text-3xl sm:text-4xl font-bold text-primary-foreground">
               Presentation Portal
             </h1>
             <p className="text-primary-foreground/70 font-body max-w-md mx-auto">
               Select your access level to view the National Digital Land Registry presentations
             </p>
           </div>
 
           {/* Role Selection Cards */}
           <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
             {roleOptions.map((option) => (
               <Card
                 key={option.role}
                 className="bg-card/10 border-primary-foreground/10 hover:border-accent/50 transition-all duration-300 cursor-pointer group"
                 onClick={() => handleLogin(option.role)}
               >
                 <CardHeader className="text-center pb-2">
                   <div className="inline-flex items-center justify-center w-14 h-14 rounded-lg bg-accent/10 text-accent mx-auto mb-3 group-hover:bg-accent/20 transition-colors">
                     {option.icon}
                   </div>
                   <CardTitle className="text-primary-foreground font-display text-lg">
                     {option.title}
                   </CardTitle>
                   <CardDescription className="text-primary-foreground/60 font-body text-sm">
                     {option.description}
                   </CardDescription>
                 </CardHeader>
                 <CardContent className="pt-2">
                   <div className="space-y-2 mb-4">
                     {option.access.map((item, i) => (
                       <div key={i} className="flex items-center gap-2 text-xs text-primary-foreground/50 font-body">
                         <div className="w-1.5 h-1.5 rounded-full bg-accent/50" />
                         {item}
                       </div>
                     ))}
                   </div>
                   <Button
                     variant="hero"
                     className="w-full"
                     onClick={(e) => {
                       e.stopPropagation();
                       handleLogin(option.role);
                     }}
                   >
                     Login as {option.title.split(' ')[0]}
                   </Button>
                 </CardContent>
               </Card>
             ))}
           </div>
 
           {/* Demo Notice */}
           <p className="text-center text-xs text-primary-foreground/40 font-body">
             This is a demonstration portal. In production, authentication will be secured with credentials.
           </p>
         </div>
       </div>
     </div>
   );
 };
 
 export default Login;