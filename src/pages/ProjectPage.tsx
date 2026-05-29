import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useLoader } from "@/context/LoaderContext";
import { useNavigationMemory } from "@/context/NavigationMemory";

const ProjectPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { show } = useLoader();
  const { getIframeState, saveIframeState, setSourceSection } = useNavigationMemory();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const stateSentRef = useRef(false);

  const routeKey = location.pathname + location.hash;

  useEffect(() => {
    document.title = `${slug?.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase())} | Ahamad Ullah`;
  }, [slug]);

  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.data === "back-to-portfolio") {
        show(600);
        setSourceSection("");
        const homeScrollY = location.state?.scrollY;
        const homeSection = location.state?.section;
        setTimeout(
          () =>
            navigate("/", {
              replace: true,
              state: homeScrollY ? { scrollY: homeScrollY, section: homeSection } : undefined,
            }),
          100,
        );
        return;
      }
      if (e.data?.type === "nav-snapshot" && e.data.payload) {
        saveIframeState(routeKey, {
          scrollPosition: e.data.payload.scrollY || 0,
          theme: e.data.payload.theme || "light",
          lang: e.data.payload.lang || "en",
          visibleSection: e.data.payload.visibleSection || "",
        });
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [navigate, show, routeKey, saveIframeState, location.state?.scrollY, location.state?.section]);

  useEffect(() => {
    stateSentRef.current = false;
    const saved = getIframeState(routeKey);
    if (saved && iframeRef.current) {
      const waitForIframe = () => {
        if (stateSentRef.current) return;
        try {
          iframeRef.current?.contentWindow?.postMessage(
            { type: "restore-state", payload: saved },
            window.location.origin,
          );
          stateSentRef.current = true;
        } catch {
          /* cross-origin */
        }
      };
      const id = setInterval(waitForIframe, 200);
      const timeout = setTimeout(() => {
        clearInterval(id);
        waitForIframe();
      }, 3000);
      return () => {
        clearInterval(id);
        clearTimeout(timeout);
      };
    }
  }, [routeKey, getIframeState]);

  useEffect(() => {
    return () => {
      try {
        iframeRef.current?.contentWindow?.postMessage({ type: "request-snapshot" }, window.location.origin);
      } catch {
        /* cross-origin */
      }
    };
  }, []);

  return (
    <iframe
      ref={iframeRef}
      src={`/projects/${slug}.html`}
      className="w-full min-h-screen border-0 block"
      title="Project"
    />
  );
};

export default ProjectPage;
