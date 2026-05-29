import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Menu, X, Sun, Moon, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLoader } from "@/context/LoaderContext";
import { useNavigationMemory } from "@/context/NavigationMemory";
import { clearHomeState } from "@/lib/homeState";

const navItems = [
  { key: "education", href: "#education", color: "blue" },
  { key: "skills", href: "#skills", color: "emerald" },
  { key: "certifications", href: "#certifications", color: "amber" },
  { key: "interests", href: "#interests", color: "violet" },
  { key: "projects", href: "#projects", color: "rose" },
];

const colorMap: Record<string, { light: string; dark: string; bg: string; border: string }> = {
  blue:    { light: "text-blue-600",   dark: "dark:text-blue-400",   bg: "bg-blue-500/10 dark:bg-blue-500/15",   border: "border-blue-500/30" },
  emerald: { light: "text-emerald-600", dark: "dark:text-emerald-400", bg: "bg-emerald-500/10 dark:bg-emerald-500/15", border: "border-emerald-500/30" },
  amber:   { light: "text-amber-600",  dark: "dark:text-amber-400",  bg: "bg-amber-500/10 dark:bg-amber-500/15",  border: "border-amber-500/30" },
  violet:  { light: "text-violet-600", dark: "dark:text-violet-400", bg: "bg-violet-500/10 dark:bg-violet-500/15", border: "border-violet-500/30" },
  rose:    { light: "text-rose-600",   dark: "dark:text-rose-400",   bg: "bg-rose-500/10 dark:bg-rose-500/15",   border: "border-rose-500/30" },
};

const NavBar = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { show } = useLoader();
  const { sourceSection, setSourceSection } = useNavigationMemory();
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark" | null;
    if (saved) {
      setTheme(saved);
      document.documentElement.classList.toggle("dark", saved === "dark");
    }
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    navItems.forEach((item) => {
      const el = document.querySelector(item.href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const toggleTheme = useCallback(() => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    localStorage.setItem("theme", next);
  }, [theme]);

  const changeLanguage = useCallback((lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("language", lng);
  }, [i18n]);

  const handleNavClick = useCallback((href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ${
         scrolled
           ? "bg-background/80 backdrop-blur-xl border-b border-border/40 shadow-lg shadow-black/5"
           : "bg-transparent"
       }`}
    >
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <a
          href="/"
          className="text-xl font-bold no-underline name-gradient cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            sessionStorage.removeItem("nav-memory");
            clearHomeState();
            show(600);
            setTimeout(() => {
              window.location.href = "/";
            }, 600);
          }}
        >
          Ahamad
        </a>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.key;
            const c = colorMap[item.color];
            return (
              <a
                key={item.key}
                href={item.href}
                className={`relative text-sm font-medium no-underline px-3 py-1.5 rounded-lg border transition-[background-color,border-color,color] duration-200 ${
                   isActive
                     ? `${c.light} ${c.dark} ${c.bg} ${c.border} shadow-sm`
                     : "text-muted-foreground/70 hover:text-foreground hover:bg-accent/5 hover:border-border/50"
                 }`}
                onClick={(e) => {
                  e.preventDefault();
                  if (window.location.pathname !== "/" || window.location.hash) {
                    setSourceSection("");
                    clearHomeState();
                    navigate(`/${item.href}`);
                  } else {
                    handleNavClick(item.href);
                  }
                }}
              >
                {t(`nav.${item.key}`)}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-current" />
                )}
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
            className="h-9 w-9 rounded-full hover:bg-accent/10 transition-[background-color] duration-300"
          >
            {theme === "light" ? (
              <Sun className="h-4 w-4 transition-transform duration-300 hover:rotate-45" />
            ) : (
              <Moon className="h-4 w-4 transition-transform duration-300" />
            )}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full hover:bg-accent/10">
                <Globe className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="glass border-border/50 min-w-[120px]">
              <DropdownMenuItem onClick={() => changeLanguage("en")} className="cursor-pointer">
                <span className="mr-2">🇬🇧</span> English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => changeLanguage("bn")} className="cursor-pointer">
                <span className="mr-2">🇧🇩</span> বাংলা
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => changeLanguage("zh")} className="cursor-pointer">
                <span className="mr-2">🇨🇳</span> 中文
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => changeLanguage("hi")} className="cursor-pointer">
                <span className="mr-2">🇮🇳</span> हिन्दी
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden h-9 w-9 rounded-full hover:bg-accent/10"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-xl shadow-xl">
          <div className="px-4 py-3 flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.key;
              const c = colorMap[item.color];
              return (
                <a
                  key={item.key}
                  href={item.href}
                  className={`text-sm font-medium no-underline px-3 py-2.5 rounded-lg border transition-[background-color,border-color,color] duration-200 ${
                     isActive
                       ? `${c.light} ${c.dark} ${c.bg} ${c.border}`
                       : "text-muted-foreground hover:text-foreground hover:bg-accent/5"
                   }`}
                  onClick={(e) => {
                    e.preventDefault();
                    if (window.location.pathname !== "/" || window.location.hash) {
                      setSourceSection("");
                      clearHomeState();
                      navigate(`/${item.href}`);
                    } else {
                      handleNavClick(item.href);
                    }
                  }}
                >
                  {t(`nav.${item.key}`)}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
