import type { ThemeProvider as NextThemes } from "next-themes";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { VercelToolbar } from "@vercel/toolbar/next";

import { PostHogProvider } from "@ryuu/analytics/posthog/client";
import { VercelAnalytics } from "@ryuu/analytics/vercel";
import { env } from "@ryuu/env";

import { Toaster } from "~/components/ui/sonner";
import { TooltipProvider } from "~/components/ui/tooltip";
import { ThemeProvider } from "./theme";

function Provider({
  children,
  ...properties
}: React.ComponentProps<typeof NextThemes>) {
  return (
    <ThemeProvider {...properties}>
      <PostHogProvider>
        <TooltipProvider delayDuration={500}>
          {children}
          <Toaster />
        </TooltipProvider>

        <SpeedInsights />
        <VercelAnalytics />

        {env.NODE_ENV === "development" && <VercelToolbar />}
      </PostHogProvider>
    </ThemeProvider>
  );
}

export {
  Provider,
  SpeedInsights,
  ThemeProvider,
  VercelAnalytics,
  VercelToolbar,
};
