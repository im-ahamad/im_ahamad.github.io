import { useTranslation } from "react-i18next";
import logo from "@/assets/logo.png";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="py-12 md:py-16 px-4 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto max-w-6xl">
        {/* Footer Bottom - Divider */}
        <div className="border-t border-gray-200/20 dark:border-gray-700/20"></div>

        {/* Copyright Section */}
        <div className="text-center pt-8 md:pt-12 mt-8 md:mt-12">
          <p className="text-muted-foreground text-xs md:text-sm flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2">
            <span>© {new Date().getFullYear()}</span>
            <img
              src={logo}
              alt="MySelf"
              width={17}
              height={17}
              className="inline-block"
            />
            <span>Md Ahamad Ullah. {t("footer.copyright")}</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
