import '@/lib/errorReporter';
import { enableMapSet } from "immer";
enableMapSet();
import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { RouteErrorBoundary } from '@/components/RouteErrorBoundary';
import { RouteAnnouncer } from '@/components/RouteAnnouncer';
import '@/index.css'
// Page Imports
import { HomePage } from '@/pages/HomePage';
import { ObservabilityPage } from '@/pages/ObservabilityPage';
import { GovernancePage } from '@/pages/GovernancePage';
import { GuardrailsPage } from '@/pages/GuardrailsPage';
import { RetrievalPage } from '@/pages/RetrievalPage';
import { EvaluationPage } from '@/pages/EvaluationPage';
import { AboutPage } from '@/pages/AboutPage';
import { BuildBuyPage } from '@/pages/BuildBuyPage';
import { OptimizationPage } from '@/pages/OptimizationPage';
import { ExperimentationPage } from '@/pages/ExperimentationPage';
import { FairnessPage } from '@/pages/FairnessPage';
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});
const router = createBrowserRouter([
  {
    path: "/",
    element: <><RouteAnnouncer /><HomePage /></>,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/observability",
    element: <><RouteAnnouncer /><ObservabilityPage /></>,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/governance",
    element: <><RouteAnnouncer /><GovernancePage /></>,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/guardrails",
    element: <><RouteAnnouncer /><GuardrailsPage /></>,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/retrieval",
    element: <><RouteAnnouncer /><RetrievalPage /></>,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/evaluation",
    element: <><RouteAnnouncer /><EvaluationPage /></>,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/build-buy",
    element: <><RouteAnnouncer /><BuildBuyPage /></>,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/optimization",
    element: <><RouteAnnouncer /><OptimizationPage /></>,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/experiments",
    element: <><RouteAnnouncer /><ExperimentationPage /></>,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/fairness",
    element: <><RouteAnnouncer /><FairnessPage /></>,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/about",
    element: <><RouteAnnouncer /><AboutPage /></>,
    errorElement: <RouteErrorBoundary />,
  },
]);
const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary>
          <RouterProvider router={router} />
        </ErrorBoundary>
      </QueryClientProvider>
    </StrictMode>
  );
}