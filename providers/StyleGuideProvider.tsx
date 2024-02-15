import React, { ReactNode } from "react";

// Mock NextJS router
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";

import AppProviders from "./AppProviders";

export default function StyleGuideProvider({
  children,
}: {
  children: ReactNode;
}) {
  return <AppProviders>{children}</AppProviders>;
}
