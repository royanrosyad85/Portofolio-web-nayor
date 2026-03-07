
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { lazy, Suspense } from "react";
import { MotionConfig } from "framer-motion";
import Index from "./pages/Index";
import ProtectedBlogRoute from "./components/ProtectedBlogRoute";

// Lazy load non-critical routes for better performance
const BlogPost = lazy(() => import("./pages/BlogPost"));
const BlogListing = lazy(() => import("./pages/BlogListing"));
const BlogAdminDashboard = lazy(() => import("./pages/BlogAdminDashboard"));
const BlogAdmin = lazy(() => import("./pages/BlogAdmin"));
const NotionEditorDemo = lazy(() => import("./pages/NotionEditorDemo"));
const TestPage = lazy(() => import("./pages/TestPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Loading component for lazy-loaded routes
const PageLoader = () => (
  <div className="flex min-h-[100dvh] items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
    <div className="grid w-full max-w-5xl gap-4 lg:grid-cols-[1.08fr_0.92fr]">
      <div className="editorial-card min-h-[24rem] animate-pulse p-6 sm:p-8">
        <div className="h-3 w-28 rounded-full bg-foreground/10" />
        <div className="mt-8 h-20 max-w-xl rounded-[1.5rem] bg-foreground/10" />
        <div className="mt-6 grid gap-3">
          <div className="h-4 rounded-full bg-foreground/10" />
          <div className="h-4 max-w-[92%] rounded-full bg-foreground/10" />
          <div className="h-4 max-w-[78%] rounded-full bg-foreground/10" />
        </div>
      </div>
      <div className="ink-panel min-h-[24rem] animate-pulse p-6 sm:p-8">
        <div className="h-full rounded-[1.5rem] border border-white/10 bg-white/5" />
      </div>
    </div>
  </div>
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <MotionConfig reducedMotion="user">
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/blog" element={<BlogListing />} />
                <Route path="/blog/:id" element={<BlogPost />} />
                <Route path="/blog-admin" element={
                  <ProtectedBlogRoute>
                    <BlogAdminDashboard />
                  </ProtectedBlogRoute>
                } />
                <Route path="/blog-admin/:id" element={
                  <ProtectedBlogRoute>
                    <BlogAdmin />
                  </ProtectedBlogRoute>
                } />
                <Route path="/notion-demo" element={<NotionEditorDemo />} />
                <Route path="/test" element={<TestPage />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </MotionConfig>
  </QueryClientProvider>
);

export default App;
