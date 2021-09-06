import { createContext, ReactNode, useContext, useState } from "react";

interface SidebarDrawerProviderProps {
  children: ReactNode;
}

type SidebarDrawerContext = {
  sidebarDrawer?: boolean;
  toggleSidebarDrawer(): void;
}

const SidebarDrawerContext = createContext({} as SidebarDrawerContext);

export function SidebarDrawerProvider({ children }: SidebarDrawerProviderProps) {
  const [sidebarDrawer, setSidebarDrawer] = useState<boolean>()

  function toggleSidebarDrawer() {
    if (sidebarDrawer) {
      setSidebarDrawer(false);
      setTimeout(() => setSidebarDrawer(undefined), 300)
    } else {
      setSidebarDrawer(true)
    }
  }

  return (
    <SidebarDrawerContext.Provider 
      value={{
        sidebarDrawer,
        toggleSidebarDrawer
      }}
    >
      {children}
    </SidebarDrawerContext.Provider>
  )
}

export const useSidebarDrawer = () => useContext(SidebarDrawerContext)
