import { Button } from "./components/ui/button";
import { useLocalization } from "./shared/lib/localization/useLocalization";

function App() {
  const { t, language, setLanguage, i18n } = useLocalization("p001");
  return (
    <div>
      <div className="text-red-500">{t("app_title")}</div>
      <Button
        onClick={() => {
          setLanguage(language == "ar" ? "en" : "ar");
        }}
      >
        {t("click")}
      </Button>
      <Button>{t("save")}</Button>
    </div>
  );
}

export default App;
