import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="py-16 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-muted/10" />
      <div className="absolute top-0 left-10 right-10 gradient-divider-wave" />

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
              <a href="#education" className="text-sm text-muted-foreground hover:text-primary no-underline transition-colors">Education</a>
              <a href="#skills" className="text-sm text-muted-foreground hover:text-primary no-underline transition-colors">Skills</a>
              <a href="#projects" className="text-sm text-muted-foreground hover:text-primary no-underline transition-colors">Projects</a>
            </div>
          </div>

          <div className="text-center md:text-right">
            <h4 className="font-semibold mb-4 gradient-text">Connect</h4>
            <div className="flex flex-col gap-2">
              <a href="mailto:anmdahamadullah@gmail.com" className="text-sm text-muted-foreground hover:text-primary no-underline transition-colors">Email</a>
              <a href="https://linkedin.com/in/im-ahamad" target="_blank" rel="noreferrer" className="text-sm text-muted-foreground hover:text-primary no-underline transition-colors">LinkedIn</a>
              <a href="https://github.com/im-ahamad" target="_blank" rel="noreferrer" className="text-sm text-muted-foreground hover:text-primary no-underline transition-colors">GitHub</a>
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
