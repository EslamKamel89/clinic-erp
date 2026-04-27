import { EllipsisVertical } from "lucide-react";
import { Button } from "../../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { Separator } from "../../../components/ui/separator";
import { LanguageSwitcher } from "../../localization/components/LanguageSwitcher";
type Props = {
  logoutCallback: () => void;
  t: (key: string) => string;
};
export const ActionMenu = ({ logoutCallback, t }: Props) => {
  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <EllipsisVertical />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-[200px]">
          {/* Language */}
          <div className="px-2 py-1">
            <LanguageSwitcher />
          </div>

          {/* Separator */}
          <Separator className="my-1" />

          {/* Logout */}
          <DropdownMenuItem onClick={logoutCallback} className="cursor-pointer">
            {t("actions.logout")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
