import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useLoader } from "@/context/LoaderContext";
import { useNavigationMemory } from "@/context/NavigationMemory";
import { clearHomeState } from "@/lib/homeState";

const Footer = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { show } = useLoader();
  const { setSourceSection } = useNavigationMemory();

  const handleNav = useCallback((e: React.MouseEvent, url: string, newTab = true) => {
    e.preventDefault();
    show(300);
    setTimeout(() => {
      if (newTab) {
        window.open(url, "_blank", "noopener,noreferrer");
      } else {
        window.location.href = url;
      }
    }, 300);
  }, [show, navigate]);

  return (
    <footer className="py-16 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-muted/10" />


      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold name-gradient mb-3">Ahamad Ullah</h3>
            <p className="text-muted-foreground text-sm">
              Aspiring AI Engineer | Software Developer | Bioinformatics Enthusiast
            </p>
          </div>

          <div className="text-center">
            <h4 className="font-semibold mb-4 gradient-text">Quick Links</h4>
            <div className="flex flex-col gap-2">
              <a href="/#education" className="text-sm text-muted-foreground hover:text-primary no-underline transition-colors" onClick={(e) => { if (window.location.pathname !== "/") { e.preventDefault(); setSourceSection(""); clearHomeState(); navigate("/#education"); } }}>Education</a>
              <a href="/#skills" className="text-sm text-muted-foreground hover:text-primary no-underline transition-colors" onClick={(e) => { if (window.location.pathname !== "/") { e.preventDefault(); setSourceSection(""); clearHomeState(); navigate("/#skills"); } }}>Skills</a>
              <a href="/#projects" className="text-sm text-muted-foreground hover:text-primary no-underline transition-colors" onClick={(e) => { if (window.location.pathname !== "/") { e.preventDefault(); setSourceSection(""); clearHomeState(); navigate("/#projects"); } }}>Projects</a>
            </div>
          </div>

          <div className="text-center md:text-right">
            <h4 className="font-semibold mb-4 gradient-text">Connect</h4>
            <div className="flex flex-col gap-2">
              <a href="mailto:anmdahamadullah@gmail.com" className="text-sm text-muted-foreground hover:text-primary no-underline transition-colors" onClick={(e) => handleNav(e, "mailto:anmdahamadullah@gmail.com", false)}>Email</a>
              <a href="https://linkedin.com/in/im-ahamad" target="_blank" rel="noreferrer" className="text-sm text-muted-foreground hover:text-primary no-underline transition-colors" onClick={(e) => handleNav(e, "https://linkedin.com/in/im-ahamad")}>LinkedIn</a>
              <a href="https://github.com/im-ahamad" target="_blank" rel="noreferrer" className="text-sm text-muted-foreground hover:text-primary no-underline transition-colors" onClick={(e) => handleNav(e, "https://github.com/im-ahamad")}>GitHub</a>
            </div>
          </div>
        </div>

        <div className="text-center pt-8 border-t border-border/30">
          <p className="text-muted-foreground text-xs md:text-sm">
            © {new Date().getFullYear()} Md Ahamad Ullah. {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
