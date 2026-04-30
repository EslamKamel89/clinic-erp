import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import useLocalizationInit from "../../../shared/lib/localization/initLocalization";

export const RootLayout = () => {
  useLocalizationInit();

  return (
    <>
      <Outlet />
      <Toaster />
    </>
  );
};
