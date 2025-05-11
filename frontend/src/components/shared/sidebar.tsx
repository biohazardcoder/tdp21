import {  BadgeCheck, Bell,  LogOut,   UserCog } from "lucide-react"
import { Sidebar,SidebarContent,SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarSeparator } from "../ui/sidebar"
import { Link } from "react-router-dom"



const items = [
  {
    title: "Account",
    url: "/profile",
    icon: UserCog,
  },
  {
    title: "Verification",
    url: "/profile/verify",
    icon: BadgeCheck,
  },
  {
    title: "Notification",
    url: "/profile/notification",
    icon: Bell,
  },
]

export function AppSidebar() {
  return (
    <Sidebar >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Profile</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
          <SidebarSeparator className="my-1"/>
          <SidebarGroupContent>
            <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to={"/"} >
                      <LogOut />
                      <span>Home</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
