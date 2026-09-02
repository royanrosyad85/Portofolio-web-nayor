import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import ProtectedBlogRoute from '@/features/blog/components/ProtectedBlogRoute';
import { PageLoader } from './PageLoader';

// Lazy-load non-critical routes so the landing page ships the smallest possible chunk.
const BlogPost = lazy(() => import('@/features/blog/pages/BlogPost'));
const BlogListing = lazy(() => import('@/features/blog/pages/BlogListing'));
const BlogAdminDashboard = lazy(() => import('@/features/blog/pages/BlogAdminDashboard'));
const BlogAdmin = lazy(() => import('@/features/blog/pages/BlogAdmin'));
const NotionEditorDemo = lazy(() => import('@/features/blog/pages/NotionEditorDemo'));
const NotFound = lazy(() => import('@/pages/NotFound'));

export function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<BlogListing />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route
          path="/blog-admin"
          element={
            <ProtectedBlogRoute>
              <BlogAdminDashboard />
            </ProtectedBlogRoute>
          }
        />
        <Route
          path="/blog-admin/:id"
          element={
            <ProtectedBlogRoute>
              <BlogAdmin />
            </ProtectedBlogRoute>
          }
        />
        <Route path="/notion-demo" element={<NotionEditorDemo />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
