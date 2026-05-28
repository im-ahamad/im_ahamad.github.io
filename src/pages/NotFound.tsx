import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.1),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,hsl(var(--accent)/0.08),transparent_60%)]" />

      <div className="text-center relative z-10 px-4">
        <div className="text-8xl md:text-9xl font-bold mb-4 gradient-text-rich">404</div>
        <h1 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">Oops! Page not found</h1>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <a
          href="/"
          className="shimmer-btn inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-medium no-underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
