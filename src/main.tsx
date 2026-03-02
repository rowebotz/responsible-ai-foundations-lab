import '@/lib/errorReporter';
import { enableMapSet } from "immer";
enableMapSet();
import React, { StrictMode } from 'react'
import { createRoot, type Root } from 'react-dom/client'
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
const queryClient = new QueryClient();
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
    path: "/about",
    element: <><RouteAnnouncer /><AboutPage /></>,
    errorElement: <RouteErrorBoundary />,
  },
]);
declare global {
  interface Window {
    __veritas_root__?: Root;
  }
}
const container = document.getElementById('root');
if (container) {
  if (!window.__veritas_root__) {
    window.__veritas_root__ = createRoot(container);
  }
  window.__veritas_root__.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary>
          <RouterProvider router={router} />
        </ErrorBoundary>
      </QueryClientProvider>
    </StrictMode>
  );
}