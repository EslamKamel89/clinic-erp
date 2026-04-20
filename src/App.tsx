import { useTranslation } from "react-i18next";
import { Button } from "./components/ui/button";
import i18n from "./shared/lib/localization/i18n";

function App() {
  const { t } = useTranslation();
  return (
    <div>
      <div className="text-red-500">{t("app_title", { ns: "p001" })}</div>
      <Button
        onClick={() => {
          i18n.changeLanguage("ar");
        }}
      >
        {t("click", { ns: "p001" })}
      </Button>
      <Button>{t("save")}</Button>
    </div>
  );
}

export default App;
