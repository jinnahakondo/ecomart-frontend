'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="card bg-base-100 shadow-xl max-w-md w-full">
        <div className="card-body text-center">
          <h1 className="card-title text-error justify-center text-2xl">
            Oops! Something went wrong
          </h1>
          <p className="text-base-content/70 mt-2">
            {error.message || 'An unexpected error occurred. Please try again.'}
          </p>
          <div className="card-actions justify-center mt-6">
            <button
              onClick={reset}
              className="btn btn-primary"
            >
              Try Again
            </button>
            <a href="/" className="btn btn-ghost">
              Go Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
