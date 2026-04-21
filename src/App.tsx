import { Button } from "./components/ui/button";
import useLocalizationInit from "./shared/lib/localization/initLocalization";
import { useLocalization } from "./shared/lib/localization/useLocalization";

function App() {
  useLocalizationInit();
  const { t, language, setLanguage } = useLocalization("p000");
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
