import { useState, useEffect } from "react";
import { useTranslation, Trans } from "react-i18next";

export const UserGreeter = () => {
  const { t } = useTranslation("common");
  // }
  const [name, setName] = useState<string>("Quest");

  useEffect(() => {
    document.title = `Hello, ${name}`;
  }, [name]);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "20px",
        borderRadius: "8px",
        maxWidth: "400px",
      }}
    >
      <h2>{t("home.title")}</h2>

      <p>
        <Trans i18nKey="home.hello" values={{ name }} ns="common">
          Hello, <strong>{name}</strong>!
        </Trans>
      </p>

      <label>
        {t("home.enterName")} <br />
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          style={{ padding: "5px", marginTop: "5px" }}
        />
      </label>
    </div>
  );
};
