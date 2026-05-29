import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense, useEffect, useRef } from "react";

import "@/i18n/config";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { LoaderProvider, useLoader } from "@/context/LoaderContext";
import Loader from "@/components/Loader";
import { NavigationMemoryProvider } from "@/context/NavigationMemory";

const Index = lazy(() => import("@/pages/Index"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const ProjectPage = lazy(() => import("@/pages/ProjectPage"));

const queryClient = new QueryClient();

const RouteChangeHandler = () => {
  const location = useLocation();
  const { show } = useLoader();
  const prevPath = useRef(location.pathname);

  useEffect(() => {
    if (prevPath.current !== location.pathname) {
      prevPath.current = location.pathname;
      show(300);
    }
  }, [location.pathname, show]);

  return null;
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <LoaderProvider>
          <BrowserRouter>
            <NavigationMemoryProvider>
              <RouteChangeHandler />
              <Loader />
              <Suspense fallback={null}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/projects/:slug" element={<ProjectPage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </NavigationMemoryProvider>
          </BrowserRouter>
        </LoaderProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
