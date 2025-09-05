
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import BlogPost from "./pages/BlogPost";
import BlogListing from "./pages/BlogListing";
import BlogAdminDashboard from "./pages/BlogAdminDashboard";
import BlogAdmin from "./pages/BlogAdmin";
import NotionEditorDemo from "./pages/NotionEditorDemo";
import TestPage from "./pages/TestPage";
import NotFound from "./pages/NotFound";
import ProtectedBlogRoute from "./components/ProtectedBlogRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
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
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
