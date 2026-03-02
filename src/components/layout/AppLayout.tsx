import React from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ShieldCheck, User, Languages } from "lucide-react";
import { SEO } from "@/components/SEO";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n-store";
import en from "@/data/locales/en.json";
import es from "@/data/locales/es.json";
import { Button } from "@/components/ui/button";
type AppLayoutProps = {
  children: React.ReactNode;
  container?: boolean;
  className?: string;
  contentClassName?: string;
};
export function AppLayout({ children, container = false, className, contentClassName }: AppLayoutProps): JSX.Element {
  const currentLang = useLanguage(s => s.current);
  const toggleLanguage = useLanguage(s => s.toggleLanguage);
  const t = currentLang === 'en' ? en : es;
  return (
    <SidebarProvider defaultOpen={true}>
      <SEO />
      <a href="#main-content" className="skip-link">
        {t.common.skip}
      </a>
      <AppSidebar />
      <SidebarInset className={cn("flex flex-col min-h-screen bg-background", className)}>
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/95 px-6 backdrop-blur" role="banner">
          <SidebarTrigger aria-label="Toggle Sidebar" />
          <div className="flex items-center gap-2 font-bold text-foreground">
            <ShieldCheck className="h-5 w-5 text-primary" aria-hidden="true" />
            <span className="tracking-tight">Veritas AI <span className="text-muted-foreground font-normal ml-1 border-l pl-2">Lab</span></span>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="text-xs font-mono h-8 gap-2"
              aria-label={`Switch language. Current: ${currentLang.toUpperCase()}`}
            >
              <Languages className="h-3 w-3" />
              {currentLang.toUpperCase()}
            </Button>
            <ThemeToggle className="relative top-0 right-0" />
            <div className="flex items-center gap-2 border-l pl-3 ml-1">
              <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                <User className="h-4 w-4" />
              </div>
              <div className="hidden lg:block text-xs">
                <p className="font-bold leading-none">{t.common.admin}</p>
                <p className="text-muted-foreground mt-0.5">{t.common.dept}</p>
              </div>
            </div>
          </div>
        </header>
        <main id="main-content" className={cn("flex-1 outline-none", contentClassName)} tabIndex={-1} role="main">
          {container ? (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 lg:py-12">
              {children}
            </div>
          ) : (
            children
          )}
        </main>
        <footer className="border-t py-8 px-6 bg-muted/20" role="contentinfo">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-muted-foreground">
            <p>© 2026 Veritas AI Governance Platform.</p>
            <p className="font-medium">
              {t.common.footer}{" "}
              <a
                href="https://www.digitalrowe.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:underline transition-colors"
              >
                Stephen Rowe
              </a>.
            </p>
          </div>
        </footer>
      </SidebarInset>
    </SidebarProvider>
  );
}