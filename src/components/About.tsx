import { useTranslation } from "react-i18next";

export const About = () => {
  const { t } = useTranslation("common");
  return (
    <div style={{ padding: "20px" }}>
      <h2>{t("about.title")}</h2>
      <p>{t("about.description")}</p>
    </div>
  );
};
