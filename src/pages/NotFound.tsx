import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useLoader } from "@/context/LoaderContext";
import { useNavigationMemory } from "@/context/NavigationMemory";

const NotFound = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { show } = useLoader();
  const { signalReady, sourceSection, setSourceSection } = useNavigationMemory();

  useEffect(() => {
    signalReady();
  }, [signalReady]);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      console.warn("404: User attempted to access non-existent route:", location.pathname);
    }
  }, [location.pathname]);

  const goHome = () => {
    setSourceSection("");
    return "/";
  };

  const handleHomeNav = (e: React.MouseEvent) => {
    e.preventDefault();
    show(500);
    setTimeout(() => { navigate(goHome(), { replace: true }); }, 500);
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    show(800);
    setTimeout(() => navigate(goHome(), { replace: true }), 400);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      <a
        href="/"
        onClick={handleLogoClick}
        className="fixed top-3 left-4 z-[999] text-xl font-bold no-underline name-gradient cursor-pointer"
      >
        Ahamad
      </a>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.1),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,hsl(var(--accent)/0.08),transparent_60%)]" />

      <div className="text-center relative z-10 px-4">
        <div className="text-8xl md:text-9xl font-bold mb-4 gradient-text-rich">404</div>
        <h1 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">{t("notFound.title")}</h1>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          {t("notFound.description")}
        </p>
        <button
          onClick={handleHomeNav}
          className="shimmer-btn inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-medium no-underline cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("notFound.returnHome")}
        </button>
      </div>
    </div>
  );
};

export default NotFound;
