import '@/lib/errorReporter';
import { enableMapSet } from "immer";
enableMapSet();
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { RouteErrorBoundary } from '@/components/RouteErrorBoundary';
import '@/index.css'
// Page Imports
import { OverviewPage } from '@/pages/OverviewPage';
import { ObservabilityPage } from '@/pages/ObservabilityPage';
import { GovernancePage } from '@/pages/GovernancePage';
import { GuardrailsPage } from '@/pages/GuardrailsPage';
import { RetrievalPage } from '@/pages/RetrievalPage';
import { EvaluationPage } from '@/pages/EvaluationPage';
const queryClient = new QueryClient();
// Route Configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <OverviewPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/observability",
    element: <ObservabilityPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/governance",
    element: <GovernancePage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/guardrails",
    element: <GuardrailsPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/retrieval",
    element: <RetrievalPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/evaluation",
    element: <EvaluationPage />,
    errorElement: <RouteErrorBoundary />,
  },
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </QueryClientProvider>
  </StrictMode>,
)