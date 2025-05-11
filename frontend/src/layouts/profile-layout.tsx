import React from "react"
import { AppSidebar, } from "../components/shared/sidebar"
import { SidebarProvider } from "../components/ui/sidebar"

export const ProfileLayout = ({children}:{children:React.ReactNode}) => {
  return (
        <div>
            <SidebarProvider>
              <AppSidebar  />
              <main  className="w-screen">
                  {children}
              </main>
            </SidebarProvider>
        </div>
  )
}
