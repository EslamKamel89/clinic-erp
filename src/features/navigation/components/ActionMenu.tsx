import { EllipsisVertical, LogOut, Settings2 } from "lucide-react";

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
    <div className="flex items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="
              rounded-xl
              border border-border/60
              bg-card/60
              shadow-sm
              backdrop-blur-sm

              hover:bg-accent/70
              hover:text-foreground
            "
          >
            <EllipsisVertical className="size-5" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          sideOffset={10}
          className="
            w-[240px]
            rounded-2xl
            border border-border/60
            bg-popover/95
            p-2
            shadow-xl
            backdrop-blur-xl
          "
        >
          {/* Header */}
          <div className="mb-2 rounded-xl bg-gradient-to-r from-primary/10 via-accent/40 to-transparent px-3 py-2">
            <div className="flex items-center gap-2">
              <div
                className="
                  flex size-8 items-center justify-center
                  rounded-lg
                  bg-primary/15
                  text-primary
                "
              >
                <Settings2 className="size-4" />
              </div>

              <div className="flex flex-col">
                <span className="text-sm font-semibold">Preferences</span>

                <span className="text-[11px] text-muted-foreground">
                  Manage your workspace settings
                </span>
              </div>
            </div>
          </div>

          {/* Language */}
          <div className="rounded-xl px-2 py-2 hover:bg-accent/40 transition-colors">
            <LanguageSwitcher />
          </div>

          {/* Separator */}
          <Separator className="my-2 opacity-60" />

          {/* Logout */}
          <DropdownMenuItem
            onClick={logoutCallback}
            className="
              rounded-xl
              px-3 py-2.5
              text-destructive
              transition-colors

              focus:bg-destructive/10
              focus:text-destructive

              data-[highlighted]:bg-destructive/10
              data-[highlighted]:text-destructive
            "
          >
            <div className="flex items-center gap-2">
              <LogOut className="size-4" />

              <span>{t("actions.logout")}</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
