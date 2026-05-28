import { Moon, Sun, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const { i18n } = useTranslation();

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark" | null;
    if (saved) {
      setTheme(saved);
      document.documentElement.classList.toggle("dark", saved === "dark");
    }
  }, []);

  const toggleTheme = (newTheme: "light" | "dark") => {
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("language", lng);
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => toggleTheme(theme === "light" ? "dark" : "light")}
        className="glass border-border/50 h-10 w-10 rounded-full"
      >
        {theme === "light" ? (
          <Sun className="h-5 w-5" />
        ) : (
          <Moon className="h-5 w-5" />
        )}
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="glass border-border/50 h-10 w-10 rounded-full">
            <Globe className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="glass border-border/50">
          <DropdownMenuItem onClick={() => changeLanguage("en")}>English</DropdownMenuItem>
          <DropdownMenuItem onClick={() => changeLanguage("bn")}>বাংলা</DropdownMenuItem>
          <DropdownMenuItem onClick={() => changeLanguage("zh")}>中文</DropdownMenuItem>
          <DropdownMenuItem onClick={() => changeLanguage("hi")}>हिन्दी</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
