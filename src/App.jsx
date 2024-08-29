import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import DashboardPage from "./pages/DashboardPage";
import CampaignsPage from "./pages/CampaignsPage";
import ProspectsPage from "./pages/ProspectsPage";
import AccountsPage from "./pages/AccountsPage";
import ExclusionsPage from "./pages/ExclusionsPage";
import InboxPage from "./pages/InboxPage";
import OnboardingPage from "./pages/OnboardingPage";
import PersonasPage from "./pages/PersonasPage";
import MessageTemplatesPage from "./pages/MessageTemplatesPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<DashboardPage />} />
            <Route path="campaigns" element={<CampaignsPage />} />
            <Route path="prospects" element={<ProspectsPage />} />
            <Route path="accounts" element={<AccountsPage />} />
            <Route path="exclusions" element={<ExclusionsPage />} />
            <Route path="inbox" element={<InboxPage />} />
            <Route path="onboarding" element={<OnboardingPage />} />
            <Route path="personas" element={<PersonasPage />} />
            <Route path="message-templates" element={<MessageTemplatesPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
