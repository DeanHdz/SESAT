"use client";
import React, { useCallback, useState } from "react";

type FallbackRender = (props: { error: Error | null, resetErrorBoundary: () => void }) => React.ReactElement;

interface ErrorBoundaryProps {
  fallbackRender: FallbackRender;
  children: React.ReactNode;
}

export const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ fallbackRender, children }) => {
  const [error, setError] = useState<Error | null>(null);

  const ErrorFallback = fallbackRender;

  const resetErrorBoundary = useCallback(() => setError(null), []);

  React.useEffect(() => {
    if (error) {
      // You can use your own error logging service here
      console.error(error);
    }
  }, [error]);

  if (error) {
    return <ErrorFallback error={error} resetErrorBoundary={resetErrorBoundary} />;
  }

  return <React.Fragment>{children}</React.Fragment>;
};
