"use client";

import { FC } from "react";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Notifications } from "@mantine/notifications";
import { MantineProvider } from "@mantine/core";

interface ProviderProps {
  children: React.ReactNode;
}
const Provider: FC<ProviderProps> = ({ children }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <MantineProvider
          withNormalizeCSS
          withCSSVariables
          theme={{ colorScheme: "dark" }}
        >
          <Notifications />
          {children}
        </MantineProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
};

export default Provider;
