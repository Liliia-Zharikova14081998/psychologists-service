"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

type Props = {
  children: React.ReactNode;
};

const TanStackProvider = ({ children }: Props) => {
  // Настройка базовых параметров (опционально, но полезно)
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false, // Отключает перезагрузку данных при смене вкладки
        retry: 1, // Количество попыток при ошибке
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      
      {/* Уведомления будут всплывать поверх всех компонентов */}
  <Toaster 
  position="top-right" 
  toastOptions={{
    className: 'custom-toast', // Применяется ко всем тостам
    duration: 3000,
  }}
/>

      {/* Инструменты разработчика (видны только в режиме разработки) */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default TanStackProvider;