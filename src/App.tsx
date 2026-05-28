import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense, useEffect } from "react";

import "@/i18n/config";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster as Sonner } from "@/components/ui/sonner";
import BubbleCursor from "@/components/BubbleCursor";

const Index = lazy(() => import("@/pages/Index"));
const NotFound = lazy(() => import("@/pages/NotFound"));

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    const saved = localStorage.getItem("theme") || "light";
    document.documentElement.classList.toggle("dark", saved === "dark");
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BubbleCursor />
        <BrowserRouter>
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
