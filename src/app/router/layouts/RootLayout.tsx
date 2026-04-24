import { Outlet } from "react-router-dom";
import useLocalizationInit from "../../../shared/lib/localization/initLocalization";

export const RootLayout = () => {
  useLocalizationInit();
  return (
    <>
      <Outlet />
    </>
  );
};
