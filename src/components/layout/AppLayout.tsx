import React from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ShieldCheck, User } from "lucide-react";
import { SEO } from "@/components/SEO";
import { cn } from "@/lib/utils";
type AppLayoutProps = {
  children: React.ReactNode;
  container?: boolean;
  className?: string;
  contentClassName?: string;
};
export function AppLayout({ children, container = false, className, contentClassName }: AppLayoutProps): JSX.Element {
  return (
    <SidebarProvider defaultOpen={true}>
      <SEO />
      <AppSidebar />
      <SidebarInset className={cn("flex flex-col min-h-screen bg-background", className)}>
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/95 px-6 backdrop-blur">
          <SidebarTrigger />
          <div className="flex items-center gap-2 font-semibold text-foreground">
            <ShieldCheck className="h-5 w-5 text-primary" />
            <span>Veritas AI <span className="text-muted-foreground font-normal ml-1">| Enterprise Lab</span></span>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <ThemeToggle className="relative top-0 right-0" />
            <div className="flex items-center gap-2 border-l pl-4">
              <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center">
                <User className="h-4 w-4" />
              </div>
              <div className="hidden md:block text-sm">
                <p className="font-medium leading-none">Admin User</p>
                <p className="text-xs text-muted-foreground">Compliance Dept.</p>
              </div>
            </div>
          </div>
        </header>
        <main className={cn("flex-1", contentClassName)}>
          {container ? (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 lg:py-12">
              {children}
            </div>
          ) : (
            children
          )}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}