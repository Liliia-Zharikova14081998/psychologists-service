"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

type Props = {
  children: React.ReactNode;
};

const TanStackProvider = ({ children }: Props) => {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false, 
        retry: 1, 
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      
  <Toaster 
  position="top-right" 
  toastOptions={{
    className: 'custom-toast', 
    duration: 3000,
  }}
/>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default TanStackProvider;