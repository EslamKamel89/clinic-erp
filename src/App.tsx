import { useTranslation } from "react-i18next";
import { Button } from "./components/ui/button";

function App() {
  const { t } = useTranslation();
  return (
    <div>
      <div className="text-red-500">{t("app_title")}</div>
      <Button>{t("click")}</Button>
    </div>
  );
}

export default App;
