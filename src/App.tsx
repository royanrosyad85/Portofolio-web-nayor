
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { lazy, Suspense } from "react";
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
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
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
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
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
  </QueryClientProvider>
);

export default App;
