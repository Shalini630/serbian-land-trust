 import React, { createContext, useContext, useState, useCallback } from 'react';
 
 export type UserRole = 'admin' | 'government' | 'public' | null;
 
 interface User {
   id: string;
   name: string;
   role: UserRole;
   email: string;
 }
 
 interface AuthContextType {
   user: User | null;
   role: UserRole;
   isAuthenticated: boolean;
   login: (role: UserRole) => void;
   logout: () => void;
 }
 
 const AuthContext = createContext<AuthContextType | undefined>(undefined);
 
 const mockUsers: Record<Exclude<UserRole, null>, User> = {
   admin: {
     id: 'admin-001',
     name: 'TerraBlock Admin',
     role: 'admin',
     email: 'admin@terrablock.rs',
   },
   government: {
     id: 'gov-001',
     name: 'Ministry of Construction',
     role: 'government',
     email: 'registry@gov.rs',
   },
   public: {
     id: 'public-001',
     name: 'Guest User',
     role: 'public',
     email: 'guest@example.com',
   },
 };
 
 export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
   const [user, setUser] = useState<User | null>(null);
 
   const login = useCallback((role: UserRole) => {
     if (role && mockUsers[role]) {
       setUser(mockUsers[role]);
     }
   }, []);
 
   const logout = useCallback(() => {
     setUser(null);
   }, []);
 
   return (
     <AuthContext.Provider
       value={{
         user,
         role: user?.role || null,
         isAuthenticated: !!user,
         login,
         logout,
       }}
     >
       {children}
     </AuthContext.Provider>
   );
 };
 
 export const useAuth = () => {
   const context = useContext(AuthContext);
   if (context === undefined) {
     throw new Error('useAuth must be used within an AuthProvider');
   }
   return context;
 };