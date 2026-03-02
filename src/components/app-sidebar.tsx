import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Activity,
  ShieldCheck,
  Database,
  Zap,
  Gavel,
  Settings,
  Info,
  LayoutDashboard
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarSeparator,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { useLanguage } from "@/lib/i18n-store";
import en from "@/data/locales/en.json";
import es from "@/data/locales/es.json";
export function AppSidebar(): JSX.Element {
  const location = useLocation();
  const currentLang = useLanguage(s => s.current);
  const t = currentLang === 'en' ? en : es;
  const navItems = [
    { title: t.nav.overview, icon: Home, url: "/" },
    { title: t.nav.observability, icon: Activity, url: "/observability" },
    { title: t.nav.guardrails, icon: ShieldCheck, url: "/guardrails" },
    { title: t.nav.retrieval, icon: Database, url: "/retrieval" },
    { title: t.nav.evaluation, icon: Zap, url: "/evaluation" },
    { title: t.nav.governance, icon: Gavel, url: "/governance" },
    { title: t.nav.about, icon: Info, url: "/about" },
  ];
  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-3 px-2 py-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-lg">
            <LayoutDashboard className="h-5 w-5" />
          </div>
          <div className="flex flex-col gap-0.5 overflow-hidden group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-bold leading-none tracking-tight">Veritas AI</span>
            <span className="text-2xs text-muted-foreground truncate font-medium uppercase tracking-wider">Control Plane</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-2 mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground/70 group-data-[collapsible=icon]:hidden">
            Main Modules
          </SidebarGroupLabel>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.url}>
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname === item.url}
                  tooltip={item.title}
                  className="transition-all duration-200"
                >
                  <Link to={item.url}>
                    <item.icon className="size-4" />
                    <span className="font-medium">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarSeparator className="my-4 opacity-50" />
        <SidebarGroup className="mt-auto">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip={t.nav.documentation}>
                <Database className="size-4 opacity-50" />
                <span className="font-medium">{t.nav.documentation}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip={t.nav.settings}>
                <Settings className="size-4" />
                <span className="font-medium">{t.nav.settings}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <div className="flex items-center gap-3 overflow-hidden group-data-[collapsible=icon]:hidden">
          <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-bold">AV</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-semibold truncate">Enterprise Lab</span>
            <span className="text-2xs text-muted-foreground truncate">{t.common.stable}</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}