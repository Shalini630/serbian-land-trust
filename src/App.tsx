import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import PresentationsPortal from "./pages/presentations/PresentationsPortal";
import Dashboard from "./pages/dashboard/Dashboard";
import DisputesDashboard from "./pages/dashboard/DisputesDashboard";
import TransfersDashboard from "./pages/dashboard/TransfersDashboard";
import MortgagesDashboard from "./pages/dashboard/MortgagesDashboard";
import RegionsDashboard from "./pages/dashboard/RegionsDashboard";
import DisputeDetail from "./pages/dashboard/DisputeDetail";
import TransferDetail from "./pages/dashboard/TransferDetail";
import MortgageDetail from "./pages/dashboard/MortgageDetail";
import RegionDetail from "./pages/dashboard/RegionDetail";
// Policy Dashboards
import MinisterialDashboard from "./pages/policy/MinisterialDashboard";
import AffordableHousingDashboard from "./pages/policy/AffordableHousingDashboard";
import LegalComplianceDashboard from "./pages/policy/LegalComplianceDashboard";
import SubsidyAllocationDashboard from "./pages/policy/SubsidyAllocationDashboard";
import BubbleProtectionDashboard from "./pages/policy/BubbleProtectionDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/presentations" element={<PresentationsPortal />} />
            {/* Land Registry Dashboard */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/disputes" element={<DisputesDashboard />} />
            <Route path="/dashboard/disputes/:id" element={<DisputeDetail />} />
            <Route path="/dashboard/transfers" element={<TransfersDashboard />} />
            <Route path="/dashboard/transfers/:id" element={<TransferDetail />} />
            <Route path="/dashboard/mortgages" element={<MortgagesDashboard />} />
            <Route path="/dashboard/mortgages/:id" element={<MortgageDetail />} />
            <Route path="/dashboard/regions" element={<RegionsDashboard />} />
            <Route path="/dashboard/regions/:id" element={<RegionDetail />} />
            {/* Policy Dashboards */}
            <Route path="/policy" element={<MinisterialDashboard />} />
            <Route path="/policy/affordable-housing" element={<AffordableHousingDashboard />} />
            <Route path="/policy/legal-compliance" element={<LegalComplianceDashboard />} />
            <Route path="/policy/subsidy-allocation" element={<SubsidyAllocationDashboard />} />
            <Route path="/policy/bubble-protection" element={<BubbleProtectionDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
